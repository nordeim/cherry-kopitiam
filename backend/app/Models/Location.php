<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Location extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'address',
        'features',
        'operating_hours',
        'image_url',
        'is_active',
    ];

    protected $casts = [
        'features' => 'array',
        'operating_hours' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Relationship: Orders
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Scope a query to only include active locations.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
