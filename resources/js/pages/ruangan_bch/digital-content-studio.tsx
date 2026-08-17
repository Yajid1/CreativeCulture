import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { useMemo } from 'react';

type UserRoomData = {
    id: number;
    name: string;
    slug: string;
    description: string;
    capacity: string;
    image: string | null;
    section2_title: string;
    section2_description: string;
    facilities_list: string;
    secondary_image: string | null;
    status: string;
    gallery_images?: (string | null)[];
};

export default function DigitalContentStudio({ room }: { room?: UserRoomData | null }) {
    const [clockTime, setClockTime] = useState('');
    const [clockDate, setClockDate] = useState('');

    const name = room?.name || 'Digital Content Studio (Lt.3)';
    const description = room?.description || 'Studio yang terletak di pojok lantai 3 ini berfungsi sebagai ruang produksi konten digital. Fasilitas yang tersedia berupa sistem tata cahaya komplit dan area white space beratap tinggi (High Ceiling Roof 5x5m) yang bebas dieksplorasi oleh kreator konten digital.';
    const capacity = room?.capacity || '15 Orang';
    const imageSrc = room?.image || '/images/DSC01758.jpg';

    const section2Title = room?.section2_title || 'Kamera, Lighting & Background';
    const section2Description = room?.section2_description || 'Cocok untuk pembuatan Digital Content, Campaign Video, dan Fashion Lookbook Video dengan pilihan latar background kain, paper, green screen, serta pencahayaan Profoto & Godox.';
    const secondaryImageSrc = room?.secondary_image || '/images/DSC01802.jpg';

    const parsedFacilities = useMemo(() => {
        if (!room?.facilities_list) return null;
        return room.facilities_list.split(/\n|,/).map(item => item.trim()).filter(Boolean);
    }, [room?.facilities_list]);

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

    return (
        <>
            <Head title={`${name} - Bandung Creative Hub`} />

            <div className="min-h-screen bg-white text-gray-900 font-sans">
                {/* ===== NAVBAR ===== */}
                <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-6 px-6 py-4 sm:px-10">
                        {/* Brand Logos */}
                        <Link href="/" className="flex items-center gap-2 sm:gap-3">
                            <img src="/images/Logo Pemkot.png" alt="Logo Pemkot Bandung" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-sm" />
                            <img src="/images/Logo Disbudpar.png" alt="Logo Disbudpar Kota Bandung" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-sm" />
                            <img src="/images/Logo BCH.png" alt="Logo Bandung Creative Hub" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-sm" />
                        </Link>

                        {/* Nav links matching welcome.tsx */}
                        <nav className="hidden items-center gap-7 text-sm font-medium text-gray-500 lg:flex" aria-label="Primary">
                            <Link href="/" className="transition hover:text-gray-900">Home</Link>
                            <Link href="/fasilitas/bandung-creative-hub" className="transition hover:text-gray-900">
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
                            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                                {name}
                            </h1>
                            <p className="mt-2 text-sm font-semibold text-gray-500">
                                Bandung Creative Hub
                            </p>
                            <p className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed">
                                {description}
                            </p>

                            {/* Capacity Badge */}
                            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-gray-50 border border-gray-100 px-5 py-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                        <path d="M23 7l-7 5 7 5V7z" />
                                        <rect x="1" y="5" width="15" height="14" rx="2" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Kapasitas Pengunjung</p>
                                    <p className="text-base font-extrabold text-gray-900">{capacity}</p>
                                </div>
                            </div>
                        </div>

                        {/* Image Right: DSC01758.jpg */}
                        <div className="lg:col-span-7">
                            <div className="relative h-[360px] sm:h-[450px] w-full overflow-hidden rounded-3xl shadow-sm bg-gray-100 flex items-center justify-center border border-gray-100">
                                <img
                                    src={imageSrc}
                                    alt={name}
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ===== ROW 2: CAMERA, LIGHTING & BACKGROUND (IMAGE LEFT, TEXT RIGHT) ===== */}
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        {/* Image Left: DSC01802.jpg */}
                        <div className="order-2 lg:order-1 lg:col-span-7">
                            <div className="relative h-[360px] sm:h-[450px] w-full overflow-hidden rounded-3xl shadow-sm bg-gray-100 flex items-center justify-center border border-gray-100">
                                <img
                                    src={secondaryImageSrc}
                                    alt={section2Title}
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Text Right */}
                        <div className="order-1 lg:order-2 lg:col-span-5">
                            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                                {section2Title}
                            </h2>
                            <p className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed">
                                {section2Description}
                            </p>

                            {/* Facilities Badges */}
                            <div className="mt-6 space-y-3">
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Peralatan Studio Konten:</p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {parsedFacilities ? (
                                        parsedFacilities.map((fac, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 font-semibold text-gray-700">
                                                ✨ {fac}
                                            </span>
                                        ))
                                    ) : (
                                        <>
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 font-semibold text-gray-700">📸 Sony A7III & Nikon D7200</span>
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 font-semibold text-gray-700">💡 Lighting Profoto & Trigger</span>
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 font-semibold text-gray-700">💡 Godox SL60W & Avangarde AV-LED</span>
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 font-semibold text-gray-700">🌈 RGB Light Stick (4) & ParLED (2)</span>
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 font-semibold text-gray-700">🛖 High Ceiling Roof 5x5m</span>
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 font-semibold text-gray-700">🟩 Green Screen (3) & BG Hitam/Putih</span>
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 font-semibold text-gray-700">📺 TV Sony 40" (2) & Standing Mirror</span>
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 font-semibold text-gray-700">🎬 Softbox Godox, Clapper Board & Reflektor</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== BENTO BOX HIGHLIGHTS SECTION ===== */}
                    <div className="pt-8 pb-4 space-y-10 border-t border-gray-100">
                        {/* Section Header */}
                        <div className="max-w-4xl">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.18]">
                                Studio Konten Digital & Campaign Video di Lantai 3 BCH.
                            </h2>
                            <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl">
                                Menyediakan area white space 5x5m dengan peralatan studio video, lighting pro, dan aneka pilihan latar background.
                            </p>
                        </div>

                        {/* 4 Bento Box Cards Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {/* Card 1: Dark Card */}
                            <div className="flex flex-col justify-between rounded-3xl bg-[#18181b] p-6 text-white min-h-[260px] shadow-sm">
                                <div>
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                            <path d="M23 7l-7 5 7 5V7z" />
                                            <rect x="1" y="5" width="15" height="14" rx="2" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-8 text-4xl sm:text-5xl font-extrabold tracking-tight">15</h3>
                                </div>
                                <p className="mt-4 text-xs leading-relaxed text-gray-400">
                                    Kapasitas maksimal orang per sesi produksi konten.
                                </p>
                            </div>

                            {/* Card 2: Split Card */}
                            <div className="flex flex-col justify-between min-h-[260px]">
                                <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-[#F4F4F5] p-5 text-center">
                                    <h4 className="text-xl font-extrabold text-gray-900">2 Sesi / Hari</h4>
                                    <p className="mt-1 text-xs font-semibold text-gray-500">09.00 – 16.00 WIB</p>
                                </div>

                                <div className="mt-3 rounded-2xl bg-purple-50 border border-purple-100 p-4 flex items-center justify-between text-purple-800">
                                    <h4 className="text-xs font-extrabold">ROOF 5x5M</h4>
                                    <span className="text-[11px] font-semibold">Lighting Profoto</span>
                                </div>
                            </div>

                            {/* Card 3: Procedure Box */}
                            <div className="flex flex-col justify-between rounded-3xl bg-[#F4F4F5] p-6 min-h-[260px]">
                                <div className="flex items-center justify-center py-2">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-xs">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Reservasi Hotline</h4>
                                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                                        Pengajuan diproses via Hotline di jam 08.00–16.00 WIB.
                                    </p>
                                </div>
                            </div>

                            {/* Card 4: Quote Card */}
                            <div className="flex flex-col justify-between rounded-3xl bg-white p-6 border border-gray-100 shadow-xs min-h-[260px]">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-serif leading-none text-gray-300">“</span>
                                        <span className="text-[11px] font-extrabold tracking-wider text-gray-400 uppercase">DIGITAL CONTENT</span>
                                    </div>
                                    <p className="mt-3 text-xs leading-relaxed text-gray-600 font-medium italic">
                                        "Fasilitas green screen dan lighting Profoto di Digital Content Studio BCH sangat lengkap untuk produksi video campaign."
                                    </p>
                                </div>

                                <p className="text-[11px] font-semibold text-gray-400">
                                    • Content Creator Bandung
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ===== ROW 3: PROSEDUR & SESI (TEXT LEFT, CARDS RIGHT) ===== */}
                    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 pt-4">
                        {/* Text Left */}
                        <div className="lg:col-span-5">
                            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                                Prosedur & Ketentuan
                            </h2>
                            <p className="mt-5 text-base text-gray-500 leading-relaxed">
                                Tata cara pengajuan dan pembagian jadwal sesi Digital Content Studio di Bandung Creative Hub.
                            </p>

                            {/* Sessions Box */}
                            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50/80 p-5 space-y-3">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jadwal Sesi Harian (2 Sesi / Hari):</p>
                                <div className="space-y-2 text-xs font-bold text-gray-800">
                                    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 border border-gray-100">
                                        <span>Sesi 1</span>
                                        <span className="text-purple-600">09.00 – 12.00 WIB</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 border border-gray-100">
                                        <span>Sesi 2</span>
                                        <span className="text-purple-600">13.00 – 16.00 WIB</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rules List Right */}
                        <div className="lg:col-span-7 space-y-4">
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs transition hover:border-gray-200">
                                <div className="flex items-start gap-4">
                                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">1</span>
                                    <div>
                                        <h4 className="text-base font-bold text-gray-900">Persyaratan KTP & Lampiran Perangkat</h4>
                                        <p className="mt-1 text-xs leading-relaxed text-gray-500">
                                            Pengaju wajib ber-KTP Kota Bandung, disertai lampiran daftar kebutuhan perangkat yang akan digunakan.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs transition hover:border-gray-200">
                                <div className="flex items-start gap-4">
                                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">2</span>
                                    <div>
                                        <h4 className="text-base font-bold text-gray-900">Pengajuan via Hotline Resmi</h4>
                                        <p className="mt-1 text-xs leading-relaxed text-gray-500">
                                            Pengajuan Digital Content Studio hanya diproses melalui hotline Bandung Creative Hub di jam kerja 08.00–16.00 WIB.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs transition hover:border-gray-200">
                                <div className="flex items-start gap-4">
                                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">3</span>
                                    <div>
                                        <h4 className="text-base font-bold text-gray-900">Registrasi & Titip KTP di Front Office</h4>
                                        <p className="mt-1 text-xs leading-relaxed text-gray-500">
                                            Mengisi Surat Pernyataan di Front Office sebelum sesi berlangsung, dan penanggung jawab menitipkan KTP di Front Office selama sesi berjalan.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-6 shadow-xs transition hover:bg-purple-50/80">
                                <div className="flex items-start gap-4">
                                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">4</span>
                                    <div>
                                        <h4 className="text-base font-bold text-gray-900">Batas Maksimal Sesi</h4>
                                        <p className="mt-1 text-xs leading-relaxed text-gray-600">
                                            Pengajuan maksimal <strong className="text-purple-700">2 sesi per hari</strong>. Pengajuan sesi lanjutan diperkenankan setelah sesi yang sedang berlangsung berakhir.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== 2-ROW INFINITE MARQUEE IMAGE CAROUSEL WITH PLACEHOLDERS ===== */}
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
                                {[...Array(12)].map((_, idx) => {
                                    const imageIndex = idx % 8;
                                    const imgUrl = room?.gallery_images?.[imageIndex];
                                    return (
                                        <div
                                            key={`row1-ph-${idx}`}
                                            className="h-48 w-72 sm:h-56 sm:w-88 flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-3xl border border-gray-200/80 bg-gray-100/90 text-gray-400 shadow-xs transition-all duration-300 hover:border-gray-300 hover:bg-gray-100 overflow-hidden"
                                        >
                                            {imgUrl ? (
                                                <img src={imgUrl} alt={`${name} ${imageIndex + 1}`} className="h-full w-full object-cover" />
                                            ) : (
                                                <>
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-300">
                                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                                        <polyline points="21 15 16 10 5 21" />
                                                    </svg>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Foto {name} {imageIndex + 1}</span>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
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
                                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Foto Digital Content {idx + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Back Button */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-10">
                        <Link
                            href="/fasilitas/bandung-creative-hub"
                            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 hover:border-gray-300"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M19 12H5" />
                                <path d="M12 19l-7-7 7-7" />
                            </svg>
                            Kembali ke Bandung Creative Hub
                        </Link>
                    </div>

                </main>
            </div>
        </>
    );
}
