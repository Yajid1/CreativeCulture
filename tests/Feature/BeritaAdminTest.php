<?php

use App\Models\Berita;
use App\Models\User;

test('admin can access berita index page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('admin.berita'));

    $response->assertStatus(200);
});

test('admin can create a new berita', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('admin.berita.store'), [
        'title' => 'Festival Seni Bandung 2026',
        'category' => 'Kebudayaan',
        'author' => 'Humas UPTD',
        'status' => 'Published',
        'published_at' => '2026-08-18',
        'content' => 'Isi berita utama mengenai festival...',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('beritas', [
        'title' => 'Festival Seni Bandung 2026',
        'status' => 'Published',
    ]);
});

test('admin can update an existing berita', function () {
    $user = User::factory()->create();
    $berita = Berita::create([
        'title' => 'Judul Lama',
        'category' => 'Kebudayaan',
        'author' => 'Humas',
        'status' => 'Draft',
        'published_at' => '2026-08-18',
        'content' => 'Isi lama',
    ]);

    $response = $this->actingAs($user)->post(route('admin.berita.update', $berita), [
        'title' => 'Judul Baru Diperbarui',
        'category' => 'Edukasi',
        'author' => 'Humas Baru',
        'status' => 'Published',
        'published_at' => '2026-08-18',
        'content' => 'Isi baru',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('beritas', [
        'id' => $berita->id,
        'title' => 'Judul Baru Diperbarui',
        'status' => 'Published',
    ]);
});

test('admin can delete a berita', function () {
    $user = User::factory()->create();
    $berita = Berita::create([
        'title' => 'Berita Dihapus',
        'category' => 'Kebudayaan',
        'author' => 'Humas',
        'status' => 'Draft',
        'published_at' => '2026-08-18',
    ]);

    $response = $this->actingAs($user)->delete(route('admin.berita.destroy', $berita));

    $response->assertRedirect();
    $this->assertDatabaseMissing('beritas', [
        'id' => $berita->id,
    ]);
});
