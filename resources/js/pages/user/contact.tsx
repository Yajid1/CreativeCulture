import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    Calendar,
    CheckCircle2,
    ChevronDown,
    Clock,
    Copy,
    ExternalLink,
    HelpCircle,
    Mail,
    MapPin,
    MessageCircle,
    MessageSquare,
    Phone,
    Send,
    Share2,
    Sparkles,
    User,
    Users,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

// Daftar Fasilitas UPTD
const FACILITIES = [
    {
        id: 'bch',
        name: 'Bandung Creative Hub (BCH)',
        shortName: 'Bandung Creative Hub',
        address: 'Jl. Laswi No. 7, Kacapiring, Kec. Batununggal, Kota Bandung, Jawa Barat 40271',
        mapsUrl: 'https://maps.google.com/?q=Bandung+Creative+Hub',
        waNumber: '628112186867',
        waFormatted: '+62 811-2186-867',
        email: 'bch@bandung.go.id',
        hours: 'Senin - Minggu (08:00 - 21:00 WIB)',
        image: '/images/backround3.jpeg',
        tag: 'Pusat Ekraf & Inkubasi',
        description: 'Gedung 6 lantai dengan fasilitas studio rekaman audio, lab desain 3D, studio podcast, bioskop mini, auditorium pertunjukan, dan coworking space gratis.',
        rooms: ['Studio Audio', 'Lab Cetak 3D', 'Studio Podcast', 'Auditorium Teater', 'Exhibition Hall'],
    },
    {
        id: 'psms',
        name: 'Padepokan Seni Mayang Sunda',
        shortName: 'Mayang Sunda',
        address: 'Jl. Peta No. 209, Suka Asih, Kec. Bojongloa Kaler, Kota Bandung, Jawa Barat 40231',
        mapsUrl: 'https://maps.google.com/?q=Padepokan+Seni+Mayang+Sunda',
        waNumber: '628112186867',
        waFormatted: '+62 811-2186-867',
        email: 'mayangsunda@bandung.go.id',
        hours: 'Senin - Sabtu (08:00 - 20:00 WIB)',
        image: '/images/backroundMS.jpg',
        tag: 'Pusat Seni Pertunjukan Tradisi',
        description: 'Gedung pementasan seni pertunjukan tradisi Sunda, panggung teater indoor, ruang latihan karawitan, dan sanggar tari kebudayaan.',
        rooms: ['Gedung Pertunjukan Utama', 'Panggung Terbuka', 'Ruang Latihan Karawitan', 'Sanggar Tari'],
    },
    {
        id: 'tsc',
        name: 'Teras Sunda Cibiru',
        shortName: 'Teras Sunda Cibiru',
        address: 'Jl. Raya Cipadung No. 70, Cipadung, Kec. Cibiru, Kota Bandung, Jawa Barat 40614',
        mapsUrl: 'https://maps.google.com/?q=Teras+Sunda+Cibiru',
        waNumber: '628112186867',
        waFormatted: '+62 811-2186-867',
        email: 'terassunda@bandung.go.id',
        hours: 'Senin - Minggu (08:00 - 18:00 WIB)',
        image: '/images/backroundTSC.jpg',
        tag: 'Ruang Terbuka Seni Budaya',
        description: 'Kawasan budaya terbuka dengan amfiteater outdoor, saung bambu workshop kriya tradisi, galeri pameran seni rupa, dan ruang pentas musik etnik.',
        rooms: ['Amfiteater Luar Ruang', 'Galeri Kriya Sunda', 'Bale Sawala', 'Area Pertunjukan Terbuka'],
    },
    {
        id: 'kwpk',
        name: 'Kampung Wisata Pasir Kunci',
        shortName: 'Pasir Kunci',
        address: 'Jl. Pasir Kunci, Pasirjati, Kec. Ujung Berung, Kota Bandung, Jawa Barat 40611',
        mapsUrl: 'https://maps.google.com/?q=Kampung+Wisata+Pasir+Kunci',
        waNumber: '628112186867',
        waFormatted: '+62 811-2186-867',
        email: 'pasirkunci@bandung.go.id',
        hours: 'Senin - Minggu (07:30 - 17:30 WIB)',
        image: '/images/backroundPSKC.jpg',
        tag: 'Wisata Edukasi & Budaya',
        description: 'Destinasi wisata budaya di kaki Gunung Manglayang dengan panorama Kota Bandung, pusat pelestarian permainan tradisional (kaulinan budak), dan sanggar seni warga.',
        rooms: ['Panggung Budaya Terbuka', 'Area Kaulinan Tradisional', 'Saung Edukasi Budaya', 'Spot Panorama View'],
    },
];

