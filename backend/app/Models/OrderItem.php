<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'quantity',
        'unit_price',
        'subtotal',
    ];

    protected $casts = [
        'unit_price' => 'decimal:4',
        'subtotal' => 'decimal:4',
        'quantity' => 'integer',
    ];

    // Relationship: Order
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    // Relationship: Product
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Calculate subtotal for this item
     */
    public static function calculateSubtotal(float $unitPrice, int $quantity): float
    {
        return round($unitPrice * $quantity, 4);
    }
}
