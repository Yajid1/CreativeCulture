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
Route::inertia('/ruangan-bch/basement-dan-area-parkir', 'ruangan_bch/basement-dan-area-parkir')->name('ruangan_bch.basement_dan_area_parkir');
Route::inertia('/ruangan-bch/studio-musik', 'ruangan_bch/studio-musik')->name('ruangan_bch.studio_musik');
Route::inertia('/ruangan-bch/exhibition-area', 'ruangan_bch/exhibition-area')->name('ruangan_bch.exhibition_area');
Route::inertia('/ruangan-bch/amphitheater', 'ruangan_bch/amphitheater')->name('ruangan_bch.amphitheater');
Route::inertia('/ruangan-bch/perpustakaan', 'ruangan_bch/perpustakaan')->name('ruangan_bch.perpustakaan');
Route::inertia('/ruangan-bch/coworking-space', 'ruangan_bch/coworking-space')->name('ruangan_bch.coworking_space');
Route::inertia('/ruangan-bch/ruang-kaca', 'ruangan_bch/ruang-kaca')->name('ruangan_bch.ruang_kaca');
Route::inertia('/ruangan-bch/recording-studio', 'ruangan_bch/recording-studio')->name('ruangan_bch.recording_studio');
Route::inertia('/ruangan-bch/auditorium', 'ruangan_bch/auditorium')->name('ruangan_bch.auditorium');
Route::inertia('/ruangan-bch/digital-content-studio', 'ruangan_bch/digital-content-studio')->name('ruangan_bch.digital_content_studio');
Route::inertia('/ruangan-bch/studio-tari', 'ruangan_bch/studio-tari')->name('ruangan_bch.studio_tari');
Route::inertia('/ruangan-bch/taman', 'ruangan_bch/taman')->name('ruangan_bch.taman');
Route::inertia('/ruangan-bch/teleconference-room', 'ruangan_bch/teleconference-room')->name('ruangan_bch.teleconference_room');
Route::inertia('/ruangan-bch/studio-jahit', 'ruangan_bch/studio-jahit')->name('ruangan_bch.studio_jahit');
Route::inertia('/ruangan-bch/studio-animasi-dan-editing', 'ruangan_bch/studio-animasi-dan-editing')->name('ruangan_bch.studio_animasi_dan_editing');
Route::inertia('/ruangan-bch/studio-fashion', 'ruangan_bch/studio-fashion')->name('ruangan_bch.studio_fashion');
Route::inertia('/ruangan-bch/aula', 'ruangan_bch/aula')->name('ruangan_bch.aula');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
