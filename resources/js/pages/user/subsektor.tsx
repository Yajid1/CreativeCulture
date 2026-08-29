import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Subsektor() {
    const subsectors = [
        {
            number: '01',
            title: 'Aplikasi',
            desc: 'Kegiatan kreatif dalam pengembangan dan pemanfaatan sistem serta konten digital berbasis perangkat lunak. Mencakup pengembangan aplikasi mobile, web, hingga software enterprise yang memberikan solusi inovatif bagi pengguna.',
        },
        {
            number: '02',
            title: 'Arsitektur',
            desc: 'Kegiatan kreatif yang berkaitan dengan perencanaan konstruksi bangunan secara menyeluruh. Meliputi desain bangunan, perencanaan tata ruang, konsultasi struktur, dan pengelolaan proyek konstruksi yang estetis dan fungsional.',
        },
        {
            number: '03',
            title: 'Desain Interior',
            desc: 'Aktivitas kreatif yang berhubungan dengan penciptaan solusi ruang dalam bangunan. Mencakup perencanaan tata letak, pemilihan furnitur, pencahayaan, dan elemen dekoratif untuk menciptakan ruang yang nyaman dan estetis.',
        },
        {
            number: '04',
            title: 'Desain Produk',
            desc: 'Kegiatan kreatif dalam menciptakan dan mengembangkan suatu produk agar memiliki nilai fungsi dan estetika. Meliputi penelitian pengguna, prototyping, hingga produksi massal produk yang inovatif dan berdaya saing.',
        },
        {
            number: '05',
            title: 'Desain Komunikasi Visual',
            desc: 'Kegiatan kreatif yang berfokus pada penyampaian pesan melalui elemen visual. Mencakup desain grafis, branding, tipografi, ilustrasi, dan media komunikasi visual lainnya untuk menyampaikan pesan secara efektif.',
        },
        {
            number: '06',
            title: 'Film, Animasi & Video',
            desc: 'Kegiatan kreatif yang berkaitan dengan proses pembuatan film, video, dan animasi. Meliputi pra-produksi, produksi, pasca-produksi, distribusi karya audiovisual untuk kepentingan hiburan, pendidikan, dan komersial.',
        },
        {
            number: '07',
            title: 'Fashion',
            desc: 'Kegiatan kreatif yang berhubungan dengan desain pakaian, alas kaki, dan aksesoris. Mencakup perancangan koleksi, produksi garmen, hingga pemasaran produk fashion yang mengikuti tren dan kebutuhan pasar.',
        },
        {
            number: '08',
            title: 'Fotografi',
            desc: 'Kegiatan kreatif dalam penciptaan karya foto melalui proses pengambilan dan pengolahan gambar. Meliputi fotografi komersial, dokumentasi, seni, hingga fotografi jurnalistik yang mengabadikan momen berharga.',
        },
        {
            number: '09',
            title: 'Kuliner',
            desc: 'Kegiatan kreatif yang mencakup pengolahan bahan pangan menjadi produk makanan dan minuman bernilai tambah. Meliputi inovasi resep, presentasi makanan, pengelolaan restoran, hingga pengembangan produk kuliner lokal.',
        },
        {
            number: '10',
            title: 'Musik',
            desc: 'Kegiatan kreatif yang berkaitan dengan proses kreasi, produksi, dan pertunjukan karya musik. Mencakup penciptaan lagu, rekaman studio, pertunjukan live, distribusi digital, hingga manajemen artis dan label rekaman.',
        },
        {
            number: '11',
            title: 'Penerbitan',
            desc: 'Kegiatan kreatif yang mencakup penulisan dan penyebarluasan karya tulis. Meliputi penerbitan buku, majalah, koran, konten digital, serta platform self-publishing yang mendukung ekosistem literasi nasional.',
        },
        {
            number: '12',
            title: 'Pengembangan Permainan',
            desc: 'Kegiatan kreatif dalam merancang dan mengembangkan permainan (game). Mencakup game mobile, PC, konsol, hingga game edukasi yang menggabungkan narasi, mekanik permainan, dan pengalaman pengguna yang imersif.',
        },
        {
            number: '13',
            title: 'Periklanan',
            desc: 'Kegiatan kreatif yang berkaitan dengan perencanaan komunikasi dan pembuatan materi promosi. Meliputi strategi kampanye, copywriting, produksi iklan, media buying, dan evaluasi efektivitas promosi berbagai brand.',
        },
        {
            number: '14',
            title: 'Seni Kriya',
            desc: 'Kegiatan kreatif yang berhubungan dengan penciptaan produk kerajinan tangan bernilai seni dan fungsi. Mencakup kerajinan berbahan kayu, logam, tekstil, keramik, dan bahan alami lainnya yang kaya nilai budaya lokal.',
        },
        {
            number: '15',
            title: 'Seni Pertunjukan',
            desc: 'Kegiatan kreatif yang mencakup pengembangan konten dan pengemasan pertunjukan seni. Meliputi teater, tari, musik pertunjukan, sirkus, hingga seni pertunjukan kontemporer yang disajikan kepada penonton secara langsung.',
        },
        {
            number: '16',
            title: 'Seni Rupa',
            desc: 'Kegiatan kreatif yang berkaitan dengan penciptaan karya seni visual seperti lukisan dan patung. Meliputi seni lukis, seni patung, instalasi seni, seni digital, dan berbagai ekspresi visual yang dipamerkan atau dikoleksi.',
        },
        {
            number: '17',
            title: 'TV & Radio',
            desc: 'Kegiatan kreatif yang berhubungan dengan pembuatan dan pengemasan konten siaran televisi dan radio. Mencakup produksi program, penyiaran langsung, podcast, konten streaming, dan manajemen stasiun siaran.',
        },
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

    const [clockTime, setClockTime] = useState('');
    const [clockDate, setClockDate] = useState('');
    const [activeSubsector, setActiveSubsector] = useState<(typeof subsectors)[0] | null>(null);

    useEffect(() => {
        function tick() {
            const now = new Date();
            setClockTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase());
            setClockDate(now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
        }
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <>
            <Head title="17 Subsektor Ekonomi Kreatif" />

            {/* ===== NAVBAR ===== */}
            <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-md">
                <div className="flex items-center justify-between gap-6 px-6 py-4 sm:px-10">
                    {/* Brand Logos */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-3">
                        <img src="/images/Logo Pemkot.png" alt="Logo Pemkot Bandung" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-sm" />
                        <img src="/images/Logo Disbudpar.png" alt="Logo Disbudpar Kota Bandung" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-sm" />
                        <img src="/images/Logo BCH.png" alt="Logo Bandung Creative Hub" className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-sm" />
                    </Link>

                    {/* Nav links */}
                    <nav className="hidden items-center gap-8 text-sm font-medium text-gray-700 lg:flex" aria-label="Primary">
                        <Link href="/" className="transition hover:text-gray-900">
                            Home
                        </Link>
                        <div className="group relative cursor-pointer py-1">
                            <span className="inline-flex items-center gap-1 transition hover:text-gray-900">
                                Fasilitas <span className="text-xs opacity-60">▾</span>
                            </span>
                            <div className="absolute left-0 top-full hidden w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl group-hover:block z-50">
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
                        <Link href="/artikel" className="transition hover:text-gray-900">
                            Artikel
                        </Link>
                        <Link href="/contact" className="transition hover:text-gray-900">
                            Contact
                        </Link>
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

            {/* ===== KONTEN ===== */}
            <main className="min-h-screen bg-gray-50 px-6 py-12 sm:px-10">
                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        17 Subsektor Ekonomi Kreatif
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">
                        Bandung Creative Hub terbuka untuk kegiatan yang berkaitan dengan 17 subsektor ekonomi kreatif berikut. Klik kartu untuk melihat deskripsi lengkap.
                    </p>
                </div>

                {/* Grid kartu */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {subsectors.map((item, i) => (
                        <button
                            key={item.number}
                            onClick={() => setActiveSubsector(item)}
                            className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            {/* Ikon */}
                            <div
                                className={
                                    'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ' +
                                    subsectorGradients[i % subsectorGradients.length]
                                }
                            >
                                <span className="text-sm font-bold">{item.number}</span>
                            </div>

                            {/* Teks */}
                            <div className="min-w-0">
                                <h2 className="text-sm font-bold text-gray-900 transition group-hover:text-blue-600">
                                    {item.title}
                                </h2>
                                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">{item.desc}</p>
                            </div>

                            {/* Garis bawah hover */}
                            <div
                                className={
                                    'absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r opacity-0 transition group-hover:opacity-100 ' +
                                    subsectorGradients[i % subsectorGradients.length]
                                }
                            />
                        </button>
                    ))}
                </div>
            </main>

            {/* ===== MODAL ===== */}
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
                        {/* Tutup */}
                        <button
                            onClick={() => setActiveSubsector(null)}
                            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition hover:border-gray-900 hover:text-gray-900"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Ikon */}
                        <div
                            className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${subsectorGradients[(parseInt(activeSubsector.number) - 1) % subsectorGradients.length]}`}
                        >
                            <span className="text-lg font-bold">{activeSubsector.number}</span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900">{activeSubsector.title}</h2>
                        <div className="mt-1 h-1 w-10 rounded-full bg-blue-500" />
                        <p className="mt-4 text-sm leading-relaxed text-gray-600">{activeSubsector.desc}</p>

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
