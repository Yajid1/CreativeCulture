import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    AlertTriangle,
    Check,
    Eye,
    FileText,
    Loader2,
    MoreVertical,
    Plus,
    RotateCcw,
    Search,
} from 'lucide-react';

interface Article {
    id: number;
    title: string;
    description: string;
    status: 'Published' | 'Draft' | 'Archived';
    category: string;
    lastUpdated: string;
}

const initialArticles: Article[] = [
    {
        id: 1,
        title: 'Pesona Batik Sunda: History & Ragam Motif Legendaris',
        description: 'Mengenal keunikan filosofi dan makna di balik motif ragam hias batik khas Jawa Barat...',
        status: 'Published',
        category: 'Seni Rupa & Kriya',
        lastUpdated: '07/22/2026',
    },
    {
        id: 2,
        title: 'Revitalisasi Seni Tari Jaipong di Era Modern',
        description: 'Strategi pelestarian tarian tradisional Jawa Barat melalui kolaborasi musik kontemporer...',
        status: 'Published',
        category: 'Seni Pertunjukan',
        lastUpdated: '07/22/2026',
    },
    {
        id: 3,
        title: 'Panduan Konservasi Alat Musik Angklung Digital',
        description: 'Teknologi pemetaan frekuensi nada bambu untuk studio rekaman musik tradisional...',
        status: 'Draft',
        category: 'Teknologi Kebudayaan',
        lastUpdated: '07/20/2026',
    },
    {
        id: 4,
        title: 'Arsitektur Rumah Adat Sunda & Filosofi Bangunan',
        description: 'Struktur bangunan panggung kayu ramah gempa warisan nenek moyang...',
        status: 'Published',
        category: 'Cagar Budaya',
        lastUpdated: '07/18/2026',
    },
    {
        id: 5,
        title: 'Arsip Wayang Golek Parahyangan Abad Ke-19',
        description: 'Dokumentasi koleksi ukiran karakter tokoh pewayangan legendaris...',
        status: 'Archived',
        category: 'Arsip & Museum',
        lastUpdated: '07/15/2026',
    },
];

