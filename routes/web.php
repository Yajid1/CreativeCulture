<?php

use App\Http\Controllers\FacilityController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/fasilitas/bandung-creative-hub', [FacilityController::class, 'bandungCreativeHub'])
    ->name('facilities.bch');

Route::inertia('/subsektor', 'subsektor')->name('subsektor');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
