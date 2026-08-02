import { Head, Link } from '@inertiajs/react';
import { useEffect, useState, useCallback } from 'react';

type ArtikelItem = {
    id: number;
    title: string;
    description: string;
    image: string;
    secondaryImage: string;
    recapTitle: string;
    recapBadge: string;
    tag: string;
    date: string;
    href: string;
    tags: string[];
    // HALAMAN 1 (SISI KIRI)
    page1Title: string;
    page1Content: string[];
    // HALAMAN 2 (SISI KANAN - LANJUTAN ARTIKEL YANG SAMA)
    page2Tag: string;
    page2Title: string;
    page2Content: string[];
};

// ARTIKEL DATA LIST DENGAN DUA HALAMAN PENUH KHUSUS UNTUK SATU ARTIKEL YANG DIKLIK
const ARTIKEL_LIST: ArtikelItem[] = [
    {
        id: 1,
        tag: 'HIBURAN',
        date: '01 AGUSTUS 2026',
        title: "Squad Spanyol Healing di Bandung Creative Hub",
        description: "POV: Lamine Yamal dan Squad Spanyol habis juara Piala Dunia 2026... malah healing ke Bandung Creative Hub 🇪🇸🏆",
        image: "/images/artikel2.png",
        secondaryImage: "/images/artikel_recording_studio.png",
        recapTitle: "Squad Spanyol di BCH",
        recapBadge: "Trending Hub",
        href: "/fasilitas/bandung-creative-hub",
        tags: ["Bandung Creative Hub", "Piala Dunia 2026", "Viral"],
        
        // HALAMAN KIRI
        page1Title: "Squad Spanyol Healing di Bandung Creative Hub",
        page1Content: [
            "POV: Lamine Yamal dan Squad Timnas Spanyol yang baru saja menjuarai perhelatan akbar Piala Dunia 2026 secara mengejutkan terlihat menghabiskan waktu liburan dan healing di fasilitas Bandung Creative Hub (BCH), Kota Bandung.",
            "Kedatangan rombongan pemain bintang sepak bola dunia ini disambut hangat oleh komunitas kreator lokal. Mereka sempat mencoba berbagai fasilitas unggulan seperti Studio Rekaman Musik Summen Stag, Laboratorium Desain 3D, hingga ruang pameran seni digital."
        ],
        
        // HALAMAN KANAN (LANJUTAN ARTIKEL SQUAD SPANYOL)
        page2Tag: "DOKUMENTASI & LANJUTAN",
        page2Title: "Impression & Apresiasi Bintang Dunia terhadap Fasilitas BCH",
        page2Content: [
            "Momen unik ini menjadi viral di berbagai platform media sosial dan membuktikan bahwa Bandung Creative Hub kini semakin dikenal secara internasional sebagai fasilitas inkubasi kreatif publik yang sangat ramah bagi anak muda.",
            "Lamine Yamal bahkan sempat mengunggah momen saat mencoba studio rekaman musik dan mengapresiasi kelengkapan peralatan audio profesional yang disediakan secara gratis bagi warga dan komunitas."
        ]
    },
    {
        id: 2,
        tag: 'EDUKASI MUSIK',
        date: '25 JULI 2026',
        title: "Tipe-Tipe Orang Pegang Stik",
        description: "Keliatan dari cara pegangnya aja, udah ketahuan karakternya. Simak pembahasan lengkap seputar gaya dan teknik memegang stik drum di studio Bandung Creative Hub.",
        image: "/images/artikel1.png",
        secondaryImage: "/images/artikel_recording_studio.png",
        recapTitle: "Tipe-Tipe Orang Pegang Stik",
        recapBadge: "Edukasi Musik",
        href: "/fasilitas/bandung-creative-hub",
        tags: ["Teknik Drum", "Musik", "Bandung Creative Hub"],
        
        // HALAMAN KIRI
        page1Title: "Tipe-Tipe Orang Pegang Stik",
        page1Content: [
            "Keliatan dari cara pegang stik drumnya aja, udah ketahuan karakter dan gaya bermain seorang drummer! Memegang stik drum bukan cuma masalah kenyamanan, tapi juga menentukan artikulasi, power, dan ketahanan fisik saat tampil.",
            "Secara umum terdapat tiga teknik memegang stik drum yang paling populer di kalangan musisi: Matched Grip (American, German, French) dan Traditional Grip. Masing-masing gaya memiliki keunikan akustik dan fleksibilitas pergelangan tangan tersendiri."
        ],
        
        // HALAMAN KANAN (LANJUTAN ARTIKEL PEGANG STIK)
        page2Tag: "TEKNIK & FASILITAS STUDIO",
        page2Title: "Eksplorasi Karakter Suara & Otot Pergelangan Tangan",
        page2Content: [
            "Di studio musik rekaman Bandung Creative Hub, para instruktur memberikan pelatihan teknik dasar hingga tingkat lanjut bagi para drummer muda Kota Bandung agar dapat mengeksplorasi karakter suara terbaik instrumen mereka.",
            "Latihan rutin dengan posisi pegangan stik yang benar terbukti mencegah cedera otot pergelangan tangan dan mengoptimalkan artikulasi pukulan pada cymbal serta snare drum."
        ]
    },
    {
        id: 3,
        tag: 'OPINI & EDUKASI',
        date: '15 JULI 2026',
        title: "Ketika Boomer VS Gen Z Menjelaskan Fasilitas di BCH",
        description: "Ketika Boomer VS Gen Z menjelaskan fasilitas di BCH... Simak perbedaan perspektif unik dan keseruan generasi lintas zaman dalam memanfaatkan fasilitas ruang kreatif di Bandung Creative Hub.",
        image: "/images/artikel3.png",
        secondaryImage: "/images/DSC01758.jpg",
        recapTitle: "Boomer VS Gen Z di BCH",
        recapBadge: "Edisi Opini",
        href: "/fasilitas/bandung-creative-hub",
        tags: ["Boomer VS Gen Z", "Fasilitas BCH", "Opini & Edukasi"],
        
        // HALAMAN KIRI
        page1Title: "Ketika Boomer VS Gen Z Menjelaskan Fasilitas di BCH",
        page1Content: [
            "Ketika Boomer VS Gen Z menjelaskan fasilitas di Bandung Creative Hub (BCH), perbedaan istilah dan cara pandang yang muncul sangat menggelitik sekaligus inspiratif!",
            "Generasi Boomer cenderung memandang BCH sebagai 'Gedung Pusat Informasi & Fasilitas Kerajinan Daerah', sementara Gen Z menyebutnya sebagai 'Creative Aesthetic Hub buat WFC, Produksi Podcast, & Content Creation'."
        ],
        
        // HALAMAN KANAN (LANJUTAN ARTIKEL BOOMER VS GEN Z)
        page2Tag: "PERSPEKTIF LINTAS GENERASI",
        page2Title: "Ruang Kolaborasi Publik Tanpa Batas Usia",
        page2Content: [
            "Meski memiliki istilah yang berbeda, kedua generasi ini sama-sama merasakan manfaat luar biasa dari keberadaan ruang kolaborasi publik yang disediakan oleh UPTD Kebudayaan Kota Bandung.",
            "Sinergi antara pengalaman senior generasi Boomer dan kreativitas digital Gen Z melahirkan berbagai program kolaborasi unik yang semakin memperkaya ekosistem kebudayaan Kota Bandung."
        ]
    },
];

