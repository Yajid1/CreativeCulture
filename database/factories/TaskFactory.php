<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    protected $model = Task::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'category' => fake()->randomElement(['Kebudayaan', 'Fasilitas', 'Administrasi', 'Event']),
            'status' => fake()->randomElement(['in_progress', 'completed']),
            'task_date' => fake()->dateTimeBetween('now', '+30 days'),
            'task_time' => fake()->optional(0.7)->time('H:i:s'),
        ];
    }

    /**
     * Set the task status to completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }

    /**
     * Set the task status to in_progress.
     */
    public function inProgress(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'in_progress',
        ]);
    }
}
