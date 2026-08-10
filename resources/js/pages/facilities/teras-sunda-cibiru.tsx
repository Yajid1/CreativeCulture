import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function TerasSundaCibiru() {
    const facility = {
        name: 'Teras Sunda Cibiru',
        description:
            'Ruang publik kreatif berbasis budaya Sunda di kawasan Cibiru yang menjadi pusat kegiatan seni, komunitas, dan edukasi budaya bagi masyarakat Bandung Timur.',
        videoUrl: '/videos/tsc.mp4',
    };

    const notAllowedList = [
        'Kegiatan di luar 10 Objek Pemajuan Kebudayaan',
        'Bazar yang melibatkan jual-beli produk',
        'Pelantikan Organisasi, Komunitas, dsb',
        'Sekretariat Organisasi, Komunitas, dsb',
        'Wisuda dan Perpisahan Sekolah, Kampus',
    ];

    const allowedList = [
        'Diskusi Seni & Budaya',
        'Pelatihan Seni & Budaya',
        'Penelitian Seni & Budaya',
        'Pertunjukan Seni & Budaya',
        'Pengembangan Seni & Budaya',
    ];

    const objects = [
        { number: '01', title: 'Tradisi Lisan', desc: 'Tuturan yang diwariskan secara turun-temurun oleh masyarakat.' },
        { number: '02', title: 'Manuskrip', desc: 'Naskah kuno yang menyimpan pengetahuan dan sejarah bangsa.' },
        { number: '03', title: 'Adat Istiadat', desc: 'Kebiasaan yang didasarkan pada nilai tertentu dan diakui oleh masyarakat.' },
        { number: '04', title: 'Permainan Rakyat', desc: 'Berbagai permainan yang lahir dan berkembang di masyarakat.' },
        { number: '05', title: 'Olah Raga Tradisional', desc: 'Aktivitas fisik masyarakat dengan aturan yang disepakati bersama.' },
        { number: '06', title: 'Pengetahuan Tradisional', desc: 'Gagasan dan pengalaman masyarakat yang diwariskan dari generasi ke generasi.' },
        { number: '07', title: 'Teknologi Tradisional', desc: 'Keseluruhan sarana untuk menyediakan barang yang dibutuhkan bagi kelangsungan hidup.' },
        { number: '08', title: 'Seni', desc: 'Ekspresi artistik melalui media suara, gerak, rupa, atau perpaduannya.' },
        { number: '09', title: 'Bahasa', desc: 'Sarana komunikasi antarmanusia yang menjadi identitas masyarakat.' },
        { number: '10', title: 'Ritus', desc: 'Tata cara pelaksanaan upacara atau kegiatan yang didasarkan pada nilai tertentu.' },
    ];

    const objectGradients = [
        'from-emerald-400 to-green-600',
        'from-teal-400 to-emerald-500',
        'from-green-400 to-emerald-600',
        'from-emerald-500 to-teal-600',
        'from-cyan-400 to-emerald-500',
        'from-teal-400 to-cyan-600',
        'from-green-500 to-emerald-700',
    ];

    const [activeObject, setActiveObject] = useState<(typeof objects)[0] | null>(null);
    const [clockTime, setClockTime] = useState('');
    const [clockDate, setClockDate] = useState('');
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

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
                {/* Video Background */}
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
                        {/* Brand Logos */}
                        <Link href="/" className="flex items-center gap-2 sm:gap-3">
                            <img src="/images/Logo Pemkot.png" alt="Logo Pemkot Bandung" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-sm" />
                            <img src="/images/Logo Disbudpar.png" alt="Logo Disbudpar Kota Bandung" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-sm" />
                            <img src="/images/Logo BCH.png" alt="Logo Bandung Creative Hub" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 hidden sm:block drop-shadow-sm" />
                            <img src="/images/Logo TCS.png" alt="Logo Teras Sunda Cibiru" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 hidden md:block drop-shadow-sm" />
                            <img src="/images/Logo Pasir Kunci.png" alt="Logo Pasir Kunci" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 hidden md:block drop-shadow-sm" />
                        </Link>

                        {/* Nav links */}
                        <nav className="hidden items-center gap-7 text-sm font-medium text-white/80 lg:flex" aria-label="Primary">
                            <Link href="/" className="transition hover:text-white">Home</Link>
                            <div className="group relative cursor-pointer py-1">
                                <span className="inline-flex items-center gap-1 transition hover:text-white">
                                    Fasilitas <span className="text-xs opacity-60">▾</span>
                                </span>
                                <div className="absolute left-0 top-full hidden w-56 rounded-2xl border border-gray-200 bg-white p-2 text-gray-900 shadow-xl group-hover:block">
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
                            <Link href="/berita" className="transition hover:text-white">Berita</Link>
                            <Link href="/artikel" className="transition hover:text-white">Artikel</Link>
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
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            Teras Sunda
                        </div>

                        <h1
                            className="mt-3 text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl"
                            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9)' }}
                        >
                            Teras
                            <br />
                            Sunda
                            <br />
                            Cibiru
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
            </div>

            {/* Section Detail tentang kami */}
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

                <div className="relative mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
                        {/* Kolom 1 (KIRI) — Label kecil tentang kami */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500 lg:pt-1.5">
                                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                                Tentang Kami
                            </div>
                        </div>

                        {/* Kolom 2 (TENGAH) — Heading besar dan CTA */}
                        <div className="lg:col-span-5">
                            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                                Teras Sunda Cibiru, Kawasan bangunan bambu yang menjelma sebagai Pusat Budaya Sunda ini diberi nama Teras Sunda Cibiru. Penyematan nama Cibiru, selaras dengan lokasi di mana Teras Sunda ini berdiri, yakni Kelurahan Cipadung, Kecamatan Cibiru, Kota Bandung
                            </h2>

                            {/* Tombol CTA */}
                            <div className="mt-8">
                                <Link
                                    href="/kontak"
                                    className="inline-flex items-center gap-3 rounded-full bg-gray-100 py-2 pl-2 pr-5 text-sm font-medium text-gray-900 transition hover:bg-gray-200"
                                >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                            <path d="M5 12h14" />
                                            <path d="M13 6l6 6-6 6" />
                                        </svg>
                                    </span>
                                    Hubungi Kami
                                </Link>
                            </div>
                        </div>

                        {/* Kolom 3 (KANAN) — Collage Gambar Bertumpuk & Garis Keterangan */}
                        <div className="relative mt-8 lg:col-span-5 lg:mt-0">
                            <div className="relative mx-auto h-[440px] w-full max-w-[420px]">
                                {/* SVG Garis Pointers */}
                                <svg
                                    className="pointer-events-none absolute inset-0 z-30 h-full w-full"
                                    viewBox="0 0 420 440"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    {/* E-Commerce pointer */}
                                    <path d="M 140 32 C 120 50, 130 80, 165 85" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                                    {/* Branding pointer */}
                                    <path d="M 360 40 C 375 65, 365 95, 340 105" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                                    {/* Web Designing pointer */}
                                    <path d="M 85 270 C 45 250, 40 210, 70 200" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                                    {/* Digital Marketing pointer */}
                                    <path d="M 145 425 C 130 395, 140 350, 175 355" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                                    {/* Influencer pointer */}
                                    <path d="M 335 410 C 365 385, 360 330, 335 320" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>

                                {/* Text Labels */}
                                <span className="absolute left-[90px] top-[14px] z-40 text-[11px] font-bold tracking-widest text-gray-800 uppercase">
                                    Seni Tari
                                </span>

                                <span className="absolute right-[20px] top-[22px] z-40 text-[11px] font-bold tracking-widest text-gray-800 uppercase">
                                    Budaya
                                </span>

                                <span className="absolute left-0 top-[270px] z-40 text-[11px] font-bold tracking-widest text-gray-800 uppercase">
                                    Pertunjukan
                                </span>

                                <span className="absolute left-[65px] bottom-[2px] z-40 text-[11px] font-bold tracking-widest text-gray-800 uppercase">
                                    Gamelan
                                </span>

                                <span className="absolute right-[15px] bottom-[14px] z-40 text-[11px] font-bold tracking-widest text-gray-800 uppercase">
                                    Komunitas
                                </span>

                                {/* 5 Overlapping Images */}
                                {/* 1. Top Center Image */}
                                <div
                                    onClick={() => setSelectedImage({ src: '/images/DSC01753.jpg', alt: 'Seni Tari' })}
                                    className="absolute left-[38%] top-[50px] z-10 h-[155px] w-[35%] cursor-pointer overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:z-30 hover:scale-105"
                                >
                                    <img
                                        src="/images/DSC01753.jpg"
                                        alt="Seni Tari"
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* 2. Top Right Image */}
                                <div
                                    onClick={() => setSelectedImage({ src: '/images/DSC01757.jpg', alt: 'Budaya' })}
                                    className="absolute right-[5%] top-[70px] z-10 h-[175px] w-[34%] cursor-pointer overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:z-30 hover:scale-105"
                                >
                                    <img
                                        src="/images/DSC01757.jpg"
                                        alt="Budaya"
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* 3. Left Middle Image */}
                                <div
                                    onClick={() => setSelectedImage({ src: '/images/DSC01758.jpg', alt: 'Pertunjukan' })}
                                    className="absolute left-[5%] top-[160px] z-20 h-[125px] w-[45%] cursor-pointer overflow-hidden rounded-xl shadow-xl transition-transform duration-300 hover:z-30 hover:scale-105"
                                >
                                    <img
                                        src="/images/DSC01758.jpg"
                                        alt="Pertunjukan"
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* 4. Bottom Center Image */}
                                <div
                                    onClick={() => setSelectedImage({ src: '/images/DSC01802.jpg', alt: 'Gamelan' })}
                                    className="absolute left-[40%] bottom-[25px] z-20 h-[165px] w-[36%] cursor-pointer overflow-hidden rounded-xl shadow-xl transition-transform duration-300 hover:z-30 hover:scale-105"
                                >
                                    <img
                                        src="/images/DSC01802.jpg"
                                        alt="Gamelan"
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* 5. Bottom Right Image */}
                                <div
                                    onClick={() => setSelectedImage({ src: '/images/DSC01753.jpg', alt: 'Komunitas' })}
                                    className="absolute right-[5%] bottom-[45px] z-15 h-[160px] w-[33%] cursor-pointer overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:z-30 hover:scale-105"
                                >
                                    <img
                                        src="/images/DSC01753.jpg"
                                        alt="Komunitas"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
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
                                Pelestarian & Komunitas
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-500">
                                Menjadi ruang terbuka bagi para seniman tradisi maupun kontemporer untuk berkreasi, berkolaborasi, serta menampilkan ragam seni pertunjukan budaya Sunda.
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
                        kegiatanmu selaras dengan fungsi {facility.name}.
                    </p>

                    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Panel kiri - Tidak bisa difasilitasi */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Kegiatan yang tidak selaras
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Di luar 10 Objek Pemajuan Kebudayaan, aktivitas ini tidak dapat
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
                                {facility.name} menyatukan ruang, komunitas, dan program pelestarian budaya dalam satu ekosistem yang terhubung.
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
                </div>
            </section>

            {/* Section 10 Obyek Pemajuan Kebudayaan */}
            <section className="bg-white px-6 py-24 text-gray-900 sm:px-10">
                <div className="mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                        10 Obyek Pemajuan Kebudayaan
                    </h2>

                    <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-gray-500 sm:text-base">
                        <p>
                            Pemajuan Kebudayaan adalah upaya meningkatkan ketahanan budaya dan kontribusi budaya Indonesia di tengah peradaban dunia melalui Pelindungan, Pengembangan, Pemanfaatan, dan Pembinaan Kebudayaan.
                        </p>
                        <p>
                            Terdapat 10 Objek Pemajuan Kebudayaan (OPK) yang menjadi fokus utama dalam upaya pelestarian dan pengembangan budaya nasional. Pemahaman terhadap ke-10 objek ini diharapkan dapat menumbuhkan kesadaran masyarakat untuk turut serta menjaga dan merawat kekayaan budaya bangsa.
                        </p>
                    </div>

                    {/* Header kartu obyek */}
                    <div className="mt-8 flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Geser untuk lihat semua
                        </span>
                        <Link
                            href="/obyek-pemajuan-kebudayaan"
                            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
                        >
                            Lihat Semua
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </Link>
                    </div>

                    {/* Scroll horizontal kartu obyek — marquee tanpa henti */}
                    <style>{`
                        @keyframes object-marquee {
                            0%   { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .object-track {
                            animation: object-marquee 60s linear infinite;
                        }
                        .object-track:hover {
                            animation-play-state: paused;
                        }
                    `}</style>
                    <div className="mt-4 overflow-hidden -mx-6 sm:-mx-10">
                        <div className="object-track flex gap-4 w-max px-6 sm:px-10">
                            {[...objects, ...objects].map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveObject(objects[i % objects.length])}
                                    className="relative flex w-[300px] flex-shrink-0 cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 text-left"
                                >
                                    <div
                                        className={
                                            'flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ' +
                                            objectGradients[i % objectGradients.length]
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
                                            objectGradients[i % objectGradients.length]
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
                        Tersedia berbagai ruang dengan kapasitas dan fungsi berbeda untuk mendukung kegiatan pelestarian dan pertunjukan seni di {facility.name}.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { icon: 'music', name: 'Palataran', href: '/ruangan-tsc/palataran', floor: '', capacity: 50 },
                            { icon: 'music', name: 'Balé Karya', href: '/ruangan-tsc/bale-karya', floor: '', capacity: 50 },
                            { icon: 'music', name: 'Balé Alit', href: '/ruangan-tsc/bale-alit', floor: '', capacity: 20 },
                            { icon: 'music', name: 'Balé Riung', href: '/ruangan-tsc/bale-riung', floor: '', capacity: 20 },
                            { icon: 'music', name: 'Balé Utama', href: '/ruangan-tsc/bale-utama', floor: '', capacity: 300 },
                            { icon: 'music', name: 'Balé Motekar', href: '/ruangan-tsc/bale-motekar', floor: '', capacity: 10 },
                        ].map((room, i) => {
                            const roomGradients = [
                                'from-emerald-400 to-green-600',
                                'from-teal-400 to-emerald-500',
                                'from-green-400 to-emerald-600',
                            ];
                            const gradient = roomGradients[i % roomGradients.length];
                            const icons = {
                                music: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>,
                            };
                            return (
                                <Link
                                    key={i}
                                    href={room.href}
                                    className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${gradient}`}>
                                        {icons[room.icon as keyof typeof icons]}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm font-bold text-gray-900 transition group-hover:text-emerald-600">
                                            {room.name}
                                        </h3>
                                        {room.floor && <p className="mt-1 text-xs text-gray-400">{room.floor}</p>}
                                        <div className={`inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600 ${!room.floor ? 'mt-2.5' : 'mt-2'}`}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                            </svg>
                                            {room.capacity} Orang
                                        </div>
                                    </div>
                                </Link>
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
                            Jadikan {facility.name}
                            <br />
                            <span className="text-gray-900">ruang kreatifmu</span>
                        </h2>

                        <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-500">
                            {facility.name} hadir untuk mewadahi seniman, budayawan, dan pelaku pelestarian seni dalam satu ekosistem yang saling menumbuhkan.
                            Daftarkan kegiatanmu dan jadilah bagian dari komunitas budaya Bandung Timur.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link
                                href="/kontak"
                                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
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
                                { label: 'Area', value: '1 Area' },
                                { label: 'Ruangan', value: '6 Ruang' },
                                { label: 'Kapasitas', value: '±450 Orang' },
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
                                title="Lokasi Teras Sunda Cibiru"
                                src="https://maps.google.com/maps?q=Teras%20Sunda%20Cibiru&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
                            <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{facility.name}</p>
                                <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                                    Jl. Raya Cipadung, Cipadung, Kec. Cibiru,<br />Kota Bandung, Jawa Barat 40614
                                </p>
                                <a
                                    href="https://maps.google.com/?q=Teras+Sunda+Cibiru"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:underline"
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
                            <p className="text-base font-bold text-white">{facility.name}</p>
                            <p className="mt-1 text-xs text-gray-500">Jl. Raya Cipadung, Cipadung,<br />Kec. Cibiru, Kota Bandung<br />Jawa Barat 40614</p>
                            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Hotline</p>
                            <p className="mt-1 text-sm font-medium text-white">08112186867</p>
                            <div className="mt-4 flex items-center gap-3">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-emerald-600">
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
                                {['Palataran', 'Balé Karya', 'Balé Utama', 'Balé Riung'].map(f => (
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
                                {['Diskusi Seni & Budaya', 'Pelatihan Seni & Budaya', 'Penelitian Seni & Budaya', 'Pertunjukan Seni & Budaya', 'Pengembangan Seni & Budaya'].map(p => (
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
                                <li><Link href="/obyek-pemajuan-kebudayaan" className="transition hover:text-white">10 Obyek Pemajuan Kebudayaan</Link></li>
                                <li><Link href="/kontak" className="transition hover:text-white">Hubungi Kami</Link></li>
                                <li>
                                    <a href="https://dispar.bandung.go.id" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                                        dispar.bandung.go.id
                                    </a>
                                </li>
                            </ul>

                            <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-gray-500">Alamat Email</p>
                            <a href="mailto:info@terassundacibiru.id" className="mt-1 block text-sm text-white hover:underline">
                                info@terassundacibiru.id
                            </a>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-gray-600 sm:flex-row">
                        <p>© {new Date().getFullYear()} {facility.name} — Dinas Pariwisata Kota Bandung. Hak cipta dilindungi.</p>
                        <div className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span className="text-gray-500">Bagian dari ekosistem</span>
                            <span className="font-medium text-white">Lumora</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Modal Lightbox Preview Gambar Full */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
                    style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl bg-black p-2 shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Tombol Tutup */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:scale-110 hover:bg-black/90"
                            aria-label="Tutup preview"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="max-h-[82vh] max-w-[85vw] rounded-xl object-contain"
                        />

                        {selectedImage.alt && (
                            <div className="mt-3 text-center text-sm font-medium text-white/90">
                                {selectedImage.alt}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
