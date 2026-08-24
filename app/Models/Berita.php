<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Berita extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'author',
        'status',
        'published_at',
        'cover_image',
        'main_image',
        'content',
        'section3_title',
        'secondary_image',
        'section3_content',
        'gallery_images',
    ];

    protected $casts = [
        'published_at' => 'date',
        'gallery_images' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($berita) {
            if (empty($berita->slug)) {
                $berita->slug = Str::slug($berita->title);
            }
        });

        static::updating(function ($berita) {
            if ($berita->isDirty('title') && empty($berita->slug)) {
                $berita->slug = Str::slug($berita->title);
            }
        });
    }
}
