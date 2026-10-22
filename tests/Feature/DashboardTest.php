<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/dashboard')
        ->has('selectedMonth')
        ->has('selectedMonthLabel')
        ->has('totalRooms')
        ->has('totalArtikels')
        ->has('totalBeritas')
        ->has('quickTasks')
        ->has('recentActivities')
    );
});

test('dashboard filters data by specific month and all time', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    // Test specific month
    $responseSpecific = $this->get(route('dashboard', ['month' => '2026-08']));
    $responseSpecific->assertOk();
    $responseSpecific->assertInertia(fn ($page) => $page
        ->where('selectedMonth', '2026-08')
        ->where('selectedMonthLabel', 'August 2026')
    );

    // Test all time
    $responseAll = $this->get(route('dashboard', ['month' => 'all']));
    $responseAll->assertOk();
    $responseAll->assertInertia(fn ($page) => $page
        ->where('selectedMonth', 'all')
        ->where('selectedMonthLabel', 'Semua Waktu (All Time)')
    );
});
