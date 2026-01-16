<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * List all available products
     */
    public function index(Request $request): JsonResponse
    {
        $query = Product::where('is_available', true);

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('featured')) {
            $query->where('is_featured', $request->boolean('featured'));
        }

        $products = $query->orderBy('category')
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $products,
        ]);
    }

    /**
     * Get product by ID
     */
    public function show(string $id): JsonResponse
    {
        $product = Product::where('is_available', true)
            ->find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $product,
        ]);
    }

    /**
     * Get products by category
     */
    public function byCategory(string $category): JsonResponse
    {
        $products = Product::where('category', $category)
            ->where('is_available', true)
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $products,
            'category' => $category,
        ]);
    }
}
