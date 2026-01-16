<?php

namespace Tests\Unit\Services;

use App\Models\Product;
use App\Services\InventoryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class InventoryServiceTest extends TestCase
{
    use RefreshDatabase;

    private InventoryService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new InventoryService();
    }

    public function test_it_reserves_stock_successfully()
    {
        $product = Product::factory()->create([
            'stock_quantity' => 10,
            'is_available' => true,
        ]);

        $items = [
            [
                'product_id' => $product->id,
                'quantity' => 2,
            ]
        ];

        $result = $this->service->reserveStock($items);

        $this->assertTrue($result['success']);
        $this->assertCount(1, $result['reserved']);
        $this->assertEquals(8, $product->fresh()->stock_quantity);
    }

    public function test_it_prevents_overselling()
    {
        $product = Product::factory()->create([
            'stock_quantity' => 1,
            'is_available' => true,
        ]);

        $items = [
            [
                'product_id' => $product->id,
                'quantity' => 2,
            ]
        ];

        try {
            $this->service->reserveStock($items);
            $this->fail('Should have thrown exception');
        } catch (\RuntimeException $e) {
            $this->assertEquals('Inventory reservation failed', $e->getMessage());
        }

        $this->assertEquals(1, $product->fresh()->stock_quantity);
    }

    public function test_it_releases_stock()
    {
        $product = Product::factory()->create([
            'stock_quantity' => 10,
        ]);

        $items = [
            [
                'product_id' => $product->id,
                'quantity' => 5,
            ]
        ];

        $this->service->releaseStock($items);

        $this->assertEquals(15, $product->fresh()->stock_quantity);
    }
}
