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

import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function StudioMusik({ room }: { room?: UserRoomData | null }) {
    const [clockTime, setClockTime] = useState('');
    const [clockDate, setClockDate] = useState('');

    const name = room?.name;
    const roomName = name;
    const roomDesc = room?.description;
    const roomCap = room?.capacity;
    const roomImg = room?.image;
    const roomSec2Title = room?.section2_title;
    const roomSec2Desc = room?.section2_description;
    const roomSec2Img = room?.secondary_image;

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
            <Head title="Studio Musik (Basement) - Bandung Creative Hub" />

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
                                Studio Musik (Basement)
                            </h1>
                            <p className="mt-2 text-sm font-semibold text-gray-500">
                                Bandung Creative Hub
                            </p>
                            <p className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed">
                                Studio musik yang terletak di lantai dasar ini merupakan studio musik gratis pertama di Kota Bandung. Fasilitas yang tersedia dirancang seperti studio musik standar pada umumnya, lengkap dengan peralatan instrumen profesional untuk mendukung latihan musik, karya instrumental, duo, hingga sesi band.
                            </p>

                            {/* Capacity Badge */}
                            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-gray-50 border border-gray-100 px-5 py-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Kapasitas Maksimal</p>
                                    <p className="text-base font-extrabold text-gray-900">8 Orang</p>
                                </div>
                            </div>
                        </div>

                        {/* Image Right: DSC01758.jpg */}
                        <div className="lg:col-span-7">
                            <div className="relative h-[360px] sm:h-[450px] w-full overflow-hidden rounded-3xl shadow-sm">
                                <img
                                    src="/images/DSC01758.jpg"
                                    alt="Studio Musik Bandung Creative Hub"
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ===== ROW 2: GEAR & EQUIPMENT (IMAGE LEFT, TEXT RIGHT) ===== */}
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        {/* Image Left: DSC01802.jpg */}
                        <div className="order-2 lg:order-1 lg:col-span-7">
                            <div className="relative h-[360px] sm:h-[450px] w-full overflow-hidden rounded-3xl shadow-sm">
                                <img
                                    src="/images/DSC01802.jpg"
                                    alt="Peralatan Studio Musik BCH"
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Text Right */}
                        <div className="order-1 lg:order-2 lg:col-span-5">
                            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                                Fasilitas & Gear Musik
                            </h2>
                            <p className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed">
                                Studio musik BCH telah dilengkapi instrumen dan perangkat audio berkualitas tinggi untuk menunjang performa dan kualitas latihan Anda.
                            </p>

                            {/* Gear List Badges */}
                            <div className="mt-6 space-y-3">
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Daftar Perlengkapan Studio:</p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-700">🎤 Microphone</span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-700">🎸 Electric Guitar Yamaha & Squier</span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-700">🎸 Electric Bass Squier</span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-700">🥁 Drum Set Gretsch</span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-700">🎹 Digital Piano Yamaha</span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-700">🎛️ Analog Mixer Yamaha MG16XU</span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-700">🔊 Amp Blackstar ID40 & Roland JC</span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-700">🔊 Bass Amp Fender Rumble</span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-700">📢 Speaker JBL EON615</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== BENTO BOX HIGHLIGHTS SECTION ===== */}
                    <div className="pt-8 pb-4 space-y-10 border-t border-gray-100">
                        {/* Section Header */}
                        <div className="max-w-4xl">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.18]">
                                Studio Musik Gratis Pertama di Kota Bandung untuk Komunitas Kreatif.
                            </h2>
                            <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl">
                                Menyediakan akses latihan musik cuma-cuma dengan gear lengkap dan sistem jadwal terstruktur setiap hari kerja.
                            </p>
                        </div>

                        {/* 4 Bento Box Cards Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {/* Card 1: Dark Card */}
                            <div className="flex flex-col justify-between rounded-3xl bg-[#18181b] p-6 text-white min-h-[260px] shadow-sm">
                                <div>
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                            <path d="M9 18V5l12-2v13" />
                                            <circle cx="6" cy="18" r="3" />
                                            <circle cx="18" cy="16" r="3" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-8 text-4xl sm:text-5xl font-extrabold tracking-tight">8</h3>
                                </div>
                                <p className="mt-4 text-xs leading-relaxed text-gray-400">
                                    Kapasitas maksimal orang per sesi latihan studio musik.
                                </p>
                            </div>

                            {/* Card 2: Split Card */}
                            <div className="flex flex-col justify-between min-h-[260px]">
                                <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-[#F4F4F5] p-5 text-center">
                                    <h4 className="text-2xl font-extrabold text-gray-900">3 Sesi / Hari</h4>
                                    <p className="mt-1 text-xs font-semibold text-gray-500">09.00 – 15.00 WIB</p>
                                </div>

                                <div className="mt-3 rounded-2xl bg-emerald-50 border border-emerald-100 p-4 flex items-center justify-between text-emerald-800">
                                    <h4 className="text-sm font-extrabold">100% GRATIS</h4>
                                    <span className="text-[11px] font-semibold">KTP Kota Bandung</span>
                                </div>
                            </div>

                            {/* Card 3: Procedure Box */}
                            <div className="flex flex-col justify-between rounded-3xl bg-[#F4F4F5] p-6 min-h-[260px]">
                                <div className="flex items-center justify-center py-2">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-xs">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                            <rect x="3" y="4" width="18" height="16" rx="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Prosedur Reservasi</h4>
                                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                                        Cek jadwal via linktr.ee/creativehub_bdg & hubungi hotline 08.00–16.00 WIB.
                                    </p>
                                </div>
                            </div>

                            {/* Card 4: Quote Card */}
                            <div className="flex flex-col justify-between rounded-3xl bg-white p-6 border border-gray-100 shadow-xs min-h-[260px]">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-serif leading-none text-gray-300">“</span>
                                        <span className="text-[11px] font-extrabold tracking-wider text-gray-400 uppercase">STUDIO MUSIK</span>
                                    </div>
                                    <p className="mt-3 text-xs leading-relaxed text-gray-600 font-medium italic">
                                        "Fasilitas studio musik gratis berkualitas tinggi dengan peralatan lengkap untuk musisi lokal Bandung."
                                    </p>
                                </div>

                                <p className="text-[11px] font-semibold text-gray-400">
                                    • Musisi Komunitas Bandung
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
                                Harap mengikuti tata cara pengajuan dan jadwal sesi penggunaan studio musik di Bandung Creative Hub.
                            </p>

                            {/* Sessions Box */}
                            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50/80 p-5 space-y-3">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jadwal Sesi Harian (3 Sesi / Hari):</p>
                                <div className="space-y-2 text-xs font-bold text-gray-800">
                                    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-2 border border-gray-100">
                                        <span>Sesi 1</span>
                                        <span className="text-blue-600">09.00 – 11.00 WIB</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-2 border border-gray-100">
                                        <span>Sesi 2</span>
                                        <span className="text-blue-600">11.00 – 13.00 WIB</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-2 border border-gray-100">
                                        <span>Sesi 3</span>
                                        <span className="text-blue-600">13.00 – 15.00 WIB</span>
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
                                        <h4 className="text-base font-bold text-gray-900">Persyaratan KTP Kota Bandung</h4>
                                        <p className="mt-1 text-xs leading-relaxed text-gray-500">
                                            Pengaju wajib ber-KTP Kota Bandung dan melampirkan daftar nama-nama personil yang akan mengikuti sesi latihan.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs transition hover:border-gray-200">
                                <div className="flex items-start gap-4">
                                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">2</span>
                                    <div>
                                        <h4 className="text-base font-bold text-gray-900">Pengecekan Jadwal & Hotline</h4>
                                        <p className="mt-1 text-xs leading-relaxed text-gray-500">
                                            Cek ketersediaan jadwal melalui fitur live schedule <strong className="text-gray-700">linktr.ee/creativehub_bdg</strong>, kemudian hubungi hotline di jam operasional 08.00–16.00 WIB.
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
                                            Mengisi Surat Pernyataan di Front Office sebelum sesi berlangsung. Selama sesi berjalan, penanggung jawab wajib menyimpan/menitipkan KTP di Front Office.
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
                                            Pengajuan maksimal <strong className="text-purple-700">1 sesi per hari</strong>. Pengajuan sesi lanjutan diperkenankan setelah sesi yang berlangsung selesai.
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
                                            <path d="M9 18V5l12-2v13" />
                                            <circle cx="6" cy="18" r="3" />
                                            <circle cx="18" cy="16" r="3" />
                                        </svg>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Foto Studio {idx + 1}</span>
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
