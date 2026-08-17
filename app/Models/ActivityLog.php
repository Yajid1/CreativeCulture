<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class ActivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'user_name',
        'module',
        'action',
        'title',
        'description',
        'status',
        'link',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function log(
        string $module,
        string $action,
        string $title,
        ?string $description = null,
        string $status = 'Ready',
        ?string $link = null
    ): self {
        $user = Auth::user();

        return static::create([
            'user_id' => $user?->id,
            'user_name' => $user?->name ?? 'Super Admin',
            'module' => $module,
            'action' => $action,
            'title' => $title,
            'description' => $description,
            'status' => $status,
            'link' => $link,
        ]);
    }
}
