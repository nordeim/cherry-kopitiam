<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'cost_price',
        'category',
        'tags',
        'image_url',
        'stock_quantity',
        'is_available',
        'is_featured',
        'spice_level',
    ];

    protected $casts = [
        'price' => 'decimal:4',
        'cost_price' => 'decimal:4',
        'stock_quantity' => 'integer',
        'is_available' => 'boolean',
        'is_featured' => 'boolean',
        'tags' => 'array',
    ];

    // Category constants
    public const CATEGORY_COFFEE = 'coffee';
    public const CATEGORY_TEA = 'tea';
    public const CATEGORY_FOOD = 'food';
    public const CATEGORY_BEVERAGE = 'beverage';

    /**
     * Relationship: Order Items
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Check if product is in stock
     */
    public function isInStock(): bool
    {
        return $this->is_available && $this->stock_quantity > 0;
    }

    /**
     * Check if product has low stock
     */
    public function isLowStock(): bool
    {
        return $this->stock_quantity > 0 && $this->stock_quantity <= 10;
    }

    /**
     * Get formatted price
     */
    public function getFormattedPriceAttribute(): string
    {
        return '$' . number_format($this->price, 2);
    }

    /**
     * Generate slug from name
     */
    public static function generateSlug(string $name): string
    {
        return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
    }
}
