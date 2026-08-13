<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    /**
     * Display the task & calendar page with all tasks.
     */
    public function index(Request $request): Response
    {
        $tasks = Task::orderBy('task_date', 'asc')
            ->orderBy('task_time', 'asc')
            ->get()
            ->map(fn (Task $task) => [
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description ?? '',
                'category' => $task->category ?? '',
                'status' => $task->status,
                'task_date' => $task->task_date->format('Y-m-d'),
                'task_time' => $task->task_time,
                'created_at' => $task->created_at?->format('d M Y H:i'),
            ]);

        $stats = [
            'total' => Task::count(),
            'in_progress' => Task::where('status', 'in_progress')->count(),
            'completed' => Task::where('status', 'completed')->count(),
        ];

        return Inertia::render('admin/task-admin', [
            'tasks' => $tasks,
            'stats' => $stats,
        ]);
    }

    /**
     * Store a newly created task.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'in:in_progress,completed'],
            'task_date' => ['required', 'date'],
            'task_time' => ['nullable', 'date_format:H:i'],
        ]);

        Task::create($validated);

        return redirect()->back()->with('success', 'Task berhasil dibuat.');
    }

    /**
     * Update the specified task.
     */
    public function update(Request $request, Task $task): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'in:in_progress,completed'],
            'task_date' => ['required', 'date'],
            'task_time' => ['nullable', 'date_format:H:i'],
        ]);

        $task->update($validated);

        return redirect()->back()->with('success', 'Task berhasil diperbarui.');
    }

    /**
     * Remove the specified task.
     */
    public function destroy(Task $task): RedirectResponse
    {
        $name = $task->title;
        $task->delete();

        return redirect()->back()->with('success', "Task \"{$name}\" berhasil dihapus.");
    }
}
