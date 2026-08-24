<?php

namespace App\Models;

use Database\Factories\RoomFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $facility_id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property string|null $capacity
 * @property string|null $image
 * @property string|null $section2_title
 * @property string|null $section2_description
 * @property string|null $facilities_list
 * @property string|null $secondary_image
 * @property string $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Facility $facility
 */
class Room extends Model
{
    /** @use HasFactory<RoomFactory> */
    use HasFactory;

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'facility_id',
        'name',
        'slug',
        'description',
        'capacity',
        'image',
        'section2_title',
        'section2_description',
        'facilities_list',
        'secondary_image',
        'gallery_images',
        'status',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'gallery_images' => 'array',
    ];

    /**
     * @return BelongsTo<Facility, $this>
     */
    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }
}
