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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->enum('category', ['COFFEE', 'TEA', 'FOOD', 'BEVERAGE'])->default('COFFEE');
            $table->decimal('price', 10, 4);
            $table->decimal('cost_price', 10, 4)->nullable();
            $table->integer('stock')->default(0);
            $table->integer('reorder_level')->default(10);
            $table->boolean('is_available')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->json('tags')->nullable();
            $table->string('image_url')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('category');
            $table->index('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