// Subsektor Ekonomi Kreatif
const SUBSECTORS = [
    'Aplikasi & Perangkat Lunak',
    'Arsitektur',
    'Desain Interior',
    'Desain Produk',
    'Desain Komunikasi Visual (DKV)',
    'Film, Animasi & Video',
    'Fashion & Kriya Tekstil',
    'Fotografi',
    'Kuliner Kreatif',
    'Musik & Rekaman Suara',
    'Penerbitan & Literasi',
    'Pengembangan Permainan (Game)',
    'Periklanan & Kampanye Kreatif',
    'Seni Kriya & Kerajinan',
    'Seni Pertunjukan (Tari/Teater/Musik)',
    'Seni Rupa & Instalasi',
    'Televisi, Radio & Podcast',
    'Lainnya / Umum',
];

// Topik / Kategori Kebutuhan
const TOPICS = [
    { value: 'peminjaman', label: 'Peminjaman Ruangan & Studio (Gratis)' },
    { value: 'kolaborasi', label: 'Kolaborasi Event / Workshop / Pameran' },
    { value: 'kunjungan', label: 'Kunjungan Studi Banding / Komunitas' },
    { value: 'konsultasi', label: 'Konsultasi 17 Subsektor Ekraf' },
    { value: 'liputan', label: 'Liputan Media & Publikasi Karya' },
    { value: 'informasi', label: 'Pertanyaan & Informasi Umum' },
];

// Template Cepat (Quick Chips)
const QUICK_TEMPLATES = [
    {
        label: '🎙️ Booking Studio Musik BCH',
        facility: 'Bandung Creative Hub (BCH)',
        topic: 'Peminjaman Ruangan & Studio (Gratis)',
        subsector: 'Musik & Rekaman Suara',
        message: 'Halo, saya ingin mengajukan peminjaman Studio Rekaman Audio BCH untuk kegiatan rekaman karya musik orisinal.',
    },
    {
        label: '🎭 Pentas Seni Mayang Sunda',
        facility: 'Padepokan Seni Mayang Sunda',
        topic: 'Kolaborasi Event / Workshop / Pameran',
        subsector: 'Seni Pertunjukan (Tari/Teater/Musik)',
        message: 'Halo, sanggar kami ingin mengajukan pementasan tari dan teater tradisi Sunda di panggung utama Padepokan Seni Mayang Sunda.',
    },
    {
        label: '🌿 Event Komunitas Teras Sunda',
        facility: 'Teras Sunda Cibiru',
        topic: 'Kolaborasi Event / Workshop / Pameran',
        subsector: 'Seni Kriya & Kerajinan',
        message: 'Halo, kami berencana menyelenggarakan workshop kriya seni dan pagelaran terbuka untuk masyarakat di Teras Sunda Cibiru.',
    },
    {
        label: '🌄 Edukasi Budaya Pasir Kunci',
        facility: 'Kampung Wisata Pasir Kunci',
        topic: 'Kunjungan Studi Banding / Komunitas',
        subsector: 'Lainnya / Umum',
        message: 'Halo, kami bermaksud mengadakan kunjungan edukasi kaulinan budak dan pelestarian budaya tradisional di Pasir Kunci.',
    },
];

