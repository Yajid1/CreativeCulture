import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function KampungWisataPasirKunci() {
    const facility = {
        name: 'Kampung Wisata Pasir Kunci',
        description:
            'Ruang publik kreatif berbasis budaya Sunda di kawasan Cibiru yang menjadi pusat kegiatan seni, komunitas, dan edukasi budaya bagi masyarakat Bandung Timur.',
        videoUrl: '/videos/kwpk.mp4',
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
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
    const [activeObject, setActiveObject] = useState<(typeof objects)[0] | null>(null);

    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let rafId: number;
        let lenisInstance: any = null;
        const observers: IntersectionObserver[] = [];

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

        // === Lenis Smooth Scroll ===
        (async () => {
            const { default: Lenis } = await import('lenis');
            lenisInstance = new Lenis({ smoothWheel: true });
            function raf(t: number) {
                if (lenisInstance) {
                    lenisInstance.raf(t);
                    rafId = requestAnimationFrame(raf);
                }
            }
            rafId = requestAnimationFrame(raf);
        })();

        // === Scroll Reveal Animations ===
        const root = pageRef.current || document;

        const revealEls = root.querySelectorAll('[data-scroll]');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    const delay = parseInt(el.dataset.delay || '0', 10);
                    setTimeout(() => {
                        el.classList.add('fac-revealed');
                    }, delay);
                    revealObserver.unobserve(el);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach((el) => revealObserver.observe(el));
        observers.push(revealObserver);

        const staggerEls = root.querySelectorAll('[data-scroll-children]');
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const parent = entry.target as HTMLElement;
                    const stagger = parseInt(parent.dataset.stagger || '80', 10);
                    const children = parent.children;
                    Array.from(children).forEach((child, i) => {
                        const el = child as HTMLElement;
                        setTimeout(() => {
                            el.classList.add('fac-revealed');
                        }, i * stagger);
                    });
                    staggerObserver.unobserve(parent);
                }
            });
        }, { threshold: 0.1 });
        staggerEls.forEach((el) => staggerObserver.observe(el));
        observers.push(staggerObserver);

        return () => {
            clearInterval(id);
            if (rafId) cancelAnimationFrame(rafId);
            if (lenisInstance) lenisInstance.destroy();
            observers.forEach((o) => o.disconnect());
        };
    }, []);

    return (
        <div ref={pageRef}>
            <Head title={facility.name} />

            {/* Scoped scroll animation styles */}
            <style>{`
                .fac-scroll {
                    opacity: 0;
                    transform: translateY(24px);
                    transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                                transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .fac-scroll.fac-revealed {
                    opacity: 1;
                    transform: translateY(0);
                }
                .fac-stagger-child {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                                transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .fac-stagger-child.fac-revealed {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>

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
                            Kampung Wisata
                        </div>

                        <h1
                            className="mt-3 text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl"
                            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9)' }}
                        >
                            Kampung
                            <br />
                            Wisata Pasir
                            <br />
                            Kunci
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

            {/* Tentang Kami Section */}
            <section id="detail" className="relative w-full bg-[#fafbfd] py-24 sm:py-32 overflow-hidden text-[#1e2330]">
                {/* Decorative background shape */}
                <div className="absolute -left-[15%] top-0 aspect-square w-[45%] rounded-full bg-white opacity-80 mix-blend-normal shadow-[0_0_80px_rgba(0,0,0,0.02)]" />

                <div className="container relative mx-auto px-6 sm:px-10 max-w-[1300px]">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20 items-center">
                        
                        {/* Left Content */}
                        <div className="flex flex-col items-start space-y-6 z-10 fac-scroll" data-scroll>
                            <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 tracking-wide fac-scroll" data-scroll>
                                <span className="h-2 w-2 rounded-full bg-blue-600" />
                                Tentang Kami
                            </div>
                            
                            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.3] tracking-tight text-[#1e2330]">
                                Terletak di Kelurahan Pasirjati Kecamatan Ujungberung Kota Bandung tepatnya di kaki Gunung Manglayang dengan ketinggian 800 meter di atas permukaan laut.
                            </h2>
                            
                            <p className="text-lg text-slate-600 leading-relaxed font-medium pt-2">
                                Diresmikan pada 31 Oktober 2018 oleh Bapak H. Oded M. Danial, saat itu menjabat Wali Kota Bandung. Daya tarik dan aktivitas Kampung Wisata Pasir Kunci menawarkan kombinasi wisata alam, budaya dan edukasi.
                            </p>
                            
                            <div className="pt-6">
                                <Link
                                    href="/kontak"
                                    className="inline-flex items-center gap-3 rounded-full bg-slate-100/80 pr-6 pl-2 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </span>
                                    Hubungi Kami
                                </Link>
                            </div>
                        </div>

                        {/* Right Content - Images Collage */}
                        <div className="relative h-[500px] sm:h-[600px] w-full flex items-center justify-center mt-10 lg:mt-0">
                            
                            {/* Top Right Image */}
                            <div 
                                className="absolute right-0 top-[5%] w-[45%] z-10 hover:z-40 transition-transform duration-500 hover:scale-105 cursor-pointer"
                                onClick={() => setSelectedImage({ src: '/images/DSC01753.jpg', alt: 'Pemandangan Alam' })}
                            >
                                <div className="relative">
                                    <div className="absolute -top-12 -left-4 flex flex-col items-center">
                                        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-slate-600 uppercase mb-1">Pemandangan Alam</span>
                                        <svg className="w-12 sm:w-16 h-12 sm:h-16 text-slate-400 stroke-current opacity-70" viewBox="0 0 100 100" fill="none">
                                            <path d="M 50,0 C 50,60 100,80 100,100" strokeWidth="1.5" />
                                        </svg>
                                    </div>
                                    <img 
                                        src="/images/DSC01753.jpg" 
                                        alt="Pemandangan Alam" 
                                        className="aspect-[4/5] w-full object-cover rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]" 
                                    />
                                    <div className="absolute -right-4 sm:-right-8 top-1/2 flex items-center gap-2">
                                        <svg className="w-8 sm:w-12 h-6 sm:h-8 text-slate-400 stroke-current opacity-70" viewBox="0 0 100 50" fill="none">
                                            <path d="M 0,25 C 50,25 50,0 100,0" strokeWidth="1.5" />
                                        </svg>
                                        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-slate-600 uppercase">Spot Foto</span>
                                    </div>
                                </div>
                            </div>

                            {/* Middle Left Image */}
                            <div 
                                className="absolute left-[0%] top-[35%] w-[55%] z-20 hover:z-40 transition-transform duration-500 hover:scale-105 cursor-pointer"
                                onClick={() => setSelectedImage({ src: '/images/DSC01757.jpg', alt: 'Budaya Sunda' })}
                            >
                                <div className="relative">
                                    <div className="absolute -left-8 sm:-left-12 -top-8 sm:-top-10 flex flex-col items-end">
                                        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-slate-600 uppercase mb-1">Budaya Sunda</span>
                                        <svg className="w-12 sm:w-16 h-12 sm:h-16 text-slate-400 stroke-current opacity-70" viewBox="0 0 100 100" fill="none">
                                            <path d="M 100,0 C 100,50 0,60 0,100" strokeWidth="1.5" />
                                        </svg>
                                    </div>
                                    <img 
                                        src="/images/DSC01757.jpg" 
                                        alt="Budaya Sunda" 
                                        className="aspect-[4/3] w-full object-cover rounded-2xl shadow-[0_25px_50px_-15px_rgba(0,0,0,0.2)] border-[3px] border-white" 
                                    />
                                </div>
                            </div>

                            {/* Bottom Right Image */}
                            <div 
                                className="absolute right-[10%] bottom-[5%] w-[45%] z-30 hover:z-40 transition-transform duration-500 hover:scale-105 cursor-pointer"
                                onClick={() => setSelectedImage({ src: '/images/DSC01758.jpg', alt: 'Wisata Edukatif' })}
                            >
                                <div className="relative">
                                    <img 
                                        src="/images/DSC01758.jpg" 
                                        alt="Wisata Edukatif" 
                                        className="aspect-[3/4] w-full object-cover rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border-[3px] border-white" 
                                    />
                                    <div className="absolute -bottom-8 sm:-bottom-10 -left-10 sm:-left-16 flex flex-col items-end">
                                        <svg className="w-16 sm:w-20 h-12 sm:h-16 text-slate-400 stroke-current opacity-70" viewBox="0 0 100 100" fill="none">
                                            <path d="M 100,100 C 100,40 0,20 0,0" strokeWidth="1.5" />
                                        </svg>
                                        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-slate-600 uppercase mt-1">Wisata Edukatif</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative w-full bg-white py-20 overflow-hidden">
                <div className="container mx-auto px-6 sm:px-10 max-w-[1300px]">
                    <div className="mb-16">
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#1e2330] fac-scroll" data-scroll>
                            Daya Tarik & Aktivitas
                        </h3>
                        <p className="mt-4 text-slate-600 max-w-2xl fac-scroll" data-scroll data-delay="100">
                            Kampung Wisata Pasir Kunci menawarkan kombinasi wisata alam, budaya, dan edukasi yang menjadikannya destinasi lengkap.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16" data-scroll-children data-stagger="100">
                        
                        {/* Feature 1 */}
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-[#1e2330]">Pemandangan dan suasana alam</h4>
                            </div>
                            <p className="text-slate-600 leading-relaxed pl-16">
                                Udara sejuk, hamparan hijau, sawah, perbukitan, dan panorama Bandung dari ketinggian, cocok untuk refreshing, santai, atau sekadar menikmati alam.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                        <path d="M12 2a10 10 0 1 0 10 10" />
                                        <path d="m12 12 3 3" />
                                        <path d="M12 12 9 9" />
                                        <path d="M12 12v-3" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-[#1e2330]">Pelestarian budaya Sunda</h4>
                            </div>
                            <p className="text-slate-600 leading-relaxed pl-16">
                                Di sini bisa dilaksanakan kegiatan tradisional seperti permainan anak-anak tradisional ("kaulinan barudak"), kesenian lokal, dan pertunjukan budaya.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                        <circle cx="9" cy="9" r="2" />
                                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-[#1e2330]">Spot foto & Instagramable</h4>
                            </div>
                            <p className="text-slate-600 leading-relaxed pl-16">
                                View alam, panorama, suasana pedesaan, dan latar pegunungan membuat banyak sudut cocok untuk foto yang estetik.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-[#1e2330]">Wisata keluarga & edukatif</h4>
                            </div>
                            <p className="text-slate-600 leading-relaxed pl-16">
                                Dengan adanya unsur budaya dan ruang terbuka, tempat ini cocok untuk outing keluarga, mengenalkan budaya tradisional ke anak.
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

                    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2" data-scroll-children data-stagger="150">
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

                    <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-gray-500 sm:text-base fac-scroll" data-scroll data-delay="100">
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
                    <h2 className="text-3xl font-bold leading-tight sm:text-4xl fac-scroll" data-scroll>Ruangan dan Area Tersedia</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500">
                        Tersedia berbagai ruang dengan kapasitas dan fungsi berbeda untuk mendukung kegiatan pelestarian dan pertunjukan seni di {facility.name}.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { icon: 'music', name: 'Saung Padepokan', href: '/ruangan-kwpk/saung-padepokan', floor: '', capacity: 30 },
                            { icon: 'music', name: 'Balé Puhun', href: '/ruangan-kwpk/bale-puhun', floor: '', capacity: 15 },
                            { icon: 'music', name: 'Wahana Kaulinan Lapang', href: '/ruangan-kwpk/wahana-kaulinan-lapang', floor: '', capacity: 100 },
                            { icon: 'music', name: 'Kalang (Ampitheater)', href: '/ruangan-kwpk/kalang-amphitheater', floor: '', capacity: 200 },
                        ].map((room, i) => {
                            const roomGradients = [
                                'from-blue-400 to-blue-600',
                                'from-sky-400 to-blue-500',
                                'from-indigo-400 to-blue-600',
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
                                        <h3 className="text-sm font-bold text-gray-900 transition group-hover:text-blue-600">
                                            {room.name}
                                        </h3>
                                        {room.floor && <p className="mt-1 text-xs text-gray-400">{room.floor}</p>}
                                        <div className={`inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600 ${!room.floor ? 'mt-2.5' : 'mt-2'}`}>
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
                                { label: 'Area', value: '1 Area' },
                                { label: 'Ruangan', value: '4 Ruang' },
                                { label: 'Kapasitas', value: '±345 Orang' },
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
                                title={`Lokasi ${facility.name}`}
                                src="https://maps.google.com/maps?q=Kampung%20Wisata%20Pasir%20Kunci&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
                                <p className="text-sm font-semibold text-gray-900">{facility.name}</p>
                                <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                                    Pasirjati, Kec. Ujung Berung,<br />Kota Bandung, Jawa Barat 40616
                                </p>
                                <a
                                    href="https://maps.google.com/?q=Kampung+Wisata+Pasir+Kunci"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                                >
                                    Buka di Google Maps
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
        </div>
    );
}
