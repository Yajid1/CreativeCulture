<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Artikel extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'tag',
        'date',
        'description',
        'status',
        'href',
        'tags',
        'image',
        'secondary_image',
        'page1_title',
        'page1_content',
        'page2_tag',
        'page2_title',
        'page2_content',
        'recap_title',
        'recap_badge',
    ];

    protected $casts = [
        'tags' => 'array',
        'page1_content' => 'array',
        'page2_content' => 'array',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Artikel $artikel) {
            if (empty($artikel->slug)) {
                $artikel->slug = Str::slug($artikel->title).'-'.time();
            }
        });

        static::updating(function (Artikel $artikel) {
            if ($artikel->isDirty('title') && empty($artikel->slug)) {
                $artikel->slug = Str::slug($artikel->title).'-'.time();
            }
        });
    }
}
