<?php

use App\Models\Facility;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);

    $this->facility = Facility::factory()->create([
        'name' => 'Bandung Creative HUB',
        'slug' => 'bandung-creative-hub',
    ]);
});

test('room index page renders with facility rooms and stats', function () {
    Room::factory()->create([
        'facility_id' => $this->facility->id,
        'name' => 'Amphitheater',
        'status' => 'Ready',
    ]);

    $response = $this->get('/admin/ruangan/bch');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/ruangan/index')
        ->has('rooms')
        ->has('stats')
        ->where('facility.code', 'bch')
    );
});

test('room can be created with image upload', function () {
    Storage::fake('public');

    $image = UploadedFile::fake()->image('room.jpg');

    $response = $this->post('/admin/ruangan/bch', [
        'name' => 'Studio Foto Baru',
        'slug' => 'studio-foto-baru',
        'description' => 'Deskripsi studio foto',
        'capacity' => '25 Orang',
        'image' => $image,
        'status' => 'Ready',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('rooms', [
        'name' => 'Studio Foto Baru',
        'slug' => 'studio-foto-baru',
        'capacity' => '25 Orang',
        'status' => 'Ready',
    ]);
});

test('room can be updated', function () {
    $room = Room::factory()->create([
        'facility_id' => $this->facility->id,
        'name' => 'Old Room Name',
        'slug' => 'old-room-name',
        'status' => 'Ready',
    ]);

    $response = $this->post("/admin/ruangan/room/{$room->id}", [
        'name' => 'Updated Room Name',
        'slug' => 'updated-room-name',
        'description' => 'Updated description text',
        'capacity' => '50 Orang',
        'status' => 'In Progress',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('rooms', [
        'id' => $room->id,
        'name' => 'Updated Room Name',
        'status' => 'In Progress',
    ]);
});

test('room can be deleted', function () {
    $room = Room::factory()->create([
        'facility_id' => $this->facility->id,
    ]);

    $response = $this->delete("/admin/ruangan/room/{$room->id}");

    $response->assertRedirect();
    $this->assertDatabaseMissing('rooms', ['id' => $room->id]);
});

test('user facing room page renders dynamic database data', function () {
    $room = Room::factory()->create([
        'facility_id' => $this->facility->id,
        'name' => 'Amphitheater (Lt.1)',
        'slug' => 'amphitheater',
        'description' => 'Updated dynamic description from admin',
        'capacity' => '150 Orang',
        'section2_title' => 'Title Section 2 Dynamic',
        'section2_description' => 'Desc Section 2 Dynamic',
        'facilities_list' => "Fasilitas 1\nFasilitas 2",
        'status' => 'Ready',
    ]);

    $response = $this->get('/ruangan-bch/amphitheater');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('ruangan_bch/amphitheater')
        ->has('room')
        ->where('room.name', 'Amphitheater (Lt.1)')
        ->where('room.description', 'Updated dynamic description from admin')
        ->where('room.capacity', '150 Orang')
        ->where('room.section2_title', 'Title Section 2 Dynamic')
    );
});

test('room image can be deleted via update form', function () {
    Storage::fake('public');

    $file = UploadedFile::fake()->image('test.jpg');
    $path = $file->store('rooms', 'public');

    $room = Room::factory()->create([
        'facility_id' => $this->facility->id,
        'name' => 'Room With Image',
        'slug' => 'room-with-image',
        'image' => $path,
        'status' => 'Ready',
    ]);

    Storage::disk('public')->assertExists($path);

    $response = $this->post("/admin/ruangan/room/{$room->id}", [
        'name' => 'Room With Image',
        'slug' => 'room-with-image',
        'status' => 'Ready',
        'delete_image' => true,
    ]);

    $response->assertRedirect();
    Storage::disk('public')->assertMissing($path);
    $this->assertDatabaseHas('rooms', [
        'id' => $room->id,
        'image' => null,
    ]);
});

test('room gallery images can be uploaded and deleted', function () {
    Storage::fake('public');

    $galleryImage1 = UploadedFile::fake()->image('gallery1.jpg');
    $galleryImage2 = UploadedFile::fake()->image('gallery2.jpg');

    $room = Room::factory()->create([
        'facility_id' => $this->facility->id,
        'name' => 'Gallery Room',
        'slug' => 'gallery-room',
        'status' => 'Ready',
    ]);

    // Upload gallery images to slot 0 and slot 2
    $response = $this->post("/admin/ruangan/room/{$room->id}", [
        'name' => 'Gallery Room',
        'slug' => 'gallery-room',
        'status' => 'Ready',
        'gallery_images' => [
            0 => $galleryImage1,
            2 => $galleryImage2,
        ],
    ]);

    $response->assertRedirect();
    $room->refresh();
    expect($room->gallery_images)->toBeArray();
    expect($room->gallery_images[0])->not->toBeNull();
    expect($room->gallery_images[2])->not->toBeNull();

    $uploadedPath = $room->gallery_images[0];
    Storage::disk('public')->assertExists($uploadedPath);

    // Delete gallery image at slot 0
    $responseDelete = $this->post("/admin/ruangan/room/{$room->id}", [
        'name' => 'Gallery Room',
        'slug' => 'gallery-room',
        'status' => 'Ready',
        'delete_gallery_images' => [
            0 => true,
        ],
    ]);

    $responseDelete->assertRedirect();
    $room->refresh();
    expect($room->gallery_images[0])->toBeNull();
    Storage::disk('public')->assertMissing($uploadedPath);
});
