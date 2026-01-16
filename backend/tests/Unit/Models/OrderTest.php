<?php

namespace Tests\Unit\Models;

use App\Models\Order;
use Tests\TestCase;

class OrderTest extends TestCase
{
    public function test_it_calculates_gst_correctly_inclusive()
    {
        // $109.00 total should mean $9.00 GST and $100.00 subtotal
        $breakdown = Order::calculateBreakdown(100.00);

        $this->assertEquals(100.00, $breakdown['subtotal']);
        $this->assertEquals(9.00, $breakdown['gst_amount']);
        $this->assertEquals(109.00, $breakdown['total_amount']);
    }

    public function test_it_generates_unique_invoice_numbers()
    {
        $invoice1 = Order::generateInvoiceNumber();
        $invoice2 = Order::generateInvoiceNumber();

        $this->assertStringStartsWith('MBC-', $invoice1);
        $this->assertNotEquals($invoice1, $invoice2);
    }
}
