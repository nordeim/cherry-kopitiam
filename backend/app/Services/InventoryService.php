<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class InventoryService
{
    /**
     * Reserve stock for products in a transaction.
     * Uses PESSIMISTIC LOCKING to prevent overselling.
     */
    public function reserveStock(array $items): array
    {
        $results = [];
        $errors = [];

        DB::transaction(function () use (&$results, &$errors, $items) {
            foreach ($items as $item) {
                // LOCK the row for update - prevents race conditions
                $product = Product::where('id', $item['product_id'])
                    ->lockForUpdate()
                    ->first();

                if (!$product) {
                    $errors[] = "Product not found: {$item['product_id']}";
                    continue;
                }

                if (!$product->is_available) {
                    $errors[] = "Product not available: {$product->name}";
                    continue;
                }

                if ($product->stock_quantity < $item['quantity']) {
                    $errors[] = "Insufficient stock for: {$product->name}";
                    continue;
                }

                // Decrement stock
                $product->decrement('stock_quantity', $item['quantity']);

                $results[] = [
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'quantity_reserved' => $item['quantity'],
                    'remaining_stock' => $product->stock_quantity,
                ];
            }

            // If any errors, rollback the transaction
            if (!empty($errors)) {
                throw new RuntimeException('Inventory reservation failed');
            }
        });

        return [
            'success' => empty($errors),
            'reserved' => $results,
            'errors' => $errors,
        ];
    }

    /**
     * Release reserved stock (for cancelled orders)
     */
    public function releaseStock(array $items): void
    {
        DB::transaction(function () use ($items) {
            foreach ($items as $item) {
                Product::where('id', $item['product_id'])
                    ->increment('stock_quantity', $item['quantity']);
            }
        });
    }

    /**
     * Check availability for multiple products
     */
    public function checkAvailability(array $items): array
    {
        $unavailable = [];

        foreach ($items as $item) {
            $product = Product::where('id', $item['product_id'])
                ->where('is_available', true)
                ->first();

            if (!$product || $product->stock_quantity < $item['quantity']) {
                $unavailable[] = $item['product_id'];
            }
        }

        return [
            'available' => empty($unavailable),
            'unavailable' => $unavailable,
        ];
    }
}
