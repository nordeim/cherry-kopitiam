<?php

use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\LocationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Health check
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Public routes
Route::prefix('v1')->group(function () {
    // Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::get('/products/category/{category}', [ProductController::class, 'byCategory']);
  
    // Locations
    Route::get('/locations', [LocationController::class, 'index']);
    Route::get('/locations/{id}', [LocationController::class, 'show']);
  
    // Orders - Public (for order lookup)
    Route::get('/orders/invoice/{invoiceNumber}', [OrderController::class, 'byInvoice']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
  
    // Create order (public endpoint)
    Route::post('/orders', [OrderController::class, 'store']);
});

// Protected routes (require authentication)
Route::prefix('v1/admin')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/orders', [OrderController::class, 'index']);
});
