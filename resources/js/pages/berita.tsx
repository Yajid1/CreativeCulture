import { Head, Link } from '@inertiajs/react';
import { useEffect, useState, useCallback } from 'react';

type Article = {
    id: number;
    tag: string;
    date: string;
    title: string;
    image: string;
    content: string[];
    related: {
        title: string;
        image: string;
        excerpt: string;
        tag: string;
    };
};

const articlesList: Article[] = [
    {
        id: 1,
        tag: 'Kebijakan',
        date: '05 Mei 2025',
        title: 'Pemkot Yogyakarta tak berdaya, siswa terancam kehilangan hak makan gratis?',
        image: '/images/DSC01753.jpg',
        content: [
            'Program Makan Bergizi Gratis di Kotagede, Yogyakarta dihentikan tanpa penjelasan resmi. Kepala Badan Gizi Kota Yogyakarta menyebut penghentian berkaitan dengan pendanaan yang belum terselesaikan.',
            'Sejumlah siswa kehilangan hak atas makanan bergizi sejak layanan ini tiba-tiba dihentikan pihak penyelenggara.',
            'Istana melalui Menteri Sekretaris Negara menegaskan bahwa anggaran adalah batas standar, bukan kewajiban untuk dihabiskan sepenuhnya.',
        ],
        related: {
            title: 'RI dan Norwegia bahas kerja sama baru hadapi perubahan iklim',
            image: '/images/DSC01757.jpg',
            excerpt: 'Kesepakatan kerja sama diharapkan menjadi solusi penyelesaian program mengatasi kerusakan lingkungan antar kedua negara.',
            tag: 'INTERNASIONAL',
        },
    },
    {
        id: 2,
        tag: 'Kebudayaan',
        date: '12 Juni 2025',
        title: 'Pusat Kreatif Bandung Timur Resmi Dibuka untuk Umum dan Pelaku Seni',
        image: '/images/DSC01758.jpg',
        content: [
            'Unit Pelaksana Teknis Daerah (UPTD) Kebudayaan Kota Bandung meresmikan pembukaan Pusat Kreatif Bandung Timur sebagai ruang ekspresi baru bagi seniman dan masyarakat.',
            'Fasilitas ini dilengkapi dengan ruang pertunjukan berkapasitas 200 orang, galeri seni, serta ruang workshop interaktif.',
            'Program kolaborasi lintas generasi ini disiapkan untuk memperkuat ekosistem kebudayaan lokal.',
        ],
        related: {
            title: 'Festival Seni Budaya Bandung Timur Siap Digelar Agustus 2026',
            image: '/images/DSC01753.jpg',
            excerpt: 'Menampilkan berbagai macam kesenian tradisional Sunda serta pameran kerajinan tangan lokal.',
            tag: 'FESTIVAL',
        },
    },
    {
        id: 3,
        tag: 'Program',
        date: '18 Juli 2025',
        title: 'Kolaborasi Seniman Muda & Maestro Seni Tradisional dalam "Senandung Warisan"',
        image: '/images/DSC01757.jpg',
        content: [
            'Program Senandung Warisan mempertemukan seniman muda kontemporer dengan maestro seni tradisional Sunda untuk merancang karya kolaboratif.',
            'Sebanyak 20 pasang seniman telah terpilih dan akan memamerkan hasil karya mereka di Bandung Creative Hub.',
            'Inisiatif ini dirancang sebagai jembatan regenerasi pelestarian seni budaya Sunda secara berkelanjutan.',
        ],
        related: {
            title: 'Kampung Wisata Pasir Kunci Raih Penghargaan Desa Budaya Nasional',
            image: '/images/DSC01758.jpg',
            excerpt: 'Pengakuan nasional diberikan atas konsistensi warga melestarikan tradisi lisan dan permainan rakyat.',
            tag: 'AWARDEE',
        },
    },
];

