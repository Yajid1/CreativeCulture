import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';


export default function BandungCreativeHub() {
    const facility = {
        name: 'Bandung Creative Hub',
        category: 'Bandung Creative Hub',
        description: 'Pusat kolaborasi kreatif yang menyatukan komunitas seni, teknologi, dan bisnis dalam satu ruang inovatif di jantung kota Bandung.',
        videoUrl: '/videos/bch.mp4',
    };

    const notAllowedList = [
        'Kegiatan di luar 17 Subsektor Ekonomi Kreatif',
        'Bazar yang melibatkan jual-beli produk',
        'Pelantikan Organisasi, Komunitas, dsb',
        'Sekretariat Organisasi, Komunitas, dsb',
        'Wisuda dan Perpisahan Sekolah, Kampus',
    ];

    const allowedList = [
        'Workshop',
        'Co-Worker',
        'Exhibition',
        'Mini Showcase',
        'Class Session',
    ];

    const subsectors = [
        { number: '01', title: 'Aplikasi', desc: 'Kegiatan kreatif dalam pengembangan dan pemanfaatan sistem serta konten digital berbasis perangkat lunak.' },
        { number: '02', title: 'Arsitektur', desc: 'Kegiatan kreatif yang berkaitan dengan perencanaan konstruksi bangunan secara menyeluruh.' },
        { number: '03', title: 'Desain Interior', desc: 'Aktivitas kreatif yang berhubungan dengan penciptaan solusi ruang dalam bangunan.' },
        { number: '04', title: 'Desain Produk', desc: 'Kegiatan kreatif dalam menciptakan dan mengembangkan suatu produk agar memiliki nilai fungsi dan estetika.' },
        { number: '05', title: 'Desain Komunikasi Visual', desc: 'Kegiatan kreatif yang berfokus pada penyampaian pesan melalui elemen visual.' },
        { number: '06', title: 'Film, Animasi & Video', desc: 'Kegiatan kreatif yang berkaitan dengan proses pembuatan film, video, dan animasi.' },
        { number: '07', title: 'Fashion', desc: 'Kegiatan kreatif yang berhubungan dengan desain pakaian, alas kaki, dan aksesoris.' },
        { number: '08', title: 'Fotografi', desc: 'Kegiatan kreatif dalam penciptaan karya foto melalui proses pengambilan dan pengolahan gambar.' },
        { number: '09', title: 'Kuliner', desc: 'Kegiatan kreatif yang mencakup pengolahan bahan pangan menjadi produk makanan dan minuman bernilai tambah.' },
        { number: '10', title: 'Musik', desc: 'Kegiatan kreatif yang berkaitan dengan proses kreasi, produksi, dan pertunjukan karya musik.' },
        { number: '11', title: 'Penerbitan', desc: 'Kegiatan kreatif yang mencakup penulisan dan penyebarluasan karya tulis.' },
        { number: '12', title: 'Pengembangan Permainan', desc: 'Kegiatan kreatif dalam merancang dan mengembangkan permainan (game).' },
        { number: '13', title: 'Periklanan', desc: 'Kegiatan kreatif yang berkaitan dengan perencanaan komunikasi dan pembuatan materi promosi.' },
        { number: '14', title: 'Seni Kriya', desc: 'Kegiatan kreatif yang berhubungan dengan penciptaan produk kerajinan tangan bernilai seni dan fungsi.' },
        { number: '15', title: 'Seni Pertunjukan', desc: 'Kegiatan kreatif yang mencakup pengembangan konten dan pengemasan pertunjukan seni.' },
        { number: '16', title: 'Seni Rupa', desc: 'Kegiatan kreatif yang berkaitan dengan penciptaan karya seni visual seperti lukisan dan patung.' },
        { number: '17', title: 'TV & Radio', desc: 'Kegiatan kreatif yang berhubungan dengan pembuatan dan pengemasan konten siaran televisi dan radio.' },
    ];

    const subsectorGradients = [
        'from-blue-400 to-blue-600',
        'from-sky-400 to-blue-500',
        'from-indigo-400 to-blue-600',
        'from-blue-500 to-indigo-600',
        'from-cyan-400 to-blue-500',
        'from-blue-400 to-sky-600',
        'from-indigo-500 to-blue-700',
    ];

    // State modal & clock
    const [activeSubsector, setActiveSubsector] = useState<(typeof subsectors)[0] | null>(null);
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

    return (
        <>
            <Head title={facility.name} />

            <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
                {/* Video Background - 100% jernih, tanpa fade/overlay apapun */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src={facility.videoUrl} type="video/mp4" />
                </video>

                {/* Navbar — samakan dengan landing page */}
                <header className="relative z-10">
                    <div className="flex items-center justify-between gap-6 px-6 py-5 sm:px-10">
                        {/* Brand */}
                        <Link href="/" className="inline-flex items-center gap-2 text-base font-semibold text-white" style={{ letterSpacing: '-0.01em' }}>
                            <svg viewBox="0 0 48 48" fill="currentColor" className="h-5 w-5" style={{ color: '#b15f2c' }}>
                                <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
                            </svg>
                        </Link>

                        {/* Nav links */}
                        <nav className="hidden items-center gap-7 text-sm font-medium text-white/80 lg:flex">
                            <Link href="/" className="transition hover:text-white">Home</Link>
                            <Link href="/#works" className="transition hover:text-white">Work</Link>
                            <Link href="/#services" className="transition hover:text-white">Services <span className="text-xs opacity-60">▾</span></Link>
                            <Link href="/#about" className="transition hover:text-white">Studio</Link>
                            <Link href="/#careers" className="transition hover:text-white">Careers</Link>
                            <Link href="/#contact" className="transition hover:text-white">Contact</Link>
                        </nav>

                        {/* Right: clock + menu */}
                        <div className="flex items-center gap-3">
                            <div className="hidden items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-white/70 backdrop-blur-sm md:flex">
                                <span className="text-white/45">Local time</span>
                                <span className="min-w-[3.5rem] font-medium tabular-nums text-white">{clockTime}</span>
                                <span className="text-white/30">•</span>
                                <span className="font-medium text-white/80">{clockDate}</span>
                            </div>
                            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white/20">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                                    <line x1="4" y1="6" x2="20" y2="6" />
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <line x1="4" y1="18" x2="20" y2="18" />
                                </svg>
                                <span className="hidden sm:inline">Menu</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Konten Utama */}
                <div className="relative z-10 flex min-h-[calc(100vh-88px)] flex-col justify-between px-6 py-8 sm:px-10">
                    <div className="mt-auto max-w-xl">
                        <h1
                            className="mt-3 text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl"
                            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9)' }}
                        >
                            Bandung
                            <br />
                            Creative Hub
                        </h1>

                        <p
                            className="mt-5 max-w-md text-sm leading-relaxed text-white/90"
                            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
                        >
                            {facility.description}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link
                                href="#detail"
                                className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wide text-black hover:bg-white/90"
                            >
                                Lihat Detail
                            </Link>
                            <Link
                                href="/kontak"
                                className="rounded-full border border-white/60 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm hover:border-white hover:bg-white/10"
                            >
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Nav Kategori */}
                <div
                    className="relative z-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/20 px-6 py-4 text-[11px] font-medium uppercase tracking-widest text-white/70 sm:px-10"
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
                >
                    <span className="text-white">Ruang Kolaborasi</span>
                    <span>Studio Kreatif</span>
                    <span>Coworking Space</span>
                    <span>Event Hall</span>
                    <span>Galeri</span>
                </div>
            </div>

            {/* Section detail - gaya "About" seperti referensi */}
            <section id="detail" className="relative overflow-hidden bg-white px-6 py-24 text-gray-900 sm:px-10">
                {/* Blob dekoratif kiri */}
                <div
                    className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-gray-50"
                    aria-hidden="true"
                />
                {/* Blob dekoratif kanan bawah */}
                <div
                    className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-[55%_45%_40%_60%/45%_55%_50%_50%] bg-gray-50"
                    aria-hidden="true"
                />

                <div className="relative mx-auto max-w-4xl">
                    {/* Label kecil dengan dot */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                        Tentang Kami
                    </div>

                    {/* Heading besar */}
                    <h2 className="mt-6 max-w-2xl text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                        {facility.name} adalah ruang kolaborasi kreatif di jantung kota Bandung,
                        dirancang untuk menyatukan seniman, inovator, dan pelaku bisnis dalam satu
                        ekosistem yang saling menumbuhkan.
                    </h2>

                    {/* Tombol CTA */}
                    <div className="mt-8">
                        <Link
                            href="/kontak"
                            className="inline-flex items-center gap-3 rounded-full bg-gray-100 py-2 pl-2 pr-5 text-sm font-medium text-gray-900 transition hover:bg-gray-200"
                        >
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M5 12h14" />
                                    <path d="M13 6l6 6-6 6" />
                                </svg>
                            </span>
                            Hubungi Kami
                        </Link>
                    </div>

                    {/* 2 Kolom info */}
                    <div className="mt-16 grid grid-cols-1 gap-10 border-t border-gray-200 pt-10 sm:grid-cols-2">
                        <div className="border-b border-gray-200 pb-8 sm:border-b-0">
                            <h3 className="text-base font-semibold text-gray-900">
                                Ruang & Fasilitas
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-500">
                                {facility.description}
                            </p>
                        </div>

                        <div className="pb-8">
                            <h3 className="text-base font-semibold text-gray-900">
                                Bergabung Bersama Kami
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-500">
                                Baik kamu seorang kreator, komunitas, atau pelaku bisnis kreatif —
                                kami membuka ruang untuk berkolaborasi, berkarya, dan bertumbuh
                                bersama di Bandung Creative Hub.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Kegiatan yang Bisa/Tidak Bisa Difasilitasi */}
            <section className="relative overflow-hidden bg-white px-6 py-24 text-gray-900 sm:px-10">
                {/* Blob dekoratif kanan atas */}
                <div
                    className="pointer-events-none absolute -right-32 top-10 h-[400px] w-[400px] rounded-[50%_50%_45%_55%/55%_45%_55%_45%] bg-gray-50"
                    aria-hidden="true"
                />
                {/* Blob dekoratif kiri bawah */}
                <div
                    className="pointer-events-none absolute -left-24 bottom-10 h-[340px] w-[340px] rounded-[40%_60%_55%_45%/50%_40%_60%_50%] bg-gray-50"
                    aria-hidden="true"
                />

                <div className="relative mx-auto max-w-6xl">
                    <h2 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                        Kegiatan yang bisa dan
                        <br />
                        tidak bisa difasilitasi
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
                        Tidak semua kegiatan cocok dengan ruang kami. Berikut panduan agar
                        kegiatanmu selaras dengan fungsi Bandung Creative Hub.
                    </p>

                    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Panel kiri - Tidak bisa difasilitasi */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Kegiatan yang tidak selaras
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Di luar 17 Subsektor Ekonomi Kreatif, aktivitas ini tidak dapat
                                kami fasilitasi.
                            </p>

                            <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
                                {notAllowedList.map((item, i) => (
                                    <div
                                        key={item}
                                        className={
                                            'group relative overflow-hidden ' +
                                            (i !== notAllowedList.length - 1 ? 'border-b border-gray-200' : '')
                                        }
                                    >
                                        <div className="absolute inset-0 origin-left scale-x-0 bg-gray-900 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                                        <div className="relative z-10 px-5 py-4">
                                            <span className="text-sm font-medium text-gray-800 transition-colors duration-500 group-hover:text-white">
                                                {item}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Panel kanan - Bisa difasilitasi */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Kegiatan yang kami fasilitasi
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Bandung Creative Hub menyatukan ruang, komunitas, dan program
                                dalam satu ekosistem yang terhubung.
                            </p>

                            <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
                                {allowedList.map((item, i) => (
                                    <div
                                        key={item}
                                        className={
                                            'group relative overflow-hidden ' +
                                            (i !== allowedList.length - 1 ? 'border-b border-gray-200' : '')
                                        }
                                    >
                                        <div className="absolute inset-0 origin-left scale-x-0 bg-gray-900 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                                        <div className="relative z-10 px-5 py-4">
                                            <span className="text-sm font-medium text-gray-800 transition-colors duration-500 group-hover:text-white">
                                                {item}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 4 kolom fitur/aturan singkat */}
                    <div className="mt-16 grid grid-cols-1 gap-8 border-t border-gray-200 pt-10 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                Workshop & Kelas
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                Ruang untuk berbagi ilmu lewat sesi kelas, pelatihan, dan workshop kreatif.
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                Coworking & Exhibition
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                Area kerja bersama dan ruang pamer untuk karya komunitas kreatif.
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                17 Subsektor Ekraf
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                Fokus kami hanya pada kegiatan dalam lingkup ekonomi kreatif resmi.
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                Non-Komersial
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                Bukan tempat untuk kegiatan jual-beli, sekretariat, atau seremoni institusi.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 17 Subsektor Ekonomi Kreatif */}
            <section className="bg-white px-6 py-24 text-gray-900 sm:px-10">
                <div className="mx-auto max-w-6xl">
                    <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
                        17 Subsektor
                        <br />
                        Ekonomi Kreatif
                    </h2>

                    <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-gray-500 sm:text-base">
                        <p>
                            Ekonomi kreatif merupakan konsep ekonomi yang mengedepankan
                            kreativitas, ide, dan gagasan sebagai modal utama dalam
                            menciptakan nilai tambah suatu produk atau kegiatan. Berdasarkan
                            klasifikasi yang ditetapkan, terdapat 17 subsektor ekonomi
                            kreatif yang menjadi ruang lingkup pengembangan kreativitas
                            masyarakat, mulai dari bidang seni, desain, media, hingga
                            teknologi digital.
                        </p>
                        <p>
                            Setiap subsektor memiliki karakteristik dan bidang kegiatan yang
                            berbeda, namun secara keseluruhan bertujuan untuk mendorong
                            tumbuhnya potensi kreatif masyarakat sebagai bagian dari upaya
                            pengembangan simpul kreatif di berbagai wilayah. Melalui
                            pemahaman terhadap 17 subsektor ini, diharapkan masyarakat dapat
                            lebih mengenal dan memanfaatkan fasilitas serta ruang kreatif
                            yang tersedia sesuai dengan minat dan bidang kreativitas
                            masing-masing.
                        </p>
                    </div>

                    {/* Header kartu subsektor */}
                    <div className="mt-8 flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Geser untuk lihat semua
                        </span>
                        <Link
                            href="/subsektor"
                            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
                        >
                            Lihat Semua
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </Link>
                    </div>

                    {/* Scroll horizontal kartu subsektor — marquee tanpa henti */}
                    <style>{`
                        @keyframes subsector-marquee {
                            0%   { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .subsector-track {
                            animation: subsector-marquee 80s linear infinite;
                        }
                        .subsector-track:hover {
                            animation-play-state: paused;
                        }
                    `}</style>
                    <div className="mt-4 overflow-hidden -mx-6 sm:-mx-10">
                        <div className="subsector-track flex gap-4 w-max px-6 sm:px-10">
                            {[...subsectors, ...subsectors].map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveSubsector(subsectors[i % subsectors.length])}
                                    className="relative flex w-[300px] flex-shrink-0 cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 text-left"
                                >
                                    <div
                                        className={
                                            'flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ' +
                                            subsectorGradients[i % subsectorGradients.length]
                                        }
                                    >
                                        <span className="text-sm font-bold">{item.number}</span>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div
                                        className={
                                            'absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ' +
                                            subsectorGradients[i % subsectorGradients.length]
                                        }
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Ruangan dan Area Tersedia */}
            <section className="bg-white px-6 py-24 text-gray-900 sm:px-10">
                <div className="mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Ruangan dan Area Tersedia</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500">
                        Tersedia berbagai ruang dengan kapasitas dan fungsi berbeda untuk mendukung kegiatan kreatifmu di Bandung Creative Hub.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { icon: 'music', name: 'Basement dan Area Parkir', floor: 'Basement', capacity: 200 },
                            { icon: 'music', name: 'Studio Musik', floor: 'Basement', capacity: 8 },
                            { icon: 'gallery', name: 'Exhibition Area', floor: 'Lt.1', capacity: 100 },
                            { icon: 'stage', name: 'Amphitheater', floor: 'Lt.1', capacity: 100 },
                            { icon: 'book', name: 'Perpustakaan', floor: 'Lt.2', capacity: 30 },
                            { icon: 'cowork', name: 'Coworking Space', floor: 'Lt.2', capacity: 14 },
                            { icon: 'glass', name: 'Ruang Kaca', floor: 'Lt.2', capacity: 25 },
                            { icon: 'mic', name: 'Recording Studio', floor: 'Lt.3', capacity: 8 },
                            { icon: 'stage', name: 'Auditorium', floor: 'Lt.3', capacity: 150 },
                            { icon: 'camera', name: 'Digital Content Studio', floor: 'Lt.3', capacity: 15 },
                            { icon: 'dance', name: 'Studio Tari', floor: 'Lt.3', capacity: 30 },
                            { icon: 'garden', name: 'Taman', floor: 'Lt.4', capacity: 25 },
                            { icon: 'video', name: 'Teleconference Room', floor: 'Lt.4', capacity: 10 },
                            { icon: 'sewing', name: 'Studio Jahit', floor: 'Lt.4', capacity: 8 },
                            { icon: 'video', name: 'Studio Animasi & Editing', floor: 'Lt.4', capacity: 10 },
                            { icon: 'music', name: 'Studio Fenyen', floor: 'Lt.5', capacity: 30 },
                            { icon: 'stage', name: 'Aula', floor: 'Lt.5', capacity: 80 },
                        ].map((room, i) => {
                            const roomGradients = [
                                'from-blue-400 to-blue-600',
                                'from-sky-400 to-blue-500',
                                'from-indigo-400 to-blue-600',
                                'from-blue-500 to-indigo-600',
                                'from-cyan-400 to-blue-500',
                                'from-blue-400 to-sky-600',
                                'from-indigo-500 to-blue-700',
                            ];
                            const gradient = roomGradients[i % roomGradients.length];
                            const icons = {
                                music: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>,
                                gallery: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></svg>,
                                stage: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
                                book: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
                                cowork: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>,
                                glass: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>,
                                mic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>,
                                camera: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>,
                                dance: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="4" r="2" /><path d="M9 20l3-10 3 10" /><path d="M6 8h12" /></svg>,
                                garden: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 22V12" /><path d="M5 12c0-5 3.5-9 7-9s7 4 7 9" /><path d="M5 15c0 4 3 7 7 7s7-3 7-7" /></svg>,
                                video: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>,
                                sewing: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" /><line x1="16" y1="8" x2="2" y2="22" /><line x1="17.5" y1="15" x2="9" y2="15" /></svg>,
                            };
                            return (
                                <div
                                    key={i}
                                    className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${gradient}`}>
                                        {icons[room.icon as keyof typeof icons]}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm font-bold text-gray-900 transition group-hover:text-blue-600">
                                            {room.name}
                                        </h3>
                                        <p className="mt-1 text-xs text-gray-400">{room.floor}</p>
                                        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                            </svg>
                                            {room.capacity} Orang
                                        </div>
                                    </div>
                                    <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r opacity-0 transition group-hover:opacity-100 ${gradient}`} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Section CTA + Lokasi */}
            <section className="bg-white px-6 py-20 text-gray-900 sm:px-10">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">

                    {/* Kiri — Ajakan */}
                    <div className="flex flex-col justify-center">
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-900">
                            <span className="h-1.5 w-6 rounded-full bg-gray-900" />
                            Bergabung Sekarang
                        </span>

                        <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
                            Jadikan Bandung Creative Hub
                            <br />
                            <span className="text-gray-900">ruang kreatifmu</span>
                        </h2>

                        <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-500">
                            Bandung Creative Hub hadir untuk mewadahi seniman, inovator, dan pelaku bisnis kreatif dalam satu ekosistem yang saling menumbuhkan.
                            Daftarkan kegiatanmu dan jadilah bagian dari komunitas kreatif Bandung.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link
                                href="/kontak"
                                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                            >
                                Daftarkan Kegiatan
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
                                </svg>
                            </Link>
                            <Link
                                href="/kontak"
                                className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-500"
                            >
                                Hubungi Kami
                            </Link>
                        </div>

                        {/* Info cepat */}
                        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-gray-200 pt-8 sm:grid-cols-3">
                            {[
                                { label: 'Lantai', value: '5 Lt.' },
                                { label: 'Ruangan', value: '17 Ruang' },
                                { label: 'Kapasitas', value: '±850 Orang' },
                            ].map(stat => (
                                <div key={stat.label}>
                                    <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
                                    <p className="mt-0.5 text-xs text-gray-500">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Kanan — Lokasi Google Maps */}
                    <div className="flex flex-col gap-4">
                        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                            <iframe
                                title="Lokasi Bandung Creative Hub"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0558820635!2d107.64800687499636!3d-6.921285993069098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9adf177bf8d%3A0x437398490f6694b0!2sBandung%20Creative%20Hub!5e0!3m2!1sid!2sid!4v1706000000000"
                                width="100%"
                                height="360"
                                style={{ border: 0, display: 'block' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        {/* Info alamat */}
                        <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4">
                            <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Bandung Creative Hub</p>
                                <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                                    Jl. Laswi No.7, Kacapiring, Kec. Batununggal,<br />Kota Bandung, Jawa Barat 40271
                                </p>
                                <a
                                    href="https://maps.google.com/?q=Bandung+Creative+Hub"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                                >
                                    Buka di Google Maps
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 px-6 pt-16 pb-8 text-gray-400 sm:px-10">
                <div className="mx-auto max-w-6xl">
                    {/* Grid utama */}
                    <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">

                        {/* Kolom 1 — Branding */}
                        <div>
                            <p className="text-base font-bold text-white">Bandung Creative Hub</p>
                            <p className="mt-1 text-xs text-gray-500">Jl. Laswi No.7, Kacapiring,<br />Kec. Batununggal, Kota Bandung<br />Jawa Barat 40271</p>
                            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Hotline</p>
                            <p className="mt-1 text-sm font-medium text-white">08112186867</p>
                            <div className="mt-4 flex items-center gap-3">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-blue-600">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-pink-500">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-red-600">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Kolom 2 — Navigasi Fasilitas */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Fasilitas</p>
                            <ul className="mt-4 space-y-2 text-sm">
                                {['Studio Musik', 'Auditorium', 'Coworking Space', 'Recording Studio', 'Studio Tari', 'Exhibition Area'].map(f => (
                                    <li key={f}>
                                        <a href="#" className="transition hover:text-white">{f}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Kolom 3 — Navigasi Program */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Program</p>
                            <ul className="mt-4 space-y-2 text-sm">
                                {['Workshop Kreatif', 'Pelatihan Ekraf', 'Pameran Seni', 'Komunitas', 'Inkubasi Bisnis', '17 Subsektor'].map(p => (
                                    <li key={p}>
                                        <a href="#" className="transition hover:text-white">{p}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Kolom 4 — Tautan & Kontak */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Tautan</p>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li><Link href="/" className="transition hover:text-white">Beranda</Link></li>
                                <li><Link href="/subsektor" className="transition hover:text-white">17 Subsektor</Link></li>
                                <li><Link href="/kontak" className="transition hover:text-white">Hubungi Kami</Link></li>
                                <li>
                                    <a href="https://dispar.bandung.go.id" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                                        dispar.bandung.go.id
                                    </a>
                                </li>
                            </ul>

                            <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-gray-500">Alamat Email</p>
                            <a href="mailto:info@bandungcreativehub.id" className="mt-1 block text-sm text-white hover:underline">
                                info@bandungcreativehub.id
                            </a>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-gray-600 sm:flex-row">
                        <p>© {new Date().getFullYear()} Bandung Creative Hub — Dinas Pariwisata Kota Bandung. Hak cipta dilindungi.</p>
                        <div className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            <span className="text-gray-500">Bagian dari ekosistem</span>
                            <span className="font-medium text-white">Lumora</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Modal deskripsi subsektor */}
            {activeSubsector && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                    onClick={() => setActiveSubsector(null)}
                >
                    <div
                        className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Tombol tutup */}
                        <button
                            onClick={() => setActiveSubsector(null)}
                            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition hover:border-gray-900 hover:text-gray-900"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Nomor & ikon */}
                        <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${subsectorGradients[(parseInt(activeSubsector.number) - 1) % subsectorGradients.length]
                            }`}>
                            <span className="text-lg font-bold">{activeSubsector.number}</span>
                        </div>

                        {/* Judul */}
                        <h2 className="text-2xl font-bold text-gray-900">{activeSubsector.title}</h2>
                        <div className="mt-1 h-1 w-10 rounded-full bg-blue-500" />

                        {/* Deskripsi lengkap */}
                        <p className="mt-4 text-sm leading-relaxed text-gray-600">{activeSubsector.desc}</p>

                        {/* Label subsektor */}
                        <div className="mt-6 flex items-center gap-2">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                Subsektor Ekonomi Kreatif
                            </span>
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                                #{activeSubsector.number}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}