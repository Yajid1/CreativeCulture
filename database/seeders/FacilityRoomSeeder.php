<?php

namespace Database\Seeders;

use App\Models\Facility;
use App\Models\Room;
use Illuminate\Database\Seeder;

class FacilityRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /** @var array<string, array{slug: string, rooms: array<int, array{name: string, slug: string, description: string, capacity: string}>}> $facilities */
        $facilities = [
            'Bandung Creative HUB' => [
                'slug' => 'bandung-creative-hub',
                'rooms' => [
                    ['name' => 'Basement dan Area Parkir', 'slug' => 'basement-dan-area-parkir', 'description' => 'Terletak di dasar gedung Bandung Creative Hub, area ini berfungsi utama sebagai tempat parkir kendaraan sepeda motor. Dipenuhi oleh hiasan mural seni rupa yang ekspresif, area ini menghadirkan suasana kreatif yang unik sejak awal kedatangan pengunjung.', 'capacity' => '200 Orang / Kendaraan'],
                    ['name' => 'Studio Musik', 'slug' => 'studio-musik', 'description' => 'Studio musik profesional yang dilengkapi peralatan rekaman dan soundproofing berkualitas tinggi untuk mendukung kreativitas musisi lokal.', 'capacity' => '15 Orang'],
                    ['name' => 'Exhibition Area', 'slug' => 'exhibition-area', 'description' => 'Ruang pameran serbaguna yang dirancang untuk menampilkan karya seni visual, instalasi, dan pameran temporer dari seniman lokal maupun nasional.', 'capacity' => '100 Orang'],
                    ['name' => 'Amphitheater', 'slug' => 'amphitheater', 'description' => 'Area ini merupakan pintu utama gedung Bandung Creative Hub. Amphitheater dirancang sebagai public space terbuka dengan sirkulasi optimal. Berbagai aktivitas seperti coworker, mini showcase, pertunjukan kecil, hingga diskusi kelompok dapat digelar di area dengan interior kayu dan tangga bertingkat yang ikonik ini.', 'capacity' => '100 Orang'],
                    ['name' => 'Perpustakaan', 'slug' => 'perpustakaan', 'description' => 'Perpustakaan modern dengan koleksi buku seni, desain, dan budaya yang mendukung literasi kreatif komunitas.', 'capacity' => '50 Orang'],
                    ['name' => 'Coworking Space', 'slug' => 'coworking-space', 'description' => 'Ruang kerja bersama yang nyaman dengan fasilitas Wi-Fi, stop kontak, dan meja kerja untuk para pekerja kreatif dan startup.', 'capacity' => '40 Orang'],
                    ['name' => 'Ruang Kaca', 'slug' => 'ruang-kaca', 'description' => 'Ruangan dengan dinding kaca yang memberikan pencahayaan alami, ideal untuk workshop, diskusi, dan sesi kreatif.', 'capacity' => '30 Orang'],
                    ['name' => 'Recording Studio', 'slug' => 'recording-studio', 'description' => 'Studio rekaman profesional dengan peralatan audio berkualitas tinggi untuk produksi musik, podcast, dan konten audio.', 'capacity' => '10 Orang'],
                    ['name' => 'Auditorium', 'slug' => 'auditorium', 'description' => 'Ruangan yang terletak di lantai 3 ini merupakan ruang pertemuan dengan kapasitas paling besar (150 orang) di Bandung Creative Hub. Pemanfaatan Auditorium sepaket dengan screen, projector, speaker, dan amplifier standar bioskop untuk memberikan pengalaman audio visual terbaik.', 'capacity' => '150 Orang'],
                    ['name' => 'Digital Content Studio', 'slug' => 'digital-content-studio', 'description' => 'Studio konten digital dilengkapi kamera 4K, lighting profesional, dan green screen untuk produksi konten kreatif.', 'capacity' => '15 Orang'],
                    ['name' => 'Studio Tari', 'slug' => 'studio-tari', 'description' => 'Ruang latihan tari dengan lantai kayu, cermin dinding penuh, dan sistem audio untuk mendukung latihan dan pertunjukan tari.', 'capacity' => '25 Orang'],
                    ['name' => 'Taman', 'slug' => 'taman', 'description' => 'Area taman hijau yang asri sebagai ruang publik untuk bersantai, berkumpul, dan menggelar kegiatan outdoor.', 'capacity' => '150 Orang'],
                    ['name' => 'Teleconference Room', 'slug' => 'teleconference-room', 'description' => 'Ruang telekonferensi modern dengan layar besar dan koneksi internet stabil untuk rapat virtual dan hybrid.', 'capacity' => '20 Orang'],
                    ['name' => 'Studio Jahit', 'slug' => 'studio-jahit', 'description' => 'Studio jahit yang dilengkapi mesin jahit industri dan peralatan fashion untuk pelatihan dan produksi busana.', 'capacity' => '20 Orang'],
                    ['name' => 'Studio Animasi dan Editing', 'slug' => 'studio-animasi-dan-editing', 'description' => 'Studio animasi dengan workstation berperforma tinggi dan software profesional untuk produksi animasi dan editing video.', 'capacity' => '12 Orang'],
                    ['name' => 'Studio Fashion', 'slug' => 'studio-fashion', 'description' => 'Ruang desain fashion dengan manekin, meja potong, dan peralatan desain untuk pengembangan koleksi busana.', 'capacity' => '15 Orang'],
                    ['name' => 'Aula', 'slug' => 'aula', 'description' => 'Aula serbaguna berkapasitas besar untuk acara, pertemuan, dan kegiatan komunitas kreatif.', 'capacity' => '250 Orang'],
                ],
            ],
            'Padepokan Seni Mayang Sunda' => [
                'slug' => 'padepokan-seni-mayang-sunda',
                'rooms' => [
                    ['name' => 'Indoor Stage', 'slug' => 'indoor-stage', 'description' => 'Panggung indoor untuk pertunjukan seni tradisional dan kontemporer dengan fasilitas pencahayaan dan sound system.', 'capacity' => '150 Orang'],
                    ['name' => 'Gedung Outdoor', 'slug' => 'gedung-outdoor', 'description' => 'Area pertunjukan outdoor yang luas untuk festival seni, konser, dan kegiatan budaya berskala besar.', 'capacity' => '500 Orang'],
                    ['name' => 'Studio Musik Mayang Sunda', 'slug' => 'studio-musik-mayang-sunda', 'description' => 'Studio musik khusus instrumen tradisional Sunda dengan akustik ruangan yang optimal.', 'capacity' => '20 Orang'],
                ],
            ],
            'Teras Sunda Cibiru' => [
                'slug' => 'teras-sunda-cibiru',
                'rooms' => [
                    ['name' => 'Palataran', 'slug' => 'palataran', 'description' => 'Area terbuka utama sebagai pusat kegiatan dan pertemuan komunitas dengan nuansa arsitektur Sunda.', 'capacity' => '100 Orang'],
                    ['name' => 'Bale Karya', 'slug' => 'bale-karya', 'description' => 'Ruang kreasi untuk workshop kerajinan tangan dan karya seni tradisional.', 'capacity' => '30 Orang'],
                    ['name' => 'Bale Alit', 'slug' => 'bale-alit', 'description' => 'Ruang kecil untuk diskusi intim, rapat, dan pertemuan kelompok kecil.', 'capacity' => '15 Orang'],
                    ['name' => 'Bale Riung', 'slug' => 'bale-riung', 'description' => 'Bale pertemuan untuk acara komunitas, musyawarah, dan kegiatan sosial budaya.', 'capacity' => '50 Orang'],
                    ['name' => 'Bale Utama', 'slug' => 'bale-utama', 'description' => 'Gedung utama untuk acara besar, pertunjukan seni, dan kegiatan budaya.', 'capacity' => '200 Orang'],
                    ['name' => 'Bale Motekar', 'slug' => 'bale-motekar', 'description' => 'Ruang inovasi dan eksperimen untuk pengembangan ide kreatif dan prototipe seni.', 'capacity' => '25 Orang'],
                ],
            ],
            'Kampung Wisata Pasir Kunci' => [
                'slug' => 'kampung-wisata-pasir-kunci',
                'rooms' => [
                    ['name' => 'Saung Padepokan', 'slug' => 'saung-padepokan', 'description' => 'Saung tradisional untuk latihan seni dan pertunjukan kesenian tradisional Sunda.', 'capacity' => '40 Orang'],
                    ['name' => 'Bale Puhun', 'slug' => 'bale-puhun', 'description' => 'Area terbuka di bawah naungan pohon besar untuk kegiatan edukasi alam dan budaya.', 'capacity' => '30 Orang'],
                    ['name' => 'Wahana Kaulinan Lapang', 'slug' => 'wahana-kaulinan-lapang', 'description' => 'Lapangan luas untuk permainan tradisional, olahraga, dan kegiatan outdoor komunitas.', 'capacity' => '200 Orang'],
                    ['name' => 'Kalang Amphitheater', 'slug' => 'kalang-amphitheater', 'description' => 'Amphitheater alami dengan panggung terbuka untuk pertunjukan seni dan acara budaya.', 'capacity' => '250 Orang'],
                ],
            ],
        ];

        foreach ($facilities as $facilityName => $data) {
            $facility = Facility::updateOrCreate(
                ['slug' => $data['slug']],
                ['name' => $facilityName]
            );

            foreach ($data['rooms'] as $roomData) {
                Room::updateOrCreate(
                    ['slug' => $roomData['slug']],
                    [
                        'facility_id' => $facility->id,
                        'name' => $roomData['name'],
                        'description' => $roomData['description'],
                        'capacity' => $roomData['capacity'],
                    ]
                );
            }
        }
    }
}