export default function ArtikelAdmin() {
    const [articles] = useState<Article[]>(initialArticles);
    const [searchQuery, setSearchQuery] = useState('');
    const [titleQuery, setTitleQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [activeRowMenu, setActiveRowMenu] = useState<number | null>(null);

    const filteredArticles = articles.filter((article) => {
        const matchesSearch =
            searchQuery === '' ||
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTitle =
            titleQuery === '' ||
            article.title.toLowerCase().includes(titleQuery.toLowerCase());

        const matchesStatus =
            statusFilter === '' || article.status === statusFilter;

        const matchesCategory =
            categoryFilter === '' ||
            article.category.toLowerCase().includes(categoryFilter.toLowerCase());

        return matchesSearch && matchesTitle && matchesStatus && matchesCategory;
    });

    const handleReset = () => {
        setSearchQuery('');
        setTitleQuery('');
        setStatusFilter('');
        setCategoryFilter('');
    };

    return (
        <>
            <Head title="Kelola Artikel — Admin UPTD Kebudayaan" />

            <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#09090b] text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 space-y-6 pb-16 font-sans">
                {/* 1. TITLE HEADER & CREATE BUTTON */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                            Artikel
                        </h1>
                        <p className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-400 mt-1">
                            Kelola artikel, berita budaya, dan publikasi karya seni
                        </p>
                    </div>

                    <button className="inline-flex items-center gap-2 rounded-full bg-[#18181b] dark:bg-white px-5 py-2.5 text-xs font-bold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition self-start sm:self-auto">
                        <Plus className="h-4 w-4 stroke-[3]" />
                        <span>Buat Artikel</span>
                    </button>
                </div>

                {/* 2. STAT CARDS ROW */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* Card 1: Total Artikel */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs transition hover:shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-[#1c1c21] text-gray-600 dark:text-gray-300">
                                <FileText className="h-4.5 w-4.5" />
                            </div>
                            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 tracking-tighter">:::</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Total Artikel
                            </p>
                            <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
                                24
                            </h3>
                        </div>
                        <FileText className="absolute -right-3 -bottom-3 h-20 w-20 text-gray-100/60 dark:text-gray-800/10 pointer-events-none stroke-[1]" />
                    </div>

                    {/* Card 2: Published */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs transition hover:shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-[#1c1c21] text-gray-600 dark:text-gray-300">
                                <Check className="h-4.5 w-4.5 text-gray-600" />
                            </div>
                            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 tracking-tighter">:::</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Published
                            </p>
                            <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
                                18
                            </h3>
                        </div>
                        <Check className="absolute -right-3 -bottom-3 h-20 w-20 text-gray-100/60 dark:text-gray-800/10 pointer-events-none stroke-[1]" />
                    </div>

                    {/* Card 3: Draft */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs transition hover:shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-[#1c1c21] text-gray-600 dark:text-gray-300">
                                <Loader2 className="h-4.5 w-4.5 text-gray-500" />
                            </div>
                            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 tracking-tighter">:::</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Draft
                            </p>
                            <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
                                4
                            </h3>
                        </div>
                        <Loader2 className="absolute -right-3 -bottom-3 h-20 w-20 text-gray-100/60 dark:text-gray-800/10 pointer-events-none stroke-[1]" />
                    </div>

                    {/* Card 4: Archived */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs transition hover:shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-[#1c1c21] text-gray-600 dark:text-gray-300">
                                <AlertTriangle className="h-4.5 w-4.5 text-gray-600" />
                            </div>
                            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 tracking-tighter">:::</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Archived
                            </p>
                            <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
                                2
                            </h3>
                        </div>
                        <AlertTriangle className="absolute -right-3 -bottom-3 h-20 w-20 text-gray-100/60 dark:text-gray-800/10 pointer-events-none stroke-[1]" />
                    </div>
                </div>

                {/* 3. FILTER / SEARCH BOX SECTION */}
                <div className="rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search Input */}
                        <div>
                            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari artikel..."
                                className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#121215] focus:ring-2 focus:ring-gray-300 transition"
                            />
                        </div>

                        {/* Title Input */}
                        <div>
                            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">
                                Judul
                            </label>
                            <input
                                type="text"
                                value={titleQuery}
                                onChange={(e) => setTitleQuery(e.target.value)}
                                placeholder="Cari judul artikel"
                                className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#121215] focus:ring-2 focus:ring-gray-300 transition"
                            />
                        </div>

                        {/* Status Select */}
                        <div>
                            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">
                                Filter Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-600 dark:text-gray-300 focus:bg-white dark:focus:bg-[#121215] focus:ring-2 focus:ring-gray-300 transition"
                            >
                                <option value="">Semua status</option>
                                <option value="Published">Published</option>
                                <option value="Draft">Draft</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>

                        {/* Category Input */}
                        <div>
                            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">
                                Filter Kategori
                            </label>
                            <input
                                type="text"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                placeholder="Filter kategori"
                                className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#121215] focus:ring-2 focus:ring-gray-300 transition"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-2.5 pt-3">
                        <button className="inline-flex items-center gap-2 rounded-full bg-[#18181b] dark:bg-white px-5 py-2 text-xs font-bold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition shadow-xs">
                            <Search className="h-3.5 w-3.5 stroke-[2.5]" />
                            <span>Filter</span>
                        </button>

                        <button
                            onClick={handleReset}
                            className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#16161a] px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f24] transition"
                        >
                            <RotateCcw className="h-3.5 w-3.5" />
                            <span>Reset</span>
                        </button>
                    </div>
                </div>

                {/* 4. DATA TABLE SECTION */}
                <div className="rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-[#1c1c21]">
                                    <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white">
                                        Judul Artikel
                                    </th>
                                    <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white">
                                        Status
                                    </th>
                                    <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white">
                                        Kategori
                                    </th>
                                    <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white">
                                        Tanggal Publish
                                    </th>
                                    <th className="py-4 px-5 text-xs font-bold text-gray-900 dark:text-white text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-[#1c1c21]">
                                {filteredArticles.map((article) => (
                                    <tr
                                        key={article.id}
                                        className="hover:bg-gray-50/50 dark:hover:bg-[#1a1a20] transition-colors group"
                                    >
                                        <td className="py-4 px-5">
                                            <div className="flex items-center gap-3.5">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-[#1c1c21] border border-gray-200/50 dark:border-[#25252d] text-gray-400 group-hover:text-gray-600 transition">
                                                    <FileText className="h-5 w-5 stroke-[1.5]" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight">
                                                        {article.title}
                                                    </h4>
                                                    <p className="text-[11px] text-gray-400 dark:text-gray-400 mt-1 line-clamp-1">
                                                        {article.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4 px-5">
                                            {article.status === 'Published' && (
                                                <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/40">
                                                    Published
                                                </span>
                                            )}
                                            {article.status === 'Draft' && (
                                                <span className="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-950/60 px-3.5 py-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800/40">
                                                    Draft
                                                </span>
                                            )}
                                            {article.status === 'Archived' && (
                                                <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-3.5 py-1 text-[11px] font-bold text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                                                    Archived
                                                </span>
                                            )}
                                        </td>

                                        <td className="py-4 px-5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                                            {article.category}
                                        </td>

                                        <td className="py-4 px-5 text-xs font-medium text-gray-500 dark:text-gray-400">
                                            {article.lastUpdated}
                                        </td>

                                        <td className="py-4 px-5 text-right relative">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition py-1 px-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f1f25]">
                                                    <Eye className="h-3.5 w-3.5 stroke-[2.5]" />
                                                    <span>View</span>
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        setActiveRowMenu(
                                                            activeRowMenu === article.id ? null : article.id
                                                        )
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1c1c21] transition"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>

                                                {activeRowMenu === article.id && (
                                                    <div className="absolute right-5 top-12 z-20 w-36 rounded-xl border border-gray-100 dark:border-[#25252d] bg-white dark:bg-[#16161a] p-1.5 shadow-lg text-left">
                                                        <button className="w-full text-left px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#202026] rounded-lg transition">
                                                            Edit Artikel
                                                        </button>
                                                        <button className="w-full text-left px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition">
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
