<?php

use App\Http\Controllers\AiAssistantController;
use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\TaskController;
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
Route::get('/artikel', [ArtikelController::class, 'userIndex'])->name('artikel');
Route::get('/{facilityPrefix}/{roomSlug}', [RoomController::class, 'showUserRoom'])
    ->where('facilityPrefix', 'ruangan-bch|ruangan-psms|ruangan-tsc|ruangan-kwpk');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::delete('admin/activity-logs/{activityLog}', [DashboardController::class, 'destroyActivity'])->name('admin.activity_logs.destroy');

    // Admin Fasilitas
    Route::inertia('admin/fasilitas/bch', 'admin/fasilitas/fasilitas_bch_admin')->name('admin.fasilitas.bch');
    Route::inertia('admin/fasilitas/psms', 'admin/fasilitas/fasilitas_psms_admin')->name('admin.fasilitas.psms');
    Route::inertia('admin/fasilitas/tsc', 'admin/fasilitas/fasilitas_tsc_admin')->name('admin.fasilitas.tsc');
    Route::inertia('admin/fasilitas/kwpk', 'admin/fasilitas/fasilitas_kwpk_admin')->name('admin.fasilitas.kwpk');

    // Admin Ruangan CRUD
    Route::get('admin/ruangan/{facilityCode}', [RoomController::class, 'index'])->name('admin.ruangan.index');
    Route::post('admin/ruangan/{facilityCode}', [RoomController::class, 'store'])->name('admin.ruangan.store');
    Route::post('admin/ruangan/room/{room}', [RoomController::class, 'update'])->name('admin.ruangan.update');
    Route::delete('admin/ruangan/room/{room}', [RoomController::class, 'destroy'])->name('admin.ruangan.destroy');

    // Admin Artikel & Berita
    Route::get('admin/artikel', [ArtikelController::class, 'index'])->name('admin.artikel');
    Route::post('admin/artikel', [ArtikelController::class, 'store'])->name('admin.artikel.store');
    Route::post('admin/artikel/{artikel}', [ArtikelController::class, 'update'])->name('admin.artikel.update');
    Route::delete('admin/artikel/{artikel}', [ArtikelController::class, 'destroy'])->name('admin.artikel.destroy');
    Route::get('admin/berita', [BeritaController::class, 'index'])->name('admin.berita');
    Route::post('admin/berita', [BeritaController::class, 'store'])->name('admin.berita.store');
    Route::post('admin/berita/{berita}', [BeritaController::class, 'update'])->name('admin.berita.update');
    Route::delete('admin/berita/{berita}', [BeritaController::class, 'destroy'])->name('admin.berita.destroy');

    // Admin AI Assistant, Task, & Roles
    Route::inertia('admin/ai-assistant', 'admin/ai-assistant')->name('admin.ai_assistant');
    Route::post('admin/ai-assistant/chat', [AiAssistantController::class, 'chat'])->name('admin.ai_assistant.chat');
    Route::get('admin/task', [TaskController::class, 'index'])->name('admin.task');
    Route::post('admin/task', [TaskController::class, 'store'])->name('admin.task.store');
    Route::put('admin/task/{task}', [TaskController::class, 'update'])->name('admin.task.update');
    Route::delete('admin/task/{task}', [TaskController::class, 'destroy'])->name('admin.task.destroy');
    Route::get('admin/roles', [RoleController::class, 'index'])->name('admin.roles');
    Route::post('admin/roles', [RoleController::class, 'store'])->name('admin.roles.store');
    Route::put('admin/roles/{role}', [RoleController::class, 'update'])->name('admin.roles.update');
    Route::patch('admin/roles/{role}/toggle-status', [RoleController::class, 'toggleStatus'])->name('admin.roles.toggle_status');
    Route::delete('admin/roles/{role}', [RoleController::class, 'destroy'])->name('admin.roles.destroy');
});

require __DIR__.'/settings.php';
