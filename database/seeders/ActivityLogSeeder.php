<?php

namespace Database\Seeders;

use App\Models\ActivityLog;
use Illuminate\Database\Seeder;

class ActivityLogSeeder extends Seeder
{
    public function run(): void
    {
        if (ActivityLog::count() > 0) {
            return;
        }

        $activities = [
            [
                'user_name' => 'Super Admin',
                'module' => 'Fasilitas',
                'action' => 'Created',
                'title' => 'Penambahan Gedung Baru Teras Sunda',
                'description' => 'Penyelesaian renovasi & penambahan fasilitas sanggar seni...',
                'status' => 'Ready',
                'link' => '/admin/fasilitas/tsc',
                'created_at' => now()->subHours(2),
            ],
            [
                'user_name' => 'Admin PSMS',
                'module' => 'Ruangan',
                'action' => 'Updated',
                'title' => 'Pembaruan Data Ruangan Teater Mayang Sunda',
                'description' => 'Pembaruan kapasitas, fasilitas pencahayaan & galeri foto...',
                'status' => 'In Progress',
                'link' => '/admin/ruangan/psms',
                'created_at' => now()->subHours(5),
            ],
            [
                'user_name' => 'Super Admin',
                'module' => 'Artikel',
                'action' => 'Created',
                'title' => 'Publikasi Artikel Kebudayaan Bandung',
                'description' => 'Dokumentasi sejarah seni tari daerah & kearifan lokal...',
                'status' => 'Ready',
                'link' => '/admin/artikel',
                'created_at' => now()->subHours(8),
            ],
            [
                'user_name' => 'Super Admin',
                'module' => 'Berita',
                'action' => 'Created',
                'title' => 'Rilis Berita Festival Seni & Budaya 2026',
                'description' => 'Liputan pers persiapan penyelenggaraan event tahunan...',
                'status' => 'Ready',
                'link' => '/admin/berita',
                'created_at' => now()->subDay(),
            ],
            [
                'user_name' => 'Admin BCH',
                'module' => 'Ruangan',
                'action' => 'Updated',
                'title' => 'Pembaruan Foto Galeri Amphitheater (Lt.1)',
                'description' => 'Menambahkan 8 foto galeri baru di area publik BCH',
                'status' => 'Ready',
                'link' => '/admin/ruangan/bch',
                'created_at' => now()->subDays(2),
            ],
            [
                'user_name' => 'Super Admin',
                'module' => 'Task',
                'action' => 'Created',
                'title' => 'Penambahan Tugas: Monitoring Pemeliharaan AC BCH',
                'description' => 'Tugas pemeriksaan rutin unit pendingin ruangan',
                'status' => 'In Progress',
                'link' => '/admin/task',
                'created_at' => now()->subDays(3),
            ],
        ];

        foreach ($activities as $act) {
            ActivityLog::create($act);
        }
    }
}
