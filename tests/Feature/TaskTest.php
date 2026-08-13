<?php

use App\Models\Task;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

test('task index page renders with tasks and stats', function () {
    Task::factory()->count(3)->inProgress()->create();
    Task::factory()->count(2)->completed()->create();

    $response = $this->get('/admin/task');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('admin/task-admin')
        ->has('tasks', 5)
        ->has('stats')
        ->where('stats.total', 5)
        ->where('stats.in_progress', 3)
        ->where('stats.completed', 2)
    );
});

test('task can be created', function () {
    $response = $this->post('/admin/task', [
        'title' => 'Rapat Kebudayaan',
        'description' => 'Rapat koordinasi UPTD',
        'category' => 'Administrasi',
        'status' => 'in_progress',
        'task_date' => '2026-08-15',
        'task_time' => '09:00',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('tasks', [
        'title' => 'Rapat Kebudayaan',
        'status' => 'in_progress',
        'task_date' => '2026-08-15 00:00:00',
    ]);
});

test('task creation requires title and date', function () {
    $response = $this->post('/admin/task', [
        'status' => 'in_progress',
    ]);

    $response->assertSessionHasErrors(['title', 'task_date']);
});

test('task can be updated', function () {
    $task = Task::factory()->inProgress()->create();

    $response = $this->put("/admin/task/{$task->id}", [
        'title' => 'Updated Title',
        'description' => 'Updated description',
        'category' => 'Event',
        'status' => 'completed',
        'task_date' => '2026-08-20',
        'task_time' => '14:00',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('tasks', [
        'id' => $task->id,
        'title' => 'Updated Title',
        'status' => 'completed',
    ]);
});

test('task can be deleted', function () {
    $task = Task::factory()->create();

    $response = $this->delete("/admin/task/{$task->id}");

    $response->assertRedirect();
    $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
});
