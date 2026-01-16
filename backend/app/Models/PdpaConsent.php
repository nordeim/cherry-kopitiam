<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PdpaConsent extends Model
{
    protected $fillable = [
        'consent_type',
        'anonymized_identifier',
        'ip_address',
        'user_agent',
        'wording_hash',
        'consent_given',
        'consented_at',
    ];

    protected $casts = [
        'consent_given' => 'boolean',
        'consented_at' => 'datetime',
    ];

    // Consent types
    public const TYPE_ORDER = 'order_processing';
    public const TYPE_MARKETING = 'marketing';
    public const TYPE_ANALYTICS = 'analytics';

    /**
     * Relationship: Orders
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Hash the consent wording for audit trail
     */
    public static function hashWording(string $wording): string
    {
        return hash('sha256', $wording);
    }

    /**
     * Generate anonymized identifier from email/IP
     */
    public static function generateAnonymizedId(string $email, string $ip): string
    {
        $salt = config('app.key');
        $combined = $email . $ip . $salt;
        return hash('sha256', $combined);
    }

    /**
     * Record consent with full audit trail
     */
    public static function recordConsent(
        string $email,
        string $consentType,
        string $wording,
        string $ipAddress,
        string $userAgent
    ): self {
        return static::create([
            'consent_type' => $consentType,
            'anonymized_identifier' => static::generateAnonymizedId($email, $ipAddress),
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
            'wording_hash' => static::hashWording($wording),
            'consent_given' => true,
            'consented_at' => now(),
        ]);
    }
}
