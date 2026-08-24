<?php

namespace App\Http\Middleware;

use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'recentNotifications' => ActivityLog::latest()
                ->take(5)
                ->get()
                ->map(function ($log) {
                    return [
                        'id' => $log->id,
                        'userName' => $log->user_name ?? ($log->user ? $log->user->name : 'Super Admin'),
                        'action' => $log->action,
                        'title' => $log->title,
                        'description' => $log->description,
                        'module' => $log->module,
                        'link' => $log->link,
                        'created_at_human' => $log->created_at ? $log->created_at->diffForHumans() : 'Baru saja',
                    ];
                }),
        ];
    }
}
