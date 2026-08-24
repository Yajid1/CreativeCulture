<?php

namespace Database\Factories;

use App\Models\Artikel;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Artikel>
 */
class ArtikelFactory extends Factory
{
    protected $model = Artikel::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(6);

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.time(),
            'tag' => fake()->randomElement(['EDUKASI', 'HIBURAN', 'OPINI', 'BUDAYA', 'SENI']),
            'date' => strtoupper(fake()->date('d F Y')),
            'description' => fake()->paragraph(),
            'status' => fake()->randomElement(['Published', 'Draft', 'Archived']),
            'href' => '/fasilitas/bandung-creative-hub',
            'tags' => [fake()->word(), fake()->word(), fake()->word()],
            'image' => null,
            'secondary_image' => null,
            'page1_title' => $title,
            'page1_content' => [fake()->paragraph(4), fake()->paragraph(3)],
            'page2_tag' => 'DOKUMENTASI & LANJUTAN',
            'page2_title' => fake()->sentence(5),
            'page2_content' => [fake()->paragraph(4), fake()->paragraph(3)],
            'recap_title' => Str::limit($title, 30),
            'recap_badge' => fake()->randomElement(['Trending Hub', 'Edukasi', 'Opini']),
        ];
    }

    /**
     * Published state.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Published',
        ]);
    }

    /**
     * Draft state.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Draft',
        ]);
    }
}
