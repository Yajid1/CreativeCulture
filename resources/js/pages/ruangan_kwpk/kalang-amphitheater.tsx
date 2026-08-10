import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function KalangAmphitheater() {
    const [clockTime, setClockTime] = useState('');
    const [clockDate, setClockDate] = useState('');

    useEffect(() => {
        function tick() {
            const now = new Date();
            setClockTime(
                now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase(),
            );
            setClockDate(
                now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
            );
        }
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const facilitiesList = [
        '🎭 Panggung Outdoor Utama & Tribun Penonton Berundak',
        '💡 Sistem Lighting Panggung Pertunjukan Malam',
        '🔊 Sound System Panggung Utama Outdoor',
        '🌄 View Panorama Kota Bandung & Kaki Gunung Manglayang',
        '🕺 Arena Pementasan Tari, Musik Etnis & Atraksi Budaya',
        '👥 Kapasitas Penonton Hingga 200 Orang',
    ];

    return (
        <>
            <Head title="Kalang (Amphitheater) - Kampung Wisata Pasir Kunci" />

            <div className="min-h-screen bg-white text-gray-900 font-sans">
                {/* ===== NAVBAR ===== */}
                <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-6 px-6 py-4 sm:px-10">
                        {/* Brand Logos */}
                        <Link href="/" className="flex items-center gap-2 sm:gap-3">
                            <img src="/images/Logo Pemkot.png" alt="Logo Pemkot Bandung" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-sm" />
                            <img src="/images/Logo Disbudpar.png" alt="Logo Disbudpar Kota Bandung" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-sm" />
                            <img src="/images/Logo BCH.png" alt="Logo Bandung Creative Hub" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 hidden sm:block drop-shadow-sm" />
                            <img src="/images/Logo TCS.png" alt="Logo Teras Sunda Cibiru" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 hidden md:block drop-shadow-sm" />
                            <img src="/images/Logo Pasir Kunci.png" alt="Logo Pasir Kunci" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 hidden md:block drop-shadow-sm" />
                        </Link>

                        {/* Nav links */}
                        <nav className="hidden items-center gap-7 text-sm font-medium text-gray-500 lg:flex" aria-label="Primary">
                            <Link href="/" className="transition hover:text-gray-900">Home</Link>
                            <Link href="/fasilitas/kampung-wisata-pasir-kunci" className="transition hover:text-gray-900">
                                Fasilitas <span className="text-xs opacity-60">▾</span>
                            </Link>
                            <Link href="/berita" className="transition hover:text-gray-900">Berita</Link>
                            <Link href="/artikel" className="transition hover:text-gray-900">Artikel</Link>
                            <Link href="/#contact" className="transition hover:text-gray-900">Contact</Link>
                        </nav>

                        {/* Right: clock + menu */}
                        <div className="flex items-center gap-3">
                            <div className="hidden items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-500 md:flex">
                                <span className="text-gray-400">Local time</span>
                                <span className="min-w-[3.5rem] font-medium tabular-nums text-gray-800">{clockTime}</span>
                                <span className="text-gray-300">•</span>
                                <span className="font-medium text-gray-600">{clockDate}</span>
                            </div>
                            <button className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-widest text-gray-700 transition hover:border-gray-400">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-3.5 w-3.5"
                                >
                                    <line x1="4" y1="6" x2="20" y2="6" />
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <line x1="4" y1="18" x2="20" y2="18" />
                                </svg>
                                <span className="hidden sm:inline">Menu</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* ===== MAIN CONTENT ===== */}
                <main className="mx-auto max-w-7xl px-6 py-16 sm:px-12 lg:px-20 space-y-24">

                    {/* ===== ROW 1: OVERVIEW & CAPACITY ===== */}
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        {/* Text Left */}
                        <div className="lg:col-span-5">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                                Amphitheater & Panggung Pertunjukan Outdoor
                            </div>

                            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                                Kalang (Amphitheater)
                            </h1>
                            <p className="mt-2 text-sm font-semibold text-emerald-600">
                                Kampung Wisata Pasir Kunci
                            </p>
                            <p className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed">
                                Kalang (Amphitheater) merupakan panggung pertunjukan terbuka berundak terbesar di Kampung Wisata Pasir Kunci dengan kapasitas 200 penonton. Berlatar belakang pemandangan alam Kota Bandung dan pegunungan, tempat ini merupakan arena utama pementasan seni tari, musik etnis, atraksi seni budaya Sunda, dan pertunjukan malam.
                            </p>

                            {/* Capacity & Feature Badge */}
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <div className="inline-flex items-center gap-3 rounded-2xl bg-gray-50 border border-gray-100 px-5 py-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Kapasitas Penonton</p>
                                        <p className="text-base font-extrabold text-gray-900">200 Orang</p>
                                    </div>
                                </div>

                                <div className="inline-flex items-center gap-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 px-5 py-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Panggung Utama</p>
                                        <p className="text-base font-extrabold text-gray-900">Outdoor Amphitheater</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Right: DSC01817.JPG */}
                        <div className="lg:col-span-7">
                            <div className="relative h-[360px] sm:h-[450px] w-full overflow-hidden rounded-3xl shadow-sm border border-gray-100">
                                <img
                                    src="/images/DSC01817.JPG"
                                    alt="Kalang Amphitheater Pasir Kunci"
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ===== ROW 2: FASILITAS & PERALATAN (IMAGE LEFT, TEXT RIGHT) ===== */}
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        {/* Image Left: DSC01822.JPG */}
                        <div className="order-2 lg:order-1 lg:col-span-7">
                            <div className="relative h-[360px] sm:h-[450px] w-full overflow-hidden rounded-3xl shadow-sm border border-gray-100">
                                <img
                                    src="/images/DSC01822.JPG"
                                    alt="Panggung Pertunjukan Kalang Amphitheater"
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Text Right */}
                        <div className="order-1 lg:order-2 lg:col-span-5">
                            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                                Arena Pertunjukan Seni Alam Terbuka
                            </h2>
                            <p className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed">
                                Tempat bertemunya apresiasi seni dan keindahan alam. Dengan bentuk tribun melingkar berundak, penonton dapat menikmati sajian seni tari dan musik etnis dengan latar panorama lampu kota (citylight) saat malam hari.
                            </p>

                            {/* Facilities Badges */}
                            <div className="mt-6 space-y-3">
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Daftar Fasilitas Amphitheater:</p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {facilitiesList.map((item, idx) => (
                                        <span key={idx} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100/80 px-3.5 py-1.5 font-semibold text-emerald-900">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== BENTO BOX HIGHLIGHTS SECTION ===== */}
                    <div className="pt-8 pb-4 space-y-10 border-t border-gray-100">
                        {/* Section Header */}
                        <div className="max-w-4xl">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.18]">
                                Panggung Pertunjukan Terbesar di Pasir Kunci.
                            </h2>
                            <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl">
                                Amphitheater outdoor dengan tribun berundak berkapasitas 200 penonton untuk pagelaran seni akbar khas Sunda.
                            </p>
                        </div>

                        {/* 4 Bento Box Cards Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {/* Card 1: Dark Card */}
                            <div className="flex flex-col justify-between rounded-3xl bg-[#18181b] p-6 text-white min-h-[260px] shadow-sm">
                                <div>
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 backdrop-blur-sm border border-emerald-500/30">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-8 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">200</h3>
                                </div>
                                <p className="mt-4 text-xs leading-relaxed text-gray-400">
                                    Kapasitas penonton tribun amphitheater outdoor.
                                </p>
                            </div>

                            {/* Card 2: Split Card */}
                            <div className="flex flex-col justify-between min-h-[260px]">
                                <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 p-5 text-center">
                                    <h4 className="text-xl font-extrabold text-gray-900">Cocok Untuk</h4>
                                    <p className="mt-1 text-xs font-semibold text-emerald-700">Pementasan Seni & Pertunjukan Malam</p>
                                </div>

                                <div className="mt-3 rounded-2xl bg-emerald-600 text-white p-4 flex items-center justify-between">
                                    <h4 className="text-xs font-extrabold uppercase">KALANG AMPHITHEATER</h4>
                                    <span className="text-[11px] font-semibold text-emerald-100">Pasir Kunci</span>
                                </div>
                            </div>

                            {/* Card 3: Procedure Box */}
                            <div className="flex flex-col justify-between rounded-3xl bg-[#F4F4F5] p-6 min-h-[260px]">
                                <div className="flex items-center justify-center py-2">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <h4 className="text-sm font-bold text-gray-900">Reservasi Hotline</h4>
                                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                                        Pengajuan pementasan diproses via Hotline Pasir Kunci di jam 08.00–16.00 WIB.
                                    </p>
                                </div>
                            </div>

                            {/* Card 4: Quote Card */}
                            <div className="flex flex-col justify-between rounded-3xl bg-white p-6 border border-gray-100 shadow-xs min-h-[260px]">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-serif leading-none text-emerald-300">“</span>
                                        <span className="text-[11px] font-extrabold tracking-wider text-emerald-600 uppercase">KALANG</span>
                                    </div>
                                    <p className="mt-3 text-xs leading-relaxed text-gray-600 font-medium italic">
                                        "Pertunjukan tari tradisional malam hari di Kalang Amphitheater dengan pemandangan lampu kota sungguh spektakuler."
                                    </p>
                                </div>

                                <p className="text-[11px] font-semibold text-gray-400">
                                    • Seniman Tari Sunda
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ===== ROW 3: PROSEDUR & KETENTUAN (TEXT LEFT, CARDS RIGHT) ===== */}
                    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 pt-4">
                        {/* Text Left */}
                        <div className="lg:col-span-5">
                            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                                Prosedur & Ketentuan
                            </h2>
                            <p className="mt-5 text-base text-gray-500 leading-relaxed">
                                Tata cara pengajuan pementasan dan syarat penggunaan Kalang (Amphitheater) di Kampung Wisata Pasir Kunci.
                            </p>

                            {/* Operational Sessions Box */}
                            <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 space-y-3">
                                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Jam Operasional & Sesi:</p>
                                <div className="space-y-2 text-xs font-bold text-gray-800">
                                    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 border border-emerald-100">
                                        <span>Sesi 1</span>
                                        <span className="text-emerald-700">08.00 – 13.00 WIB</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 border border-emerald-100">
                                        <span>Sesi 2</span>
                                        <span className="text-emerald-700">15.00 – 20.00 WIB</span>
                                    </div>
                                </div>
                                <p className="text-[11px] font-medium text-emerald-700 italic">
                                    * Hari libur nasional tutup.
                                </p>
                            </div>
                        </div>

                        {/* Rules List Right */}
                        <div className="lg:col-span-7 space-y-4">
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs transition hover:border-emerald-200">
                                <div className="flex items-start gap-4">
                                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">1</span>
                                    <div>
                                        <h4 className="text-base font-bold text-gray-900">Cek Live Schedule</h4>
                                        <p className="mt-1 text-xs leading-relaxed text-gray-500">
                                            Cek ketersediaan jadwal pementasan di fitur live schedule resmi Pasir Kunci.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs transition hover:border-emerald-200">
                                <div className="flex items-start gap-4">
                                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">2</span>
                                    <div>
                                        <h4 className="text-base font-bold text-gray-900">Konfirmasi Hotline & KTP Bandung</h4>
                                        <p className="mt-1 text-xs leading-relaxed text-gray-500">
                                            Konfirmasi ketersediaan panggung ke hotline Pasir Kunci di jam 08.00–16.00 WIB, dengan melampirkan KTP Kota Bandung dan rincian alat/pementasan.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs transition hover:border-emerald-200">
                                <div className="flex items-start gap-4">
                                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">3</span>
                                    <div>
                                        <h4 className="text-base font-bold text-gray-900">Surat Pengajuan & Deskripsi Kegiatan</h4>
                                        <p className="mt-1 text-xs leading-relaxed text-gray-500">
                                            Membuat Surat Pengajuan dan Lembar Deskripsi Kegiatan Pementasan (Tema, Rundown, Jumlah Peserta) lalu serahkan ke Front Office UPTD.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-xs transition hover:bg-emerald-50/80">
                                <div className="flex items-start gap-4">
                                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">4</span>
                                    <div>
                                        <h4 className="text-base font-bold text-gray-900">Penyimpanan KTP ke Sekuriti / Operator</h4>
                                        <p className="mt-1 text-xs leading-relaxed text-gray-600">
                                            Selama pertunjukan berlangsung, penanggung jawab kegiatan <strong className="text-emerald-800">wajib menyimpan KTP ke Operator / Sekuriti yang bertugas</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== 2-ROW INFINITE MARQUEE CAROUSEL WITH PLACEHOLDERS ===== */}
                    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden pt-12 pb-6 space-y-5">
                        <style>{`
                            @keyframes marqueeScrollLeft {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-50%); }
                            }
                            @keyframes marqueeScrollRight {
                                0% { transform: translateX(-50%); }
                                100% { transform: translateX(0); }
                            }
                            .animate-marquee-scroll-left {
                                display: flex;
                                width: max-content;
                                animation: marqueeScrollLeft 30s linear infinite;
                            }
                            .animate-marquee-scroll-right {
                                display: flex;
                                width: max-content;
                                animation: marqueeScrollRight 30s linear infinite;
                            }
                            .animate-marquee-scroll-left:hover,
                            .animate-marquee-scroll-right:hover {
                                animation-play-state: paused;
                            }
                        `}</style>

                        {/* Row 1: Scroll Left */}
                        <div className="relative w-full overflow-hidden">
                            <div className="animate-marquee-scroll-left gap-5">
                                {[...Array(12)].map((_, idx) => (
                                    <div
                                        key={`row1-ph-${idx}`}
                                        className="h-48 w-72 sm:h-56 sm:w-88 flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-3xl border border-gray-200/80 bg-gray-100/90 text-gray-400 shadow-xs transition-all duration-300 hover:border-gray-300 hover:bg-gray-100"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-300">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">FOTO KALANG AMPHITHEATER {idx + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Row 2: Scroll Right */}
                        <div className="relative w-full overflow-hidden">
                            <div className="animate-marquee-scroll-right gap-5">
                                {[...Array(12)].map((_, idx) => (
                                    <div
                                        key={`row2-ph-${idx}`}
                                        className="h-48 w-72 sm:h-56 sm:w-88 flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-3xl border border-gray-200/80 bg-gray-100/90 text-gray-400 shadow-xs transition-all duration-300 hover:border-gray-300 hover:bg-gray-100"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-300">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">FOTO KALANG AMPHITHEATER {idx + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Back Button */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-10">
                        <Link
                            href="/fasilitas/kampung-wisata-pasir-kunci"
                            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 hover:border-gray-300"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M19 12H5" />
                                <path d="M12 19l-7-7 7-7" />
                            </svg>
                            Kembali ke Kampung Wisata Pasir Kunci
                        </Link>
                    </div>

                </main>
            </div>
        </>
    );
}
