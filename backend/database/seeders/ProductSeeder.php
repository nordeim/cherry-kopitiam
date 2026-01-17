<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Traditional Kopi',
                'slug' => 'kopi',
                'description' => 'Strong coffee brewed with margarine and sugar, served with evaporated milk — the authentic Singaporean way.',
                'price' => 3.50,
                'category' => 'COFFEE',
                'stock_quantity' => 100,
                'tags' => ['House Specialty'],
            ],
            [
                'name' => 'Kopi-C',
                'slug' => 'kopi-c',
                'description' => 'Coffee with evaporated milk and sugar. Creamy, sweet, and perfectly balanced for your morning ritual.',
                'price' => 3.20,
                'category' => 'COFFEE',
                'stock_quantity' => 85,
                'tags' => ['Best Seller'],
            ],
            [
                'name' => 'Kopi-O',
                'slug' => 'kopi-o',
                'description' => 'Strong black coffee with sugar. Bold, intense, and unapologetically Singaporean.',
                'price' => 3.00,
                'category' => 'COFFEE',
                'stock_quantity' => 90,
                'tags' => ['Authentic'],
            ],
            [
                'name' => 'Teh Tarik',
                'slug' => 'teh-tarik',
                'description' => 'Pulled tea with condensed milk. Smooth, creamy, and served with that signature frothy top.',
                'price' => 3.20,
                'category' => 'TEA',
                'stock_quantity' => 120,
                'tags' => ['Malaysian Heritage'],
            ],
            [
                'name' => 'Kaya Toast Set',
                'slug' => 'kaya-toast',
                'description' => 'Crispy toast with house-made coconut jam and butter. Served with soft-boiled eggs and your choice of kopi.',
                'price' => 5.50,
                'category' => 'FOOD',
                'stock_quantity' => 50,
                'tags' => ['Breakfast Classic'],
            ],
            [
                'name' => 'Roti Prata',
                'slug' => 'roti-prata',
                'description' => 'Flaky, crispy flatbread served with curry dipping sauce. The perfect pairing with any hot beverage.',
                'price' => 5.00,
                'category' => 'FOOD',
                'stock_quantity' => 60,
                'tags' => ['Indian Influence'],
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
