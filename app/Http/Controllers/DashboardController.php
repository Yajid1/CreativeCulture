<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Artikel;
use App\Models\Berita;
use App\Models\Room;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $selectedMonth = $request->input('month', 'this-month');
        $now = Carbon::now();

        if ($selectedMonth === 'all') {
            $year = null;
            $month = null;
            $selectedMonthKey = 'all';
            $selectedMonthLabel = 'Semua Waktu (All Time)';
        } elseif ($selectedMonth === 'this-month') {
            $year = (int) $now->year;
            $month = (int) $now->month;
            $selectedMonthKey = $now->format('Y-m');
            $selectedMonthLabel = 'This Month ('.$now->format('M Y').')';
        } else {
            try {
                $parsedDate = Carbon::createFromFormat('Y-m', $selectedMonth);
                $year = (int) $parsedDate->year;
                $month = (int) $parsedDate->month;
                $selectedMonthKey = $parsedDate->format('Y-m');
                $selectedMonthLabel = $parsedDate->format('F Y');
            } catch (\Exception $e) {
                $year = (int) $now->year;
                $month = (int) $now->month;
                $selectedMonthKey = $now->format('Y-m');
                $selectedMonthLabel = 'This Month ('.$now->format('M Y').')';
            }
        }

        // 1. Activities Query filtered by selected month
        $activitiesQuery = ActivityLog::latest();
        if ($selectedMonthKey !== 'all') {
            $activitiesQuery->whereYear('created_at', $year)->whereMonth('created_at', $month);
        }

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

        // 2. Tasks Query filtered by selected month
        $tasksQuery = Task::orderBy('task_date', 'asc')->orderBy('created_at', 'desc');
        if ($selectedMonthKey !== 'all') {
            $tasksQuery->where(function ($q) use ($year, $month) {
                $q->where(function ($sub) use ($year, $month) {
                    $sub->whereNotNull('task_date')
                        ->whereYear('task_date', $year)
                        ->whereMonth('task_date', $month);
                })->orWhere(function ($sub) use ($year, $month) {
                    $sub->whereNull('task_date')
                        ->whereYear('created_at', $year)
                        ->whereMonth('created_at', $month);
                });
            });
        }

        $monthlyTasks = $tasksQuery->get();

        $quickTasks = $monthlyTasks->map(function (Task $task) {
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

        $totalTasks = $monthlyTasks->count();
        $completedCount = $monthlyTasks->where('status', 'completed')->count();
        $taskCompletionRate = $totalTasks > 0 ? (int) round(($completedCount / $totalTasks) * 100) : 0;

        // 3. Articles & News count
        $artikelsQuery = Artikel::query();
        $beritasQuery = Berita::query();

        if ($selectedMonthKey !== 'all') {
            $artikelsQuery->whereYear('created_at', $year)->whereMonth('created_at', $month);
            $beritasQuery->where(function ($q) use ($year, $month) {
                $q->where(function ($sub) use ($year, $month) {
                    $sub->whereNotNull('published_at')
                        ->whereYear('published_at', $year)
                        ->whereMonth('published_at', $month);
                })->orWhere(function ($sub) use ($year, $month) {
                    $sub->whereNull('published_at')
                        ->whereYear('created_at', $year)
                        ->whereMonth('created_at', $month);
                });
            });
        }

        $totalArtikels = $artikelsQuery->count();
        $totalBeritas = $beritasQuery->count();

        // 4. Collect months with data
        $activityMonths = ActivityLog::pluck('created_at')->map(fn ($d) => $d ? Carbon::parse($d)->format('Y-m') : null);
        $taskMonths = Task::pluck('task_date')->map(fn ($d) => $d ? Carbon::parse($d)->format('Y-m') : null);
        $availableMonths = $activityMonths->merge($taskMonths)
            ->push($now->format('Y-m'))
            ->filter()
            ->unique()
            ->sortDesc()
            ->values()
            ->toArray();

        return Inertia::render('admin/dashboard', [
            'totalRooms' => Room::count(),
            'totalArtikels' => $totalArtikels,
            'totalBeritas' => $totalBeritas,
            'quickTasks' => $quickTasks,
            'taskCompletionRate' => $taskCompletionRate,
            'selectedMonth' => $selectedMonthKey,
            'selectedMonthLabel' => $selectedMonthLabel,
            'availableMonths' => $availableMonths,
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
