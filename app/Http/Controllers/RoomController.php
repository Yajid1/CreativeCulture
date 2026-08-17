<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Facility;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    /**
     * Mapping from short URL codes to facility slugs.
     *
     * @var array<string, string>
     */
    private const FACILITY_CODE_MAP = [
        'bch' => 'bandung-creative-hub',
        'psms' => 'padepokan-seni-mayang-sunda',
        'tsc' => 'teras-sunda-cibiru',
        'kwpk' => 'kampung-wisata-pasir-kunci',
    ];

    /**
     * Display the list of rooms for a facility.
     */
    public function index(string $facilityCode): Response
    {
        $facility = $this->resolveFacility($facilityCode);

        $rooms = $facility->rooms()
            ->orderBy('name')
            ->get()
            ->map(fn (Room $room) => [
                'id' => $room->id,
                'name' => $room->name,
                'slug' => $room->slug,
                'description' => $room->description ?? '',
                'capacity' => $room->capacity ?? '',
                'image' => $room->image ? "/storage/{$room->image}" : null,
                'section2_title' => $room->section2_title ?? 'Public Space & Kelengkapan',
                'section2_description' => $room->section2_description ?? 'Konsep interior kayu yang hangat dan tangga bertingkat memberikan fleksibilitas tinggi bagi pengunjung untuk bekerja santai, berdiskusi, maupun menggelar pertunjukan mini.',
                'facilities_list' => $room->facilities_list ?? "Kursi Duduk (40 Unit)\nMeja Diskusi & Kerja\nStopkontak Terintegrasi\nInterior Kayu & Tangga Ikonik",
                'secondary_image' => $room->secondary_image ? "/storage/{$room->secondary_image}" : null,
                'gallery_images' => is_array($room->gallery_images)
                    ? array_map(fn ($img) => $img ? "/storage/{$img}" : null, array_pad($room->gallery_images, 8, null))
                    : array_fill(0, 8, null),
                'status' => $room->status,
                'updated_at' => $room->updated_at?->format('m/d/Y'),
            ]);

        $stats = [
            'total' => $facility->rooms()->count(),
            'ready' => $facility->rooms()->where('status', 'Ready')->count(),
            'in_progress' => $facility->rooms()->where('status', 'In Progress')->count(),
            'blocked' => $facility->rooms()->where('status', 'Blocked')->count(),
        ];

        return Inertia::render('admin/ruangan/index', [
            'facility' => [
                'id' => $facility->id,
                'name' => $facility->name,
                'slug' => $facility->slug,
                'code' => $facilityCode,
            ],
            'rooms' => $rooms,
            'stats' => $stats,
        ]);
    }

    /**
     * Store a newly created room.
     */
    public function store(Request $request, string $facilityCode): RedirectResponse
    {
        $facility = $this->resolveFacility($facilityCode);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('rooms', 'slug')],
            'description' => ['nullable', 'string'],
            'capacity' => ['nullable', 'string', 'max:100'],
            'image' => ['nullable', 'image', 'max:1024'],
            'section2_title' => ['nullable', 'string', 'max:255'],
            'section2_description' => ['nullable', 'string'],
            'facilities_list' => ['nullable', 'string'],
            'secondary_image' => ['nullable', 'image', 'max:1024'],
            'gallery_images' => ['nullable', 'array'],
            'gallery_images.*' => ['nullable', 'image', 'max:1024'],
            'status' => ['required', 'in:Ready,In Progress,Blocked'],
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('rooms', 'public');
        }

        $secondaryImagePath = null;
        if ($request->hasFile('secondary_image')) {
            $secondaryImagePath = $request->file('secondary_image')->store('rooms', 'public');
        }

        $galleryPaths = array_fill(0, 8, null);
        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $idx => $file) {
                if ($file && $idx >= 0 && $idx < 8) {
                    $galleryPaths[$idx] = $file->store('rooms', 'public');
                }
            }
        }

        $room = $facility->rooms()->create([
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'description' => $validated['description'] ?? null,
            'capacity' => $validated['capacity'] ?? null,
            'image' => $imagePath,
            'section2_title' => $validated['section2_title'] ?? null,
            'section2_description' => $validated['section2_description'] ?? null,
            'facilities_list' => $validated['facilities_list'] ?? null,
            'secondary_image' => $secondaryImagePath,
            'gallery_images' => $galleryPaths,
            'status' => $validated['status'],
        ]);

        ActivityLog::log(
            module: 'Ruangan',
            action: 'Created',
            title: "Penambahan Ruangan: {$room->name}",
            description: "Menambahkan ruangan baru pada fasilitas {$facility->name}",
            status: $room->status,
            link: "/admin/ruangan/{$facility->code}"
        );

        return redirect()->back()->with('success', 'Ruangan berhasil ditambahkan.');
    }

    /**
     * Update the specified room.
     */
    public function update(Request $request, Room $room): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('rooms', 'slug')->ignore($room->id)],
            'description' => ['nullable', 'string'],
            'capacity' => ['nullable', 'string', 'max:100'],
            'image' => ['nullable', 'image', 'max:1024'],
            'delete_image' => ['nullable', 'boolean'],
            'section2_title' => ['nullable', 'string', 'max:255'],
            'section2_description' => ['nullable', 'string'],
            'facilities_list' => ['nullable', 'string'],
            'secondary_image' => ['nullable', 'image', 'max:1024'],
            'delete_secondary_image' => ['nullable', 'boolean'],
            'gallery_images' => ['nullable', 'array'],
            'gallery_images.*' => ['nullable'],
            'delete_gallery_images' => ['nullable', 'array'],
            'delete_gallery_images.*' => ['nullable', 'boolean'],
            'status' => ['required', 'in:Ready,In Progress,Blocked'],
        ]);

        $updateData = [
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'description' => $validated['description'] ?? null,
            'capacity' => $validated['capacity'] ?? null,
            'section2_title' => $validated['section2_title'] ?? null,
            'section2_description' => $validated['section2_description'] ?? null,
            'facilities_list' => $validated['facilities_list'] ?? null,
            'status' => $validated['status'],
        ];

        if ($request->boolean('delete_image')) {
            if ($room->image) {
                Storage::disk('public')->delete($room->image);
            }
            $updateData['image'] = null;
        } elseif ($request->hasFile('image')) {
            if ($room->image) {
                Storage::disk('public')->delete($room->image);
            }
            $updateData['image'] = $request->file('image')->store('rooms', 'public');
        }

        if ($request->boolean('delete_secondary_image')) {
            if ($room->secondary_image) {
                Storage::disk('public')->delete($room->secondary_image);
            }
            $updateData['secondary_image'] = null;
        } elseif ($request->hasFile('secondary_image')) {
            if ($room->secondary_image) {
                Storage::disk('public')->delete($room->secondary_image);
            }
            $updateData['secondary_image'] = $request->file('secondary_image')->store('rooms', 'public');
        }

        // Process 8 gallery images
        $galleryImages = is_array($room->gallery_images)
            ? array_pad($room->gallery_images, 8, null)
            : array_fill(0, 8, null);

        $deleteGallery = $request->input('delete_gallery_images', []);

        for ($i = 0; $i < 8; $i++) {
            $shouldDelete = ! empty($deleteGallery[$i]);
            if ($shouldDelete) {
                if (! empty($galleryImages[$i])) {
                    Storage::disk('public')->delete($galleryImages[$i]);
                }
                $galleryImages[$i] = null;
            } elseif ($request->hasFile("gallery_images.{$i}")) {
                if (! empty($galleryImages[$i])) {
                    Storage::disk('public')->delete($galleryImages[$i]);
                }
                $galleryImages[$i] = $request->file("gallery_images.{$i}")->store('rooms', 'public');
            }
        }
        $updateData['gallery_images'] = $galleryImages;

        $room->update($updateData);

        $facilityCode = $room->facility ? $room->facility->code : 'bch';

        ActivityLog::log(
            module: 'Ruangan',
            action: 'Updated',
            title: "Pembaruan Data Ruangan {$room->name}",
            description: "Memperbarui rincian, kapasitas ({$room->capacity}), & galeri foto",
            status: $room->status,
            link: "/admin/ruangan/{$facilityCode}"
        );

        return redirect()->back()->with('success', 'Ruangan berhasil diperbarui.');
    }

    /**
     * Remove the specified room.
     */
    public function destroy(Room $room): RedirectResponse
    {
        $name = $room->name;

        if ($room->image) {
            Storage::disk('public')->delete($room->image);
        }

        if ($room->secondary_image) {
            Storage::disk('public')->delete($room->secondary_image);
        }

        if (is_array($room->gallery_images)) {
            foreach ($room->gallery_images as $path) {
                if ($path) {
                    Storage::disk('public')->delete($path);
                }
            }
        }

        $room->delete();

        ActivityLog::log(
            module: 'Ruangan',
            action: 'Deleted',
            title: "Penghapusan Ruangan \"{$name}\"",
            description: 'Menghapus data ruangan dari sistem',
            status: 'Deleted'
        );

        return redirect()->back()->with('success', "Ruangan \"{$name}\" berhasil dihapus.");
    }

    /**
     * Display a user-facing room page with dynamic database data.
     */
    public function showUserRoom(string $facilityPrefix, string $roomSlug): Response
    {
        $facilityPrefixMap = [
            'ruangan-bch' => 'bch',
            'ruangan-psms' => 'psms',
            'ruangan-tsc' => 'tsc',
            'ruangan-kwpk' => 'kwpk',
        ];

        $viewPrefixMap = [
            'ruangan-bch' => 'ruangan_bch',
            'ruangan-psms' => 'ruangan_psms',
            'ruangan-tsc' => 'ruangan_tsc',
            'ruangan-kwpk' => 'ruangan_kwpk',
        ];

        $facilityCode = $facilityPrefixMap[$facilityPrefix] ?? $facilityPrefix;
        $viewPrefix = $viewPrefixMap[$facilityPrefix] ?? str_replace('-', '_', $facilityPrefix);

        $facilitySlug = self::FACILITY_CODE_MAP[$facilityCode] ?? null;

        $room = null;
        if ($facilitySlug) {
            $facility = Facility::where('slug', $facilitySlug)->first();
            if ($facility) {
                $room = Room::where('facility_id', $facility->id)->where('slug', $roomSlug)->first();
            }
        }

        if (! $room) {
            $room = Room::where('slug', $roomSlug)->first();
        }

        $roomData = $room ? [
            'id' => $room->id,
            'name' => $room->name,
            'slug' => $room->slug,
            'description' => $room->description ?? '',
            'capacity' => $room->capacity ?? '',
            'image' => $room->image ? "/storage/{$room->image}" : null,
            'section2_title' => $room->section2_title ?? '',
            'section2_description' => $room->section2_description ?? '',
            'facilities_list' => $room->facilities_list ?? '',
            'secondary_image' => $room->secondary_image ? "/storage/{$room->secondary_image}" : null,
            'gallery_images' => is_array($room->gallery_images)
                ? array_map(fn ($img) => $img ? "/storage/{$img}" : null, array_pad($room->gallery_images, 8, null))
                : array_fill(0, 8, null),
            'status' => $room->status,
        ] : null;

        return Inertia::render("{$viewPrefix}/{$roomSlug}", [
            'room' => $roomData,
        ]);
    }

    /**
     * Resolve a Facility model from a short facility code.
     */
    private function resolveFacility(string $facilityCode): Facility
    {
        $slug = self::FACILITY_CODE_MAP[$facilityCode] ?? null;

        abort_unless($slug !== null, 404, 'Facility not found.');

        return Facility::where('slug', $slug)->firstOrFail();
    }
}
