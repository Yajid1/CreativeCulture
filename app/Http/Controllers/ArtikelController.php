<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Artikel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArtikelController extends Controller
{
    public function index(Request $request)
    {
        // Seed default data if table is empty
        if (Artikel::count() === 0) {
            $this->seedInitialData();
        }

        $query = Artikel::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('tag', 'like', "%{$search}%");
            });
        }

        if ($request->filled('title')) {
            $query->where('title', 'like', "%{$request->input('title')}%");
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('tag')) {
            $query->where('tag', 'like', "%{$request->input('tag')}%");
        }

        $artikels = $query->orderBy('created_at', 'desc')->get();

        $stats = [
            'total' => Artikel::count(),
            'published' => Artikel::where('status', 'Published')->count(),
            'draft' => Artikel::where('status', 'Draft')->count(),
            'archived' => Artikel::where('status', 'Archived')->count(),
        ];

        return Inertia::render('admin/artikel-admin', [
            'artikels' => $artikels,
            'stats' => $stats,
            'filters' => $request->only(['search', 'title', 'status', 'tag']),
        ]);
    }

    public function userIndex()
    {
        $artikels = Artikel::where('status', 'Published')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('user/artikel', [
            'artikels' => $artikels,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'tag' => 'nullable|string|max:100',
            'date' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'status' => 'required|in:Published,Draft,Archived',
            'href' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:100',
            'image' => 'nullable|image|max:5120',
            'secondary_image' => 'nullable|image|max:5120',
            'page1_title' => 'nullable|string|max:255',
            'page1_content' => 'nullable|array',
            'page1_content.*' => 'string',
            'page2_tag' => 'nullable|string|max:100',
            'page2_title' => 'nullable|string|max:255',
            'page2_content' => 'nullable|array',
            'page2_content.*' => 'string',
            'recap_title' => 'nullable|string|max:255',
            'recap_badge' => 'nullable|string|max:100',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('artikels', 'public');
            $imagePath = '/storage/'.$path;
        }

        $secondaryImagePath = null;
        if ($request->hasFile('secondary_image')) {
            $path = $request->file('secondary_image')->store('artikels', 'public');
            $secondaryImagePath = '/storage/'.$path;
        }

        $artikel = Artikel::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']).'-'.time(),
            'tag' => $validated['tag'] ?? 'EDUKASI',
            'date' => $validated['date'] ?? strtoupper(now()->format('d F Y')),
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
            'href' => $validated['href'] ?? null,
            'tags' => $validated['tags'] ?? [],
            'image' => $imagePath,
            'secondary_image' => $secondaryImagePath,
            'page1_title' => $validated['page1_title'] ?? $validated['title'],
            'page1_content' => $validated['page1_content'] ?? [],
            'page2_tag' => $validated['page2_tag'] ?? 'DOKUMENTASI & LANJUTAN',
            'page2_title' => $validated['page2_title'] ?? null,
            'page2_content' => $validated['page2_content'] ?? [],
            'recap_title' => $validated['recap_title'] ?? Str::limit($validated['title'], 30),
            'recap_badge' => $validated['recap_badge'] ?? 'Edukasi',
        ]);

        ActivityLog::log(
            module: 'Artikel',
            action: 'Create',
            title: "Penambahan Artikel: {$artikel->title}",
            description: "Menambahkan artikel baru: {$artikel->title}",
            status: $artikel->status,
            link: '/admin/artikel'
        );

        return redirect()->back()->with('success', 'Artikel berhasil ditambahkan.');
    }

    public function update(Request $request, Artikel $artikel)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'tag' => 'nullable|string|max:100',
            'date' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'status' => 'required|in:Published,Draft,Archived',
            'href' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:100',
            'image' => 'nullable',
            'secondary_image' => 'nullable',
            'page1_title' => 'nullable|string|max:255',
            'page1_content' => 'nullable|array',
            'page1_content.*' => 'string',
            'page2_tag' => 'nullable|string|max:100',
            'page2_title' => 'nullable|string|max:255',
            'page2_content' => 'nullable|array',
            'page2_content.*' => 'string',
            'recap_title' => 'nullable|string|max:255',
            'recap_badge' => 'nullable|string|max:100',
        ]);

        // Image handling
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('artikels', 'public');
            $artikel->image = '/storage/'.$path;
        } elseif ($request->input('remove_image') === 'true' || $request->input('image') === null || $request->input('image') === '') {
            $artikel->image = null;
        }

        // Secondary image handling
        if ($request->hasFile('secondary_image')) {
            $path = $request->file('secondary_image')->store('artikels', 'public');
            $artikel->secondary_image = '/storage/'.$path;
        } elseif ($request->input('remove_secondary_image') === 'true' || $request->input('secondary_image') === null || $request->input('secondary_image') === '') {
            $artikel->secondary_image = null;
        }

        $artikel->title = $validated['title'];
        $artikel->tag = $validated['tag'] ?? 'EDUKASI';
        $artikel->date = $validated['date'] ?? $artikel->date;
        $artikel->description = $validated['description'] ?? null;
        $artikel->status = $validated['status'];
        $artikel->href = $validated['href'] ?? null;
        $artikel->tags = $validated['tags'] ?? [];
        $artikel->page1_title = $validated['page1_title'] ?? $validated['title'];
        $artikel->page1_content = $validated['page1_content'] ?? [];
        $artikel->page2_tag = $validated['page2_tag'] ?? 'DOKUMENTASI & LANJUTAN';
        $artikel->page2_title = $validated['page2_title'] ?? null;
        $artikel->page2_content = $validated['page2_content'] ?? [];
        $artikel->recap_title = $validated['recap_title'] ?? Str::limit($validated['title'], 30);
        $artikel->recap_badge = $validated['recap_badge'] ?? 'Edukasi';

        $artikel->save();

        ActivityLog::log(
            module: 'Artikel',
            action: 'Update',
            title: "Perubahan Artikel: {$artikel->title}",
            description: "Mengubah data artikel: {$artikel->title}",
            status: $artikel->status,
            link: '/admin/artikel'
        );

        return redirect()->back()->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(Artikel $artikel)
    {
        $title = $artikel->title;
        $artikel->delete();

        ActivityLog::log(
            module: 'Artikel',
            action: 'Delete',
            title: "Penghapusan Artikel: {$title}",
            description: "Menghapus artikel: {$title}",
            status: 'Archived',
            link: '/admin/artikel'
        );

        return redirect()->back()->with('success', 'Artikel berhasil dihapus.');
    }

    private function seedInitialData(): void
    {
        $initialArticles = [
            [
                'title' => 'Squad Spanyol Healing di Bandung Creative Hub',
                'tag' => 'HIBURAN',
                'date' => '01 AGUSTUS 2026',
                'description' => 'POV: Lamine Yamal dan Squad Spanyol habis juara Piala Dunia 2026... malah healing ke Bandung Creative Hub 🇪🇸🏆',
                'status' => 'Published',
                'href' => '/fasilitas/bandung-creative-hub',
                'tags' => ['Bandung Creative Hub', 'Piala Dunia 2026', 'Viral'],
                'image' => '/images/artikel2.png',
                'secondary_image' => '/images/artikel_recording_studio.png',
                'page1_title' => 'Squad Spanyol Healing di Bandung Creative Hub',
                'page1_content' => [
                    'POV: Lamine Yamal dan Squad Timnas Spanyol yang baru saja menjuarai perhelatan akbar Piala Dunia 2026 secara mengejutkan terlihat menghabiskan waktu liburan dan healing di fasilitas Bandung Creative Hub (BCH), Kota Bandung.',
                    'Kedatangan rombongan pemain bintang sepak bola dunia ini disambut hangat oleh komunitas kreator lokal. Mereka sempat mencoba berbagai fasilitas unggulan seperti Studio Rekaman Musik Summen Stag, Laboratorium Desain 3D, hingga ruang pameran seni digital.',
                ],
                'page2_tag' => 'DOKUMENTASI & LANJUTAN',
                'page2_title' => 'Impression & Apresiasi Bintang Dunia terhadap Fasilitas BCH',
                'page2_content' => [
                    'Momen unik ini menjadi viral di berbagai platform media sosial dan membuktikan bahwa Bandung Creative Hub kini semakin dikenal secara internasional sebagai fasilitas inkubasi kreatif publik yang sangat ramah bagi anak muda.',
                    'Lamine Yamal bahkan sempat mengunggah momen saat mencoba studio rekaman musik dan mengapresiasi kelengkapan peralatan audio profesional yang disediakan secara gratis bagi warga dan komunitas.',
                ],
                'recap_title' => 'Squad Spanyol di BCH',
                'recap_badge' => 'Trending Hub',
            ],
            [
                'title' => 'Tipe-Tipe Orang Pegang Stik',
                'tag' => 'EDUKASI MUSIK',
                'date' => '25 JULI 2026',
                'description' => 'Keliatan dari cara pegangnya aja, udah ketahuan karakternya. Simak pembahasan lengkap seputar gaya dan teknik memegang stik drum di studio Bandung Creative Hub.',
                'status' => 'Published',
                'href' => '/fasilitas/bandung-creative-hub',
                'tags' => ['Teknik Drum', 'Musik', 'Bandung Creative Hub'],
                'image' => '/images/artikel1.png',
                'secondary_image' => '/images/artikel_recording_studio.png',
                'page1_title' => 'Tipe-Tipe Orang Pegang Stik',
                'page1_content' => [
                    'Keliatan dari cara pegang stik drumnya aja, udah ketahuan karakter dan gaya bermain seorang drummer! Memegang stik drum bukan cuma masalah kenyamanan, tapi juga menentukan artikulasi, power, dan ketahanan fisik saat tampil.',
                    'Secara umum terdapat tiga teknik memegang stik drum yang paling populer di kalangan musisi: Matched Grip (American, German, French) dan Traditional Grip. Masing-masing gaya memiliki keunikan akustik dan fleksibilitas pergelangan tangan tersendiri.',
                ],
                'page2_tag' => 'TEKNIK & FASILITAS STUDIO',
                'page2_title' => 'Eksplorasi Karakter Suara & Otot Pergelangan Tangan',
                'page2_content' => [
                    'Di studio musik rekaman Bandung Creative Hub, para instruktur memberikan pelatihan teknik dasar hingga tingkat lanjut bagi para drummer muda Kota Bandung agar dapat mengeksplorasi karakter suara terbaik instrumen mereka.',
                    'Latihan rutin dengan posisi pegangan stik yang benar terbukti mencegah cedera otot pergelangan tangan dan mengoptimalkan artikulasi pukulan pada cymbal serta snare drum.',
                ],
                'recap_title' => 'Tipe-Tipe Orang Pegang Stik',
                'recap_badge' => 'Edukasi Musik',
            ],
            [
                'title' => 'Ketika Boomer VS Gen Z Menjelaskan Fasilitas di BCH',
                'tag' => 'OPINI & EDUKASI',
                'date' => '15 JULI 2026',
                'description' => 'Ketika Boomer VS Gen Z menjelaskan fasilitas di BCH... Simak perbedaan perspektif unik dan keseruan generasi lintas zaman dalam memanfaatkan fasilitas ruang kreatif di Bandung Creative Hub.',
                'status' => 'Published',
                'href' => '/fasilitas/bandung-creative-hub',
                'tags' => ['Boomer VS Gen Z', 'Fasilitas BCH', 'Opini & Edukasi'],
                'image' => '/images/artikel3.png',
                'secondary_image' => '/images/DSC01758.jpg',
                'page1_title' => 'Ketika Boomer VS Gen Z Menjelaskan Fasilitas di BCH',
                'page1_content' => [
                    'Ketika Boomer VS Gen Z menjelaskan fasilitas di Bandung Creative Hub (BCH), perbedaan istilah dan cara pandang yang muncul sangat menggelitik sekaligus inspiratif!',
                    'Generasi Boomer cenderung memandang BCH sebagai \'Gedung Pusat Informasi & Fasilitas Kerajinan Daerah\', sementara Gen Z menyebutnya sebagai \'Creative Aesthetic Hub buat WFC, Produksi Podcast, & Content Creation\'.',
                ],
                'page2_tag' => 'PERSPEKTIF LINTAS GENERASI',
                'page2_title' => 'Ruang Kolaborasi Publik Tanpa Batas Usia',
                'page2_content' => [
                    'Meski memiliki istilah yang berbeda, kedua generasi ini sama-sama merasakan manfaat luar biasa dari keberadaan ruang kolaborasi publik yang disediakan oleh UPTD Kebudayaan Kota Bandung.',
                    'Sinergi antara pengalaman senior generasi Boomer dan kreativitas digital Gen Z melahirkan berbagai program kolaborasi unik yang semakin memperkaya ekosistem kebudayaan Kota Bandung.',
                ],
                'recap_title' => 'Boomer VS Gen Z di BCH',
                'recap_badge' => 'Edisi Opini',
            ],
        ];

        foreach ($initialArticles as $item) {
            Artikel::create([
                'title' => $item['title'],
                'slug' => Str::slug($item['title']),
                'tag' => $item['tag'],
                'date' => $item['date'],
                'description' => $item['description'],
                'status' => $item['status'],
                'href' => $item['href'],
                'tags' => $item['tags'],
                'image' => $item['image'],
                'secondary_image' => $item['secondary_image'],
                'page1_title' => $item['page1_title'],
                'page1_content' => $item['page1_content'],
                'page2_tag' => $item['page2_tag'],
                'page2_title' => $item['page2_title'],
                'page2_content' => $item['page2_content'],
                'recap_title' => $item['recap_title'],
                'recap_badge' => $item['recap_badge'],
            ]);
        }
    }
}