// Pertanyaan yang Sering Diajukan (FAQ)
const FAQS = [
    {
        question: 'Apakah peminjaman ruangan dan studio di fasilitas UPTD benar-benar gratis?',
        answer: 'Ya, 100% bebas biaya retribusi (gratis) untuk seluruh pelaku kreatif, komunitas seni, pelajar, dan masyarakat umum selama kegiatan berkaitan dengan 17 Subsektor Ekonomi Kreatif dan bersifat non-komersial (tidak menjual tiket masuk / bazar jualan).',
    },
    {
        question: 'Bagaimana alur pengajuan peminjaman ruangan atau kolaborasi kegiatan?',
        answer: 'Anda dapat menghubungi narahubung WhatsApp fasilitas terkait untuk cek ketersediaan jadwal, mengirimkan surat permohonan resmi dan proposal kegiatan ke email/UPTD, lalu tim kurasi akan menerbitkan surat persetujuan izin penggunaan ruangan.',
    },
    {
        question: 'Berapa hari sebelumnya permohonan harus diajukan?',
        answer: 'Untuk kegiatan reguler (studio musik/lab 3D/ruang rapat), pengajuan minimal H-3 hari kerja. Untuk event skala besar/auditorium pameran, disarankan mengajukan proposal minimal 2 hingga 4 minggu sebelum tanggal kegiatan.',
    },
    {
        question: 'Apakah diperbolehkan menyelenggarakan bazar jual-beli atau kegiatan komersial?',
        answer: 'Sesuai dengan ketentuan operasional fasilitas UPTD Kebudayaan, ruang tidak diperuntukkan bagi kegiatan bazar dagang komersial murni, wisuda sekolah/kampus, atau sekretariat tetap organisasi non-pemerintah.',
    },
    {
        question: 'Bagaimana cara berkonsultasi mengenai program inkubasi atau karya seni?',
        answer: 'Anda dapat mengisi formulir WhatsApp di halaman ini dengan memilih topik "Konsultasi 17 Subsektor Ekraf" atau langsung mengunjungi kantor pengelola di lantai 2 Bandung Creative Hub pada hari kerja.',
    },
];

