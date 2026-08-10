<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@gmail.com',
                'description' => 'Akses kontrol penuh seluruh sistem & manajemen UPTD Kebudayaan...',
                'status' => 'Online',
                'environment' => 'Production',
                'permissions' => 'Full Access (All Menus, Create, Edit, Delete, Status Toggle)',
                'updated_at' => '2026-07-22 10:00:00',
            ],
            [
                'name' => 'Admin BCH',
                'email' => 'admin.bch@gmail.com',
                'description' => 'Pengelola fasilitas, reservasi ruangan, & program Bandung Creative Hub...',
                'status' => 'Online',
                'environment' => 'Production',
                'permissions' => 'Bandung Creative Hub (Fasilitas BCH & Ruangan BCH)',
                'updated_at' => '2026-07-22 10:00:00',
            ],
            [
                'name' => 'Admin PSMS',
                'email' => 'admin.psms@gmail.com',
                'description' => 'Pengelola fasilitas, panggung pertunjukan, & perizinan Mayang Sunda...',
                'status' => 'Online',
                'environment' => 'Staging',
                'permissions' => 'Mayang Sunda (Fasilitas PSMS & Ruangan PSMS)',
                'updated_at' => '2026-07-20 10:00:00',
            ],
            [
                'name' => 'Admin TSC',
                'email' => 'admin.tsc@gmail.com',
                'description' => 'Pengelola bale riung, amphitheater, & operasional Teras Sunda Cibiru...',
                'status' => 'Online',
                'environment' => 'Production',
                'permissions' => 'Teras Sunda Cibiru (Fasilitas TSC & Ruangan TSC)',
                'updated_at' => '2026-07-18 10:00:00',
            ],
            [
                'name' => 'Admin KWPK',
                'email' => 'admin.kwpk@gmail.com',
                'description' => 'Pengelola wahana kaulinan, saung, & edukasi Kampung Wisata Pasir Kunci...',
                'status' => 'Online',
                'environment' => 'Development',
                'permissions' => 'Kampung Wisata Pasir Kunci (Fasilitas KWPK & Ruangan KWPK)',
                'updated_at' => '2026-07-15 10:00:00',
            ],
        ];

        foreach ($roles as $roleData) {
            Role::updateOrCreate(
                ['name' => $roleData['name']],
                $roleData
            );
        }
    }
}