export default function Artikel() {
    const [clockTime, setClockTime] = useState('');
    const [clockDate, setClockDate] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // STATE MODAL DUA HALAMAN UNTUK DOKUMEN ARTIKEL YANG SAMA
    const [isReaderOpen, setIsReaderOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalArticles = ARTIKEL_LIST.length;
    const currentArticle = ARTIKEL_LIST[currentIndex];

    useEffect(() => {
        function updateClock() {
            const now = new Date();
            const h = now.getHours() % 12 || 12;
            const m = String(now.getMinutes()).padStart(2, '0');
            const mer = now.getHours() >= 12 ? 'pm' : 'am';
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            setClockTime(`${h}:${m}${mer}`);
            setClockDate(`${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`);
        }
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    const goToArticle = useCallback((direction: 'next' | 'prev') => {
        const next = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (next < 0 || next >= totalArticles) return;
        setCurrentIndex(next);
    }, [currentIndex, totalArticles]);

    const openArticleDetail = (index: number) => {
        setCurrentIndex(index);
        setIsReaderOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if (!isReaderOpen) return;
        function handleKey(e: KeyboardEvent) {
            if (e.key === 'ArrowRight') goToArticle('next');
            if (e.key === 'ArrowLeft') goToArticle('prev');
            if (e.key === 'Escape') setIsReaderOpen(false);
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isReaderOpen, goToArticle]);

    const firstParagraph = currentArticle?.page1Content[0] || '';
    const firstLetter = firstParagraph.charAt(0);
    const restOfFirstParagraph = firstParagraph.slice(1);
    const page1RestParagraphs = currentArticle?.page1Content.slice(1) || [];

    return (
        <>
            <Head title={`${isReaderOpen ? currentArticle.title : 'Artikel Kebudayaan'} — UPTD Kebudayaan`} />

            <div className="min-h-screen bg-white text-[#0a0a0a] font-sans antialiased">
                {/* ===== NAVBAR HEADER (EXACT MATCH WITH BERITA.TSX) ===== */}
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
                            <Link href="/berita" className="transition hover:text-gray-900">
                                Berita
                            </Link>
                            <Link
                                href="/artikel"
                                className="font-semibold text-gray-900 relative after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900 after:rounded-full"
                            >
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
                            <Link href="/berita" onClick={() => setIsMenuOpen(false)} className="transition hover:text-gray-400">
                                03. Berita
                            </Link>
                            <Link href="/artikel" onClick={() => setIsMenuOpen(false)} className="text-blue-400 transition">
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

                {/* ===== MAIN CONTENT AREA ===== */}
                <main className="mx-auto max-w-7xl px-6 sm:px-10 py-6 transition-all duration-500">
                    
                    {/* MODE 1: UTAMA / DAFTAR KARTU ARTIKEL */}
                    {!isReaderOpen && (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center py-6 sm:py-12">

                                {/* LEFT CONTENT */}
                                <div className="flex flex-col items-start space-y-6 z-10 text-left">
                                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 tracking-wide">
                                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
                                        <span>Artikel & Publikasi Kebudayaan</span>
                                    </div>

                                    <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.3] tracking-tight text-[#1e2330]">
                                        Seluruh Artikel, Gagasan & Opini Kebudayaan Kota Bandung Disajikan Secara Komprehensif.
                                    </h1>

                                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium pt-1">
                                        Selamat datang di portal artikel resmi UPTD Kebudayaan Kota Bandung. Halaman ini menghimpun karya tulis, jurnal ilmiah, warta opini, serta dokumentasi kajian kebudayaan dari <strong>4 fasilitas kebudayaan utama</strong>: Bandung Creative Hub, Padepokan Seni Mayang Sunda, Teras Sunda Cibiru, dan Kampung Wisata Pasir Kunci.
                                    </p>

                                    {/* 4 FACILITIES BADGES */}
                                    <div className="w-full pt-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                                            Fasilitas Yang Tercakup:
                                        </span>
                                        <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                                            <Link href="/fasilitas/bandung-creative-hub" className="flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-2 transition hover:bg-slate-200">
                                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                                                Bandung Creative Hub
                                            </Link>
                                            <Link href="/fasilitas/padepokan-seni-mayang-sunda" className="flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-2 transition hover:bg-slate-200">
                                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                                Padepokan Seni Mayang Sunda
                                            </Link>
                                            <Link href="/fasilitas/teras-sunda-cibiru" className="flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-2 transition hover:bg-slate-200">
                                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                                                Teras Sunda Cibiru
                                            </Link>
                                            <Link href="/fasilitas/kampung-wisata-pasir-kunci" className="flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-2 transition hover:bg-slate-200">
                                                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                                                Kampung Wisata Pasir Kunci
                                            </Link>
                                        </div>
                                    </div>

                                    {/* ACTION BUTTON */}
                                    <div className="pt-4">
                                        <a
                                            href="#fasilitas-showcase"
                                            className="inline-flex items-center gap-3 rounded-full bg-slate-100/90 pr-6 pl-2 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-200 shadow-xs group"
                                        >
                                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition group-hover:scale-110">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                    <polyline points="5 12 12 5 19 12" />
                                                </svg>
                                            </span>
                                            <span>Jelajahi & Baca Artikel</span>
                                        </a>
                                    </div>
                                </div>

                                {/* RIGHT CONTENT - 3 IMAGE CARDS SHOWCASE COLLAGE */}
                                <div className="relative h-[480px] sm:h-[560px] w-full flex items-center justify-center mt-6 lg:mt-0">

                                    {/* CARD 1 (LAMINE YAMAL & SPANYOL RECAP IMAGE) */}
                                    <div 
                                        className="absolute left-[2%] sm:left-[4%] top-[8%] z-30 hover:z-50 cursor-pointer group -rotate-6 hover:rotate-0 hover:scale-110 hover:-translate-y-2 transition-all duration-300"
                                        onClick={() => openArticleDetail(0)}
                                    >
                                        <div className="relative w-[185px] sm:w-[215px] h-[280px] sm:h-[330px] rounded-2xl bg-[#1e2a38] text-white shadow-2xl overflow-hidden border-2 border-white/20 transform transition-transform duration-500">
                                            <img
                                                src={ARTIKEL_LIST[0]?.image}
                                                alt={ARTIKEL_LIST[0]?.recapTitle}
                                                className="w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
                                            <div className="relative z-10 flex h-full flex-col justify-between p-3.5 pl-5">
                                                <span className="rounded-full bg-blue-600/80 px-2 py-0.5 text-[8px] font-semibold text-white w-fit">{ARTIKEL_LIST[0]?.recapBadge}</span>
                                                <div>
                                                    <h3 className="text-base font-bold leading-snug text-white drop-shadow">{ARTIKEL_LIST[0]?.recapTitle}</h3>
                                                    <span className="text-[9px] text-amber-300 font-semibold block mt-1">Klik Baca Artikel →</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CARD 2 (ARTIKEL 1 DRUM STICK IMAGE IN RECAP) */}
                                    <div 
                                        className="absolute left-[33%] sm:left-[35%] top-[16%] z-20 hover:z-50 cursor-pointer group rotate-2 hover:rotate-0 hover:scale-110 hover:-translate-y-2 transition-all duration-300"
                                        onClick={() => openArticleDetail(1)}
                                    >
                                        <div className="relative w-[185px] sm:w-[215px] h-[280px] sm:h-[330px] rounded-2xl bg-[#0f2d24] text-white shadow-2xl overflow-hidden border-2 border-white/20 transform transition-transform duration-500">
                                            <img
                                                src={ARTIKEL_LIST[1]?.image}
                                                alt={ARTIKEL_LIST[1]?.recapTitle}
                                                className="w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a] via-[#1e3a8a]/40 to-transparent" />
                                            <div className="relative z-10 flex h-full flex-col justify-between p-3.5 pl-5">
                                                <span className="rounded-full bg-blue-600/80 px-2 py-0.5 text-[8px] font-semibold text-white w-fit">{ARTIKEL_LIST[1]?.recapBadge}</span>
                                                <div>
                                                    <h3 className="text-base font-bold leading-snug text-white drop-shadow">{ARTIKEL_LIST[1]?.recapTitle}</h3>
                                                    <span className="text-[9px] text-blue-300 font-semibold block mt-1">Klik Baca Artikel →</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CARD 3 (BOOMER VS GEN Z RECAP IMAGE) */}
                                    <div 
                                        className="absolute right-[2%] sm:right-[4%] top-[26%] z-10 hover:z-50 cursor-pointer group rotate-8 hover:rotate-0 hover:scale-110 hover:-translate-y-2 transition-all duration-300"
                                        onClick={() => openArticleDetail(2)}
                                    >
                                        <div className="relative w-[185px] sm:w-[215px] h-[280px] sm:h-[330px] rounded-2xl bg-[#0f2a4a] text-white shadow-2xl overflow-hidden border-2 border-white/20 transform transition-transform duration-500">
                                            <img
                                                src={ARTIKEL_LIST[2]?.image}
                                                alt={ARTIKEL_LIST[2]?.recapTitle}
                                                className="w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0284c7] via-[#0284c7]/40 to-transparent" />
                                            <div className="relative z-10 flex h-full flex-col justify-between p-3.5 pl-5">
                                                <span className="rounded-full bg-sky-500/80 px-2 py-0.5 text-[8px] font-semibold text-white w-fit">{ARTIKEL_LIST[2]?.recapBadge}</span>
                                                <div>
                                                    <h3 className="text-base font-bold leading-snug text-white drop-shadow">{ARTIKEL_LIST[2]?.recapTitle}</h3>
                                                    <span className="text-[9px] text-sky-200 font-semibold block mt-1">Klik Baca Artikel →</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* ===== LUMORA MODERN CARDS SECTION (DINAMIS DARI ARTIKEL_LIST) ===== */}
                            <div id="fasilitas-showcase" className="mt-14 pt-12 border-t border-slate-200/80 space-y-8">
                                <div className="flex flex-col items-start gap-1">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Explore Facilities</span>
                                    <h2 className="text-2xl font-bold text-slate-900">Kategori & Fasilitas Kebudayaan</h2>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {ARTIKEL_LIST.map((item, index) => {
                                        const isOddLast = ARTIKEL_LIST.length % 2 !== 0 && index === ARTIKEL_LIST.length - 1;
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => openArticleDetail(index)}
                                                className={`relative group rounded-[2.2rem] bg-[#0c0d0e] text-white p-7 sm:p-9 overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer flex flex-col justify-between min-h-[400px] sm:min-h-[440px] border border-white/10 ${isOddLast ? 'lg:col-span-2' : ''}`}
                                            >
                                                {/* Background Image with Light Softened Bottom Overlay */}
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="absolute inset-0 w-full h-full object-cover opacity-95 transition-all duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#08090c]/90 via-[#08090c]/50 via-55% to-transparent" />

                                                {/* Top Header */}
                                                <div className="relative z-10 flex items-center justify-between">
                                                    <span className="text-[11px] font-mono tracking-widest text-gray-200 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"></span>
                                                    <button
                                                        type="button"
                                                        className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110 shadow-md border border-white/20"
                                                        aria-label={`Buka ${item.title}`}
                                                    >
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 rotate-45">
                                                            <line x1="12" y1="19" x2="12" y2="5" />
                                                            <polyline points="5 12 12 5 19 12" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                {/* Bottom Content & Tags */}
                                                <div className="relative z-10 space-y-4 text-left pt-16">
                                                    <div>
                                                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-200 font-normal leading-relaxed mt-2 max-w-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                                            {item.description}
                                                        </p>
                                                    </div>

                                                    {/* Pill Tags */}
                                                    <div className="flex flex-wrap gap-2 pt-2">
                                                        {item.tags.map((tag, tIdx) => (
                                                            <span key={tIdx} className="rounded-full border border-white/30 bg-black/50 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md drop-shadow-sm">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}

                    {/* MODE 2: TAMPILAN BUKU 2 HALAMAN (KEDUA HALAMAN KIRI & KANAN BERISI KHUSUS ARTIKEL YANG DIKLIK) */}
                    {isReaderOpen && (
                        <div className="py-4">
                            {/* Bar Navigasi Atas Dalam Reader */}
                            <div className="mb-6 flex items-center justify-between px-2 flex-wrap gap-4">
                                <button
                                    onClick={() => setIsReaderOpen(false)}
                                    className="inline-flex items-center gap-2 rounded-full border border-gray-300/80 bg-white/90 px-4 py-2 text-xs font-bold text-gray-800 shadow-sm transition hover:bg-white hover:scale-105 cursor-pointer"
                                >
                                    <span>←</span>
                                    <span>Kembali ke Daftar Artikel</span>
                                </button>

                                <div className="text-xs font-bold text-slate-500 hidden sm:block">
                                    Artikel ({currentIndex + 1} dari {totalArticles}): <span className="text-slate-900">{currentArticle.title}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        disabled={currentIndex === 0}
                                        onClick={() => goToArticle('prev')}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm disabled:opacity-40 transition hover:bg-gray-50 cursor-pointer"
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
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm disabled:opacity-40 transition hover:bg-gray-50 cursor-pointer"
                                        aria-label="Artikel selanjutnya"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* WADAH DUA HALAMAN BUKU TERBUKA (PROSISI PERSIS UNTUK 1 ARTIKEL LENGKAP) */}
                            <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200/90 md:flex-row">
                                
                                {/* BAYANGAN LIPATAN BUKU DI TENGAH */}
                                <div
                                    className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-10 -translate-x-1/2 z-10 md:block"
                                    style={{
                                        background: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 30%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.02) 70%, transparent 100%)',
                                    }}
                                />

                                {/* ===== HALAMAN 1 / KIRI (AWAL ARTIKEL KHUSUS YANG DIKLIK) ===== */}
                                <article className="flex-1 border-b border-gray-200/80 p-6 sm:p-9 md:border-b-0 md:border-r md:border-gray-200/60 md:pr-11">
                                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        <span className="font-bold text-blue-600">{currentArticle.tag}</span>
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
                                        {currentArticle.page1Title}
                                    </h2>

                                    <div className="mt-4 space-y-3 text-sm sm:text-base leading-relaxed text-gray-700">
                                        <p>
                                            <span className="float-left mr-2.5 text-5xl sm:text-6xl font-extrabold leading-[0.78] text-gray-900">
                                                {firstLetter}
                                            </span>
                                            {restOfFirstParagraph}
                                        </p>
                                        {page1RestParagraphs.map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))}
                                    </div>
                                </article>

                                {/* ===== HALAMAN 2 / KANAN (LANJUTAN UTUH DARI ARTIKEL YANG SAMA) ===== */}
                                <aside className="flex-1 p-6 sm:p-9 md:pl-11 flex flex-col justify-between bg-slate-50/30">
                                    <div>
                                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-400">
                                            <span className="font-bold text-slate-500">{currentArticle.page2Tag}</span>
                                            <span>HALAMAN 2</span>
                                        </div>

                                        <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight text-gray-900 sm:text-xl lg:text-2xl">
                                            {currentArticle.page2Title}
                                        </h3>

                                        <div className="mt-4 overflow-hidden rounded-xl bg-gray-100 shadow-inner">
                                            <img
                                                src={currentArticle.secondaryImage}
                                                alt={currentArticle.page2Title}
                                                className="h-52 sm:h-64 lg:h-72 w-full object-cover"
                                            />
                                        </div>

                                        <div className="mt-4 space-y-3 text-sm sm:text-base leading-relaxed text-gray-700">
                                            {currentArticle.page2Content.map((p, i) => (
                                                <p key={i}>{p}</p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* FOOTER HALAMAN 2 */}
                                    <div className="mt-6 pt-4 border-t border-gray-200/80 flex items-center justify-between">
                                        <div className="flex flex-wrap gap-1.5">
                                            {currentArticle.tags.map((tag, tIdx) => (
                                                <span key={tIdx} className="rounded-full bg-slate-200/80 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => setIsReaderOpen(false)}
                                            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
                                        >
                                            ← Selesai Membaca
                                        </button>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </>
    );
}
