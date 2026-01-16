<?php

namespace Tests\Feature\Api;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_order_successfully()
    {
        $product = Product::factory()->create([
            'price' => 10.00,
            'stock_quantity' => 100,
            'is_available' => true,
        ]);

        $payload = [
            'customer_name' => 'Uncle Lim',
            'customer_email' => 'lim@kopitiam.sg',
            'items' => [
                [
                    'product_id' => $product->id,
                    'quantity' => 2,
                ]
            ],
            'pdpa_consent' => true,
        ];

        $response = $this->postJson('/api/v1/orders', $payload);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'order_id',
                    'invoice_number',
                    'total_amount',
                ]
            ]);

        $this->assertEquals(98, $product->fresh()->stock_quantity);
    }

    public function test_it_validates_pdpa_consent()
    {
        $payload = [
            'customer_name' => 'Test User',
            'customer_email' => 'test@example.com',
            'items' => [],
            // Missing consent
        ];

        $response = $this->postJson('/api/v1/orders', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['pdpa_consent']);
    }
}
