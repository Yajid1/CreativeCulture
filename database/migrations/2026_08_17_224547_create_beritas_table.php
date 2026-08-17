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
        Schema::create('beritas', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->default('Kebudayaan');
            $table->string('author')->default('Humas Kebudayaan');
            $table->enum('status', ['Published', 'Draft', 'Archived'])->default('Published');
            $table->date('published_at')->nullable();

            // Bagian 1: Sampul Berita
            $table->string('cover_image')->nullable();

            // Bagian 2: Gambar & Teks Berita Utama
            $table->string('main_image')->nullable();
            $table->longText('content')->nullable();

            // Bagian 3: Lanjutan Isian Berita (Opsional) & 8 Section Gambar
            $table->string('section3_title')->nullable();
            $table->string('secondary_image')->nullable();
            $table->longText('section3_content')->nullable();
            $table->json('gallery_images')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beritas');
    }
};