export default function Berita() {
    const [clockTime, setClockTime] = useState('');
    const [clockDate, setClockDate] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookOpen, setIsBookOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

    const totalArticles = articlesList.length;
    const currentArticle = articlesList[currentIndex];

    useEffect(() => {
        function updateClock() {
            const now = new Date();
            const h = now.getHours() % 12 || 12;
            const m = String(now.getMinutes()).padStart(2, '0');
            const mer = now.getHours() >= 12 ? 'pm' : 'am';
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            setClockTime(`${h}:${m}${mer}`);
            setClockDate(`${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`);
        }
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    const goToArticle = useCallback((direction: 'next' | 'prev') => {
        if (isFlipping) return;
        const next = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (next < 0 || next >= totalArticles) return;

        setFlipDirection(direction);
        setIsFlipping(true);

        setTimeout(() => {
            setCurrentIndex(next);
            setTimeout(() => setIsFlipping(false), 400);
        }, 350);
    }, [currentIndex, isFlipping, totalArticles]);

    useEffect(() => {
        if (!isBookOpen) return;
        function handleKey(e: KeyboardEvent) {
            if (e.key === 'ArrowRight') goToArticle('next');
            if (e.key === 'ArrowLeft') goToArticle('prev');
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isBookOpen, goToArticle]);

    const firstParagraph = currentArticle.content[0] || '';
    const firstLetter = firstParagraph.charAt(0);
    const restOfFirstParagraph = firstParagraph.slice(1);
    const restParagraphs = currentArticle.content.slice(1);

    return (
        <>
            <Head title="Berita Kebudayaan — UPTD Kebudayaan" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');

                .font-handwriting {
                    font-family: 'Caveat', cursive, serif;
                }
                .font-cover-title {
                    font-family: 'Playfair Display', Georgia, serif;
                }

                .book-cover-perspective {
                    perspective: 1600px;
                }

                .book-cover-card {
                    transform-style: preserve-3d;
                    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .book-cover-card:hover {
                    transform: rotateY(-8deg) rotateX(4deg) scale(1.02);
                    box-shadow: -25px 35px 50px -10px rgba(0, 0, 0, 0.35);
                }

                .book-spread-container {
                    perspective: 2000px;
                }
                .book-spread-card {
                    transform-origin: center center;
                    transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1.000), opacity 0.35s ease;
                }
                .flip-next {
                    transform: rotateY(-18deg) scale(0.97);
                    opacity: 0.5;
                }
                .flip-prev {
                    transform: rotateY(18deg) scale(0.97);
                    opacity: 0.5;
                }
                .nav-btn-circle {
                    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .nav-btn-circle:hover:not(:disabled) {
                    transform: scale(1.1);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
                }
                .nav-btn-circle:disabled {
                    opacity: 0.25;
                    cursor: not-allowed;
                }
            `}</style>

            <div className="min-h-screen bg-white text-[#0a0a0a] font-sans antialiased">
                {/* ===== NAVBAR HEADER ===== */}
                <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
                        {/* Brand Logos */}
                        <Link href="/" className="flex items-center gap-2 sm:gap-3">
                            <img src="/images/Logo Pemkot.png" alt="Logo Pemkot Bandung" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-sm" />
                            <img src="/images/Logo Disbudpar.png" alt="Logo Disbudpar Kota Bandung" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-sm" />
                            <img src="/images/Logo BCH.png" alt="Logo Bandung Creative Hub" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 hidden sm:block drop-shadow-sm" />
                            <img src="/images/Logo TCS.png" alt="Logo Teras Sunda Cibiru" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 hidden md:block drop-shadow-sm" />
                            <img src="/images/Logo Pasir Kunci.png" alt="Logo Pasir Kunci" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 hidden md:block drop-shadow-sm" />
                        </Link>

                        {/* Center Desktop Navigation */}
                        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-700 lg:flex" aria-label="Primary">
                            <Link href="/" className="transition hover:text-gray-900">
                                Home
                            </Link>
                            <div className="group relative cursor-pointer py-1">
                                <span className="inline-flex items-center gap-1 transition hover:text-gray-900">
                                    Fasilitas <span className="text-xs opacity-60">▾</span>
                                </span>
                                <div className="absolute left-0 top-full hidden w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl group-hover:block">
                                    <Link href="/fasilitas/bandung-creative-hub" className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                                        Bandung Creative Hub
                                    </Link>
                                    <Link href="/fasilitas/padepokan-seni-mayang-sunda" className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                                        Padepokan Seni Mayang Sunda
                                    </Link>
                                    <Link href="/fasilitas/teras-sunda-cibiru" className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                                        Teras Sunda Cibiru
                                    </Link>
                                    <Link href="/fasilitas/kampung-wisata-pasir-kunci" className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                                        Kampung Wisata Pasir Kunci
                                    </Link>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsBookOpen(false)}
                                className="font-semibold text-gray-900 relative after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900 after:rounded-full"
                            >
                                Berita
                            </button>
                            <Link href="/artikel" className="transition hover:text-gray-900">
                                Artikel
                            </Link>
                            <Link href="/#contact" className="transition hover:text-gray-900">
                                Contact
                            </Link>
                        </nav>

                        {/* Right: Clock & Menu Trigger */}
                        <div className="flex items-center gap-3">
                            <div className="hidden items-center gap-2.5 rounded-full border border-gray-300/80 bg-white/70 px-4 py-2 text-xs text-gray-600 shadow-sm sm:flex">
                                <span className="text-gray-400">Local time</span>
                                <span className="font-medium text-gray-800 tabular-nums">{clockTime || '9:41am'}</span>
                                <span className="text-gray-300">•</span>
                                <span className="font-medium text-gray-600">{clockDate || '1 August, 2026'}</span>
                            </div>

                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="inline-flex items-center gap-2 rounded-full border border-gray-300/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-800 shadow-sm transition hover:scale-105 hover:bg-white"
                                aria-label="Open menu"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <line x1="4" y1="6" x2="20" y2="6" />
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <line x1="4" y1="18" x2="20" y2="18" />
                                </svg>
                                <span>Menu</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* ===== FULLSCREEN OVERLAY MENU ===== */}
                {isMenuOpen && (
                    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0a0a0a] p-8 text-white">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Menu Navigasi</span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                            >
                                ✕
                            </button>
                        </div>

                        <nav className="my-auto flex flex-col space-y-6 text-3xl font-bold sm:text-4xl">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="transition hover:text-gray-400">
                                01. Home
                            </Link>
                            <Link href="/#services" onClick={() => setIsMenuOpen(false)} className="transition hover:text-gray-400">
                                02. Fasilitas
                            </Link>
                            <button
                                onClick={() => {
                                    setIsBookOpen(false);
                                    setIsMenuOpen(false);
                                }}
                                className="text-left text-emerald-400 transition"
                            >
                                03. Berita (Sampul Buku)
                            </button>
                            <Link href="/artikel" onClick={() => setIsMenuOpen(false)} className="transition hover:text-gray-400">
                                04. Artikel
                            </Link>
                            <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="transition hover:text-gray-400">
                                05. Contact
                            </Link>
                        </nav>

                        <div className="border-t border-white/10 pt-4 text-xs text-gray-400">
                            <span>Local time — {clockTime}</span>
                        </div>
                    </div>
                )}

                <main className="mx-auto max-w-7xl px-6 sm:px-10 py-6 transition-all duration-500">

                    {/* STATE 1: INITIAL BOOK COVER (COVER VIEW - 2 COLUMN SPLIT WITH LEFT-ALIGNED TEXT) */}
                    {/* STATE 1: INITIAL BOOK COVER (COVER VIEW - EXACT MATCHING "TENTANG KAMI" DESIGN) */}
                    {!isBookOpen && (
                        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center py-6 sm:py-12">
                            
                            {/* LEFT CONTENT (MATCHING "TENTANG KAMI" TYPOGRAPHY & BUTTON) */}
                            <div className="flex flex-col items-start space-y-6 z-10 text-left">
                                <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 tracking-wide">
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span>Buku Berita Kebudayaan</span>
                                </div>

                                <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.3] tracking-tight text-[#1e2330]">
                                    Seluruh Berita & Warta Kebudayaan Kota Bandung Disajikan Interaktif Dalam Konsep Majalah & Buku Digital.
                                </h1>

                                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium pt-1">
                                    Selamat datang di portal informasi resmi UPTD Kebudayaan Kota Bandung. Halaman berita ini mencakup artikel, warta kegiatan, dan dokumentasi program dari <strong>4 fasilitas kebudayaan utama</strong>: Bandung Creative Hub, Padepokan Seni Mayang Sunda, Teras Sunda Cibiru, dan Kampung Wisata Pasir Kunci.
                                </p>

                                {/* 4 FACILITIES BADGES */}
                                <div className="w-full pt-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                                        Fasilitas Yang Tercakup:
                                    </span>
                                    <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                                        <Link href="/fasilitas/bandung-creative-hub" className="flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-2 transition hover:bg-slate-200">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                            Bandung Creative Hub
                                        </Link>
                                        <Link href="/fasilitas/padepokan-seni-mayang-sunda" className="flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-2 transition hover:bg-slate-200">
                                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                            Padepokan Seni Mayang Sunda
                                        </Link>
                                        <Link href="/fasilitas/teras-sunda-cibiru" className="flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-2 transition hover:bg-slate-200">
                                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                            Teras Sunda Cibiru
                                        </Link>
                                        <Link href="/fasilitas/kampung-wisata-pasir-kunci" className="flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-2 transition hover:bg-slate-200">
                                            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                                            Kampung Wisata Pasir Kunci
                                        </Link>
                                    </div>
                                </div>

                                {/* ACTION BUTTON (EXACT "TENTANG KAMI" PILL BUTTON STYLE WITH GREEN ARROW ICON) */}
                                <div className="pt-4">
                                    <button
                                        onClick={() => setIsBookOpen(true)}
                                        className="inline-flex items-center gap-3 rounded-full bg-slate-100/90 pr-6 pl-2 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-200 shadow-xs group"
                                    >
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white transition group-hover:scale-110">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                                <polyline points="12 5 19 12 12 19" />
                                            </svg>
                                        </span>
                                        <span>Buka & Baca Buku Berita</span>
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT CONTENT - 3D BOOK SHOWCASE COLLAGE */}
                            <div className="relative h-[480px] sm:h-[560px] w-full flex items-center justify-center mt-6 lg:mt-0">

                                {/* BOOK 1: EDISI VOL. 01 (KABAR KEBUDAYAAN) */}
                                <div 
                                    className="absolute left-[2%] sm:left-[4%] top-[8%] z-30 hover:z-50 cursor-pointer book-cover-perspective group -rotate-6 hover:rotate-0 hover:scale-110 hover:-translate-y-2 transition-all duration-300"
                                    onClick={() => setIsBookOpen(true)}
                                >
                                    <div className="relative">
                                        <div className="book-cover-card relative w-[185px] sm:w-[215px] h-[280px] sm:h-[330px] rounded-r-2xl rounded-l-sm bg-[#1e2a38] text-white shadow-2xl overflow-hidden border-r-4 border-b-4 border-gray-900/40 transform transition-transform duration-500">
                                            <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-gray-900 via-gray-800 to-transparent z-20 border-r border-white/10 shadow-inner" />
                                            <div className="absolute inset-0 z-0">
                                                <img
                                                    src="/images/berita_book_cover.png"
                                                    alt="Berita Kebudayaan Cover Vol 1"
                                                    className="w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
                                            </div>
                                            <div className="relative z-10 flex h-full flex-col justify-between p-3.5 pl-6">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <span className="text-[8px] font-bold uppercase tracking-widest text-amber-300">EDISI 2026</span>
                                                        <div className="text-base font-bold font-handwriting text-amber-200 -rotate-2">UPTD Kebudayaan</div>
                                                    </div>
                                                    <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[7px] font-semibold text-white">Vol. 01</span>
                                                </div>

                                                <div className="my-auto py-1">
                                                    <h3 className="font-cover-title text-xl sm:text-2xl font-black leading-tight text-white drop-shadow">
                                                        Kabar<br />Kebudayaan
                                                    </h3>
                                                    <p className="font-handwriting text-xs text-amber-300 mt-0.5 rotate-1"> Kota Bandung </p>
                                                </div>

                                                <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                                                    <span className="text-[7px] font-semibold text-gray-300 uppercase">Kota Bandung</span>
                                                    <div className="inline-flex items-center gap-1 rounded-full bg-amber-400 text-gray-950 px-2 py-0.5 text-[9px] font-bold shadow transition group-hover:bg-amber-300">
                                                        <span>Buka</span>
                                                        <span>→</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* BOOK 2: EDISI VOL. 02 (WARTA SENI SUNDA) */}
                                <div 
                                    className="absolute left-[33%] sm:left-[35%] top-[16%] z-20 hover:z-50 cursor-pointer book-cover-perspective group rotate-2 hover:rotate-0 hover:scale-110 hover:-translate-y-2 transition-all duration-300"
                                    onClick={() => setIsBookOpen(true)}
                                >
                                    <div className="relative">
                                        <div className="book-cover-card relative w-[185px] sm:w-[215px] h-[280px] sm:h-[330px] rounded-r-2xl rounded-l-sm bg-[#0f2d24] text-white shadow-2xl overflow-hidden border-r-4 border-b-4 border-emerald-950/60 transform transition-transform duration-500">
                                            <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-emerald-950 via-emerald-900 to-transparent z-20 border-r border-white/10 shadow-inner" />
                                            <div className="absolute inset-0 z-0">
                                                <img
                                                    src="/images/berita_book_cover_vol2.png"
                                                    alt="Warta Seni Sunda Cover Vol 2"
                                                    className="w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b] via-[#064e3b]/40 to-transparent" />
                                            </div>
                                            <div className="relative z-10 flex h-full flex-col justify-between p-3.5 pl-6">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-300">FASILITAS</span>
                                                        <div className="text-base font-bold font-handwriting text-emerald-200 -rotate-2">UPTD Kebudayaan</div>
                                                    </div>
                                                    <span className="rounded-full bg-emerald-500/30 px-1.5 py-0.5 text-[7px] font-semibold text-white">Vol. 02</span>
                                                </div>

                                                <div className="my-auto py-1">
                                                    <h3 className="font-cover-title text-xl sm:text-2xl font-black leading-tight text-white drop-shadow">
                                                        Warta<br />Seni Sunda
                                                    </h3>
                                                    <p className="font-handwriting text-xs text-emerald-300 mt-0.5 rotate-1"> Kesenian </p>
                                                </div>

                                                <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                                                    <span className="text-[7px] font-semibold text-gray-300 uppercase">Kota Bandung</span>
                                                    <div className="inline-flex items-center gap-1 rounded-full bg-emerald-400 text-gray-950 px-2 py-0.5 text-[9px] font-bold shadow transition group-hover:bg-emerald-300">
                                                        <span>Buka</span>
                                                        <span>→</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* BOOK 3: EDISI VOL. 03 (JURNAL BUDAYA BANDUNG) */}
                                <div 
                                    className="absolute right-[2%] sm:right-[4%] top-[26%] z-10 hover:z-50 cursor-pointer book-cover-perspective group rotate-8 hover:rotate-0 hover:scale-110 hover:-translate-y-2 transition-all duration-300"
                                    onClick={() => setIsBookOpen(true)}
                                >
                                    <div className="relative">
                                        <div className="book-cover-card relative w-[185px] sm:w-[215px] h-[280px] sm:h-[330px] rounded-r-2xl rounded-l-sm bg-[#4a1525] text-white shadow-2xl overflow-hidden border-r-4 border-b-4 border-rose-950/60 transform transition-transform duration-500 group-hover:scale-105">
                                            <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-rose-950 via-rose-900 to-transparent z-20 border-r border-white/10 shadow-inner" />
                                            <div className="absolute inset-0 z-0">
                                                <img
                                                    src="/images/berita_book_cover_vol3.png"
                                                    alt="Jurnal Budaya Cover Vol 3"
                                                    className="w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#881337] via-[#881337]/40 to-transparent" />
                                            </div>
                                            <div className="relative z-10 flex h-full flex-col justify-between p-3.5 pl-6">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <span className="text-[8px] font-bold uppercase tracking-widest text-rose-300">WISATA & CAGAR</span>
                                                        <div className="text-base font-bold font-handwriting text-rose-200 -rotate-2">UPTD Kebudayaan</div>
                                                    </div>
                                                    <span className="rounded-full bg-rose-500/30 px-1.5 py-0.5 text-[7px] font-semibold text-white">Vol. 03</span>
                                                </div>

                                                <div className="my-auto py-1">
                                                    <h3 className="font-cover-title text-xl sm:text-2xl font-black leading-tight text-white drop-shadow">
                                                        Jurnal<br />Budaya
                                                    </h3>
                                                    <p className="font-handwriting text-xs text-rose-300 mt-0.5 rotate-1"> Pariwisata </p>
                                                </div>

                                                <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                                                    <span className="text-[7px] font-semibold text-gray-300 uppercase">Kota Bandung</span>
                                                    <div className="inline-flex items-center gap-1 rounded-full bg-rose-400 text-gray-950 px-2 py-0.5 text-[9px] font-bold shadow transition group-hover:bg-rose-300">
                                                        <span>Buka</span>
                                                        <span>→</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM SECTION: 3 3D BOOK COVERS IN 3-COLUMN SHOWCASE GRID */}
                            <div className="lg:col-span-2 mt-14 pt-10 border-t border-gray-200/80 flex flex-col items-center justify-center">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-6xl w-full mx-auto justify-items-center">
                                    
                                    {/* BOOK 1 (VOL 01) */}
                                    <div className="flex flex-col items-center w-full">
                                        <div className="book-cover-perspective cursor-pointer group" onClick={() => setIsBookOpen(true)}>
                                            <div className="book-cover-card relative w-[250px] sm:w-[290px] h-[370px] sm:h-[430px] rounded-r-2xl rounded-l-sm bg-[#1e2a38] text-white shadow-2xl overflow-hidden border-r-4 border-b-4 border-gray-900/40 transform transition-transform duration-500 group-hover:scale-105">
                                                <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-gray-900 via-gray-800 to-transparent z-20 border-r border-white/10 shadow-inner" />
                                                <div className="absolute inset-0 z-0">
                                                    <img
                                                        src="/images/berita_book_cover.png"
                                                        alt="Berita Kebudayaan Cover Vol 01"
                                                        className="w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
                                                </div>
                                                <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6 pl-8">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <span className="text-[9px] font-bold uppercase tracking-widest text-amber-300">EDISI 2026</span>
                                                            <div className="text-lg font-bold font-handwriting text-amber-200 -rotate-2">UPTD Kebudayaan</div>
                                                        </div>
                                                        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-md">Vol. 01</span>
                                                    </div>

                                                    <div className="my-auto py-2">
                                                        <h2 className="font-cover-title text-3xl sm:text-4xl font-black leading-tight text-white drop-shadow-md">
                                                            Kabar<br />Kebudayaan
                                                        </h2>
                                                        <p className="font-handwriting text-base text-amber-300 mt-1 rotate-1"> seputar Kota Bandung </p>
                                                    </div>

                                                    <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                                                        <span className="text-[8px] font-semibold text-gray-300 uppercase">Kota Bandung</span>
                                                        <div className="inline-flex items-center gap-1 rounded-full bg-amber-400 text-gray-950 px-3 py-1 text-xs font-bold shadow transition group-hover:bg-amber-300">
                                                            <span>Baca Edisi 01</span>
                                                            <span>→</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="mt-4 text-xs font-bold text-gray-700 uppercase tracking-wider text-center">Kabar Kebudayaan</span>
                                    </div>

                                    {/* BOOK 2 (VOL 02) */}
                                    <div className="flex flex-col items-center w-full">
                                        <div className="book-cover-perspective cursor-pointer group" onClick={() => setIsBookOpen(true)}>
                                            <div className="book-cover-card relative w-[250px] sm:w-[290px] h-[370px] sm:h-[430px] rounded-r-2xl rounded-l-sm bg-[#1e2a38] text-white shadow-2xl overflow-hidden border-r-4 border-b-4 border-gray-900/40 transform transition-transform duration-500 group-hover:scale-105">
                                                <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-gray-900 via-gray-800 to-transparent z-20 border-r border-white/10 shadow-inner" />
                                                <div className="absolute inset-0 z-0">
                                                    <img
                                                        src="/images/berita_book_cover_vol2.png"
                                                        alt="Warta Seni Sunda Cover Vol 02"
                                                        className="w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
                                                </div>
                                                <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6 pl-8">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-300">EDISI FASILITAS</span>
                                                            <div className="text-lg font-bold font-handwriting text-emerald-200 -rotate-2">UPTD Kebudayaan</div>
                                                        </div>
                                                        <span className="rounded-full bg-emerald-500/30 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-md">Vol. 02</span>
                                                    </div>

                                                    <div className="my-auto py-2">
                                                        <h2 className="font-cover-title text-3xl sm:text-4xl font-black leading-tight text-white drop-shadow-md">
                                                            Warta<br />Seni Sunda
                                                        </h2>
                                                        <p className="font-handwriting text-base text-emerald-300 mt-1 rotate-1"> Kesenian & Tradisi </p>
                                                    </div>

                                                    <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                                                        <span className="text-[8px] font-semibold text-gray-300 uppercase">Kota Bandung</span>
                                                        <div className="inline-flex items-center gap-1 rounded-full bg-emerald-400 text-gray-950 px-3 py-1 text-xs font-bold shadow transition group-hover:bg-emerald-300">
                                                            <span>Baca Edisi 02</span>
                                                            <span>→</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="mt-4 text-xs font-bold text-gray-700 uppercase tracking-wider text-center">Warta Seni Sunda</span>
                                    </div>

                                    {/* BOOK 3 (VOL 03) */}
                                    <div className="flex flex-col items-center w-full">
                                        <div className="book-cover-perspective cursor-pointer group" onClick={() => setIsBookOpen(true)}>
                                            <div className="book-cover-card relative w-[250px] sm:w-[290px] h-[370px] sm:h-[430px] rounded-r-2xl rounded-l-sm bg-[#1e2a38] text-white shadow-2xl overflow-hidden border-r-4 border-b-4 border-gray-900/40 transform transition-transform duration-500 group-hover:scale-105">
                                                <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-gray-900 via-gray-800 to-transparent z-20 border-r border-white/10 shadow-inner" />
                                                <div className="absolute inset-0 z-0">
                                                    <img
                                                        src="/images/berita_book_cover_vol3.png"
                                                        alt="Jurnal Budaya Cover Vol 03"
                                                        className="w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
                                                </div>
                                                <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6 pl-8">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <span className="text-[9px] font-bold uppercase tracking-widest text-rose-300">WISATA & CAGAR</span>
                                                            <div className="text-lg font-bold font-handwriting text-rose-200 -rotate-2">UPTD Kebudayaan</div>
                                                        </div>
                                                        <span className="rounded-full bg-rose-500/30 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-md">Vol. 03</span>
                                                    </div>

                                                    <div className="my-auto py-2">
                                                        <h2 className="font-cover-title text-3xl sm:text-4xl font-black leading-tight text-white drop-shadow-md">
                                                            Jurnal<br />Budaya
                                                        </h2>
                                                        <p className="font-handwriting text-base text-rose-300 mt-1 rotate-1"> Pariwisata </p>
                                                    </div>

                                                    <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                                                        <span className="text-[8px] font-semibold text-gray-300 uppercase">Kota Bandung</span>
                                                        <div className="inline-flex items-center gap-1 rounded-full bg-rose-400 text-gray-950 px-3 py-1 text-xs font-bold shadow transition group-hover:bg-rose-300">
                                                            <span>Baca Edisi 03</span>
                                                            <span>→</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="mt-4 text-xs font-bold text-gray-700 uppercase tracking-wider text-center">Jurnal Budaya</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                    {/* STATE 2: OPEN BOOK SPREAD (INSIDE NEWS VIEW - COMPACT) */}
                    {isBookOpen && (
                        <div>
                            {/* Top Navigation Bar Inside Book */}
                            <div className="mb-5 flex items-center justify-between px-2">
                                <button
                                    onClick={() => setIsBookOpen(false)}
                                    className="inline-flex items-center gap-2 rounded-full border border-gray-300/80 bg-white/90 px-4 py-2 text-xs font-bold text-gray-800 shadow-sm transition hover:bg-white hover:scale-105"
                                >
                                    <span>←</span>
                                    <span>Kembali ke Sampul Buku</span>
                                </button>

                                <div className="flex items-center gap-3">
                                    <button
                                        disabled={currentIndex === 0}
                                        onClick={() => goToArticle('prev')}
                                        className="nav-btn-circle flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm"
                                        aria-label="Artikel sebelumnya"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                            <path d="M15 18l-6-6 6-6" />
                                        </svg>
                                    </button>
                                    <span className="text-xs font-bold tabular-nums text-gray-700">
                                        {currentIndex + 1} / {totalArticles}
                                    </span>
                                    <button
                                        disabled={currentIndex === totalArticles - 1}
                                        onClick={() => goToArticle('next')}
                                        className="nav-btn-circle flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm"
                                        aria-label="Artikel selanjutnya"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* TWO-PAGE BOOK CONTAINER (COMPACT & BALANCED) */}
                            <div className="book-spread-container">
                                <div
                                    className={`book-spread-card relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-200/90 md:flex-row ${
                                        isFlipping ? (flipDirection === 'next' ? 'flip-next' : 'flip-prev') : ''
                                    }`}
                                >
                                    {/* CENTER BOOK SPINE SHADOW */}
                                    <div
                                        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-10 -translate-x-1/2 z-10 md:block"
                                        style={{
                                            background:
                                                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 30%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.02) 70%, transparent 100%)',
                                        }}
                                    />

                                    {/* ===== LEFT PAGE (MAIN ARTICLE) ===== */}
                                    <article className="flex-1 border-b border-gray-200/80 p-6 sm:p-9 md:border-b-0 md:border-r md:border-gray-200/60 md:pr-11">
                                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-400">
                                            <span>{currentArticle.tag}</span>
                                            <span>{currentArticle.date}</span>
                                        </div>

                                        <div className="mt-4 overflow-hidden rounded-xl bg-gray-100 shadow-inner">
                                            <img
                                                src={currentArticle.image}
                                                alt={currentArticle.title}
                                                className="h-52 sm:h-64 lg:h-72 w-full object-cover"
                                            />
                                        </div>

                                        <h2 className="mt-4 text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl lg:text-[26px]">
                                            {currentArticle.title}
                                        </h2>

                                        <div className="mt-4 space-y-3 text-sm sm:text-base leading-relaxed text-gray-700">
                                            <p>
                                                <span className="float-left mr-2.5 text-5xl sm:text-6xl font-extrabold leading-[0.78] text-gray-900">
                                                    {firstLetter}
                                                </span>
                                                {restOfFirstParagraph}
                                            </p>
                                            {restParagraphs.map((p, i) => (
                                                <p key={i}>{p}</p>
                                            ))}
                                        </div>
                                    </article>

                                    {/* ===== RIGHT PAGE (RELATED ARTICLE) ===== */}
                                    <aside className="flex-1 p-6 sm:p-9 md:pl-11 flex flex-col justify-between">
                                        <div>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Terkait</span>

                                            <button
                                                onClick={() => {
                                                    const nextIndex = (currentIndex + 1) % totalArticles;
                                                    setFlipDirection('next');
                                                    setIsFlipping(true);
                                                    setTimeout(() => {
                                                        setCurrentIndex(nextIndex);
                                                        setTimeout(() => setIsFlipping(false), 400);
                                                    }, 350);
                                                }}
                                                className="group mt-3 block text-left w-full"
                                            >
                                                <h3 className="text-lg font-bold leading-snug tracking-tight text-gray-900 group-hover:underline sm:text-xl lg:text-2xl">
                                                    {currentArticle.related.title}
                                                </h3>

                                                <div className="mt-4 overflow-hidden rounded-xl bg-gray-100 shadow-inner">
                                                    <img
                                                        src={currentArticle.related.image}
                                                        alt={currentArticle.related.title}
                                                        className="h-52 sm:h-64 lg:h-72 w-full object-cover transition duration-300 group-hover:scale-105"
                                                    />
                                                </div>

                                                <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-600">
                                                    {currentArticle.related.excerpt}
                                                </p>
                                            </button>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-gray-200/80">
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                                {currentArticle.related.tag}
                                            </span>
                                        </div>
                                    </aside>
                            </div>
                        </div>

                            {/* Pagination indicators */}
                            <div className="mt-8 flex items-center justify-center gap-2">
                                {articlesList.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            if (i === currentIndex || isFlipping) return;
                                            setFlipDirection(i > currentIndex ? 'next' : 'prev');
                                            setIsFlipping(true);
                                            setTimeout(() => {
                                                setCurrentIndex(i);
                                                setTimeout(() => setIsFlipping(false), 400);
                                            }, 350);
                                        }}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${
                                            i === currentIndex ? 'w-10 bg-gray-900' : 'w-2.5 bg-gray-400 hover:bg-gray-600'
                                        }`}
                                        aria-label={`Artikel ${i + 1}`}
                                    />
                                ))}
                            </div>

                            <p className="mt-4 text-center text-xs font-medium text-gray-600">
                                Gunakan tombol panah <kbd className="mx-1 rounded border border-gray-300 bg-white px-2 py-0.5 text-xs font-bold text-gray-700 shadow-sm">←</kbd> <kbd className="mx-1 rounded border border-gray-300 bg-white px-2 py-0.5 text-xs font-bold text-gray-700 shadow-sm">→</kbd> untuk membalik artikel
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
