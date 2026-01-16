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
            $table->enum('consent_type', ['order_processing', 'marketing', 'analytics'])->default('order_processing');
            $table->string('anonymized_identifier')->unique();
            $table->text('wording_hash');
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->boolean('consent_given')->default(true);
            $table->timestamp('consented_at')->nullable();
            $table->timestamps();

            $table->index('anonymized_identifier');
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
