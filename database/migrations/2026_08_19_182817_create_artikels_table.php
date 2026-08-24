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
        Schema::create('artikels', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('tag')->default('EDUKASI');
            $table->string('date')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['Published', 'Draft', 'Archived'])->default('Published');
            $table->string('href')->nullable();
            $table->json('tags')->nullable();

            // Gambar
            $table->string('image')->nullable();
            $table->string('secondary_image')->nullable();

            // Halaman 1 (Sisi Kiri)
            $table->string('page1_title')->nullable();
            $table->json('page1_content')->nullable();

            // Halaman 2 (Sisi Kanan)
            $table->string('page2_tag')->nullable();
            $table->string('page2_title')->nullable();
            $table->json('page2_content')->nullable();

            // Recap / Badge
            $table->string('recap_title')->nullable();
            $table->string('recap_badge')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artikels');
    }
};
