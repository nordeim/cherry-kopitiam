<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;

class Order extends Model
{
    protected $fillable = [
        'invoice_number',
        'customer_name',
        'customer_email',
        'customer_phone',
        'subtotal',
        'gst_amount',
        'total_amount',
        'status',
        'payment_method',
        'payment_reference',
        'location_id',
        'pdpa_consent_id',
        'notes',
    ];

    protected $casts = [
        'subtotal' => 'decimal:4',
        'gst_amount' => 'decimal:4',
        'total_amount' => 'decimal:4',
        'status' => 'string',
    ];

    // Singapore GST Rate (9%)
    private const GST_RATE = 0.09;

    // Status constants
    public const STATUS_PENDING = 'pending';
    public const STATUS_CONFIRMED = 'confirmed';
    public const STATUS_PREPARING = 'preparing';
    public const STATUS_READY = 'ready';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_CANCELLED = 'cancelled';

    // Relationship: Order Items
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    // Relationship: Location
    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    // Relationship: PDPA Consent
    public function pdpaConsent(): BelongsTo
    {
        return $this->belongsTo(PdpaConsent::class);
    }

    /**
     * Calculate GST breakdown from a subtotal.
     * IRAS compliant: GST = Total * (Rate / (1 + Rate))
     * 
     * Example: $100 subtotal
     * Total = $109.00
     * GST = $109.00 * (0.09 / 1.09) = $9.00
     * Subtotal = $109.00 - $9.00 = $100.00
     */
    public static function calculateBreakdown(float $subtotal): array
    {
        // Convert to BigDecimal for precision
        $subtotalBd = BigDecimal::of($subtotal);
        $rate = BigDecimal::of(self::GST_RATE);
        $one = BigDecimal::of(1);
      
        // Total = Subtotal * (1 + GST_RATE)
        $total = $subtotalBd->multipliedBy($one->plus($rate));
      
        // GST = Total - Subtotal (ensures backward calculation is correct)
        $gst = $total->minus($subtotalBd);
      
        return [
            'subtotal' => (float) (string) $subtotalBd->toScale(4, RoundingMode::HALF_UP),
            'gst_amount' => (float) (string) $gst->toScale(4, RoundingMode::HALF_UP),
            'total_amount' => (float) (string) $total->toScale(4, RoundingMode::HALF_UP),
        ];
    }

    /**
     * Generate unique invoice number
     */
    public static function generateInvoiceNumber(): string
    {
        $date = now()->format('Ymd');
        $random = strtoupper(substr(md5(uniqid()), 0, 6));
        return "MBC-{$date}-{$random}";
    }

    /**
     * Boot method to auto-generate invoice number
     */
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Order $order) {
            if (empty($order->invoice_number)) {
                $order->invoice_number = self::generateInvoiceNumber();
            }
        });
    }
}
