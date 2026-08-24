import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    AlertTriangle,
    Check,
    ChevronLeft,
    Eye,
    FileText,
    Grid,
    ImageIcon,
    Info,
    Layers,
    Loader2,
    MoreVertical,
    Plus,
    RotateCcw,
    Search,
    Upload,
    X,
} from 'lucide-react';

interface ArtikelData {
    id: number;
    title: string;
    slug: string;
    tag: string;
    date: string;
    description: string | null;
    status: 'Published' | 'Draft' | 'Archived';
    href: string | null;
    tags: string[] | null;
    image: string | null;
    secondary_image: string | null;
    page1_title: string | null;
    page1_content: string[] | null;
    page2_tag: string | null;
    page2_title: string | null;
    page2_content: string[] | null;
    recap_title: string | null;
    recap_badge: string | null;
    updated_at?: string;
}

interface Stats {
    total: number;
    published: number;
    draft: number;
    archived: number;
}

interface Props {
    artikels: ArtikelData[];
    stats: Stats;
    filters?: {
        search?: string;
        title?: string;
        status?: string;
        tag?: string;
    };
}

// ─── Real-Time Live Preview Component (2-Page Book Spread) ────────
function ArtikelPreview({
    title,
    tag,
    date,
    image,
    secondaryImage,
    page1Title,
    page1Content,
    page2Tag,
    page2Title,
    page2Content,
    activeTab,
}: {
    title: string;
    tag: string;
    date: string;
    image: string | null;
    secondaryImage: string | null;
    page1Title: string;
    page1Content: string[];
    page2Tag: string;
    page2Title: string;
    page2Content: string[];
    activeTab: 1 | 2 | 3;
}) {
    const tagUpper = tag ? tag.toUpperCase() : 'EDUKASI';
    const dateUpper = date ? date.toUpperCase() : '01 AGUSTUS 2026';

    const firstParagraph = page1Content[0] || '';
    const firstLetter = firstParagraph.charAt(0) || 'P';
    const restOfFirstParagraph = firstParagraph.slice(1) || 'aragraf pertama artikel akan ditampilkan di sini...';
    const page1RestParagraphs = page1Content.slice(1);

    return (
        <div className="h-full overflow-y-auto bg-gray-100 dark:bg-[#0d0d0f] rounded-2xl border border-gray-200/80 dark:border-[#25252d] shadow-inner text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-100 p-3 sm:p-4">
            {/* Indicator Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200/60 dark:border-[#1c1c21] bg-white/95 dark:bg-[#121215]/95 backdrop-blur-md px-4 py-2 text-xs rounded-xl mb-4 shadow-xs">
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[10px]">Real-time Live Preview</span>
                </div>
                <span className="rounded-full bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 text-[10px] font-extrabold text-blue-700 dark:text-blue-400">
                    {activeTab === 1 ? 'Info & Kartu Artikel' : activeTab === 2 ? 'Halaman Kiri Buku' : 'Halaman Kanan Buku'}
                </span>
            </div>

            {/* TAB 1: CARD PREVIEW */}
            {activeTab === 1 && (
                <div className="my-4 space-y-4">
                    <div className="relative group rounded-[1.5rem] bg-[#0c0d0e] text-white p-6 overflow-hidden shadow-2xl min-h-[320px] flex flex-col justify-between border border-white/10">
                        {image ? (
                            <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-95" />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c]/90 via-[#08090c]/50 via-55% to-transparent" />

                        <div className="relative z-10 flex items-center justify-between">
                            <span className="text-[11px] font-mono tracking-widest text-gray-200 uppercase">{tagUpper}</span>
                        </div>

                        <div className="relative z-10 space-y-3 pt-8">
                            <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight">
                                {title || 'Judul Artikel Akan Ditampilkan Di Sini'}
                            </h3>
                            <p className="text-xs text-gray-200 font-normal leading-relaxed max-w-xl">
                                {page1Content[0]?.slice(0, 120) || 'Deskripsi singkat artikel...'}
                                {(page1Content[0]?.length || 0) > 120 ? '...' : ''}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2 & 3: DUAL-PAGE BOOK SPREAD */}
            {(activeTab === 2 || activeTab === 3) && (
                <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#16161a] shadow-xl border border-gray-200/80 dark:border-[#25252d] my-2">
                    {/* Book fold shadow */}
                    <div
                        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-10 -translate-x-1/2 z-10 md:block"
                        style={{
                            background: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 30%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.02) 70%, transparent 100%)',
                        }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200/80 dark:divide-[#25252d]">
                        {/* LEFT PAGE (HALAMAN KIRI) */}
                        <article className="p-5 sm:p-6 space-y-4">
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                <span className="font-bold text-blue-600">{tagUpper}</span>
                                <span>{dateUpper}</span>
                            </div>

                            <div className="relative h-36 sm:h-44 w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-[#202028] border border-gray-200/80 dark:border-[#2b2b35] flex items-center justify-center shadow-inner">
                                {image ? (
                                    <img src={image} alt="Halaman Kiri" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center gap-1.5 text-gray-400">
                                        <ImageIcon className="h-8 w-8" />
                                        <span className="text-[10px] font-semibold">Gambar Halaman Kiri</span>
                                    </div>
                                )}
                            </div>

                            <h2 className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
                                {page1Title || title || 'Judul Halaman Kiri'}
                            </h2>

                            <div className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed space-y-2">
                                <p>
                                    <span className="float-left text-3xl font-black text-gray-900 dark:text-white leading-none mr-2 mt-0.5 uppercase">
                                        {firstLetter}
                                    </span>
                                    {restOfFirstParagraph}
                                </p>
                                {page1RestParagraphs.map((p, i) => (
                                    <p key={i} className="text-xs text-gray-500 dark:text-gray-400">{p}</p>
                                ))}
                            </div>
                        </article>

                        {/* RIGHT PAGE (HALAMAN KANAN) */}
                        <article className="p-5 sm:p-6 space-y-4 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                    <span className="font-bold text-emerald-600">{page2Tag || 'DOKUMENTASI & LANJUTAN'}</span>
                                </div>

                                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                                    {page2Title || 'Judul Halaman Kanan'}
                                </h2>

                                <div className="relative h-36 sm:h-44 w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-[#202028] border border-gray-200/80 dark:border-[#2b2b35] flex items-center justify-center shadow-inner">
                                    {secondaryImage ? (
                                        <img src={secondaryImage} alt="Halaman Kanan" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1.5 text-gray-400">
                                            <ImageIcon className="h-8 w-8" />
                                            <span className="text-[10px] font-semibold">Gambar Halaman Kanan</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    {page2Content.length > 0 ? page2Content.map((p, i) => (
                                        <p key={i} className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{p}</p>
                                    )) : (
                                        <p className="text-xs text-gray-400 leading-relaxed">Isi paragraf lanjutan halaman kanan akan ditampilkan di sini...</p>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-[#25252d]">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                    UPTD Kebudayaan Kota Bandung
                                </span>
                            </div>
                        </article>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ArtikelAdmin({ artikels = [], stats = { total: 0, published: 0, draft: 0, archived: 0 }, filters = {} }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [titleQuery, setTitleQuery] = useState(filters.title || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [tagFilter, setTagFilter] = useState(filters.tag || '');
    const [activeRowMenu, setActiveRowMenu] = useState<number | null>(null);

    const [viewMode, setViewMode] = useState<'table' | 'create' | 'edit'>('table');
    const [activeSectionTab, setActiveSectionTab] = useState<1 | 2 | 3>(1);
    const [selectedArtikel, setSelectedArtikel] = useState<ArtikelData | null>(null);

    // File preview states
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [secondaryImagePreview, setSecondaryImagePreview] = useState<string | null>(null);

    // Tags input state
    const [tagInput, setTagInput] = useState('');

    // Form data
    const { data, setData, post, processing, reset } = useForm({
        title: '',
        tag: 'EDUKASI',
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase(),
        description: '',
        status: 'Published' as 'Published' | 'Draft' | 'Archived',
        href: '',
        tags: [] as string[],
        image: null as File | string | null,
        remove_image: false,
        secondary_image: null as File | string | null,
        remove_secondary_image: false,
        page1_title: '',
        page1_content: [''] as string[],
        page2_tag: 'DOKUMENTASI & LANJUTAN',
        page2_title: '',
        page2_content: [''] as string[],
        recap_title: '',
        recap_badge: 'Edukasi',
        _method: 'POST',
    });

    const handleFilter = () => {
        router.get(
            '/admin/artikel',
            { search: searchQuery, title: titleQuery, status: statusFilter, tag: tagFilter },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleReset = () => {
        setSearchQuery('');
        setTitleQuery('');
        setStatusFilter('');
        setTagFilter('');
        router.get('/admin/artikel', {}, { preserveState: true, preserveScroll: true });
    };

    const handleCreate = () => {
        reset();
        setData({
            title: '',
            tag: 'EDUKASI',
            date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase(),
            description: '',
            status: 'Published',
            href: '',
            tags: [],
            image: null,
            remove_image: false,
            secondary_image: null,
            remove_secondary_image: false,
            page1_title: '',
            page1_content: [''],
            page2_tag: 'DOKUMENTASI & LANJUTAN',
            page2_title: '',
            page2_content: [''],
            recap_title: '',
            recap_badge: 'Edukasi',
            _method: 'POST',
        });
        setImagePreview(null);
        setSecondaryImagePreview(null);
        setSelectedArtikel(null);
        setActiveSectionTab(1);
        setViewMode('create');
    };

    const handleEdit = (item: ArtikelData) => {
        setSelectedArtikel(item);
        setData({
            title: item.title,
            tag: item.tag || 'EDUKASI',
            date: item.date || '',
            description: item.description || '',
            status: item.status,
            href: item.href || '',
            tags: item.tags || [],
            image: item.image,
            remove_image: false,
            secondary_image: item.secondary_image,
            remove_secondary_image: false,
            page1_title: item.page1_title || item.title,
            page1_content: (item.page1_content && item.page1_content.length > 0) ? item.page1_content : [''],
            page2_tag: item.page2_tag || 'DOKUMENTASI & LANJUTAN',
            page2_title: item.page2_title || '',
            page2_content: (item.page2_content && item.page2_content.length > 0) ? item.page2_content : [''],
            recap_title: item.recap_title || '',
            recap_badge: item.recap_badge || 'Edukasi',
            _method: 'POST',
        });
        setImagePreview(item.image);
        setSecondaryImagePreview(item.secondary_image);
        setActiveSectionTab(1);
        setViewMode('edit');
        setActiveRowMenu(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            router.delete(`/admin/artikel/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setActiveRowMenu(null);
                    if (viewMode !== 'table') setViewMode('table');
                },
            });
        }
    };

    const handleFileChange = (field: 'image' | 'secondary_image', file: File | null) => {
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        if (field === 'image') {
            setData('image', file);
            setData('remove_image', false);
            setImagePreview(previewUrl);
        } else {
            setData('secondary_image', file);
            setData('remove_secondary_image', false);
            setSecondaryImagePreview(previewUrl);
        }
    };

    const handleRemoveFile = (field: 'image' | 'secondary_image') => {
        if (field === 'image') {
            setData('image', null);
            setData('remove_image', true);
            setImagePreview(null);
        } else {
            setData('secondary_image', null);
            setData('remove_secondary_image', true);
            setSecondaryImagePreview(null);
        }
    };

    const handleAddTag = () => {
        const trimmed = tagInput.trim();
        if (trimmed && !data.tags.includes(trimmed)) {
            setData('tags', [...data.tags, trimmed]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (index: number) => {
        setData('tags', data.tags.filter((_, i) => i !== index));
    };

    const handlePage1ContentChange = (index: number, value: string) => {
        const newContent = [...data.page1_content];
        newContent[index] = value;
        setData('page1_content', newContent);
    };

    const handleAddPage1Paragraph = () => {
        setData('page1_content', [...data.page1_content, '']);
    };

    const handleRemovePage1Paragraph = (index: number) => {
        if (data.page1_content.length <= 1) return;
        setData('page1_content', data.page1_content.filter((_, i) => i !== index));
    };

    const handlePage2ContentChange = (index: number, value: string) => {
        const newContent = [...data.page2_content];
        newContent[index] = value;
        setData('page2_content', newContent);
    };

    const handleAddPage2Paragraph = () => {
        setData('page2_content', [...data.page2_content, '']);
    };

    const handleRemovePage2Paragraph = (index: number) => {
        if (data.page2_content.length <= 1) return;
        setData('page2_content', data.page2_content.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (viewMode === 'create') {
            post('/admin/artikel', { preserveScroll: true, onSuccess: () => setViewMode('table') });
        } else if (viewMode === 'edit' && selectedArtikel) {
            post(`/admin/artikel/${selectedArtikel.id}`, { preserveScroll: true, onSuccess: () => setViewMode('table') });
        }
    };

    // ─── TABLE VIEW ───────────────────────────────────────────
    if (viewMode === 'table') {
        return (
            <>
                <Head title="Kelola Artikel — Admin UPTD Kebudayaan" />

                <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#09090b] text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 space-y-6 pb-16 font-sans">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Artikel</h1>
                            <p className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-400 mt-1">
                                Kelola artikel, opini budaya, dan publikasi karya seni
                            </p>
                        </div>

                        <button
                            onClick={handleCreate}
                            className="inline-flex items-center gap-2 rounded-full bg-[#18181b] dark:bg-white px-5 py-2.5 text-xs font-bold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition cursor-pointer"
                        >
                            <Plus className="h-4 w-4 stroke-[3]" />
                            <span>Buat Artikel</span>
                        </button>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-[#1c1c21] text-gray-600 dark:text-gray-300">
                                <FileText className="h-4.5 w-4.5" />
                            </div>
                            <div className="mt-4">
                                <p className="text-xs font-semibold text-gray-500">Total Artikel</p>
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
                                    placeholder="Cari artikel..."
                                    className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">Judul</label>
                                <input
                                    type="text"
                                    value={titleQuery}
                                    onChange={(e) => setTitleQuery(e.target.value)}
                                    placeholder="Cari judul artikel"
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
                                <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">Filter Tag</label>
                                <input
                                    type="text"
                                    value={tagFilter}
                                    onChange={(e) => setTagFilter(e.target.value)}
                                    placeholder="Filter tag/kategori"
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
                                        <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white">Judul Artikel</th>
                                        <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white">Status</th>
                                        <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white">Tag</th>
                                        <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white">Tanggal</th>
                                        <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-[#1c1c21]">
                                    {artikels.length > 0 ? (
                                        artikels.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1a20] transition-colors">
                                                <td className="py-4 px-5">
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-[#1c1c21] overflow-hidden">
                                                            {item.image ? (
                                                                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                                                            ) : (
                                                                <FileText className="h-5 w-5 text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight">{item.title}</h4>
                                                            <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{item.description || item.tag}</p>
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

                                                <td className="py-4 px-5 text-xs font-semibold text-gray-700 dark:text-gray-300">{item.tag}</td>
                                                <td className="py-4 px-5 text-xs font-medium text-gray-500 dark:text-gray-400">{item.date}</td>

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
                                                                    Edit Artikel
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
                                                Belum ada artikel tercatat.
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
            <Head title={`${isCreate ? 'Buat' : 'Edit'} Artikel — Admin UPTD Kebudayaan`} />

            <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#09090b] text-gray-800 dark:text-gray-200 font-sans p-4 sm:p-6 lg:p-8 space-y-5 pb-16">
                {/* Top Header Bar */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setViewMode('table')}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#16161a] text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition cursor-pointer"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <div>
                            <h1 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">
                                {isCreate ? 'Buat Artikel Baru' : `Edit: ${selectedArtikel?.title || ''}`}
                            </h1>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                                {isCreate ? 'Buat artikel baru dalam format buku 2 halaman' : 'Perbarui isi artikel'}
                            </p>
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
                            {processing ? 'Menyimpan...' : 'Simpan Artikel'}
                        </button>
                    </div>
                </div>

                {/* Split Screen Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* LEFT COLUMN: FORM */}
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
                                <span>Bagian 1: Info Utama</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveSectionTab(2)}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-bold transition cursor-pointer ${
                                    activeSectionTab === 2 ? 'bg-white dark:bg-[#25252d] text-gray-900 dark:text-white shadow-xs' : 'text-gray-500'
                                }`}
                            >
                                <Layers className="h-3.5 w-3.5" />
                                <span>Bagian 2: Halaman Kiri</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveSectionTab(3)}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-bold transition cursor-pointer ${
                                    activeSectionTab === 3 ? 'bg-white dark:bg-[#25252d] text-gray-900 dark:text-white shadow-xs' : 'text-gray-500'
                                }`}
                            >
                                <Grid className="h-3.5 w-3.5" />
                                <span>Bagian 3: Halaman Kanan</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* BAGIAN 1: INFO UTAMA */}
                            {activeSectionTab === 1 && (
                                <div className="space-y-5 animate-in fade-in duration-200">
                                    <div className="rounded-xl border border-blue-100 bg-blue-50/60 dark:border-blue-900/30 dark:bg-blue-950/20 p-3.5 text-xs text-blue-800 dark:text-blue-300">
                                        <strong>Bagian 1 — Info Utama:</strong> Judul, tag/kategori, tanggal, deskripsi, status, dan pill tags untuk kartu artikel.
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Judul Artikel *</label>
                                            <input
                                                type="text"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                placeholder="Judul artikel..."
                                                required
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Tag / Kategori</label>
                                            <input
                                                type="text"
                                                value={data.tag}
                                                onChange={(e) => setData('tag', e.target.value)}
                                                placeholder="cth: EDUKASI MUSIK"
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Tanggal</label>
                                            <input
                                                type="text"
                                                value={data.date}
                                                onChange={(e) => setData('date', e.target.value)}
                                                placeholder="cth: 01 AGUSTUS 2026"
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Status *</label>
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

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Link Terkait (href)</label>
                                            <input
                                                type="text"
                                                value={data.href}
                                                onChange={(e) => setData('href', e.target.value)}
                                                placeholder="/fasilitas/bandung-creative-hub"
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Deskripsi Singkat</label>
                                            <textarea
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                placeholder="Deskripsi singkat untuk kartu artikel..."
                                                rows={3}
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Pill Tags</label>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {data.tags.map((t, i) => (
                                                    <span key={i} className="inline-flex items-center gap-1 rounded-full border border-gray-200 dark:border-[#25252d] bg-gray-50 dark:bg-[#1a1a20] px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                                                        {t}
                                                        <button type="button" onClick={() => handleRemoveTag(i)} className="text-gray-400 hover:text-red-500 cursor-pointer">
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={tagInput}
                                                    onChange={(e) => setTagInput(e.target.value)}
                                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                                                    placeholder="Tambah tag lalu Enter"
                                                    className="flex-1 rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2 text-xs text-gray-900 dark:text-white"
                                                />
                                                <button type="button" onClick={handleAddTag} className="rounded-lg bg-gray-100 dark:bg-[#1c1c22] px-3 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition cursor-pointer">
                                                    <Plus className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Recap Title</label>
                                            <input
                                                type="text"
                                                value={data.recap_title}
                                                onChange={(e) => setData('recap_title', e.target.value)}
                                                placeholder="Ringkasan judul pendek"
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Recap Badge</label>
                                            <input
                                                type="text"
                                                value={data.recap_badge}
                                                onChange={(e) => setData('recap_badge', e.target.value)}
                                                placeholder="cth: Trending Hub"
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* BAGIAN 2: HALAMAN KIRI BUKU */}
                            {activeSectionTab === 2 && (
                                <div className="space-y-5 animate-in fade-in duration-200">
                                    <div className="rounded-xl border border-blue-100 bg-blue-50/60 dark:border-blue-900/30 dark:bg-blue-950/20 p-3.5 text-xs text-blue-800 dark:text-blue-300">
                                        <strong>Bagian 2 — Halaman Kiri Buku:</strong> Gambar utama, judul halaman kiri, dan paragraf-paragraf isi konten.
                                    </div>

                                    {/* Image Upload */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Gambar Utama (Halaman Kiri)</label>
                                        {imagePreview ? (
                                            <div className="relative max-w-sm h-48 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#25252d]">
                                                <img src={imagePreview} alt="Image Preview" className="h-full w-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center gap-2">
                                                    <label className="cursor-pointer rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-900 shadow-md hover:bg-gray-100 transition">
                                                        Ganti
                                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('image', e.target.files?.[0] || null)} />
                                                    </label>
                                                    <button type="button" onClick={() => handleRemoveFile('image')} className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-md hover:bg-red-700 transition cursor-pointer">
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center h-40 w-full max-w-sm rounded-2xl border-2 border-dashed border-gray-200 dark:border-[#25252d] bg-gray-50 dark:bg-[#16161a] hover:bg-gray-100 transition cursor-pointer">
                                                <Upload className="h-7 w-7 text-gray-400 mb-2" />
                                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Upload Gambar Halaman Kiri</span>
                                                <span className="text-[10px] text-gray-400 mt-1">PNG, JPG max 5MB</span>
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('image', e.target.files?.[0] || null)} />
                                            </label>
                                        )}
                                    </div>

                                    {/* Page1 Title */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Judul Halaman Kiri</label>
                                        <input
                                            type="text"
                                            value={data.page1_title}
                                            onChange={(e) => setData('page1_title', e.target.value)}
                                            placeholder="Judul yang tampil di halaman kiri buku..."
                                            className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                        />
                                    </div>

                                    {/* Page1 Content Paragraphs */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">Paragraf Halaman Kiri</label>
                                            <button
                                                type="button"
                                                onClick={handleAddPage1Paragraph}
                                                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                                            >
                                                <Plus className="h-3 w-3" /> Tambah Paragraf
                                            </button>
                                        </div>
                                        {data.page1_content.map((paragraph, idx) => (
                                            <div key={idx} className="relative">
                                                <textarea
                                                    value={paragraph}
                                                    onChange={(e) => handlePage1ContentChange(idx, e.target.value)}
                                                    placeholder={`Paragraf ${idx + 1}...`}
                                                    rows={3}
                                                    className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white pr-10"
                                                />
                                                {data.page1_content.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemovePage1Paragraph(idx)}
                                                        className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition cursor-pointer"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* BAGIAN 3: HALAMAN KANAN BUKU */}
                            {activeSectionTab === 3 && (
                                <div className="space-y-5 animate-in fade-in duration-200">
                                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 dark:border-emerald-900/30 dark:bg-emerald-950/20 p-3.5 text-xs text-emerald-800 dark:text-emerald-300">
                                        <strong>Bagian 3 — Halaman Kanan Buku:</strong> Tag lanjutan, judul halaman kanan, gambar sekunder, dan paragraf isi lanjutan.
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Tag Halaman Kanan</label>
                                        <input
                                            type="text"
                                            value={data.page2_tag}
                                            onChange={(e) => setData('page2_tag', e.target.value)}
                                            placeholder="cth: DOKUMENTASI & LANJUTAN"
                                            className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Judul Halaman Kanan</label>
                                        <input
                                            type="text"
                                            value={data.page2_title}
                                            onChange={(e) => setData('page2_title', e.target.value)}
                                            placeholder="Judul lanjutan artikel di halaman kanan..."
                                            className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white"
                                        />
                                    </div>

                                    {/* Secondary Image Upload */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Gambar Sekunder (Halaman Kanan)</label>
                                        {secondaryImagePreview ? (
                                            <div className="relative max-w-sm h-48 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#25252d]">
                                                <img src={secondaryImagePreview} alt="Secondary Preview" className="h-full w-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center gap-2">
                                                    <label className="cursor-pointer rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-900 shadow-md hover:bg-gray-100 transition">
                                                        Ganti
                                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('secondary_image', e.target.files?.[0] || null)} />
                                                    </label>
                                                    <button type="button" onClick={() => handleRemoveFile('secondary_image')} className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-md hover:bg-red-700 transition cursor-pointer">
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center h-40 w-full max-w-sm rounded-2xl border-2 border-dashed border-gray-200 dark:border-[#25252d] bg-gray-50 dark:bg-[#16161a] hover:bg-gray-100 transition cursor-pointer">
                                                <Upload className="h-7 w-7 text-gray-400 mb-2" />
                                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Upload Gambar Halaman Kanan</span>
                                                <span className="text-[10px] text-gray-400 mt-1">PNG, JPG max 5MB</span>
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('secondary_image', e.target.files?.[0] || null)} />
                                            </label>
                                        )}
                                    </div>

                                    {/* Page2 Content Paragraphs */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">Paragraf Halaman Kanan</label>
                                            <button
                                                type="button"
                                                onClick={handleAddPage2Paragraph}
                                                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                                            >
                                                <Plus className="h-3 w-3" /> Tambah Paragraf
                                            </button>
                                        </div>
                                        {data.page2_content.map((paragraph, idx) => (
                                            <div key={idx} className="relative">
                                                <textarea
                                                    value={paragraph}
                                                    onChange={(e) => handlePage2ContentChange(idx, e.target.value)}
                                                    placeholder={`Paragraf ${idx + 1}...`}
                                                    rows={3}
                                                    className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white pr-10"
                                                />
                                                {data.page2_content.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemovePage2Paragraph(idx)}
                                                        className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition cursor-pointer"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
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

                    {/* RIGHT COLUMN: STICKY LIVE PREVIEW */}
                    <div className="lg:col-span-6 xl:col-span-6 sticky top-6 h-[calc(100vh-6rem)]">
                        <ArtikelPreview
                            title={data.title}
                            tag={data.tag}
                            date={data.date}
                            image={imagePreview}
                            secondaryImage={secondaryImagePreview}
                            page1Title={data.page1_title}
                            page1Content={data.page1_content.filter(p => p.trim() !== '')}
                            page2Tag={data.page2_tag}
                            page2Title={data.page2_title}
                            page2Content={data.page2_content.filter(p => p.trim() !== '')}
                            activeTab={activeSectionTab}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
