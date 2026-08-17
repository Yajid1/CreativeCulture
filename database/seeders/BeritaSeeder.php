<?php

namespace Database\Seeders;

use App\Models\Berita;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BeritaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = [
            [
                'title' => 'Kabar Kebudayaan Bandung',
                'slug' => 'kabar-kebudayaan-bandung',
                'category' => 'Kabar Kebudayaan',
                'author' => 'Humas Kebudayaan',
                'status' => 'Published',
                'published_at' => '2024-08-18',
                'cover_image' => '/storage/beritas/kabar-kebudayaan-bandung.png',
                'main_image' => '/storage/beritas/kabar-kebudayaan-bandung.png',
                'content' => 'Majalah Seni & Budaya Priangan Edisi Ke-3 (Vol. II / 2024) menyajikan khazanah seni tradisi Jawa Barat yang kaya dan memikat. Melalui terbitan ini, masyarakat diajak menyelami keindahan gerak Tari Sunda, harmoni instrumen Angklung, serta alunan melodi Gamelan Priangan yang menenangkan jiwa.',
                'section3_title' => 'Pelestarian Seni Tradisi Priangan',
                'secondary_image' => '/storage/beritas/kabar-kebudayaan-bandung.png',
                'section3_content' => 'Langkah nyata dalam merawat kekayaan budaya lokal terus digiatkan oleh komunitas seni dan pemerintah daerah. Melalui publikasi ini, generasi muda diharapkan semakin mencintai dan bangga akan warisan leluhur Sunda.',
                'gallery_images' => [
                    ['url' => '/storage/beritas/kabar-kebudayaan-bandung.png', 'caption' => 'Pertunjukan Tari & Musik Tradisional Sunda'],
                    ['url' => '/storage/beritas/warta-seni-sunda.png', 'caption' => 'Dokumentasi Sanggar Seni Priangan'],
                    ['url' => '/storage/beritas/jurnal-budaya-bandung.png', 'caption' => 'Pameran Instrumentasi Musik Nusantara'],
                    ['url' => null, 'caption' => ''],
                ],
            ],
            [
                'title' => 'Warta Seni Sunda',
                'slug' => 'warta-seni-sunda',
                'category' => 'Warta Seni Sunda',
                'author' => 'Lembaga Kebudayaan Sunda',
                'status' => 'Published',
                'published_at' => '1974-10-01',
                'cover_image' => '/storage/beritas/warta-seni-sunda.png',
                'main_image' => '/storage/beritas/warta-seni-sunda.png',
                'content' => 'Warta Seni Sunda (Bulanan Budaya & Seni Terbit Sejak 1968) Edisi Khusus Oktober 1974 mengangkat tema Keagungan Seni Sunda, Tari & Gamelan. Terbitan langka ini mendokumentasikan nilai-nilai sejarah pergelaran tari klasik dan ansambel musik gamelan yang dipentaskan di bawah pendopo tradisional.',
                'section3_title' => 'Keagungan Seni Tari & Gamelan Sunda',
                'secondary_image' => '/storage/beritas/warta-seni-sunda.png',
                'section3_content' => 'Pergelaran ini menjadi bukti sejarah komitmen Lembaga Kebudayaan Sunda dalam membina, melestarikan, dan memperkenalkan khazanah tari serta musik Sunda ke panggung nasional maupun internasional.',
                'gallery_images' => [
                    ['url' => '/storage/beritas/warta-seni-sunda.png', 'caption' => 'Dokumentasi Pergelaran Seni Tari Sunda 1974'],
                    ['url' => '/storage/beritas/kabar-kebudayaan-bandung.png', 'caption' => 'Suasana Ansambel Gamelan Sunda Klasik'],
                    ['url' => '/storage/beritas/jurnal-budaya-bandung.png', 'caption' => 'Arsip Lembaga Kebudayaan Sunda'],
                    ['url' => null, 'caption' => ''],
                ],
            ],
            [
                'title' => 'Jurnal Budaya Bandung',
                'slug' => 'jurnal-budaya-bandung',
                'category' => 'Jurnal Budaya',
                'author' => 'Humas Kebudayaan',
                'status' => 'Published',
                'published_at' => '1974-10-01',
                'cover_image' => '/storage/beritas/jurnal-budaya-bandung.png',
                'main_image' => '/storage/beritas/jurnal-budaya-bandung.png',
                'content' => 'Jurnal Budaya Bandung Edisi Khusus Oktober 1974 menyajikan laporan Jelajah Pesona Wisata Budaya Jawa Barat. Edisi ini membawa pembaca melintasi pemandangan alam bentang sawah berundak, keanggunan Gunung Jawa Barat, dan arsitektur kuno Rumah Adat Sunda.',
                'section3_title' => 'Jelajah Pesona Wisata & Arsitektur Tradisional',
                'secondary_image' => '/storage/beritas/jurnal-budaya-bandung.png',
                'section3_content' => 'Arsitektur rumah adat Sunda merefleksikan keharmonisan hidup masyarakat dengan lingkungan alam sekitarnya. Dokumentasi ini menjadi acuan penelitian lanskap cagar budaya Jawa Barat.',
                'gallery_images' => [
                    ['url' => '/storage/beritas/jurnal-budaya-bandung.png', 'caption' => 'Rumah Adat Sunda & Lanskap Sawah Berundak'],
                    ['url' => '/storage/beritas/kabar-kebudayaan-bandung.png', 'caption' => 'Pesona Wisata Alam Pegunungan Jawa Barat'],
                    ['url' => '/storage/beritas/warta-seni-sunda.png', 'caption' => 'Dokumentasi Cagar Budaya Priangan'],
                    ['url' => null, 'caption' => ''],
                ],
            ],
        ];

        foreach ($books as $bookData) {
            Berita::updateOrCreate(
                ['slug' => $bookData['slug']],
                $bookData
            );
        }
    }
}
