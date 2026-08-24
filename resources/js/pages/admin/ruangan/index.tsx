import { Head, router, useForm } from '@inertiajs/react';
import { useState, useMemo, useRef, useEffect } from 'react';
import {
    AlertTriangle,
    Building2,
    Check,
    ChevronLeft,
    Clock,
    DoorClosed,
    Edit3,
    Eye,
    Filter,
    Folder,
    Grid,
    ImageIcon,
    Info,
    Layers,
    Loader2,
    MoreVertical,
    Plus,
    RotateCcw,
    Search,
    Trash2,
    Upload,
    Users,
    X,
} from 'lucide-react';
import { store, update, destroy } from '@/actions/App/Http/Controllers/RoomController';

// ─── Types ────────────────────────────────────────────────────
type RoomData = {
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
    gallery_images?: (string | null)[];
    status: 'Ready' | 'In Progress' | 'Blocked';
    updated_at: string;
};

type FacilityData = {
    id: number;
    name: string;
    slug: string;
    code: string;
};

type Stats = {
    total: number;
    ready: number;
    in_progress: number;
    blocked: number;
};

type Props = {
    facility: FacilityData;
    rooms: RoomData[];
    stats: Stats;
};

// ─── Live Preview Component (User Page Replicated) ─────────────
function RoomPreview({
    name,
    description,
    capacity,
    image,
    facilityName,
    section2Title,
    section2Description,
    facilitiesList,
    secondaryImage,
    galleryImages,
}: {
    name: string;
    description: string;
    capacity: string;
    image: string | null;
    facilityName: string;
    section2Title: string;
    section2Description: string;
    facilitiesList: string;
    secondaryImage: string | null;
    galleryImages?: (string | null)[];
}) {
    const capacityNumber = capacity ? capacity.replace(/[^0-9]/g, '') || '100' : '100';

    // Parse facilities list from string (new line separated or comma separated)
    const parsedFacilities = useMemo(() => {
        if (!facilitiesList) return ['Kursi Duduk (40 Unit)', 'Meja Diskusi & Kerja', 'Stopkontak Terintegrasi', 'Interior Kayu & Tangga Ikonik'];
        return facilitiesList.split(/\n|,/).map(item => item.trim()).filter(Boolean);
    }, [facilitiesList]);

    return (
        <div className="h-full overflow-y-auto bg-white rounded-2xl border border-gray-200/80 shadow-inner text-gray-900 font-sans selection:bg-amber-100">
            {/* Top Indicator Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-100 bg-white/95 backdrop-blur-md px-4 py-2 text-xs">
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Real-time User Preview</span>
                </div>
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600">Tampilan User</span>
            </div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="p-4 sm:p-6 space-y-10">

                {/* ===== BAGIAN 1: OVERVIEW & CAPACITY (Gambar 1 Layout) ===== */}
                <div id="preview-section-1" className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Text Left */}
                    <div className="md:col-span-6 space-y-3">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            {name || 'Nama Ruangan'}
                        </h1>
                        <p className="text-xs font-semibold text-gray-500">
                            {facilityName || 'Bandung Creative Hub'}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {description || 'Deskripsi ruangan akan ditampilkan di sini secara lengkap sesuai data di database...'}
                        </p>

                        {/* Capacity Badge */}
                        <div className="inline-flex items-center gap-3 rounded-2xl bg-gray-50 border border-gray-100 px-4 py-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600 text-white">
                                <Users className="h-4.5 w-4.5" />
                            </div>
                            <div>
                                <p className="text-[9px] font-medium text-gray-400 uppercase tracking-wider">Kapasitas Publik</p>
                                <p className="text-sm font-extrabold text-gray-900">{capacity || '100 Orang'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Right */}
                    <div className="md:col-span-6">
                        <div className="relative h-48 sm:h-60 w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-200/80 shadow-xs flex items-center justify-center">
                            {image ? (
                                <img
                                    src={typeof image === 'string' ? image : URL.createObjectURL(image as unknown as Blob)}
                                    alt={name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-gray-300">
                                    <ImageIcon className="h-10 w-10" />
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Belum ada gambar</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ===== BAGIAN 2: PUBLIC SPACE & KELENGKAPAN (Gambar 2 Layout) ===== */}
                <div id="preview-section-2" className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-t border-gray-100 pt-8">
                    {/* Image Left */}
                    <div className="md:col-span-6 order-2 md:order-1">
                        <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-200/80 shadow-xs flex items-center justify-center">
                            {secondaryImage ? (
                                <img
                                    src={typeof secondaryImage === 'string' ? secondaryImage : URL.createObjectURL(secondaryImage as unknown as Blob)}
                                    alt={name}
                                    className="h-full w-full object-cover opacity-90"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-1.5 text-gray-300">
                                    <ImageIcon className="h-8 w-8" />
                                    <span className="text-[9px] font-semibold text-gray-400">Belum Ada Gambar Pendukung (Gambar 2)</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Text Right */}
                    <div className="md:col-span-6 order-1 md:order-2 space-y-3">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            {section2Title || 'Public Space & Kelengkapan'}
                        </h2>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            {section2Description || 'Konsep interior kayu yang hangat dan tangga bertingkat memberikan fleksibilitas tinggi bagi pengunjung untuk bekerja santai, berdiskusi, maupun menggelar pertunjukan mini.'}
                        </p>

                        {/* Badges */}
                        <div className="space-y-2 pt-1">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Fasilitas Pendukung Area:</p>
                            <div className="flex flex-wrap gap-1.5 text-[11px]">
                                {parsedFacilities.map((facilityItem, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-700">
                                        ✨ {facilityItem}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== BENTO BOX HIGHLIGHTS SECTION ===== */}
                <div className="border-t border-gray-100 pt-8 space-y-4">
                    <div>
                        <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">
                            Ruang Publik Utama Terbuka di Pintu Masuk.
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Menyediakan tempat berkumpul, ruang diskusi kelompok, serta area kerja mandiri (*coworker*) yang nyaman bagi publik.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {/* Card 1 */}
                        <div className="rounded-2xl bg-gray-900 p-4 text-white flex flex-col justify-between">
                            <div className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
                                <Users className="h-4 w-4" />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-2xl font-black">{capacityNumber}</h3>
                                <p className="text-[10px] text-gray-400 mt-0.5">Kapasitas daya tampung area publik.</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="rounded-2xl bg-gray-100 border border-gray-200 p-4 flex flex-col justify-between">
                            <div className="text-center py-1">
                                <h4 className="text-base font-extrabold text-gray-900">36 Point</h4>
                                <p className="text-[10px] text-gray-500 font-semibold">Stopkontak Listrik</p>
                            </div>
                            <div className="rounded-xl bg-amber-100 p-2 text-center">
                                <span className="text-[10px] font-extrabold text-amber-900">40 KURSI Interior Kayu</span>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="rounded-2xl bg-gray-100 p-4 flex flex-col justify-between">
                            <div className="flex justify-center py-1">
                                <div className="h-8 w-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold">✓</div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-900">Akses Publik Bebas</h4>
                                <p className="text-[10px] text-gray-500 mt-0.5">Dapat diakses langsung oleh pengunjung.</p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="rounded-2xl bg-white border border-gray-200 p-4 flex flex-col justify-between">
                            <div>
                                <span className="text-xl font-serif text-gray-300">“</span>
                                <p className="text-[10px] italic text-gray-600 font-medium leading-snug">
                                    "Arsitektur tangga kayu bertingkat yang unik, tempat terfavorit untuk kerja santai."
                                </p>
                            </div>
                            <p className="text-[9px] font-semibold text-gray-400 mt-2">• Pengunjung</p>
                        </div>
                    </div>
                </div>

                {/* ===== BAGIAN 3: GALERI FOTO RUANGAN (Gambar 3 Layout) ===== */}
                <div id="preview-section-3" className="border-t border-gray-100 pt-8 space-y-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Galeri Foto Ruangan ({name?.toUpperCase() || 'AMPHITHEATER'})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                            const src = galleryImages?.[i];
                            return (
                                <div key={i} className="relative h-24 rounded-xl bg-gray-100 border border-gray-200/80 overflow-hidden flex flex-col items-center justify-center gap-1 text-gray-400">
                                    {src ? (
                                        <img
                                            src={typeof src === 'string' ? src : URL.createObjectURL(src as unknown as Blob)}
                                            alt={`Foto ${i + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <ImageIcon className="h-5 w-5 text-gray-300" />
                                            <span className="text-[9px] font-semibold text-gray-400 uppercase">FOTO {name?.toUpperCase() || 'AMPHITHEATER'} {i + 1}</span>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}

// ─── Main Page Component ──────────────────────────────────────
export default function RuanganAdmin({ facility, rooms, stats }: Props) {
    // View state: 'table' | 'create' | 'edit'
    const [viewMode, setViewMode] = useState<'table' | 'create' | 'edit'>('table');
    const [editingRoom, setEditingRoom] = useState<RoomData | null>(null);

    // Active Section Tab in Edit Form: 1 | 2 | 3
    const [activeSectionTab, setActiveSectionTab] = useState<1 | 2 | 3>(1);

    // Height sync between Left Form Card and Right Preview Pane
    const formCardRef = useRef<HTMLDivElement>(null);
    const [formHeight, setFormHeight] = useState<number | null>(null);

    useEffect(() => {
        if (viewMode === 'table' || !formCardRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === formCardRef.current) {
                    setFormHeight(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height);
                }
            }
        });

        observer.observe(formCardRef.current);
        return () => observer.disconnect();
    }, [viewMode, activeSectionTab]);

    // Table filters
    const [searchQuery, setSearchQuery] = useState('');
    const [nameQuery, setNameQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [activeRowMenu, setActiveRowMenu] = useState<number | null>(null);

    // Image previews for form
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [secondaryImagePreview, setSecondaryImagePreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<(string | null)[]>(Array(8).fill(null));

    // Form schema
    type FormType = {
        name: string;
        slug: string;
        description: string;
        capacity: string;
        image: File | null;
        delete_image?: boolean;
        section2_title: string;
        section2_description: string;
        facilities_list: string;
        secondary_image: File | null;
        delete_secondary_image?: boolean;
        gallery_images: (File | null)[];
        delete_gallery_images: boolean[];
        status: string;
    };

    // Create form
    const createForm = useForm<FormType>({
        name: '',
        slug: '',
        description: '',
        capacity: '',
        image: null,
        delete_image: false,
        section2_title: 'Public Space & Kelengkapan',
        section2_description: 'Konsep interior kayu yang hangat dan tangga bertingkat memberikan fleksibilitas tinggi bagi pengunjung untuk bekerja santai, berdiskusi, maupun menggelar pertunjukan mini.',
        facilities_list: "Kursi Duduk (40 Unit)\nMeja Diskusi & Kerja\nStopkontak Terintegrasi\nInterior Kayu & Tangga Ikonik",
        secondary_image: null,
        delete_secondary_image: false,
        gallery_images: Array(8).fill(null),
        delete_gallery_images: Array(8).fill(false),
        status: 'Ready',
    });

    // Edit form
    const editForm = useForm<FormType>({
        name: '',
        slug: '',
        description: '',
        capacity: '',
        image: null,
        delete_image: false,
        section2_title: 'Public Space & Kelengkapan',
        section2_description: 'Konsep interior kayu yang hangat dan tangga bertingkat memberikan fleksibilitas tinggi bagi pengunjung untuk bekerja santai, berdiskusi, maupun menggelar pertunjukan mini.',
        facilities_list: "Kursi Duduk (40 Unit)\nMeja Diskusi & Kerja\nStopkontak Terintegrasi\nInterior Kayu & Tangga Ikonik",
        secondary_image: null,
        delete_secondary_image: false,
        gallery_images: Array(8).fill(null),
        delete_gallery_images: Array(8).fill(false),
        status: 'Ready',
    });

    // Auto-generate slug from name
    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    // Filtered rooms
    const filteredRooms = useMemo(() => {
        return rooms.filter((room) => {
            const matchesSearch = searchQuery === '' ||
                room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                room.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesName = nameQuery === '' ||
                room.name.toLowerCase().includes(nameQuery.toLowerCase());
            const matchesStatus = statusFilter === '' || room.status === statusFilter;
            return matchesSearch && matchesName && matchesStatus;
        });
    }, [rooms, searchQuery, nameQuery, statusFilter]);

    const handleReset = () => {
        setSearchQuery('');
        setNameQuery('');
        setStatusFilter('');
    };

    const handleCreate = () => {
        setViewMode('create');
        setActiveSectionTab(1);
        setImagePreview(null);
        setSecondaryImagePreview(null);
        setGalleryPreviews(Array(8).fill(null));
        createForm.reset();
    };

    const handleEdit = (room: RoomData) => {
        setEditingRoom(room);
        setViewMode('edit');
        setActiveSectionTab(1);
        setImagePreview(room.image);
        setSecondaryImagePreview(room.secondary_image);

        const initialGallery = room.gallery_images && room.gallery_images.length > 0
            ? [...room.gallery_images, ...Array(8).fill(null)].slice(0, 8)
            : Array(8).fill(null);
        setGalleryPreviews(initialGallery);

        editForm.setData({
            name: room.name,
            slug: room.slug,
            description: room.description,
            capacity: room.capacity,
            image: null,
            delete_image: false,
            section2_title: room.section2_title || 'Public Space & Kelengkapan',
            section2_description: room.section2_description || 'Konsep interior kayu yang hangat dan tangga bertingkat memberikan fleksibilitas tinggi bagi pengunjung untuk bekerja santai, berdiskusi, maupun menggelar pertunjukan mini.',
            facilities_list: room.facilities_list || "Kursi Duduk (40 Unit)\nMeja Diskusi & Kerja\nStopkontak Terintegrasi\nInterior Kayu & Tangga Ikonik",
            secondary_image: null,
            delete_secondary_image: false,
            gallery_images: Array(8).fill(null),
            delete_gallery_images: Array(8).fill(false),
            status: room.status,
        });
    };

    const handleBackToTable = () => {
        setViewMode('table');
        setEditingRoom(null);
        setImagePreview(null);
        setSecondaryImagePreview(null);
        setGalleryPreviews(Array(8).fill(null));
    };

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(store.url(facility.code), {
            forceFormData: true,
            onSuccess: () => {
                handleBackToTable();
                createForm.reset();
            },
        });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingRoom) return;
        editForm.post(update.url(editingRoom.id), {
            forceFormData: true,
            onSuccess: () => {
                handleBackToTable();
            },
        });
    };

    const handleDelete = (room: RoomData) => {
        if (!confirm(`Yakin ingin menghapus ruangan "${room.name}"?`)) return;
        router.delete(destroy.url(room.id), {
            onSuccess: () => setActiveRowMenu(null),
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, form: typeof createForm | typeof editForm, field: 'image' | 'secondary_image') => {
        const file = e.target.files?.[0];
        if (file) {
            form.setData(field, file);
            if (field === 'image') {
                setImagePreview(URL.createObjectURL(file));
                if (viewMode === 'edit') {
                    form.setData('delete_image', false);
                }
            } else {
                setSecondaryImagePreview(URL.createObjectURL(file));
                if (viewMode === 'edit') {
                    form.setData('delete_secondary_image', false);
                }
            }
        }
    };

    const handleRemoveImage = (form: typeof createForm | typeof editForm, field: 'image' | 'secondary_image') => {
        form.setData(field, null);
        if (field === 'image') {
            setImagePreview(null);
            if (viewMode === 'edit') {
                form.setData('delete_image', true);
            }
        } else {
            setSecondaryImagePreview(null);
            if (viewMode === 'edit') {
                form.setData('delete_secondary_image', true);
            }
        }
    };

    const handleGalleryImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        form: typeof createForm | typeof editForm,
        index: number
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const newFiles = [...form.data.gallery_images];
            newFiles[index] = file;
            form.setData('gallery_images', newFiles);

            const newPreviews = [...galleryPreviews];
            newPreviews[index] = URL.createObjectURL(file);
            setGalleryPreviews(newPreviews);

            if (viewMode === 'edit') {
                const newDeletes = [...(form.data.delete_gallery_images || Array(8).fill(false))];
                newDeletes[index] = false;
                form.setData('delete_gallery_images', newDeletes);
            }
        }
    };

    const handleRemoveGalleryImage = (
        form: typeof createForm | typeof editForm,
        index: number
    ) => {
        const newFiles = [...form.data.gallery_images];
        newFiles[index] = null;
        form.setData('gallery_images', newFiles);

        const newPreviews = [...galleryPreviews];
        newPreviews[index] = null;
        setGalleryPreviews(newPreviews);

        if (viewMode === 'edit') {
            const newDeletes = [...(form.data.delete_gallery_images || Array(8).fill(false))];
            newDeletes[index] = true;
            form.setData('delete_gallery_images', newDeletes);
        }
    };

    // ─── Status Badge ───
    const StatusBadge = ({ status }: { status: string }) => {
        const styles: Record<string, string> = {
            'Ready': 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/40',
            'In Progress': 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/40',
            'Blocked': 'bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border-red-200/50 dark:border-red-800/40',
        };
        return (
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-extrabold border ${styles[status] ?? ''}`}>
                {status}
            </span>
        );
    };

    // ─── TABLE VIEW ───────────────────────────────────────────
    if (viewMode === 'table') {
        return (
            <>
                <Head title={`Ruangan ${facility.name}`} />
                <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#09090b] text-gray-800 dark:text-gray-200 font-sans p-4 sm:p-6 lg:p-8 space-y-6 pb-16">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                Ruangan {facility.name}
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Kelola data ruangan pada fasilitas {facility.name}
                            </p>
                        </div>
                        <button
                            onClick={handleCreate}
                            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-white dark:text-gray-900 shadow-md hover:bg-gray-800 dark:hover:bg-gray-100 transition self-start sm:self-auto"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Tambah Ruangan</span>
                        </button>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-4 shadow-2xs">
                            <div className="flex items-center justify-between">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-[#1c1c21] text-gray-600 dark:text-gray-300">
                                    <Folder className="h-4.5 w-4.5" />
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Ruangan</p>
                                <h3 className="mt-1 text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{stats.total}</h3>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-4 shadow-2xs">
                            <div className="flex items-center justify-between">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">In Progress</p>
                                <h3 className="mt-1 text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{stats.in_progress}</h3>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-4 shadow-2xs">
                            <div className="flex items-center justify-between">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                                    <Check className="h-4.5 w-4.5" />
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Ready</p>
                                <h3 className="mt-1 text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{stats.ready}</h3>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-4 shadow-2xs">
                            <div className="flex items-center justify-between">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400">
                                    <AlertTriangle className="h-4.5 w-4.5" />
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Blocked</p>
                                <h3 className="mt-1 text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{stats.blocked}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-4 sm:p-5 shadow-2xs space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Search</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Cari ruangan..."
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] pl-9 pr-3.5 py-2 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:border-gray-400 focus:outline-none transition"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Nama</label>
                                <input
                                    type="text"
                                    value={nameQuery}
                                    onChange={(e) => setNameQuery(e.target.value)}
                                    placeholder="Filter by nama ruangan"
                                    className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] px-3.5 py-2 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:border-gray-400 focus:outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Filter by Status</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] px-3.5 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 focus:border-gray-400 focus:outline-none transition"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="Ready">Ready</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Blocked">Blocked</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-[#1c1c21]">
                            <button className="inline-flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-4 py-2 text-xs font-bold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition">
                                <Filter className="h-3.5 w-3.5" />
                                <span>Filter</span>
                            </button>
                            <button
                                onClick={handleReset}
                                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#16161a] px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f24] transition"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                <span>Reset</span>
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] overflow-hidden shadow-2xs">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-[#1c1c21] bg-gray-50/50 dark:bg-[#16161a]">
                                        <th className="py-3.5 px-4 text-xs font-extrabold text-gray-900 dark:text-white">Nama</th>
                                        <th className="py-3.5 px-4 text-xs font-extrabold text-gray-900 dark:text-white">Status</th>
                                        <th className="py-3.5 px-4 text-xs font-extrabold text-gray-900 dark:text-white">Kapasitas</th>
                                        <th className="py-3.5 px-4 text-xs font-extrabold text-gray-900 dark:text-white">Terakhir Diperbarui</th>
                                        <th className="py-3.5 px-4 text-xs font-extrabold text-gray-900 dark:text-white text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-[#1c1c21]">
                                    {filteredRooms.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-12 text-center">
                                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                                    <DoorClosed className="h-8 w-8" />
                                                    <p className="text-sm font-semibold">Tidak ada ruangan ditemukan</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredRooms.map((room) => (
                                            <tr key={room.id} className="hover:bg-gray-50/60 dark:hover:bg-[#1a1a20] transition-colors group">
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl overflow-hidden bg-gray-100 dark:bg-[#1c1c21]">
                                                            {room.image ? (
                                                                <img src={room.image} alt={room.name} className="h-full w-full object-cover" />
                                                            ) : (
                                                                <DoorClosed className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{room.name}</h4>
                                                            <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">{room.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4"><StatusBadge status={room.status} /></td>
                                                <td className="py-4 px-4 text-xs font-semibold text-gray-700 dark:text-gray-300">{room.capacity || '—'}</td>
                                                <td className="py-4 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">{room.updated_at}</td>
                                                <td className="py-4 px-4 text-right relative">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleEdit(room)}
                                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition py-1 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f1f25]"
                                                        >
                                                            <Eye className="h-3.5 w-3.5" />
                                                            <span>View</span>
                                                        </button>
                                                        <button
                                                            onClick={() => setActiveRowMenu(activeRowMenu === room.id ? null : room.id)}
                                                            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1c1c21] transition"
                                                        >
                                                            <MoreVertical className="h-4 w-4" />
                                                        </button>
                                                        {activeRowMenu === room.id && (
                                                            <div className="absolute right-4 top-12 z-20 w-40 rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#16161a] p-1.5 shadow-lg text-left">
                                                                <button
                                                                    onClick={() => { handleEdit(room); setActiveRowMenu(null); }}
                                                                    className="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#202026] rounded-lg transition"
                                                                >
                                                                    <Edit3 className="h-3.5 w-3.5 text-gray-500" />
                                                                    <span>Edit Ruangan</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => { handleDelete(room); setActiveRowMenu(null); }}
                                                                    className="flex w-full items-center gap-2 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                                                    <span>Hapus</span>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // ─── CREATE / EDIT SPLIT-SCREEN VIEW ──────────────────────
    const isCreate = viewMode === 'create';
    const form = isCreate ? createForm : editForm;
    const currentPreviewImage = imagePreview;

    return (
        <>
            <Head title={`${isCreate ? 'Tambah' : 'Edit'} Ruangan — ${facility.name}`} />
            <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#09090b] text-gray-800 dark:text-gray-200 font-sans p-4 sm:p-6 lg:p-8 space-y-5">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBackToTable}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1c1c21] transition shadow-2xs"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            {isCreate ? 'Tambah Ruangan Baru' : `Edit: ${editingRoom?.name}`}
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{facility.name} • Perubahan akan langsung terlihat di preview</p>
                    </div>
                </div>

                {/* Split Screen */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                    {/* LEFT: Form with 3 Section Tabs */}
                    <div ref={formCardRef} className="rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 sm:p-6 shadow-2xs space-y-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                                <Edit3 className="h-4 w-4 text-gray-500" />
                                {isCreate ? 'Data Ruangan Baru' : 'Edit Data Ruangan'}
                            </h2>
                            <StatusBadge status={form.data.status || 'Ready'} />
                        </div>

                        {/* ===== 3 SECTION FORM TABS ===== */}
                        <div className="flex items-center gap-1.5 rounded-xl bg-gray-100/80 dark:bg-[#1a1a20] p-1 text-xs">
                            <button
                                type="button"
                                onClick={() => setActiveSectionTab(1)}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg font-bold transition ${activeSectionTab === 1
                                    ? 'bg-white dark:bg-[#25252d] text-gray-900 dark:text-white shadow-xs'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <Info className="h-3.5 w-3.5" />
                                <span>Bagian 1: Overview</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveSectionTab(2)}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg font-bold transition ${activeSectionTab === 2
                                    ? 'bg-white dark:bg-[#25252d] text-gray-900 dark:text-white shadow-xs'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <Layers className="h-3.5 w-3.5" />
                                <span>Bagian 2: Kelengkapan</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveSectionTab(3)}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg font-bold transition ${activeSectionTab === 3
                                    ? 'bg-white dark:bg-[#25252d] text-gray-900 dark:text-white shadow-xs'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <Grid className="h-3.5 w-3.5" />
                                <span>Bagian 3: Galeri</span>
                            </button>
                        </div>

                        <form onSubmit={isCreate ? submitCreate : submitEdit} className="space-y-5">
                            {/* ===== BAGIAN 1: INFORMASI UTAMA & HERO ===== */}
                            {activeSectionTab === 1 && (
                                <div className="space-y-4 animate-in fade-in duration-200">
                                    <div className="rounded-xl border border-blue-100 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-950/20 p-3 flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-300">
                                        <Info className="h-4 w-4 shrink-0" />
                                        <span>Bagian 1 mengedit Nama, Deskripsi Utama, Kapasitas, Status, dan Gambar Utama Ruangan (Gambar 1).</span>
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Nama Ruangan *</label>
                                        <input
                                            type="text"
                                            value={form.data.name}
                                            onChange={(e) => {
                                                form.setData('name', e.target.value);
                                                if (viewMode === 'create') {
                                                    form.setData('slug', generateSlug(e.target.value));
                                                }
                                            }}
                                            placeholder="Contoh: Amphitheater"
                                            className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] px-3.5 py-2.5 text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition"
                                        />
                                        {form.errors.name && <p className="mt-1 text-xs text-red-500">{form.errors.name}</p>}
                                    </div>

                                    {/* Slug */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Slug URL *</label>
                                        <input
                                            type="text"
                                            value={form.data.slug}
                                            onChange={(e) => form.setData('slug', e.target.value)}
                                            placeholder="amphitheater"
                                            className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] px-3.5 py-2.5 text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition font-mono text-xs"
                                        />
                                        {form.errors.slug && <p className="mt-1 text-xs text-red-500">{form.errors.slug}</p>}
                                    </div>

                                    {/* Deskripsi Utama */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Deskripsi Utama Ruangan *</label>
                                        <textarea
                                            value={form.data.description}
                                            onChange={(e) => form.setData('description', e.target.value)}
                                            rows={4}
                                            placeholder="Area ini merupakan pintu utama gedung Bandung Creative Hub..."
                                            className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] px-3.5 py-2.5 text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition resize-none"
                                        />
                                        {form.errors.description && <p className="mt-1 text-xs text-red-500">{form.errors.description}</p>}
                                    </div>

                                    {/* Kapasitas & Status Row */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Kapasitas Publik *</label>
                                            <input
                                                type="text"
                                                value={form.data.capacity}
                                                onChange={(e) => form.setData('capacity', e.target.value)}
                                                placeholder="Contoh: 100 Orang"
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] px-3.5 py-2.5 text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition"
                                            />
                                            {form.errors.capacity && <p className="mt-1 text-xs text-red-500">{form.errors.capacity}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Status *</label>
                                            <select
                                                value={form.data.status}
                                                onChange={(e) => form.setData('status', e.target.value)}
                                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] px-3.5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:outline-none transition"
                                            >
                                                <option value="Ready">Ready</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Blocked">Blocked</option>
                                            </select>
                                            {form.errors.status && <p className="mt-1 text-xs text-red-500">{form.errors.status}</p>}
                                        </div>
                                    </div>

                                    {/* Gambar Utama Upload */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Gambar Utama Ruangan (max 1MB)</label>
                                        {imagePreview ? (
                                            <div className="relative rounded-xl border border-gray-200 dark:border-[#2a2a32] bg-gray-50 dark:bg-[#1a1a20] p-3 flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <img src={imagePreview} alt="Preview Gambar Utama" className="h-12 w-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shrink-0" />
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">Gambar Utama Terpasang</p>
                                                        <p className="text-[10px] text-gray-400">Siap ditampilkan</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <label className="cursor-pointer text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline px-2 py-1">
                                                        Ganti
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => handleImageChange(e, form, 'image')}
                                                        />
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(form, 'image')}
                                                        className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 px-2.5 py-1.5 rounded-lg border border-red-200/60 dark:border-red-800/40 transition"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                        <span>Hapus Gambar</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-[#2a2a32] bg-gray-50/50 dark:bg-[#1a1a20] px-4 py-3.5 transition-colors hover:border-blue-400 hover:bg-blue-50/30">
                                                <Upload className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">Upload Gambar Utama</p>
                                                    <p className="text-[10px] text-gray-400">JPG, PNG, WEBP • Max 1MB</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handleImageChange(e, form, 'image')}
                                                />
                                            </label>
                                        )}
                                        {form.errors.image && <p className="mt-1 text-xs text-red-500">{form.errors.image}</p>}
                                    </div>
                                </div>
                            )}

                            {/* ===== BAGIAN 2: PUBLIC SPACE & KELENGKAPAN ===== */}
                            {activeSectionTab === 2 && (
                                <div className="space-y-4 animate-in fade-in duration-200">
                                    <div className="rounded-xl border border-amber-100 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-950/20 p-3 flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-300">
                                        <Layers className="h-4 w-4 shrink-0" />
                                        <span>Bagian 2 mengedit Judul Kelengkapan, Deskripsi Konsep, Fasilitas Pendukung, dan Gambar Pendukung (Gambar 2).</span>
                                    </div>

                                    {/* Judul Section 2 */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Judul Sub-Section *</label>
                                        <input
                                            type="text"
                                            value={form.data.section2_title}
                                            onChange={(e) => form.setData('section2_title', e.target.value)}
                                            placeholder="Public Space & Kelengkapan"
                                            className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] px-3.5 py-2.5 text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition"
                                        />
                                    </div>

                                    {/* Deskripsi Section 2 */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Deskripsi Konsep Kelengkapan</label>
                                        <textarea
                                            value={form.data.section2_description}
                                            onChange={(e) => form.setData('section2_description', e.target.value)}
                                            rows={3}
                                            placeholder="Konsep interior kayu yang hangat dan tangga bertingkat memberikan fleksibilitas..."
                                            className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] px-3.5 py-2.5 text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition resize-none"
                                        />
                                    </div>

                                    {/* Daftar Fasilitas Pendukung */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                            Fasilitas Pendukung Area (Satu item per baris)
                                        </label>
                                        <textarea
                                            value={form.data.facilities_list}
                                            onChange={(e) => form.setData('facilities_list', e.target.value)}
                                            rows={4}
                                            placeholder="Kursi Duduk (40 Unit)&#10;Meja Diskusi & Kerja&#10;Stopkontak Terintegrasi&#10;Interior Kayu & Tangga Ikonik"
                                            className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] px-3.5 py-2.5 text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition resize-none font-mono text-xs"
                                        />
                                        <p className="text-[10px] text-gray-400 mt-1">Pisahkan tiap item fasilitas dengan menekan Enter.</p>
                                    </div>

                                    {/* Gambar Pendukung Section 2 */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Gambar Pendukung Section 2 (max 1MB)</label>
                                        {secondaryImagePreview ? (
                                            <div className="relative rounded-xl border border-gray-200 dark:border-[#2a2a32] bg-gray-50 dark:bg-[#1a1a20] p-3 flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <img src={secondaryImagePreview} alt="Preview Gambar Pendukung" className="h-12 w-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shrink-0" />
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">Gambar Pendukung Terpasang</p>
                                                        <p className="text-[10px] text-gray-400">Siap ditampilkan</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <label className="cursor-pointer text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline px-2 py-1">
                                                        Ganti
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => handleImageChange(e, form, 'secondary_image')}
                                                        />
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(form, 'secondary_image')}
                                                        className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 px-2.5 py-1.5 rounded-lg border border-red-200/60 dark:border-red-800/40 transition"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                        <span>Hapus Gambar</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-[#2a2a32] bg-gray-50/50 dark:bg-[#1a1a20] px-4 py-3.5 transition-colors hover:border-amber-400 hover:bg-amber-50/30">
                                                <Upload className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">Upload Gambar Pendukung</p>
                                                    <p className="text-[10px] text-gray-400">JPG, PNG, WEBP • Max 1MB</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handleImageChange(e, form, 'secondary_image')}
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* ===== BAGIAN 3: GALERI FOTO RUANGAN ===== */}
                            {activeSectionTab === 3 && (
                                <div className="space-y-4 animate-in fade-in duration-200">
                                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-950/20 p-3 flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                                        <Grid className="h-4 w-4 shrink-0" />
                                        <span>Bagian 3 mengelola Galeri Foto Ruangan 1 s/d 8 di bagian bawah (Gambar 3). Maksimal 1MB per berkas foto.</span>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                                            Item Galeri Foto Ruangan (8 Slot Foto)
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
                                                const previewUrl = galleryPreviews[idx];
                                                return (
                                                    <div key={idx} className="rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50 dark:bg-[#1a1a20] p-3 flex items-center justify-between gap-3">
                                                        {previewUrl ? (
                                                            <>
                                                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                                                    <img
                                                                        src={previewUrl}
                                                                        alt={`Preview Foto ${idx + 1}`}
                                                                        className="h-12 w-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shrink-0"
                                                                    />
                                                                    <div className="min-w-0 flex-1">
                                                                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">Foto {idx + 1}</p>
                                                                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Gambar Terpasang</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-1.5 shrink-0">
                                                                    <label className="cursor-pointer text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline px-1.5 py-1">
                                                                        Ganti
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            className="hidden"
                                                                            onChange={(e) => handleGalleryImageChange(e, form, idx)}
                                                                        />
                                                                    </label>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveGalleryImage(form, idx)}
                                                                        className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 p-1.5 rounded-lg border border-red-200/60 dark:border-red-800/40 transition"
                                                                        title="Hapus Gambar"
                                                                    >
                                                                        <Trash2 className="h-3.5 w-3.5" />
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                                                    <div className="h-12 w-16 rounded-lg bg-gray-200/70 dark:bg-[#25252d] flex items-center justify-center text-gray-400 shrink-0">
                                                                        <ImageIcon className="h-5 w-5" />
                                                                    </div>
                                                                    <div className="min-w-0 flex-1">
                                                                        <p className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate">Foto {idx + 1}</p>
                                                                        <p className="text-[10px] text-gray-400">Kosong (Belum ada foto)</p>
                                                                    </div>
                                                                </div>
                                                                <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition shrink-0">
                                                                    <Upload className="h-3.5 w-3.5" />
                                                                    <span>Upload</span>
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        className="hidden"
                                                                        onChange={(e) => handleGalleryImageChange(e, form, idx)}
                                                                    />
                                                                </label>
                                                            </>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100 dark:border-[#1f1f23]">
                                <div className="flex items-center gap-2">
                                    {activeSectionTab > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setActiveSectionTab((prev) => (prev - 1) as 1 | 2 | 3)}
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white py-1 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f1f25]"
                                        >
                                            ← Bagian {activeSectionTab - 1}
                                        </button>
                                    )}
                                    {activeSectionTab < 3 && (
                                        <button
                                            type="button"
                                            onClick={() => setActiveSectionTab((prev) => (prev + 1) as 1 | 2 | 3)}
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline py-1 px-2"
                                        >
                                            Ke Bagian {activeSectionTab + 1} →
                                        </button>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleBackToTable}
                                        className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#16161a] px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f24] transition"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                        <span>Batal</span>
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-gray-800 dark:hover:bg-blue-500 transition disabled:opacity-50"
                                    >
                                        {form.processing ? (
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        ) : (
                                            <Check className="h-3.5 w-3.5" />
                                        )}
                                        <span>{form.processing ? 'Menyimpan...' : (isCreate ? 'Simpan Ruangan' : 'Update Ruangan')}</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT: Live Preview (Full User Page Replication) */}
                    <div style={{ height: formHeight ? `${formHeight}px` : 'auto' }} className="w-full">
                        <RoomPreview
                            name={form.data.name}
                            description={form.data.description}
                            capacity={form.data.capacity}
                            image={currentPreviewImage}
                            facilityName={facility.name}
                            section2Title={form.data.section2_title}
                            section2Description={form.data.section2_description}
                            facilitiesList={form.data.facilities_list}
                            secondaryImage={secondaryImagePreview}
                            galleryImages={galleryPreviews}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
