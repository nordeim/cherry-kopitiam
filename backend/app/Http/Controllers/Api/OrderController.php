<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\PdpaConsent;
use App\Models\Product;
use App\Services\InventoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    private InventoryService $inventoryService;

    public function __construct(InventoryService $inventoryService)
    {
        $this->inventoryService = $inventoryService;
    }

    /**
     * Create a new order
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:20',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'location_id' => 'nullable|exists:locations,id',
            'notes' => 'nullable|string',
            'pdpa_consent' => 'accepted|boolean',
        ]);

        // Record PDPA consent if given
        $pdpaConsentId = null;
        if ($request->boolean('pdpa_consent')) {
            $pdpaConsent = PdpaConsent::recordConsent(
                $validated['customer_email'],
                PdpaConsent::TYPE_ORDER,
                'I consent to the processing of my personal data for order fulfillment.',
                $request->ip(),
                $request->userAgent()
            );
            $pdpaConsentId = $pdpaConsent->id;
        }

        try {
            return DB::transaction(function () use ($validated, $pdpaConsentId, $request) {
                // Validate products and calculate totals
                $itemsData = [];
                $subtotal = 0;

                foreach ($validated['items'] as $item) {
                    $product = Product::findOrFail($item['product_id']);
                  
                    $itemSubtotal = $product->price * $item['quantity'];
                    $subtotal += $itemSubtotal;

                    $itemsData[] = [
                        'product_id' => $product->id,
                        'product_name' => $product->name,
                        'quantity' => $item['quantity'],
                        'unit_price' => $product->price,
                        'subtotal' => $itemSubtotal,
                    ];
                }

                // Calculate GST breakdown (IRAS compliant)
                $breakdown = Order::calculateBreakdown($subtotal);

                // Reserve inventory with pessimistic locking
                $inventoryResult = $this->inventoryService->reserveStock($validated['items']);

                if (!$inventoryResult['success']) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Some items are no longer available',
                        'errors' => $inventoryResult['errors'],
                    ], 422);
                }

                // Create order
                $order = Order::create([
                    'customer_name' => $validated['customer_name'],
                    'customer_email' => $validated['customer_email'],
                    'customer_phone' => $validated['customer_phone'] ?? null,
                    'subtotal' => $breakdown['subtotal'],
                    'gst_amount' => $breakdown['gst_amount'],
                    'total_amount' => $breakdown['total_amount'],
                    'status' => Order::STATUS_PENDING,
                    'location_id' => $validated['location_id'] ?? null,
                    'pdpa_consent_id' => $pdpaConsentId,
                    'notes' => $validated['notes'] ?? null,
                ]);

                // Create order items
                foreach ($itemsData as $itemData) {
                    $order->items()->create($itemData);
                }

                // Log order creation
                Log::info('Order created', [
                    'order_id' => $order->id,
                    'invoice_number' => $order->invoice_number,
                    'total' => $order->total_amount,
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Order created successfully',
                    'data' => [
                        'order_id' => $order->id,
                        'invoice_number' => $order->invoice_number,
                        'subtotal' => $order->subtotal,
                        'gst_amount' => $order->gst_amount,
                        'total_amount' => $order->total_amount,
                        'status' => $order->status,
                        'created_at' => $order->created_at->toIso8601String(),
                    ],
                ], 201);
            });
        } catch (\Exception $e) {
            Log::error('Order creation failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create order. Please try again.',
            ], 500);
        }
    }

    /**
     * Get order by ID
     */
    public function show(string $id): JsonResponse
    {
        $order = Order::with(['items', 'location', 'pdpaConsent'])
            ->where('id', $id)
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    /**
     * Get order by invoice number
     */
    public function byInvoice(string $invoiceNumber): JsonResponse
    {
        $order = Order::with(['items', 'location'])
            ->where('invoice_number', $invoiceNumber)
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    /**
     * List orders with pagination
     */
    public function index(Request $request): JsonResponse
    {
        $query = Order::with(['items', 'location']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $orders = $query->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $orders,
        ]);
    }
}
