<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Room;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $activitiesQuery = ActivityLog::latest();

        $page = (int) $request->input('page', 1);
        $perPage = 4; // 4 items per page as shown in screenshot

        $paginator = $activitiesQuery->paginate($perPage)->withQueryString();

        $activities = collect($paginator->items())->map(function (ActivityLog $activity) {
            return [
                'id' => $activity->id,
                'userName' => $activity->user_name,
                'module' => $activity->module,
                'action' => $activity->action,
                'title' => $activity->title,
                'description' => $activity->description ?? '',
                'status' => $activity->status,
                'link' => $activity->link ?? '#',
                'lastUpdated' => $activity->created_at ? $activity->created_at->format('n/j/Y') : now()->format('n/j/Y'),
                'created_at_human' => $activity->created_at ? $activity->created_at->diffForHumans() : 'Just now',
            ];
        });

        $quickTasks = Task::orderBy('created_at', 'desc')->get()->map(function (Task $task) {
            return [
                'id' => $task->id,
                'title' => $task->title,
                'text' => $task->title,
                'description' => $task->description ?? '',
                'category' => $task->category ?? '',
                'completed' => $task->status === 'completed',
                'status' => $task->status,
                'task_date' => $task->task_date ? $task->task_date->format('Y-m-d') : now()->format('Y-m-d'),
                'task_time' => $task->task_time ?? '',
            ];
        });

        $totalTasks = Task::count();
        $completedCount = Task::where('status', 'completed')->count();
        $taskCompletionRate = $totalTasks > 0 ? (int) round(($completedCount / $totalTasks) * 100) : 0;

        return Inertia::render('admin/dashboard', [
            'totalRooms' => Room::count(),
            'quickTasks' => $quickTasks,
            'taskCompletionRate' => $taskCompletionRate,
            'recentActivities' => [
                'data' => $activities,
                'total' => $paginator->total(),
                'currentPage' => $paginator->currentPage(),
                'lastPage' => $paginator->lastPage(),
                'perPage' => $paginator->perPage(),
                'from' => $paginator->firstItem() ?? 0,
                'to' => $paginator->lastItem() ?? 0,
            ],
        ]);
    }

    public function destroyActivity(ActivityLog $activityLog): RedirectResponse
    {
        $activityLog->delete();

        return redirect()->back()->with('success', 'Aktivitas berhasil dihapus.');
    }
}
