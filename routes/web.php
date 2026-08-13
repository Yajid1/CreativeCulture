<?php

use App\Http\Controllers\AiAssistantController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\RoleController;
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

Route::inertia('/ruangan-psms/indoor-stage', 'ruangan_psms/indoor-stage')->name('ruangan_psms.indoor_stage');
Route::inertia('/ruangan-psms/gedung-outdoor', 'ruangan_psms/gedung-outdoor')->name('ruangan_psms.gedung_outdoor');
Route::inertia('/ruangan-psms/studio-musik-mayang-sunda', 'ruangan_psms/studio-musik-mayang-sunda')->name('ruangan_psms.studio_musik_mayang_sunda');

Route::inertia('/ruangan-tsc/palataran', 'ruangan_tsc/palataran')->name('ruangan_tsc.palataran');
Route::inertia('/ruangan-tsc/bale-karya', 'ruangan_tsc/bale-karya')->name('ruangan_tsc.bale_karya');
Route::inertia('/ruangan-tsc/bale-alit', 'ruangan_tsc/bale-alit')->name('ruangan_tsc.bale_alit');
Route::inertia('/ruangan-tsc/bale-riung', 'ruangan_tsc/bale-riung')->name('ruangan_tsc.bale_riung');
Route::inertia('/ruangan-tsc/bale-utama', 'ruangan_tsc/bale-utama')->name('ruangan_tsc.bale_utama');
Route::inertia('/ruangan-tsc/bale-motekar', 'ruangan_tsc/bale-motekar')->name('ruangan_tsc.bale_motekar');

Route::inertia('/ruangan-kwpk/saung-padepokan', 'ruangan_kwpk/saung-padepokan')->name('ruangan_kwpk.saung_padepokan');
Route::inertia('/ruangan-kwpk/bale-puhun', 'ruangan_kwpk/bale-puhun')->name('ruangan_kwpk.bale_puhun');
Route::inertia('/ruangan-kwpk/wahana-kaulinan-lapang', 'ruangan_kwpk/wahana-kaulinan-lapang')->name('ruangan_kwpk.wahana_kaulinan_lapang');
Route::inertia('/ruangan-kwpk/kalang-amphitheater', 'ruangan_kwpk/kalang-amphitheater')->name('ruangan_kwpk.kalang_amphitheater');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'admin/dashboard')->name('dashboard');

    // Admin Fasilitas
    Route::inertia('admin/fasilitas/bch', 'admin/fasilitas/fasilitas_bch_admin')->name('admin.fasilitas.bch');
    Route::inertia('admin/fasilitas/psms', 'admin/fasilitas/fasilitas_psms_admin')->name('admin.fasilitas.psms');
    Route::inertia('admin/fasilitas/tsc', 'admin/fasilitas/fasilitas_tsc_admin')->name('admin.fasilitas.tsc');
    Route::inertia('admin/fasilitas/kwpk', 'admin/fasilitas/fasilitas_kwpk_admin')->name('admin.fasilitas.kwpk');

    // Admin Ruangan
    Route::inertia('admin/ruangan/bch', 'admin/ruangan/ruangan_bch_admin')->name('admin.ruangan.bch');
    Route::inertia('admin/ruangan/psms', 'admin/ruangan/ruangan_psms_admin')->name('admin.ruangan.psms');
    Route::inertia('admin/ruangan/tsc', 'admin/ruangan/ruangan_tsc_admin')->name('admin.ruangan.tsc');
    Route::inertia('admin/ruangan/kwpk', 'admin/ruangan/ruangan_kwpk_admin')->name('admin.ruangan.kwpk');

    // Admin Artikel & Berita
    Route::inertia('admin/artikel', 'admin/artikel-admin')->name('admin.artikel');
    Route::inertia('admin/berita', 'admin/berita-admin')->name('admin.berita');

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
