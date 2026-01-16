<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'slug' => $this->faker->slug(),
            'description' => $this->faker->sentence(),
            'category' => $this->faker->randomElement(['COFFEE', 'TEA', 'FOOD', 'BEVERAGE']),
            'price' => $this->faker->randomFloat(4, 1, 50),
            'stock_quantity' => $this->faker->numberBetween(0, 100),
            'is_available' => true,
            'tags' => [],
        ];
    }
}
