<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        // Seed default dummy data if table is completely empty
        if (Berita::count() === 0) {
            $this->seedInitialData();
        }

        $query = Berita::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            });
        }

        if ($request->filled('title')) {
            $query->where('title', 'like', "%{$request->input('title')}%");
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('author')) {
            $query->where('author', 'like', "%{$request->input('author')}%");
        }

        $beritas = $query->orderBy('created_at', 'desc')->get();

        $stats = [
            'total' => Berita::count(),
            'published' => Berita::where('status', 'Published')->count(),
            'draft' => Berita::where('status', 'Draft')->count(),
            'archived' => Berita::where('status', 'Archived')->count(),
        ];

        return Inertia::render('admin/berita-admin', [
            'beritas' => $beritas,
            'stats' => $stats,
            'filters' => $request->only(['search', 'title', 'status', 'author']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'author' => 'nullable|string|max:100',
            'status' => 'required|in:Published,Draft,Archived',
            'published_at' => 'nullable|date',
            'cover_image' => 'nullable|image|max:5120',
            'main_image' => 'nullable|image|max:5120',
            'content' => 'nullable|string',
            'section3_title' => 'nullable|string|max:255',
            'secondary_image' => 'nullable|image|max:5120',
            'section3_content' => 'nullable|string',
        ]);

        $coverImagePath = null;
        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('beritas', 'public');
            $coverImagePath = '/storage/'.$path;
        }

        $mainImagePath = null;
        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('beritas', 'public');
            $mainImagePath = '/storage/'.$path;
        }

        $secondaryImagePath = null;
        if ($request->hasFile('secondary_image')) {
            $path = $request->file('secondary_image')->store('beritas', 'public');
            $secondaryImagePath = '/storage/'.$path;
        }

        // Process 4 gallery items with images and captions
        $galleryImages = array_fill(0, 4, ['url' => null, 'caption' => '']);
        if ($request->has('gallery_images') && is_array($request->gallery_images)) {
            foreach ($request->gallery_images as $index => $item) {
                if ($index >= 4) {
                    break;
                }

                $imagePath = null;
                if ($request->hasFile("gallery_images.{$index}")) {
                    $file = $request->file("gallery_images.{$index}");
                    $path = $file->store('beritas', 'public');
                    $imagePath = '/storage/'.$path;
                } elseif (is_string($item) && ! empty($item)) {
                    $imagePath = $item;
                } elseif (is_array($item) && ! empty($item['url'])) {
                    $imagePath = $item['url'];
                }

                $caption = '';
                if ($request->has("gallery_captions.{$index}")) {
                    $caption = $request->input("gallery_captions.{$index}");
                } elseif (is_array($item) && isset($item['caption'])) {
                    $caption = $item['caption'];
                }

                $galleryImages[$index] = [
                    'url' => $imagePath,
                    'caption' => $caption,
                ];
            }
        }

        $berita = Berita::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']).'-'.time(),
            'category' => $validated['category'] ?? 'Kebudayaan',
            'author' => $validated['author'] ?? 'Humas Kebudayaan',
            'status' => $validated['status'],
            'published_at' => $validated['published_at'] ?? now()->toDateString(),
            'cover_image' => $coverImagePath,
            'main_image' => $mainImagePath,
            'content' => $validated['content'] ?? null,
            'section3_title' => $validated['section3_title'] ?? null,
            'secondary_image' => $secondaryImagePath,
            'section3_content' => $validated['section3_content'] ?? null,
            'gallery_images' => $galleryImages,
        ]);

        ActivityLog::log(
            module: 'Berita',
            action: 'Create',
            title: "Penambahan Berita: {$berita->title}",
            description: "Menambahkan berita baru: {$berita->title}",
            status: $berita->status,
            link: '/admin/berita'
        );

        return redirect()->back()->with('success', 'Berita berhasil ditambahkan.');
    }

    public function update(Request $request, Berita $berita)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'author' => 'nullable|string|max:100',
            'status' => 'required|in:Published,Draft,Archived',
            'published_at' => 'nullable|date',
            'cover_image' => 'nullable',
            'main_image' => 'nullable',
            'content' => 'nullable|string',
            'section3_title' => 'nullable|string|max:255',
            'secondary_image' => 'nullable',
            'section3_content' => 'nullable|string',
        ]);

        // Cover Image Handling
        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('beritas', 'public');
            $berita->cover_image = '/storage/'.$path;
        } elseif ($request->input('remove_cover_image') === 'true' || $request->input('cover_image') === null || $request->input('cover_image') === '') {
            $berita->cover_image = null;
        }

        // Main Image Handling
        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('beritas', 'public');
            $berita->main_image = '/storage/'.$path;
        } elseif ($request->input('remove_main_image') === 'true' || $request->input('main_image') === null || $request->input('main_image') === '') {
            $berita->main_image = null;
        }

        // Secondary Image Handling
        if ($request->hasFile('secondary_image')) {
            $path = $request->file('secondary_image')->store('beritas', 'public');
            $berita->secondary_image = '/storage/'.$path;
        } elseif ($request->input('remove_secondary_image') === 'true' || $request->input('secondary_image') === null || $request->input('secondary_image') === '') {
            $berita->secondary_image = null;
        }

        // Gallery Images (4 slots with caption) Handling
        $newGallery = array_fill(0, 4, ['url' => null, 'caption' => '']);

        if ($request->has('gallery_images') && is_array($request->gallery_images)) {
            foreach ($request->gallery_images as $index => $item) {
                if ($index >= 4) {
                    break;
                }

                $imagePath = null;
                if ($request->hasFile("gallery_images.{$index}")) {
                    $file = $request->file("gallery_images.{$index}");
                    $path = $file->store('beritas', 'public');
                    $imagePath = '/storage/'.$path;
                } elseif (is_string($item) && ! empty($item)) {
                    $imagePath = $item;
                } elseif (is_array($item) && ! empty($item['url'])) {
                    $imagePath = $item['url'];
                }

                $caption = '';
                if ($request->has("gallery_captions.{$index}")) {
                    $caption = $request->input("gallery_captions.{$index}");
                } elseif (is_array($item) && isset($item['caption'])) {
                    $caption = $item['caption'];
                }

                $newGallery[$index] = [
                    'url' => $imagePath,
                    'caption' => $caption,
                ];
            }
        }
        $berita->gallery_images = $newGallery;

        $berita->title = $validated['title'];
        $berita->category = $validated['category'] ?? 'Kebudayaan';
        $berita->author = $validated['author'] ?? 'Humas Kebudayaan';
        $berita->status = $validated['status'];
        $berita->published_at = $validated['published_at'] ?? $berita->published_at;
        $berita->content = $validated['content'] ?? null;
        $berita->section3_title = $validated['section3_title'] ?? null;
        $berita->section3_content = $validated['section3_content'] ?? null;

        $berita->save();

        ActivityLog::log(
            module: 'Berita',
            action: 'Update',
            title: "Perubahan Berita: {$berita->title}",
            description: "Mengubah data berita: {$berita->title}",
            status: $berita->status,
            link: '/admin/berita'
        );

        return redirect()->back()->with('success', 'Berita berhasil diperbarui.');
    }

    public function destroy(Berita $berita)
    {
        $title = $berita->title;
        $berita->delete();

        ActivityLog::log(
            module: 'Berita',
            action: 'Delete',
            title: "Penghapusan Berita: {$title}",
            description: "Menghapus berita: {$title}",
            status: 'Archived',
            link: '/admin/berita'
        );

        return redirect()->back()->with('success', 'Berita berhasil dihapus.');
    }

    private function seedInitialData()
    {
        $initialNews = [
            [
                'title' => 'Festival Kebudayaan Bandung 2026 Siap Digelar di BCH',
                'category' => 'Kebudayaan',
                'author' => 'Humas Kebudayaan',
                'status' => 'Published',
                'published_at' => '2026-07-22',
                'content' => 'UPTD Kebudayaan mengumumkan penyelenggaraan festival seni dan budaya terbesar tahun ini...',
            ],
            [
                'title' => 'Pendaftaran Program Hibah Seni & Komunitas Budaya Diberbuka',
                'category' => 'Kebijakan',
                'author' => 'Tim Program UPTD',
                'status' => 'Published',
                'published_at' => '2026-07-22',
                'content' => 'Kesempatan insentif pengembangan karya bagi pelaku industri kreatif Kota Bandung...',
            ],
            [
                'title' => 'Workshop Pembuatan Angklung & Gamelan Digital',
                'category' => 'Edukasi',
                'author' => 'Sekretariat UPTD',
                'status' => 'Draft',
                'published_at' => '2026-07-20',
                'content' => 'Pelatihan gratis terbuka untuk generasi muda di Teras Sunda Cibiru...',
            ],
            [
                'title' => 'Peresmian Fasilitas Baru Studio Musik Mayang Sunda',
                'category' => 'Fasilitas',
                'author' => 'Humas Kebudayaan',
                'status' => 'Published',
                'published_at' => '2026-07-18',
                'content' => 'Peningkatan kualitas sound system dan peremajaan alat musik tradisional...',
            ],
            [
                'title' => 'Jadwal Pemeliharaan Gedung Kampung Wisata Pasir Kunci',
                'category' => 'Pengumuman',
                'author' => 'Tim Fasilitas UPTD',
                'status' => 'Archived',
                'published_at' => '2026-07-15',
                'content' => 'Pemberitahuan penutupan sementara area wahana kaulinan untuk perawatan rutin...',
            ],
        ];

        foreach ($initialNews as $item) {
            Berita::create([
                'title' => $item['title'],
                'slug' => Str::slug($item['title']),
                'category' => $item['category'],
                'author' => $item['author'],
                'status' => $item['status'],
                'published_at' => $item['published_at'],
                'content' => $item['content'],
                'gallery_images' => array_fill(0, 8, null),
            ]);
        }
    }
}
