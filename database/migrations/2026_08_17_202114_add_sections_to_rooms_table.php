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
        Schema::table('rooms', function (Blueprint $table) {
            $table->string('section2_title')->nullable()->after('image');
            $table->text('section2_description')->nullable()->after('section2_title');
            $table->text('facilities_list')->nullable()->after('section2_description');
            $table->string('secondary_image')->nullable()->after('facilities_list');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rooms', function (Blueprint $table) {
            $table->dropColumn([
                'section2_title',
                'section2_description',
                'facilities_list',
                'secondary_image',
            ]);
        });
    }
};
