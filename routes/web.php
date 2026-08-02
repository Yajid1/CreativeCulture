<?php

use App\Http\Controllers\FacilityController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/fasilitas/bandung-creative-hub', [FacilityController::class, 'bandungCreativeHub'])
    ->name('facilities.bch');

Route::get('/fasilitas/padepokan-seni-mayang-sunda', [FacilityController::class, 'padepokanSeniMayangSunda'])
    ->name('facilities.psms');

Route::get('/fasilitas/teras-sunda-cibiru', [FacilityController::class, 'terasSundaCibiru'])
    ->name('facilities.tsc');

Route::get('/fasilitas/kampung-wisata-pasir-kunci', [FacilityController::class, 'kampungWisataPasirKunci'])
    ->name('facilities.kwpk');

Route::inertia('/subsektor', 'subsektor')->name('subsektor');
Route::inertia('/berita', 'berita')->name('berita');
Route::inertia('/artikel', 'artikel')->name('artikel');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
