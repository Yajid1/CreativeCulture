import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    AlertTriangle,
    Check,
    ChevronLeft,
    Eye,
    Grid,
    ImageIcon,
    Info,
    Layers,
    Loader2,
    MoreVertical,
    Newspaper,
    Plus,
    RotateCcw,
    Search,
    Upload,
} from 'lucide-react';

interface BeritaData {
    id: number;
    title: string;
    slug: string;
    category: string;
    author: string;
    status: 'Published' | 'Draft' | 'Archived';
    published_at: string;
    cover_image: string | null;
    main_image: string | null;
    content: string | null;
    section3_title: string | null;
    secondary_image: string | null;
    section3_content: string | null;
    gallery_images?: (string | null)[];
    updated_at?: string;
}

interface Stats {
    total: number;
    published: number;
    draft: number;
    archived: number;
}

interface Props {
    beritas: BeritaData[];
    stats: Stats;
    filters?: {
        search?: string;
        title?: string;
        status?: string;
        author?: string;
    };
}

// ─── Real-Time Live Preview Component (User Flipbook 2 Pages) ───────────
function BeritaPreview({
    title,
    category,
    author,
    publishedAt,
    coverImage,
    mainImage,
    content,
    section3Title,
    secondaryImage,
    section3Content,
    galleryImages,
    galleryCaptions,
    activeTab,
}: {
    title: string;
    category: string;
    author: string;
    publishedAt: string;
    coverImage: string | null;
    mainImage: string | null;
    content: string;
    section3Title: string;
    secondaryImage: string | null;
    section3Content: string;
    galleryImages: (string | null)[];
    galleryCaptions?: (string | null)[];
    activeTab: 1 | 2 | 3;
}) {
    const formattedDate = publishedAt ? publishedAt.toUpperCase() : '05 MEI 2025';
    const categoryUpper = category ? category.toUpperCase() : 'KEBIJAKAN';

    // Extract first letter for drop cap
    const firstLetter = content ? content.trim().charAt(0) : 'P';
    const restOfFirstParagraph = content ? content.trim().slice(1) : 'rogram Makan Bergizi Gratis di Kotagede, Yogyakarta dihentikan tanpa penjelasan resmi. Kepala Badan Gizi Kota Yogyakarta menyebut penghentian berkaitan dengan pendanaan yang belum terselesaikan.';

    return (
        <div className="h-full overflow-y-auto bg-gray-100 dark:bg-[#0d0d0f] rounded-2xl border border-gray-200/80 dark:border-[#25252d] shadow-inner text-gray-900 dark:text-gray-100 font-sans selection:bg-amber-100 p-3 sm:p-4">
            {/* Indicator Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200/60 dark:border-[#1c1c21] bg-white/95 dark:bg-[#121215]/95 backdrop-blur-md px-4 py-2 text-xs rounded-xl mb-4 shadow-xs">
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[10px]">Real-time Live Preview</span>
                </div>
                <span className="rounded-full bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-700 dark:text-amber-400">
                    {activeTab === 1 ? 'Sampul Berita' : activeTab === 2 ? 'Spread 2 Halaman' : 'Galeri Foto'}
                </span>
            </div>

            {/* TAB 1 PREVIEW: SAMPUL COVER */}
            {activeTab === 1 && (
                <div className="bg-white dark:bg-[#121215] rounded-2xl p-6 shadow-md max-w-sm mx-auto my-4 space-y-4 border border-gray-200/80 dark:border-[#25252d]">
                    <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
                        <span>SAMPUL DEPAN MAJALAH</span>
                        <span>EDISI 2026</span>
                    </div>

                    <div className="relative aspect-3/4 w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#1a1a20] border border-gray-200 dark:border-[#25252d] flex items-center justify-center shadow-lg">
                        {coverImage ? (
                            <img src={coverImage} alt="Cover" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400 p-4 text-center">
                                <Newspaper className="h-12 w-12 stroke-[1.5]" />
                                <span className="text-xs font-bold uppercase tracking-wider">Belum Ada Sampul</span>
                            </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-white text-left">
                            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">{categoryUpper}</span>
                            <h2 className="text-sm font-black uppercase tracking-tight leading-snug line-clamp-2 mt-1">
                                {title || 'PEMKOT YOGYAKARTA TAK BERDAYA'}
                            </h2>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2 PREVIEW: EXACT DUAL-PAGE SPREAD matching User Image! */}
            {(activeTab === 2 || activeTab === 1) && (
                <div className="bg-white dark:bg-[#16161a] rounded-2xl shadow-xl border border-gray-200/80 dark:border-[#25252d] overflow-hidden my-2">
                    {/* Dual Page Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200/80 dark:divide-[#25252d]">
                        {/* LEFT PAGE */}
                        <div className="p-5 sm:p-6 space-y-4 bg-white dark:bg-[#16161a]">
                            {/* Page Header */}
                            <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                <span>{categoryUpper}</span>
                                <span>{formattedDate}</span>
                            </div>

                            {/* Gambar 1 (Gambar Utama) */}
                            <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#202028] border border-gray-200/80 dark:border-[#2b2b35] flex items-center justify-center">
                                {mainImage ? (
                                    <img src={mainImage} alt="Gambar 1" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center gap-1.5 text-gray-400">
                                        <ImageIcon className="h-8 w-8" />
                                        <span className="text-[10px] font-semibold">Gambar 1 (Gambar Utama)</span>
                                    </div>
                                )}
                            </div>

                            {/* Judul Berita Utama */}
                            <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
                                {title || 'Pemkot Yogyakarta tak berdaya, siswa terancam kehilangan hak makan gratis?'}
                            </h1>

                            {/* Isi Teks Utama dengan Drop-Cap */}
                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
                                <p className="leading-relaxed">
                                    <span className="float-left text-3xl font-black text-gray-900 dark:text-white leading-none mr-2 mt-0.5 uppercase">
                                        {firstLetter}
                                    </span>
                                    {restOfFirstParagraph}
                                </p>

                                {content && content.length > 200 && (
                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {content.slice(200)}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* RIGHT PAGE */}
                        <div className="p-5 sm:p-6 space-y-4 bg-white dark:bg-[#16161a] flex flex-col justify-between">
                            <div className="space-y-4">
                                {/* Page Header */}
                                <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                    <span>TERKAIT</span>
                                </div>

                                {/* Judul Sub / Terkait */}
                                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                                    {section3Title || 'RI dan Norwegia bahas kerja sama baru hadapi perubahan iklim'}
                                </h2>

                                {/* Gambar 2 (Gambar Kedua / Pendukung) */}
                                <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#202028] border border-gray-200/80 dark:border-[#2b2b35] flex items-center justify-center">
                                    {secondaryImage ? (
                                        <img src={secondaryImage} alt="Gambar 2" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1.5 text-gray-400">
                                            <ImageIcon className="h-8 w-8" />
                                            <span className="text-[10px] font-semibold">Gambar 2 (Gambar Halaman Kanan)</span>
                                        </div>
                                    )}
                                </div>

                                {/* Isi Teks Lanjutan */}
                                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {section3Content || 'Kesepakatan kerja sama diharapkan menjadi solusi penyelesaian program mengatasi kerusakan lingkungan antar kedua negara.'}
                                </p>
                            </div>

                            {/* Page Footer */}
                            <div className="pt-4 border-t border-gray-100 dark:border-[#25252d]">
                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                    {author ? author.toUpperCase() : 'INTERNASIONAL'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 3 PREVIEW: DUAL-PAGE SPREAD + GALERI 4 SLOT DENGAN DESKRIPSI */}
            {activeTab === 3 && (
                <div className="space-y-4 my-2">
                    {/* Dual Page Spread for Bagian 3 */}
                    <div className="bg-white dark:bg-[#16161a] rounded-2xl shadow-xl border border-gray-200/80 dark:border-[#25252d] overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200/80 dark:divide-[#25252d]">
                            {/* LEFT PAGE (HALAMAN 3) */}
                            <div className="p-5 sm:p-6 space-y-4 bg-white dark:bg-[#16161a]">
                                <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                    <span>{categoryUpper}</span>
                                    <span>HALAMAN 3</span>
                                </div>

                                <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#202028] border border-gray-200/80 dark:border-[#2b2b35] flex items-center justify-center">
                                    {secondaryImage ? (
                                        <img src={secondaryImage} alt="Gambar 3" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1.5 text-gray-400">
                                            <ImageIcon className="h-8 w-8" />
                                            <span className="text-[10px] font-semibold">Gambar Lanjutan (Bagian 3)</span>
                                        </div>
                                    )}
                                </div>

                                <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
                                    {section3Title || 'Judul Lanjutan / Informasi Tambahan (Bagian 3)'}
                                </h2>

                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {section3Content || 'Isi paragraf lanjutan informasi berita yang lebih detail dimasukkan pada Bagian 3 ini...'}
                                </p>
                            </div>

                            {/* RIGHT PAGE (HALAMAN 4: 4 KOTAK GAMBAR + DESKRIPSI DI SAMPING) */}
                            <div className="p-5 sm:p-6 space-y-4 bg-white dark:bg-[#16161a] flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                        <span>GALERI FOTO & DOKUMENTASI</span>
                                    </div>

                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                                        Dokumentasi Berita (4 Section Slot & Deskripsi)
                                    </h3>

                                    {/* 4 Photo Items with Descriptions Beside Each Item */}
                                    <div className="space-y-3">
                                        {Array.from({ length: 4 }).map((_, idx) => {
                                            const img = galleryImages[idx];
                                            const caption = galleryCaptions?.[idx];
                                            return (
                                                <div key={idx} className="flex items-start gap-3 p-2 rounded-xl bg-gray-50 dark:bg-[#1a1a20] border border-gray-100 dark:border-[#25252d]">
                                                    {/* Kotak Gambar */}
                                                    <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-gray-200 dark:bg-[#25252d] border border-gray-200 dark:border-[#2e2e38] flex items-center justify-center">
                                                        {img ? (
                                                            <img src={img} alt={`Documentation ${idx + 1}`} className="h-full w-full object-cover" />
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                                <ImageIcon className="h-4 w-4" />
                                                                <span className="text-[8px] font-bold">Slot {idx + 1}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Deskripsi di Samping Kotak */}
                                                    <div className="flex-1 min-w-0 pt-0.5">
                                                        <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-0.5">
                                                            Dokumentasi {idx + 1}
                                                        </span>
                                                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-snug line-clamp-2">
                                                            {caption || `Deskripsi foto dokumentasi ${idx + 1}...`}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100 dark:border-[#25252d]">
                                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                        {author ? author.toUpperCase() : 'HUMAS KEBUDAYAAN'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function BeritaAdmin({ beritas = [], stats = { total: 0, published: 0, draft: 0, archived: 0 }, filters = {} }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [titleQuery, setTitleQuery] = useState(filters.title || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [authorFilter, setAuthorFilter] = useState(filters.author || '');
    const [activeRowMenu, setActiveRowMenu] = useState<number | null>(null);

    const [viewMode, setViewMode] = useState<'table' | 'create' | 'edit' | 'view'>('table');
    const [activeSectionTab, setActiveSectionTab] = useState<1 | 2 | 3>(1);
    const [selectedBerita, setSelectedBerita] = useState<BeritaData | null>(null);

    // File preview & caption states
    const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
    const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
    const [secondaryImagePreview, setSecondaryImagePreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<(string | null)[]>(Array(4).fill(null));
    const [galleryCaptions, setGalleryCaptions] = useState<string[]>(Array(4).fill(''));

    // Form data
    const { data, setData, post, processing, reset } = useForm({
        title: '',
        category: 'Kebudayaan',
        author: 'Humas Kebudayaan',
        status: 'Published' as 'Published' | 'Draft' | 'Archived',
        published_at: new Date().toISOString().slice(0, 10),
        cover_image: null as File | string | null,
        remove_cover_image: false,
        main_image: null as File | string | null,
        remove_main_image: false,
        content: '',
        section3_title: '',
        secondary_image: null as File | string | null,
        remove_secondary_image: false,
        section3_content: '',
        gallery_images: Array(4).fill(null) as (File | string | null)[],
        gallery_captions: Array(4).fill('') as string[],
        _method: 'POST',
    });

    const handleFilter = () => {
        router.get(
            '/admin/berita',
            { search: searchQuery, title: titleQuery, status: statusFilter, author: authorFilter },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleReset = () => {
        setSearchQuery('');
        setTitleQuery('');
        setStatusFilter('');
        setAuthorFilter('');
        router.get('/admin/berita', {}, { preserveState: true, preserveScroll: true });
    };

    const handleCreate = () => {
        reset();
        setData({
            title: '',
            category: 'Kebudayaan',
            author: 'Humas Kebudayaan',
            status: 'Published',
            published_at: new Date().toISOString().slice(0, 10),
            cover_image: null,
            remove_cover_image: false,
            main_image: null,
            remove_main_image: false,
            content: '',
            section3_title: '',
            secondary_image: null,
            remove_secondary_image: false,
            section3_content: '',
            gallery_images: Array(4).fill(null),
            gallery_captions: Array(4).fill(''),
            _method: 'POST',
        });
        setCoverImagePreview(null);
        setMainImagePreview(null);
        setSecondaryImagePreview(null);
        setGalleryPreviews(Array(4).fill(null));
        setGalleryCaptions(Array(4).fill(''));
        setSelectedBerita(null);
        setActiveSectionTab(1);
        setViewMode('create');
    };

    const handleEdit = (item: BeritaData) => {
        setSelectedBerita(item);

        // Parse gallery images and captions
        const initialImages: (string | null)[] = Array(4).fill(null);
        const initialCaptions: string[] = Array(4).fill('');

        if (Array.isArray(item.gallery_images)) {
            item.gallery_images.slice(0, 4).forEach((gItem: any, idx: number) => {
                if (typeof gItem === 'string') {
                    initialImages[idx] = gItem;
                } else if (gItem && typeof gItem === 'object') {
                    initialImages[idx] = gItem.url || null;
                    initialCaptions[idx] = gItem.caption || '';
                }
            });
        }

        setData({
            title: item.title,
            category: item.category || 'Kebudayaan',
            author: item.author || 'Humas Kebudayaan',
            status: item.status,
            published_at: item.published_at || new Date().toISOString().slice(0, 10),
            cover_image: item.cover_image,
            remove_cover_image: false,
            main_image: item.main_image,
            remove_main_image: false,
            content: item.content || '',
            section3_title: item.section3_title || '',
            secondary_image: item.secondary_image,
            remove_secondary_image: false,
            section3_content: item.section3_content || '',
            gallery_images: initialImages,
            gallery_captions: initialCaptions,
            _method: 'POST',
        });
        setCoverImagePreview(item.cover_image);
        setMainImagePreview(item.main_image);
        setSecondaryImagePreview(item.secondary_image);
        setGalleryPreviews(initialImages);
        setGalleryCaptions(initialCaptions);
        setActiveSectionTab(2);
        setViewMode('edit');
        setActiveRowMenu(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            router.delete(`/admin/berita/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setActiveRowMenu(null);
                    if (viewMode !== 'table') setViewMode('table');
                },
            });
        }
    };

    const handleFileChange = (field: 'cover_image' | 'main_image' | 'secondary_image', file: File | null) => {
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        if (field === 'cover_image') {
            setData('cover_image', file);
            setData('remove_cover_image', false);
            setCoverImagePreview(previewUrl);
        } else if (field === 'main_image') {
            setData('main_image', file);
            setData('remove_main_image', false);
            setMainImagePreview(previewUrl);
        } else if (field === 'secondary_image') {
            setData('secondary_image', file);
            setData('remove_secondary_image', false);
            setSecondaryImagePreview(previewUrl);
        }
    };

    const handleRemoveFile = (field: 'cover_image' | 'main_image' | 'secondary_image') => {
        if (field === 'cover_image') {
            setData('cover_image', null);
            setData('remove_cover_image', true);
            setCoverImagePreview(null);
        } else if (field === 'main_image') {
            setData('main_image', null);
            setData('remove_main_image', true);
            setMainImagePreview(null);
        } else if (field === 'secondary_image') {
            setData('secondary_image', null);
            setData('remove_secondary_image', true);
            setSecondaryImagePreview(null);
        }
    };

    const handleGalleryChange = (index: number, file: File | null) => {
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        const newGallery = [...data.gallery_images];
        newGallery[index] = file;
        setData('gallery_images', newGallery);

        const newPreviews = [...galleryPreviews];
        newPreviews[index] = previewUrl;
        setGalleryPreviews(newPreviews);
    };

    const handleCaptionChange = (index: number, value: string) => {
        const newCaptions = [...data.gallery_captions];
        newCaptions[index] = value;
        setData('gallery_captions', newCaptions);

        const newCaptionState = [...galleryCaptions];
        newCaptionState[index] = value;
        setGalleryCaptions(newCaptionState);
    };

    const handleRemoveGallery = (index: number) => {
        const newGallery = [...data.gallery_images];
        newGallery[index] = null;
        setData('gallery_images', newGallery);

        const newPreviews = [...galleryPreviews];
        newPreviews[index] = null;
        setGalleryPreviews(newPreviews);

        const newCaptions = [...data.gallery_captions];
        newCaptions[index] = '';
        setData('gallery_captions', newCaptions);

        const newCaptionState = [...galleryCaptions];
        newCaptionState[index] = '';
        setGalleryCaptions(newCaptionState);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (viewMode === 'create') {
            post('/admin/berita', { preserveScroll: true, onSuccess: () => setViewMode('table') });
        } else if (viewMode === 'edit' && selectedBerita) {
            post(`/admin/berita/${selectedBerita.id}`, { preserveScroll: true, onSuccess: () => setViewMode('table') });
        }
    };

    // ─── TABLE VIEW ───────────────────────────────────────────
    if (viewMode === 'table') {
        return (
            <>
                <Head title="Kelola Berita — Admin UPTD Kebudayaan" />

                <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#09090b] text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 space-y-6 pb-16 font-sans">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Berita</h1>
                            <p className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-400 mt-1">
                                Kelola warta, pengumuman, dan berita terkini UPTD Kebudayaan
                            </p>
                        </div>

                        <button
                            onClick={handleCreate}
                            className="inline-flex items-center gap-2 rounded-full bg-[#18181b] dark:bg-white px-5 py-2.5 text-xs font-bold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition cursor-pointer"
                        >
                            <Plus className="h-4 w-4 stroke-[3]" />
                            <span>Buat Berita</span>
                        </button>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-[#1c1c21] text-gray-600 dark:text-gray-300">
                                <Newspaper className="h-4.5 w-4.5" />
                            </div>
                            <div className="mt-4">
                                <p className="text-xs font-semibold text-gray-500">Total Berita</p>
                                <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">{stats.total}</h3>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <Check className="h-4.5 w-4.5" />
                            </div>
                            <div className="mt-4">
                                <p className="text-xs font-semibold text-gray-500">Published</p>
                                <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">{stats.published}</h3>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                <Loader2 className="h-4.5 w-4.5" />
                            </div>
                            <div className="mt-4">
                                <p className="text-xs font-semibold text-gray-500">Draft</p>
                                <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">{stats.draft}</h3>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                                <AlertTriangle className="h-4.5 w-4.5" />
                            </div>
                            <div className="mt-4">
                                <p className="text-xs font-semibold text-gray-500">Archived</p>
                                <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">{stats.archived}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">Search</label>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari berita..."
                                    className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">Judul</label>
                                <input
                                    type="text"
                                    value={titleQuery}
                                    onChange={(e) => setTitleQuery(e.target.value)}
                                    placeholder="Cari judul berita"
                                    className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">Filter Status</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                                >
                                    <option value="">Semua status</option>
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">Filter Penulis</label>
                                <input
                                    type="text"
                                    value={authorFilter}
                                    onChange={(e) => setAuthorFilter(e.target.value)}
                                    placeholder="Filter penulis"
                                    className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2.5 pt-3">
                            <button onClick={handleFilter} className="inline-flex items-center gap-2 rounded-full bg-[#18181b] dark:bg-white px-5 py-2 text-xs font-bold text-white dark:text-gray-900 hover:bg-gray-800 transition cursor-pointer">
                                <Search className="h-3.5 w-3.5" />
                                <span>Filter</span>
                            </button>
                            <button onClick={handleReset} className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#16161a] px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 transition cursor-pointer">
                                <RotateCcw className="h-3.5 w-3.5" />
                                <span>Reset</span>
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] overflow-hidden shadow-xs">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-[#1c1c21]">
                                        <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white">Judul Berita</th>
                                        <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white">Status</th>
                                        <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white">Penulis</th>
                                        <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white">Tanggal Terbit</th>
                                        <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-[#1c1c21]">
                                    {beritas.length > 0 ? (
                                        beritas.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1a20] transition-colors">
                                                <td className="py-4 px-5">
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-[#1c1c21] overflow-hidden">
                                                            {item.cover_image || item.main_image ? (
                                                                <img src={item.cover_image || item.main_image || ''} alt={item.title} className="h-full w-full object-cover" />
                                                            ) : (
                                                                <Newspaper className="h-5 w-5 text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight">{item.title}</h4>
                                                            <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{item.content || item.category}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="py-4 px-5">
                                                    <span className={`inline-flex items-center rounded-full px-3.5 py-1 text-[11px] font-bold ${
                                                        item.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                        item.status === 'Draft' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                        'bg-gray-100 text-gray-600 border border-gray-200'
                                                    }`}>
                                                        {item.status}
                                                    </span>
                                                </td>

                                                <td className="py-4 px-5 text-xs font-semibold text-gray-700 dark:text-gray-300">{item.author}</td>
                                                <td className="py-4 px-5 text-xs font-medium text-gray-500 dark:text-gray-400">{item.published_at}</td>

                                                <td className="py-4 px-5 text-right relative">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleEdit(item)}
                                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition py-1 px-2.5 rounded-lg hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            <Eye className="h-3.5 w-3.5" />
                                                            <span>View</span>
                                                        </button>

                                                        <button
                                                            onClick={() => setActiveRowMenu(activeRowMenu === item.id ? null : item.id)}
                                                            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                                                        >
                                                            <MoreVertical className="h-4 w-4" />
                                                        </button>

                                                        {activeRowMenu === item.id && (
                                                            <div className="absolute right-5 top-12 z-20 w-36 rounded-xl border border-gray-100 dark:border-[#25252d] bg-white dark:bg-[#16161a] p-1.5 shadow-lg text-left">
                                                                <button
                                                                    onClick={() => handleEdit(item)}
                                                                    className="w-full text-left px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 rounded-lg transition cursor-pointer"
                                                                >
                                                                    Edit Berita
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(item.id)}
                                                                    className="w-full text-left px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-8 text-center text-xs font-medium text-gray-400">
                                                Belum ada berita tercatat.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // ─── SPLIT SCREEN LIVE PREVIEW VIEW (CREATE / EDIT) ───────────
    const isCreate = viewMode === 'create';

    return (
        <>
            <Head title={`${isCreate ? 'Buat' : 'Edit'} Berita — Admin UPTD Kebudayaan`} />

            <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#09090b] text-gray-800 dark:text-gray-200 font-sans p-4 sm:p-6 lg:p-8 space-y-5 pb-16">
                {/* Top Header Bar */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setViewMode('table')}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] text-gray-500 hover:text-gray-900 dark:hover:text-white transition shadow-xs cursor-pointer"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                {isCreate ? 'Buat Berita Baru' : `Edit: ${selectedBerita?.title}`}
                            </h1>
                            <p className="text-xs text-gray-400">Edit data berita dan lihat perubahan langsung pada Live Preview di sebelah kanan</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            onClick={() => setViewMode('table')}
                            className="rounded-full border border-gray-200 dark:border-[#25252d] px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className="rounded-full bg-[#18181b] dark:bg-white px-6 py-2 text-xs font-bold text-white dark:text-gray-900 hover:bg-gray-800 transition shadow-xs cursor-pointer disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Berita'}
                        </button>
                    </div>
                </div>

                {/* Split Screen Layout (Form Left, Live Preview Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* LEFT COLUMN: FORM EDIT (6 Cols) */}
                    <div className="lg:col-span-6 xl:col-span-6 rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 sm:p-6 shadow-xs space-y-6">
                        {/* Section Tabs */}
                        <div className="flex items-center gap-1.5 rounded-xl bg-gray-100/80 dark:bg-[#1a1a20] p-1 text-xs">
                            <button
                                type="button"
                                onClick={() => setActiveSectionTab(1)}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-bold transition cursor-pointer ${
                                    activeSectionTab === 1 ? 'bg-white dark:bg-[#25252d] text-gray-900 dark:text-white shadow-xs' : 'text-gray-500'
                                }`}
                            >
                                <Info className="h-3.5 w-3.5" />
                                <span>Bagian 1: Sampul</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveSectionTab(2)}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-bold transition cursor-pointer ${
                                    activeSectionTab === 2 ? 'bg-white dark:bg-[#25252d] text-gray-900 dark:text-white shadow-xs' : 'text-gray-500'
                                }`}
                            >
                                <Layers className="h-3.5 w-3.5" />
                                <span>Bagian 2: Spread 2 Gambar</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveSectionTab(3)}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-bold transition cursor-pointer ${
                                    activeSectionTab === 3 ? 'bg-white dark:bg-[#25252d] text-gray-900 dark:text-white shadow-xs' : 'text-gray-500'
                                }`}
                            >
                                <Grid className="h-3.5 w-3.5" />
                                <span>Bagian 3: Galeri (8 Slot)</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* BAGIAN 1: SAMPUL BERITA */}
                            {activeSectionTab === 1 && (
                                <div className="space-y-5 animate-in fade-in duration-200">
                                    <div className="rounded-xl border border-amber-100 bg-amber-50/60 dark:border-amber-900/30 dark:bg-amber-950/20 p-3.5 text-xs text-amber-800 dark:text-amber-300">
                                        <strong>Bagian 1 — Sampul Berita (Cover):</strong> Gambar ini akan muncul sebagai sampul utama berita.
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">Upload Gambar Sampul Berita</label>

                                        {coverImagePreview ? (
                                            <div className="relative max-w-sm h-64 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#25252d]">
                                                <img src={coverImagePreview} alt="Cover Preview" className="h-full w-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center gap-2">
                                                    <label className="cursor-pointer rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-900 shadow-md hover:bg-gray-100 transition">
                                                        Ganti Gambar
                                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('cover_image', e.target.files?.[0] || null)} />
                                                    </label>
                                                    <button type="button" onClick={() => handleRemoveFile('cover_image')} className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-md hover:bg-red-700 transition cursor-pointer">
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center h-52 w-full max-w-sm rounded-2xl border-2 border-dashed border-gray-200 dark:border-[#25252d] bg-gray-50 dark:bg-[#16161a] hover:bg-gray-100 transition cursor-pointer">
                                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Upload Gambar Sampul Berita</span>
                                                <span className="text-[10px] text-gray-400 mt-1">PNG, JPG max 5MB</span>
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('cover_image', e.target.files?.[0] || null)} />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* BAGIAN 2: GAMBAR 1 (UTAMA) & GAMBAR 2 (SEKUNDER) + TEKS 2 HALAMAN */}
                            {activeSectionTab === 2 && (
                                <div className="space-y-5 animate-in fade-in duration-200">
                                    <div className="rounded-xl border border-blue-100 bg-blue-50/60 dark:border-blue-900/30 dark:bg-blue-950/20 p-3.5 text-xs text-blue-800 dark:text-blue-300">
                                        <strong>Bagian 2 — Spread 2 Halaman Berita:</strong> Mengisi Gambar 1 (Halaman Kiri), Teks Utama, Judul Sub / Terkait, Gambar 2 (Halaman Kanan), dan Teks Lanjutan.
                                    </div>

                                    {/* General Information */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Judul Berita Utama (Halaman Kiri) *</label>
                                            <input
                                                type="text"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                placeholder="Pemkot Yogyakarta tak berdaya..."
                                                required
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Kategori / Tag</label>
                                            <input
                                                type="text"
                                                value={data.category}
                                                onChange={(e) => setData('category', e.target.value)}
                                                placeholder="cth: KEBIJAKAN"
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Penulis / Footer</label>
                                            <input
                                                type="text"
                                                value={data.author}
                                                onChange={(e) => setData('author', e.target.value)}
                                                placeholder="cth: INTERNASIONAL"
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Tanggal Terbit</label>
                                            <input
                                                type="date"
                                                value={data.published_at}
                                                onChange={(e) => setData('published_at', e.target.value)}
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                                            <select
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value as 'Published' | 'Draft' | 'Archived')}
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            >
                                                <option value="Published">Published</option>
                                                <option value="Draft">Draft</option>
                                                <option value="Archived">Archived</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* HALAMAN KIRI: GAMBAR 1 & TEKS UTAMA */}
                                    <div className="p-4 rounded-xl border border-gray-200/80 dark:border-[#202028] bg-gray-50/50 dark:bg-[#16161a] space-y-4">
                                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                            Halaman Kiri — Gambar 1 & Teks Utama
                                        </h3>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Gambar 1 (Halaman Kiri)</label>
                                            {mainImagePreview ? (
                                                <div className="relative max-w-sm h-40 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#25252d]">
                                                    <img src={mainImagePreview} alt="Gambar 1" className="h-full w-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center gap-2">
                                                        <label className="cursor-pointer rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-900">
                                                            Ganti
                                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('main_image', e.target.files?.[0] || null)} />
                                                        </label>
                                                        <button type="button" onClick={() => handleRemoveFile('main_image')} className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white cursor-pointer">
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <label className="flex flex-col items-center justify-center h-32 w-full max-w-sm rounded-2xl border-2 border-dashed border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] hover:bg-gray-100 transition cursor-pointer">
                                                    <Upload className="h-6 w-6 text-gray-400 mb-1" />
                                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Upload Gambar 1 (Halaman Kiri)</span>
                                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('main_image', e.target.files?.[0] || null)} />
                                                </label>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Isi Paragraf Teks Utama</label>
                                            <textarea
                                                value={data.content}
                                                onChange={(e) => setData('content', e.target.value)}
                                                placeholder="Program Makan Bergizi Gratis di Kotagede, Yogyakarta dihentikan tanpa penjelasan resmi..."
                                                rows={4}
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* HALAMAN KANAN: JUDUL SUB, GAMBAR 2 & TEKS LANJUTAN */}
                                    <div className="p-4 rounded-xl border border-gray-200/80 dark:border-[#202028] bg-gray-50/50 dark:bg-[#16161a] space-y-4">
                                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                            Halaman Kanan — Judul Sub, Gambar 2 & Teks Lanjutan
                                        </h3>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Judul Sub / Terkait (Halaman Kanan)</label>
                                            <input
                                                type="text"
                                                value={data.section3_title}
                                                onChange={(e) => setData('section3_title', e.target.value)}
                                                placeholder="RI dan Norwegia bahas kerja sama baru hadapi perubahan iklim"
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Gambar 2 (Halaman Kanan)</label>
                                            {secondaryImagePreview ? (
                                                <div className="relative max-w-sm h-40 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#25252d]">
                                                    <img src={secondaryImagePreview} alt="Gambar 2" className="h-full w-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center gap-2">
                                                        <label className="cursor-pointer rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-900">
                                                            Ganti
                                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('secondary_image', e.target.files?.[0] || null)} />
                                                        </label>
                                                        <button type="button" onClick={() => handleRemoveFile('secondary_image')} className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white cursor-pointer">
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <label className="flex flex-col items-center justify-center h-32 w-full max-w-sm rounded-2xl border-2 border-dashed border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] hover:bg-gray-100 transition cursor-pointer">
                                                    <Upload className="h-6 w-6 text-gray-400 mb-1" />
                                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Upload Gambar 2 (Halaman Kanan)</span>
                                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('secondary_image', e.target.files?.[0] || null)} />
                                                </label>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Isi Paragraf Teks Lanjutan</label>
                                            <textarea
                                                value={data.section3_content}
                                                onChange={(e) => setData('section3_content', e.target.value)}
                                                placeholder="Kesepakatan kerja sama diharapkan menjadi solusi penyelesaian program..."
                                                rows={3}
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* BAGIAN 3: LANJUTAN & GALERI 8 SLOT */}
                            {activeSectionTab === 3 && (
                                <div className="space-y-5 animate-in fade-in duration-200">
                                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 dark:border-emerald-900/30 dark:bg-emerald-950/20 p-3.5 text-xs text-emerald-800 dark:text-emerald-300">
                                        <strong>Bagian 3 — Spread 2 Halaman Lanjutan & Galeri:</strong> Mengisi Judul Lanjutan (Halaman 3), Gambar Lanjutan, Isi Teks Lanjutan, serta 8 Slot Foto Dokumentasi (Halaman 4).
                                    </div>

                                    {/* HALAMAN 3: JUDUL SUB, GAMBAR LANJUTAN & TEKS LANJUTAN */}
                                    <div className="p-4 rounded-xl border border-gray-200/80 dark:border-[#202028] bg-gray-50/50 dark:bg-[#16161a] space-y-4">
                                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                            Halaman 3 — Judul Sub, Gambar Lanjutan & Teks Lanjutan
                                        </h3>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Judul Sub / Terkait (Halaman 3)</label>
                                            <input
                                                type="text"
                                                value={data.section3_title}
                                                onChange={(e) => setData('section3_title', e.target.value)}
                                                placeholder="Judul lanjutan berita..."
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Gambar Lanjutan (Halaman 3)</label>
                                            {secondaryImagePreview ? (
                                                <div className="relative max-w-sm h-40 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#25252d]">
                                                    <img src={secondaryImagePreview} alt="Gambar Lanjutan" className="h-full w-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center gap-2">
                                                        <label className="cursor-pointer rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-900">
                                                            Ganti
                                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('secondary_image', e.target.files?.[0] || null)} />
                                                        </label>
                                                        <button type="button" onClick={() => handleRemoveFile('secondary_image')} className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white cursor-pointer">
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <label className="flex flex-col items-center justify-center h-32 w-full max-w-sm rounded-2xl border-2 border-dashed border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] hover:bg-gray-100 transition cursor-pointer">
                                                    <Upload className="h-6 w-6 text-gray-400 mb-1" />
                                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Upload Gambar Lanjutan (Halaman 3)</span>
                                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('secondary_image', e.target.files?.[0] || null)} />
                                                </label>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Isi Paragraf Teks Lanjutan (Halaman 3)</label>
                                            <textarea
                                                value={data.section3_content}
                                                onChange={(e) => setData('section3_content', e.target.value)}
                                                placeholder="Tuliskan isi teks berita lanjutan di sini..."
                                                rows={3}
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* HALAMAN 4: GALERI FOTO 4 SLOT DENGAN DESKRIPSI */}
                                    <div className="p-4 rounded-xl border border-gray-200/80 dark:border-[#202028] bg-gray-50/50 dark:bg-[#16161a] space-y-3">
                                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                                            Halaman 4 — Galeri Foto & Dokumentasi (4 Section Slot & Deskripsi)
                                        </h3>

                                        <div className="space-y-3">
                                            {Array.from({ length: 4 }).map((_, idx) => {
                                                const preview = galleryPreviews[idx];
                                                const caption = data.gallery_captions?.[idx] || '';
                                                return (
                                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#121215] border border-gray-200 dark:border-[#25252d]">
                                                        {/* Upload / Preview Box (Kotak Gambar) */}
                                                        <div className="relative h-20 w-20 shrink-0 rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50 dark:bg-[#16161a] overflow-hidden flex items-center justify-center">
                                                            {preview ? (
                                                                <>
                                                                    <img src={preview} alt={`Gallery ${idx + 1}`} className="h-full w-full object-cover" />
                                                                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition flex items-center justify-center gap-1">
                                                                        <label className="cursor-pointer rounded bg-white px-2 py-1 text-[9px] font-bold text-gray-900 shadow-xs">
                                                                            Ganti
                                                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleGalleryChange(idx, e.target.files?.[0] || null)} />
                                                                        </label>
                                                                        <button type="button" onClick={() => handleRemoveGallery(idx)} className="rounded bg-red-600 px-2 py-1 text-[9px] font-bold text-white cursor-pointer">
                                                                            Hapus
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <label className="flex flex-col items-center justify-center h-full w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-[#202028] transition p-1.5 text-center">
                                                                    <Upload className="h-4 w-4 text-gray-400 mb-0.5" />
                                                                    <span className="text-[9px] font-semibold text-gray-500">Slot {idx + 1}</span>
                                                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleGalleryChange(idx, e.target.files?.[0] || null)} />
                                                                </label>
                                                            )}
                                                        </div>

                                                        {/* Deskripsi Foto Input */}
                                                        <div className="flex-1 min-w-0">
                                                            <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">
                                                                Deskripsi Foto Dokumentasi {idx + 1}
                                                            </label>
                                                            <textarea
                                                                value={caption}
                                                                onChange={(e) => handleCaptionChange(idx, e.target.value)}
                                                                placeholder={`Tulis deskripsi untuk foto ${idx + 1}...`}
                                                                rows={2}
                                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50 dark:bg-[#16161a] px-3 py-1.5 text-xs text-gray-900 dark:text-white"
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-[#202026]">
                                <div>
                                    {activeSectionTab > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setActiveSectionTab((activeSectionTab - 1) as 1 | 2)}
                                            className="rounded-full border border-gray-200 dark:border-[#25252d] px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition cursor-pointer"
                                        >
                                            Sebelumnya
                                        </button>
                                    )}
                                </div>

                                <div>
                                    {activeSectionTab < 3 && (
                                        <button
                                            type="button"
                                            onClick={() => setActiveSectionTab((activeSectionTab + 1) as 2 | 3)}
                                            className="rounded-full bg-gray-100 dark:bg-[#1c1c22] px-5 py-2 text-xs font-bold text-gray-900 dark:text-white hover:bg-gray-200 transition cursor-pointer"
                                        >
                                            Selanjutnya
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: STICKY LIVE PREVIEW (6 Cols) */}
                    <div className="lg:col-span-6 xl:col-span-6 sticky top-6 h-[calc(100vh-6rem)]">
                        <BeritaPreview
                            title={data.title}
                            category={data.category}
                            author={data.author}
                            publishedAt={data.published_at}
                            coverImage={coverImagePreview}
                            mainImage={mainImagePreview}
                            content={data.content}
                            section3Title={data.section3_title}
                            secondaryImage={secondaryImagePreview}
                            section3Content={data.section3_content}
                            galleryImages={galleryPreviews}
                            activeTab={activeSectionTab}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
