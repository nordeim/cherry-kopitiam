<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pdpa_consents', function (Blueprint $table) {
            $table->id();
            $table->enum('consent_type', ['TYPE_ORDER', 'TYPE_MARKETING', 'TYPE_ANALYTICS'])->default('TYPE_ORDER');
            $table->string('anonymized_id')->unique();
            $table->text('consent_wording_hash');
            $table->string('ip_address');
            $table->string('user_agent')->nullable();
            $table->timestamps();

            $table->index('anonymized_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pdpa_consents');
    }
};