export default function Contact() {
    // Clock state
    const [clockTime, setClockTime] = useState('');
    const [clockDate, setClockDate] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [organization, setOrganization] = useState('');
    const [phone, setPhone] = useState('');
    const [facility, setFacility] = useState(FACILITIES[0].name);
    const [subsector, setSubsector] = useState(SUBSECTORS[0]);
    const [topic, setTopic] = useState(TOPICS[0].label);
    const [targetDate, setTargetDate] = useState('');
    const [message, setMessage] = useState('');

    // UI state
    const [copied, setCopied] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(0);

    // Live clock ticker
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

    // Get active facility object
    const currentFacilityObj = useMemo(() => {
        return FACILITIES.find((f) => f.name === facility) || FACILITIES[0];
    }, [facility]);

    // Build Formatted WhatsApp Message
    const formattedWhatsAppMessage = useMemo(() => {
        const lines = [
            'Halo Admin UPTD Kebudayaan Kota Bandung, 👋',
            '',
            'Saya ingin mengajukan permohonan / berdiskusi mengenai:',
            `📌 *Topik Kebutuhan:* ${topic}`,
            `🏛️ *Fasilitas Tujuan:* ${facility}`,
            '',
            '📋 *Data Pemohon:*',
            `• *Nama Lengkap:* ${name.trim() || '[Nama Pemohon]'}`,
            `• *Instansi / Komunitas:* ${organization.trim() || 'Personal / Umum'}`,
            `• *No. WhatsApp:* ${phone.trim() || '[No. HP / WA]'}`,
            `• *Subsektor Ekraf:* ${subsector}`,
            targetDate ? `• *Rencana Tanggal:* ${targetDate}` : null,
            '',
            '💬 *Pesan / Deskripsi Gagasan:*',
            message.trim() || '[Tuliskan rincian ide kolaborasi, rencana peminjaman ruangan, atau pertanyaan Anda di sini...]',
            '',
            'Mohon informasi dan arahan terkait ketersediaan jadwal serta prosedurnya. Hatur nuhun! 🙏✨',
        ].filter(Boolean);

        return lines.join('\n');
    }, [name, organization, phone, facility, subsector, topic, targetDate, message]);

    // Handle Send to WhatsApp
    const handleSendWhatsApp = () => {
        const cleanNumber = currentFacilityObj.waNumber.replace(/[^0-9]/g, '');
        const encodedText = encodeURIComponent(formattedWhatsAppMessage);
        const waUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
    };

    // Handle Direct Chat with Facility
    const handleDirectChatFacility = (fac: typeof FACILITIES[0]) => {
        const text = encodeURIComponent(
            `Halo Admin ${fac.shortName}, saya ingin mendapatkan informasi lebih lanjut mengenai fasilitas dan kegiatan di ${fac.name}. Hatur nuhun!`,
        );
        window.open(`https://wa.me/${fac.waNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
    };

    // Handle Copy to Clipboard
    const handleCopyMessage = () => {
        navigator.clipboard.writeText(formattedWhatsAppMessage).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    };

    // Apply Quick Template
    const applyTemplate = (t: typeof QUICK_TEMPLATES[0]) => {
        setFacility(t.facility);
        setTopic(t.topic);
        setSubsector(t.subsector);
        setMessage(t.message);
    };

    return (
        <div className="min-h-screen bg-[#fafafa] text-[#111111] selection:bg-gray-900 selection:text-white font-sans antialiased">
            <Head title="Contact & Hubungi Kami — UPTD Kebudayaan Kota Bandung" />

            {/* ===== NAVBAR (SERAGAM DENGAN HALAMAN USER LAINNYA) ===== */}
            <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-4 sm:px-10">
                    {/* Brand Logos */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                        <img
                            src="/images/Logo Pemkot.png"
                            alt="Logo Pemkot Bandung"
                            className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-sm"
                        />
                        <img
                            src="/images/Logo Disbudpar.png"
                            alt="Logo Disbudpar Kota Bandung"
                            className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-sm"
                        />
                        <img
                            src="/images/Logo BCH.png"
                            alt="Logo Bandung Creative Hub"
                            className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-sm"
                        />
                        <img
                            src="/images/Logo TCS.png"
                            alt="Logo Teras Sunda Cibiru"
                            className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 hidden sm:block drop-shadow-sm"
                        />
                        <img
                            src="/images/Logo Pasir Kunci.png"
                            alt="Logo Pasir Kunci"
                            className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 hidden md:block drop-shadow-sm"
                        />
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
                        <Link
                            href="/contact"
                            className="font-semibold text-gray-900 relative after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900 after:rounded-full"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Right: clock + menu */}
                    <div className="flex items-center gap-3">
                        <div className="hidden items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-500 md:flex">
                            <span className="text-gray-400">Local time</span>
                            <span className="min-w-[3.5rem] font-medium tabular-nums text-gray-800">{clockTime || '9:00am'}</span>
                            <span className="text-gray-300">•</span>
                            <span className="font-medium text-gray-600">{clockDate || '26 August, 2026'}</span>
                        </div>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-widest text-gray-700 transition hover:border-gray-400 shadow-sm"
                            aria-label="Menu Navigasi"
                        >
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

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 bg-white px-6 py-5 shadow-lg animate-in slide-in-from-top-2 duration-200">
                        <div className="flex flex-col gap-3.5 text-sm font-medium text-gray-700">
                            <Link href="/" className="hover:text-gray-900 py-1">
                                01. Home
                            </Link>
                            <Link href="/subsektor" className="hover:text-gray-900 py-1">
                                02. 17 Subsektor Ekonomi Kreatif
                            </Link>
                            <Link href="/berita" className="hover:text-gray-900 py-1">
                                03. Berita Kebudayaan
                            </Link>
                            <Link href="/artikel" className="hover:text-gray-900 py-1">
                                04. Artikel &amp; Opini
                            </Link>
                            <Link href="/contact" className="text-gray-900 font-bold py-1">
                                05. Contact &amp; WhatsApp
                            </Link>
                            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                                <span>Waktu: {clockTime}</span>
                                <span>{clockDate}</span>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* ===== HERO / HEADING SECTION ===== */}
            <main className="max-w-7xl mx-auto px-6 py-10 sm:px-10 sm:py-14">
                <div className="mb-12">
                    {/* Eyebrow badge matching user pages */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm mb-4">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Layanan Aktif • UPTD Kebudayaan Kota Bandung</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                        Mulai Kolaborasi &amp; Terhubung
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-600">
                        Punya gagasan kreatif, rencana peminjaman ruangan gratis di BCH, Mayang Sunda, Teras Sunda, Pasir Kunci, atau pertanyaan seputar 17 subsektor ekonomi kreatif? Isi formulir di bawah untuk mengirim pesan langsung ke WhatsApp resmi kami.
                    </p>

                    {/* Feature badges */}
                    <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium text-gray-700">
                        <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3.5 py-2 shadow-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>100% Bebas Retribusi (Gratis)</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3.5 py-2 shadow-sm">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>Respon Cepat Jam Kerja</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3.5 py-2 shadow-sm">
                            <Building2 className="w-4 h-4 text-amber-600" />
                            <span>4 Gedung Seni Budaya</span>
                        </div>
                    </div>
                </div>

                {/* ===== TWO-COLUMN FORM & LIVE WHATSAPP PREVIEW ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    {/* Left Column (7 Cols): WhatsApp Generator Form */}
                    <div className="lg:col-span-7 rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-sm">
                        <div className="flex items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-5">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5" /> Generator Pesan WhatsApp
                                </span>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">Formulir Kolaborasi &amp; Pertanyaan</h2>
                            </div>
                            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-full font-semibold">
                                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Auto-WA</span>
                            </div>
                        </div>

                        {/* Quick Preset Templates */}
                        <div className="mb-6">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">
                                💡 Contoh Cepat (Klik untuk mengisi formulir otomatis):
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {QUICK_TEMPLATES.map((tmpl, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => applyTemplate(tmpl)}
                                        className="text-xs rounded-xl border border-gray-200 bg-gray-50 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900 text-gray-700 px-3 py-1.5 transition text-left"
                                    >
                                        {tmpl.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendWhatsApp();
                            }}
                            className="space-y-4"
                        >
                            {/* Nama & WhatsApp No */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-gray-500" />
                                        Nama Lengkap <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="cth. Ridwan Gunawan"
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
                                        <Phone className="w-3.5 h-3.5 text-gray-500" />
                                        Nomor WhatsApp Anda <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="cth. 0812-3456-7890"
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition"
                                    />
                                </div>
                            </div>

                            {/* Instansi & Fasilitas Tujuan */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
                                        <Users className="w-3.5 h-3.5 text-gray-500" />
                                        Instansi / Komunitas (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={organization}
                                        onChange={(e) => setOrganization(e.target.value)}
                                        placeholder="cth. Komunitas Musik Indie BDG"
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
                                        <Building2 className="w-3.5 h-3.5 text-gray-500" />
                                        Fasilitas Tujuan <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={facility}
                                            onChange={(e) => setFacility(e.target.value)}
                                            className="w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition"
                                        >
                                            {FACILITIES.map((f) => (
                                                <option key={f.id} value={f.name}>
                                                    {f.name}
                                                </option>
                                            ))}
                                            <option value="Pelayanan Umum UPTD Kebudayaan">
                                                Pelayanan Umum UPTD Kebudayaan
                                            </option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Topik & Subsektor */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
                                        <HelpCircle className="w-3.5 h-3.5 text-gray-500" />
                                        Kategori / Topik <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            className="w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition"
                                        >
                                            {TOPICS.map((t) => (
                                                <option key={t.value} value={t.label}>
                                                    {t.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5 text-gray-500" />
                                        17 Subsektor Ekraf
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={subsector}
                                            onChange={(e) => setSubsector(e.target.value)}
                                            className="w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition"
                                        >
                                            {SUBSECTORS.map((s, i) => (
                                                <option key={i} value={s}>
                                                    {s}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Rencana Tanggal Kegiatan (Opsional) */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                                    Estimasi / Rencana Tanggal Kegiatan (Opsional)
                                </label>
                                <input
                                    type="text"
                                    value={targetDate}
                                    onChange={(e) => setTargetDate(e.target.value)}
                                    placeholder="cth. 15 September 2026 atau Setiap Hari Sabtu Sore"
                                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition"
                                />
                            </div>

                            {/* Pesan / Deskripsi Gagasan */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
                                    <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
                                    Pesan / Gagasan Kolaborasi <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Tuliskan gambaran rencana kegiatan Anda, ruangan yang dibutuhkan, perkiraan jumlah peserta, atau pertanyaan yang ingin disampaikan..."
                                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition leading-relaxed resize-y"
                                />
                            </div>

                            {/* Tombol Aksi Form */}
                            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 hover:bg-black text-white font-bold text-sm px-6 py-3.5 transition shadow-sm hover:shadow"
                                >
                                    <Send className="w-4 h-4 text-emerald-400" />
                                    <span>Kirim ke WhatsApp Sekarang</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCopyMessage}
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-3.5 transition shadow-sm"
                                >
                                    <Copy className="w-4 h-4 text-gray-500" />
                                    <span>{copied ? 'Tersalin! ✅' : 'Salin Pesan'}</span>
                                </button>
                            </div>

                            <p className="text-xs text-gray-500 pt-1">
                                💡 Klik tombol di atas untuk membuka aplikasi WhatsApp dengan pesan resmi yang telah otomatis tersusun rapi.
                            </p>
                        </form>
                    </div>

                    {/* Right Column (5 Cols): Live WhatsApp Simulation Preview */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* WhatsApp Mockup Box */}
                        <div className="rounded-3xl border border-gray-300 bg-white overflow-hidden shadow-sm flex flex-col">
                            {/* WhatsApp Header bar */}
                            <div className="bg-[#075e54] px-4 py-3.5 text-white flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                                            🏛️
                                        </div>
                                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#075e54]" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                                            UPTD Kebudayaan BDG
                                            <span className="text-[10px] bg-emerald-700/80 text-emerald-100 font-semibold px-1.5 py-0.5 rounded">Resmi</span>
                                        </h4>
                                        <p className="text-[11px] text-emerald-100/90 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                                            Online • {currentFacilityObj.shortName}
                                        </p>
                                    </div>
                                </div>

                                <span className="text-xs bg-black/20 px-2.5 py-1 rounded-full text-white/90 font-medium">
                                    Live Preview
                                </span>
                            </div>

                            {/* WhatsApp Chat Body */}
                            <div className="p-4 sm:p-5 flex-1 bg-[#efeae2] flex flex-col justify-between overflow-y-auto max-h-[460px]">
                                <div>
                                    <div className="text-center my-2">
                                        <span className="text-[10px] bg-white/80 text-gray-600 px-3 py-1 rounded-full shadow-xs">
                                            Pratinjau Pesan yang Akan Terkirim
                                        </span>
                                    </div>

                                    {/* Incoming intro bubble */}
                                    <div className="self-start max-w-[85%] bg-white text-gray-800 text-xs rounded-2xl rounded-tl-none p-3.5 mb-3 shadow-xs leading-relaxed">
                                        <p className="font-bold text-emerald-800 mb-1">Sampurasun! 🙏</p>
                                        Silakan isi form di samping untuk mengirimkan gagasan kegiatan Anda ke admin UPTD Kebudayaan.
                                    </div>

                                    {/* Outgoing simulated bubble */}
                                    <div className="self-end ml-auto max-w-[95%] bg-[#d9fdd3] text-gray-900 text-xs rounded-2xl rounded-tr-none p-4 shadow-xs leading-relaxed whitespace-pre-line border border-[#c4ebb9]">
                                        {formattedWhatsAppMessage}
                                        <div className="text-right text-[10px] text-gray-500 mt-2 flex items-center justify-end gap-1">
                                            <span>{clockTime || 'Sekarang'}</span>
                                            <span className="text-emerald-700 font-bold">✓✓</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Direct CTA inside chat box */}
                                <div className="mt-4 pt-3 border-t border-gray-300/60">
                                    <button
                                        type="button"
                                        onClick={handleSendWhatsApp}
                                        className="w-full py-2.5 px-4 rounded-xl bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        <MessageCircle className="w-4 h-4 fill-current" />
                                        Buka Chat di WhatsApp
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Helpdesk Contacts Box */}
                        <div className="rounded-3xl border border-gray-200/90 bg-white p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                                <Phone className="w-4 h-4 text-gray-600" />
                                Narahubung Langsung Tiap Fasilitas:
                            </h3>

                            <div className="space-y-2">
                                {FACILITIES.map((f) => (
                                    <div
                                        key={f.id}
                                        className="flex items-center justify-between p-3 rounded-2xl border border-gray-100 bg-gray-50/70 hover:bg-gray-100/80 transition"
                                    >
                                        <div className="min-w-0 pr-2">
                                            <p className="text-xs font-bold text-gray-900 truncate">{f.shortName}</p>
                                            <p className="text-[11px] text-gray-500">{f.waFormatted}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleDirectChatFacility(f)}
                                            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition"
                                        >
                                            <MessageCircle className="w-3.5 h-3.5 fill-current text-emerald-600" />
                                            Chat WA
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== FASILITAS GEDUNG UPTD & GOOGLE MAPS SECTION ===== */}
                <section className="mb-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-gray-700" /> Direktori Lokasi Fasilitas
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                                4 Gedung Seni &amp; Budaya Kota Bandung
                            </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 max-w-md">
                            Kunjungi langsung gedung UPTD Kebudayaan atau jadwalkan survei lokasi sebelum menyelenggarakan kegiatan Anda.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {FACILITIES.map((fac) => (
                            <div
                                key={fac.id}
                                className="group relative rounded-3xl border border-gray-200/90 bg-white overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-sm"
                            >
                                {/* Background Image & Overlay */}
                                <div className="relative h-48 sm:h-56 overflow-hidden">
                                    <img
                                        src={fac.image}
                                        alt={fac.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

                                    {/* Tag Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 px-3 py-1 text-xs font-bold text-gray-800 shadow-sm">
                                            <Building2 className="w-3.5 h-3.5 text-gray-600" />
                                            {fac.tag}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="p-6 flex-1 flex flex-col justify-between -mt-8 relative z-10">
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                                            {fac.name}
                                        </h3>
                                        <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                                            {fac.description}
                                        </p>

                                        {/* Room Badges */}
                                        <div className="flex flex-wrap gap-1.5 mt-3.5">
                                            {fac.rooms.map((room, rIdx) => (
                                                <span
                                                    key={rIdx}
                                                    className="text-[11px] font-medium rounded-lg bg-gray-100 border border-gray-200 px-2.5 py-0.5 text-gray-700"
                                                >
                                                    {room}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Contact & Hours */}
                                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                                            <div className="flex items-start gap-2">
                                                <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                                                <span>{fac.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                                                <span>{fac.hours}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleDirectChatFacility(fac)}
                                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 hover:bg-black text-white text-xs font-bold py-2.5 transition shadow-sm"
                                        >
                                            <MessageCircle className="w-3.5 h-3.5 fill-current text-emerald-400" />
                                            Chat WhatsApp
                                        </button>

                                        <a
                                            href={fac.mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold px-4 py-2.5 transition shadow-sm"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            <span>Maps</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===== FAQ SECTION (TANYA JAWAB UMUM) ===== */}
                <section className="max-w-3xl mx-auto mb-16">
                    <div className="text-center mb-8">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center justify-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-gray-700" /> Pertanyaan Umum
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                            FAQ Seputar Layanan &amp; Peminjaman
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {FAQS.map((faq, idx) => {
                            const isOpen = activeFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs transition"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                                        className="w-full flex items-center justify-between gap-4 p-5 text-left text-sm font-bold text-gray-900 hover:text-blue-600 transition"
                                    >
                                        <span>{faq.question}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-gray-900' : ''
                                                }`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>

            {/* ===== FOOTER (SERAGAM DENGAN LANDING PAGE / WELCOME) ===== */}
            <footer className="bg-[#0f0f11] text-white/70 py-12 px-6 sm:px-10 border-t border-neutral-800">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 flex-wrap mb-4">
                            <img src="/images/Logo Pemkot.png" alt="Logo Pemkot" className="h-8 w-auto object-contain" />
                            <img src="/images/Logo Disbudpar.png" alt="Logo Disbudpar" className="h-8 w-auto object-contain" />
                            <img src="/images/Logo BCH.png" alt="Logo BCH" className="h-8 w-auto object-contain brightness-110" />
                            <img src="/images/Logo TCS.png" alt="Logo TSC" className="h-8 w-auto object-contain" />
                            <img src="/images/Logo Pasir Kunci.png" alt="Logo Pasir Kunci" className="h-8 w-auto object-contain" />
                        </div>
                        <h4 className="text-white font-bold text-base">
                            UPTD Padepokan Seni, Kreativitas dan Kebudayaan Kota Bandung
                        </h4>
                        <p className="text-xs text-white/50 mt-2 max-w-md leading-relaxed">
                            Dinas Kebudayaan dan Pariwisata Kota Bandung. Membangun ruang kreasi, apresiasi, dan pelestarian seni budaya bagi masyarakat dan pelaku kreatif.
                        </p>
                    </div>

                    <div>
                        <h5 className="text-white text-sm font-semibold mb-3">Navigasi</h5>
                        <ul className="space-y-2 text-xs">
                            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link href="/subsektor" className="hover:text-white transition">17 Subsektor Ekraf</Link></li>
                            <li><Link href="/berita" className="hover:text-white transition">Berita</Link></li>
                            <li><Link href="/artikel" className="hover:text-white transition">Artikel</Link></li>
                            <li><Link href="/contact" className="text-white font-bold">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-white text-sm font-semibold mb-3">Fasilitas</h5>
                        <ul className="space-y-2 text-xs">
                            <li><Link href="/fasilitas/bandung-creative-hub" className="hover:text-white transition">Bandung Creative Hub</Link></li>
                            <li><Link href="/fasilitas/padepokan-seni-mayang-sunda" className="hover:text-white transition">Mayang Sunda</Link></li>
                            <li><Link href="/fasilitas/teras-sunda-cibiru" className="hover:text-white transition">Teras Sunda Cibiru</Link></li>
                            <li><Link href="/fasilitas/kampung-wisata-pasir-kunci" className="hover:text-white transition">Pasir Kunci</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
                    <p>© 2026 UPTD Kebudayaan Kota Bandung. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="https://pusat-kreasi.disbudpar.bandung.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                            Portal Pusat Kreasi
                        </a>
                        <span>•</span>
                        <a href="https://wa.me/628112186867" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                            WhatsApp Helpdesk
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

Contact.layout = (page: React.ReactNode) => page;
