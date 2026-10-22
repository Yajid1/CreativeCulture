import { useState, useEffect, useMemo, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import {
    Bell,
    Building2,
    Calendar as CalendarIcon,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock,
    DoorClosed,
    Download,
    Edit3,
    Eye,
    FileText,
    FolderKanban,
    Globe,
    Home,
    Inbox,
    Moon,
    MoreHorizontal,
    MoreVertical,
    Newspaper,
    Plus,
    Printer,
    Search,
    Sun,
    Trash2,
    TrendingUp,
    Users,
    X,
} from 'lucide-react';

type Task = {
    id: number;
    title: string;
    text: string;
    description: string;
    completed: boolean;
    status: 'in_progress' | 'completed';
    category: string;
    task_date: string;
    task_time: string;
};

type ActivityLogItem = {
    id: number;
    userName: string;
    module: string;
    action: string;
    title: string;
    description: string;
    status: string;
    link: string;
    lastUpdated: string;
    created_at_human: string;
};

type RecentActivitiesProp = {
    data: ActivityLogItem[];
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
    from: number;
    to: number;
};

function getWeatherInfo(code: number, isDay: number = 1): { icon: string; text: string } {
    if (code === 0) return { icon: isDay ? '☀️' : '🌙', text: isDay ? 'Sunny' : 'Clear' };
    if (code === 1) return { icon: isDay ? '🌤️' : '🌙', text: isDay ? 'Mainly Clear' : 'Mostly Clear' };
    if (code === 2) return { icon: isDay ? '⛅' : '☁️', text: 'Partly Cloudy' };
    if (code === 3) return { icon: '☁️', text: 'Overcast' };
    if (code === 45 || code === 48) return { icon: '🌫️', text: 'Foggy' };
    if ([51, 53, 55, 56, 57].includes(code)) return { icon: '🌦️', text: 'Drizzle' };
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { icon: '🌧️', text: 'Rainy' };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: '🌨️', text: 'Snowy' };
    if ([95, 96, 99].includes(code)) return { icon: '⛈️', text: 'Thunderstorm' };
    return { icon: isDay ? '🌤️' : '🌙', text: 'Partly Cloudy' };
}

export default function Dashboard({
    totalRooms,
    totalArtikels = 0,
    totalBeritas = 0,
    quickTasks = [],
    taskCompletionRate = 0,
    recentActivities,
    selectedMonth = 'this-month',
    selectedMonthLabel = 'This Month',
    availableMonths = [],
}: {
    totalRooms: number;
    totalArtikels?: number;
    totalBeritas?: number;
    quickTasks?: Task[];
    taskCompletionRate?: number;
    recentActivities?: RecentActivitiesProp;
    selectedMonth?: string;
    selectedMonthLabel?: string;
    availableMonths?: string[];
}) {
    // Live clock time state
    const [timeString, setTimeString] = useState<string>('10:08 AM');
    const [dateString, setDateString] = useState<string>('Saturday, Dec 27, 2025');

    // Live weather state for Bandung
    const [temperature, setTemperature] = useState<number | null>(null);
    const [weatherStatus, setWeatherStatus] = useState<string>('Sunny');
    const [weatherIcon, setWeatherIcon] = useState<string>('☀️');
    const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(true);

    const fetchWeather = async () => {
        try {
            const res = await fetch(
                'https://api.open-meteo.com/v1/forecast?latitude=-6.9175&longitude=107.6191&current=temperature_2m,weather_code,is_day'
            );
            if (!res.ok) throw new Error('Failed to fetch weather');
            const data = await res.json();
            if (data?.current) {
                const temp = Math.round(data.current.temperature_2m);
                const code = data.current.weather_code ?? 0;
                const isDay = data.current.is_day ?? 1;
                const info = getWeatherInfo(code, isDay);
                setTemperature(temp);
                setWeatherIcon(info.icon);
                setWeatherStatus(info.text);
                setIsWeatherLoading(false);
            }
        } catch (err) {
            console.error('Weather fetch error:', err);
            const hour = new Date().getHours();
            const isDay = hour >= 6 && hour < 18;
            setTemperature(isDay ? 28 : 22);
            setWeatherIcon(isDay ? '🌤️' : '🌙');
            setWeatherStatus(isDay ? 'Partly Cloudy' : 'Clear');
            setIsWeatherLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
        const weatherTimer = setInterval(fetchWeather, 10 * 60 * 1000);
        return () => clearInterval(weatherTimer);
    }, []);

    // Dynamic Calendar state
    const [calendarDate, setCalendarDate] = useState<Date>(new Date());

    // Month Picker dropdown state
    const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
    const monthPickerRef = useRef<HTMLDivElement>(null);

    const now = new Date();
    const nowMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthKey = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`;

    const [pickerYear, setPickerYear] = useState<number>(() => {
        if (selectedMonth && selectedMonth !== 'all' && selectedMonth.includes('-')) {
            return parseInt(selectedMonth.split('-')[0], 10) || now.getFullYear();
        }
        return now.getFullYear();
    });

    useEffect(() => {
        if (selectedMonth && selectedMonth !== 'all' && selectedMonth.includes('-')) {
            const [y, m] = selectedMonth.split('-').map(Number);
            if (y && m) {
                setCalendarDate(new Date(y, m - 1, 1));
                setPickerYear(y);
            }
        }
    }, [selectedMonth]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (monthPickerRef.current && !monthPickerRef.current.contains(event.target as Node)) {
                setIsMonthPickerOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectMonth = (monthKey: string) => {
        setIsMonthPickerOpen(false);
        router.get(
            '/dashboard',
            { month: monthKey },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleExportPrint = () => {
        window.print();
    };

    const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTimeString(
                now.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                })
            );
            setDateString(
                now.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                })
            );
        };
        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    // Month Navigation Handlers
    const handlePrevMonth = () => {
        setCalendarDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCalendarDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    // Calculate Days for Current Calendar View
    const calendarDays = useMemo(() => {
        const year = calendarDate.getFullYear();
        const month = calendarDate.getMonth();

        const firstDayIndex = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();

        const today = new Date();

        const days: Array<{
            day: number;
            isCurrentMonth: boolean;
            isToday: boolean;
            dateKey: string;
        }> = [];

        // Previous month trailing days
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            const dayNum = prevMonthDays - i;
            days.push({
                day: dayNum,
                isCurrentMonth: false,
                isToday: false,
                dateKey: `prev-${dayNum}`,
            });
        }

        // Current month days
        for (let d = 1; d <= daysInMonth; d++) {
            const isToday =
                d === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

            days.push({
                day: d,
                isCurrentMonth: true,
                isToday,
                dateKey: `curr-${d}`,
            });
        }

        // Next month leading days to complete grid (total cells multiple of 7)
        const remainingCells = (7 - (days.length % 7)) % 7;
        for (let d = 1; d <= remainingCells; d++) {
            days.push({
                day: d,
                isCurrentMonth: false,
                isToday: false,
                dateKey: `next-${d}`,
            });
        }

        return days;
    }, [calendarDate]);

    // Quick tasks state synced with props from backend
    const [tasks, setTasks] = useState<Task[]>(quickTasks);
    const [newTaskText, setNewTaskText] = useState('');
    const [taskFilter, setTaskFilter] = useState<'active' | 'completed'>('active');

    // Edit & Create task modal state
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        category: '',
        status: 'in_progress' as 'in_progress' | 'completed',
        task_date: '',
        task_time: '',
    });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createForm, setCreateForm] = useState({
        title: '',
        description: '',
        category: '',
        status: 'in_progress' as 'in_progress' | 'completed',
        task_date: new Date().toISOString().slice(0, 10),
        task_time: '',
    });
    const [isSubmittingTask, setIsSubmittingTask] = useState(false);

    useEffect(() => {
        setTasks(quickTasks);
    }, [quickTasks]);

    const openCreateModal = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setCreateForm({
            title: newTaskText.trim(),
            description: '',
            category: 'General',
            status: 'in_progress',
            task_date: new Date().toISOString().slice(0, 10),
            task_time: '',
        });
        setIsCreateModalOpen(true);
    };

    const handleCreateTask = () => {
        if (!createForm.title.trim()) return;
        setIsSubmittingTask(true);
        router.post('/admin/task', {
            ...createForm,
            title: createForm.title.trim(),
            task_time: createForm.task_time || null,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateModalOpen(false);
                setNewTaskText('');
                setCreateForm({
                    title: '',
                    description: '',
                    category: 'General',
                    status: 'in_progress',
                    task_date: new Date().toISOString().slice(0, 10),
                    task_time: '',
                });
            },
            onFinish: () => setIsSubmittingTask(false),
        });
    };

    const openEditModal = (task: Task) => {
        setEditingTask(task);
        setEditForm({
            title: task.title || task.text,
            description: task.description || '',
            category: task.category || '',
            status: task.status || (task.completed ? 'completed' : 'in_progress'),
            task_date: task.task_date || new Date().toISOString().slice(0, 10),
            task_time: task.task_time || '',
        });
    };

    const handleUpdateTask = () => {
        if (!editingTask) return;
        setIsSubmittingTask(true);
        router.put(`/admin/task/${editingTask.id}`, {
            ...editForm,
            task_time: editForm.task_time || null,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setEditingTask(null);
            },
            onFinish: () => {
                setIsSubmittingTask(false);
            },
        });
    };

    const handleDeleteTask = (taskId: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus task ini?')) return;
        router.delete(`/admin/task/${taskId}`, {
            preserveScroll: true,
            onSuccess: () => {
                setEditingTask(null);
            },
        });
    };

    const toggleTask = (task: Task) => {
        const newStatus = task.completed ? 'in_progress' : 'completed';
        router.put(`/admin/task/${task.id}`, {
            title: task.title || task.text,
            description: task.description || '',
            status: newStatus,
            task_date: task.task_date || new Date().toISOString().slice(0, 10),
            category: task.category || 'General',
            task_time: task.task_time || null,
        }, {
            preserveScroll: true,
        });
    };

    const activeTasks = tasks.filter((t) => !t.completed);
    const completedTasks = tasks.filter((t) => t.completed);
    const totalTasksCount = tasks.length;

    const dynamicTaskCompletionRate = useMemo(() => {
        if (totalTasksCount === 0) return 0;
        return Math.round((completedTasks.length / totalTasksCount) * 100);
    }, [completedTasks.length, totalTasksCount]);

    const dynamicActiveTaskRate = useMemo(() => {
        if (totalTasksCount === 0) return 0;
        return Math.round((activeTasks.length / totalTasksCount) * 100);
    }, [activeTasks.length, totalTasksCount]);

    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

    const [showRowActionMenu, setShowRowActionMenu] = useState<number | null>(null);

    return (
        <>
            <Head title="Dashboard Overview" />

            <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#09090b] text-gray-800 dark:text-gray-200 font-sans p-4 sm:p-6 lg:p-8 space-y-6 print:min-h-0 print:p-0 print:m-0 print:space-y-4 print:bg-white print:text-black">

                {/* ===== PRINT-ONLY REPORT HEADER ===== */}
                <div className="hidden print:block border-b-2 border-gray-900 pb-3 mb-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-xl font-black uppercase tracking-tight text-gray-900">
                                UPTD Pengelolaan Kebudayaan Daerah Jawa Barat
                            </h1>
                            <p className="text-xs font-semibold text-gray-700 mt-0.5">
                                Laporan Overview Dashboard &amp; Monitoring Kinerja Platform
                            </p>
                        </div>
                        <div className="text-right text-[11px] text-gray-600 space-y-0.5">
                            <p><span className="font-bold">Periode:</span> {selectedMonthLabel || 'This Month'}</p>
                            <p><span className="font-bold">Waktu Cetak:</span> {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                </div>

                {/* ===== PAGE TITLE ROW ===== */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
                    <div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 font-medium mb-1">
                            <Home className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
                            <span>›</span>
                            <span className="text-gray-700 dark:text-gray-300 font-semibold">Dashboard</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Overview</h1>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">Monitor key metrics and manage your platform</p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        {/* Month Filter Dropdown */}
                        <div className="relative" ref={monthPickerRef}>
                            <button
                                type="button"
                                onClick={() => setIsMonthPickerOpen(!isMonthPickerOpen)}
                                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] px-3.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-2xs hover:bg-gray-50 dark:hover:bg-[#1c1c21] transition cursor-pointer"
                            >
                                <CalendarIcon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                                <span>{selectedMonthLabel || 'This Month'}</span>
                                <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${isMonthPickerOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isMonthPickerOpen && (
                                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl border border-gray-200/90 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-3.5 shadow-2xl z-50 animate-in fade-in-50 slide-in-from-top-2">
                                    {/* Quick Presets */}
                                    <div className="space-y-1 pb-2.5 mb-2.5 border-b border-gray-100 dark:border-[#1f1f23]">
                                        <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Pilihan Cepat</p>
                                        <div className="grid grid-cols-2 gap-1.5 mt-1">
                                            <button
                                                type="button"
                                                onClick={() => handleSelectMonth('this-month')}
                                                className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                                                    selectedMonth === nowMonthKey
                                                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1c1c21]'
                                                }`}
                                            >
                                                <span>This Month</span>
                                                {selectedMonth === nowMonthKey && <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleSelectMonth(lastMonthKey)}
                                                className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                                                    selectedMonth === lastMonthKey
                                                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1c1c21]'
                                                }`}
                                            >
                                                <span>Last Month</span>
                                                {selectedMonth === lastMonthKey && <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleSelectMonth('all')}
                                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer mt-1 ${
                                                selectedMonth === 'all'
                                                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1c1c21]'
                                            }`}
                                        >
                                            <span>Semua Waktu (All Time)</span>
                                            {selectedMonth === 'all' && <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                                        </button>
                                    </div>

                                    {/* Year Navigator */}
                                    <div className="flex items-center justify-between px-1 mb-2">
                                        <button
                                            type="button"
                                            onClick={() => setPickerYear((prev) => prev - 1)}
                                            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1c1c21] text-gray-500 hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                        <span className="text-xs font-bold text-gray-900 dark:text-white">{pickerYear}</span>
                                        <button
                                            type="button"
                                            onClick={() => setPickerYear((prev) => prev + 1)}
                                            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1c1c21] text-gray-500 hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {/* 12 Months Grid */}
                                    <div className="grid grid-cols-3 gap-1.5">
                                        {MONTH_LABELS.map((m, idx) => {
                                            const monthNum = String(idx + 1).padStart(2, '0');
                                            const monthKey = `${pickerYear}-${monthNum}`;
                                            const isSelected = selectedMonth === monthKey;
                                            const isCurrent = nowMonthKey === monthKey;
                                            const hasData = availableMonths.includes(monthKey);

                                            return (
                                                <button
                                                    key={monthKey}
                                                    type="button"
                                                    onClick={() => handleSelectMonth(monthKey)}
                                                    className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
                                                        isSelected
                                                            ? 'bg-blue-600 text-white font-extrabold shadow-sm shadow-blue-500/30'
                                                            : isCurrent
                                                            ? 'border border-blue-400/60 dark:border-blue-500/60 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40'
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1c1c21]'
                                                    }`}
                                                >
                                                    <span>{m}</span>
                                                    {hasData && (
                                                        <span className={`h-1 w-1 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-blue-500'}`} />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleExportPrint}
                            title="Cetak atau Simpan PDF seluruh Dashboard Overview dari atas ke bawah"
                            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] px-3.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-2xs hover:bg-gray-50 dark:hover:bg-[#1c1c21] transition cursor-pointer"
                        >
                            <Printer className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                {/* ===== 2-COLUMN MAIN DASHBOARD LAYOUT ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                    {/* LEFT COLUMN (2 Cols): HERO BANNER -> STAT CARDS -> QUICK TASKS & CALENDAR */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* HERO BANNER */}
                        <div className="relative overflow-hidden rounded-3xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] px-6 sm:px-7 pt-5 pb-5 text-gray-900 dark:text-white shadow-xs transition-colors">
                            {/* Soft sky-blue gradient background glow on the right */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white via-45% to-[#dbeafe]/70 dark:from-[#121215] dark:via-[#121215] dark:via-45% dark:to-[#1e293b]/50 pointer-events-none" />

                            <div className="relative z-10 space-y-0.5 mb-4">
                                <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight">Great to see you, Admin UPTD Kebudayaan</h2>
                                <p className="text-xs text-gray-400 dark:text-gray-400 font-medium">Ready to make today productive! 🚀</p>
                            </div>

                            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                {/* Digital Clock */}
                                <div className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white font-mono tabular-nums tracking-tight">
                                    {timeString}
                                </div>

                                {/* Weather Widget */}
                                <div
                                    className="flex flex-col items-end text-right cursor-pointer group"
                                    onClick={() => fetchWeather()}
                                    title="Klik untuk memperbarui cuaca Bandung terkini"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110">
                                            {weatherIcon}
                                        </span>
                                        <span className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight leading-none">
                                            {temperature !== null ? `${temperature}°C` : (isWeatherLoading ? '...' : '28°C')}
                                        </span>
                                    </div>
                                    <div className="text-[11px] text-gray-400 dark:text-gray-400 font-medium mt-1">
                                        {weatherStatus}
                                    </div>
                                    <div className="text-[11px] text-gray-400 dark:text-gray-400 font-medium">
                                        Bandung
                                    </div>
                                    <div className="text-[10px] text-gray-400 dark:text-gray-400 mt-0.5">{dateString}</div>
                                </div>
                            </div>
                        </div>

                        {/* 4 STAT CARDS ROW */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 print:grid-cols-4 print:gap-2.5">
                            {/* Card 1: Total Ruangan */}
                            <div className="rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] px-3.5 py-3 shadow-xs hover:shadow-sm transition">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                                            <Building2 className="h-3.5 w-3.5" />
                                        </div>
                                        <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Total Ruangan</p>
                                    </div>
                                    <button className="text-gray-300 dark:text-gray-600 hover:text-gray-500"><MoreHorizontal className="h-3.5 w-3.5" /></button>
                                </div>
                                <div className="flex items-end justify-between">
                                    <p className="text-xl font-extrabold text-gray-900 dark:text-white">{totalRooms}</p>
                                </div>
                            </div>

                            {/* Card 2: Artikel Published */}
                            <div className="rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] px-3.5 py-3 shadow-xs hover:shadow-sm transition">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                                            <FileText className="h-3.5 w-3.5" />
                                        </div>
                                        <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Artikel Published</p>
                                    </div>
                                    <button className="text-gray-300 dark:text-gray-600 hover:text-gray-500"><MoreHorizontal className="h-3.5 w-3.5" /></button>
                                </div>
                                <div>
                                    <p className="text-xl font-extrabold text-gray-900 dark:text-white">{totalArtikels}</p>
                                </div>
                            </div>

                            {/* Card 3: Berita Published */}
                            <div className="rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] px-3.5 py-3 shadow-xs hover:shadow-sm transition">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                                            <Newspaper className="h-3.5 w-3.5" />
                                        </div>
                                        <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Berita Published</p>
                                    </div>
                                    <button className="text-gray-300 dark:text-gray-600 hover:text-gray-500"><MoreHorizontal className="h-3.5 w-3.5" /></button>
                                </div>
                                <div>
                                    <p className="text-xl font-extrabold text-gray-900 dark:text-white">{totalBeritas}</p>
                                </div>
                            </div>

                            {/* Card 4: Task Completion */}
                            <div className="rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] px-3.5 py-3 shadow-xs hover:shadow-sm transition">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                        </div>
                                        <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Task Completion</p>
                                    </div>
                                    <button className="text-gray-300 dark:text-gray-600 hover:text-gray-500"><MoreHorizontal className="h-3.5 w-3.5" /></button>
                                </div>
                                <div>
                                    <p className="text-xl font-extrabold text-gray-900 dark:text-white">{dynamicTaskCompletionRate}%</p>
                                </div>
                            </div>
                        </div>

                        {/* QUICK TASKS & CALENDAR ROW */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3">
                            {/* QUICK TASKS */}
                            <div className="rounded-3xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-6 shadow-sm space-y-5 flex flex-col justify-between print:p-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white print:text-base">Quick Tasks</h3>
                                        <div className="flex items-center rounded-xl bg-gray-100 dark:bg-[#1c1c21] p-1 gap-1 print:hidden">
                                            <button
                                                onClick={() => setTaskFilter('active')}
                                                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${taskFilter === 'active'
                                                    ? 'bg-white dark:bg-[#282830] text-gray-900 dark:text-white shadow-sm'
                                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                                    }`}
                                            >
                                                Active ({activeTasks.length})
                                            </button>
                                            <button
                                                onClick={() => setTaskFilter('completed')}
                                                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${taskFilter === 'completed'
                                                    ? 'bg-white dark:bg-[#282830] text-gray-900 dark:text-white shadow-sm'
                                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                                    }`}
                                            >
                                                Completed ({completedTasks.length})
                                            </button>
                                        </div>
                                    </div>

                                    {/* Add Task Input Form */}
                                    <form onSubmit={openCreateModal} className="flex gap-2 print:hidden">
                                        <input
                                            type="text"
                                            value={newTaskText}
                                            onChange={(e) => setNewTaskText(e.target.value)}
                                            placeholder="Add a quick task..."
                                            className="flex-1 rounded-xl border border-gray-200 dark:border-[#2a2a32] bg-[#f8fafc] dark:bg-[#1c1c21] px-3.5 py-2 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#121215] focus:border-blue-500 focus:outline-none"
                                        />
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center rounded-xl bg-gray-900 dark:bg-blue-600 px-3.5 py-2 text-white hover:bg-gray-800 dark:hover:bg-blue-500 transition"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </form>
                                </div>

                                {/* Empty State / Task List */}
                                <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
                                    {(taskFilter === 'active' ? activeTasks : completedTasks).length === 0 ? (
                                        <>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 dark:bg-[#1c1c21] text-gray-400 dark:text-gray-500">
                                                <Inbox className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                                    {taskFilter === 'active' ? 'No active tasks' : 'No completed tasks'}
                                                </p>
                                                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                                                    {taskFilter === 'active' ? 'Create a task to get started' : 'Completed tasks will appear here'}
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full space-y-2">
                                            {(taskFilter === 'active' ? activeTasks : completedTasks).map((t) => (
                                                <div
                                                    key={t.id}
                                                    onClick={() => openEditModal(t)}
                                                    className={`flex items-center rounded-xl border p-3 cursor-pointer text-left transition ${t.completed
                                                        ? 'bg-gray-100/60 dark:bg-[#1a1a20]/40 border-gray-200 dark:border-[#2a2a32] text-gray-400 line-through'
                                                        : 'bg-gray-100/80 dark:bg-[#1a1a20] border-gray-200/90 dark:border-[#282830] text-gray-800 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-[#22222a] hover:border-gray-300 dark:hover:border-[#383842]'
                                                        }`}
                                                >
                                                    <span className="text-xs font-medium flex-1 truncate">{t.title || t.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CALENDAR */}
                            <div className="rounded-3xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-6 shadow-sm space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Calendar</h3>
                                        <p className="text-[11px] text-gray-400 dark:text-gray-400 mt-0.5">
                                            {calendarDate.getMonth() === new Date().getMonth() && calendarDate.getFullYear() === new Date().getFullYear()
                                                ? new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
                                                : calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 print:hidden">
                                        <button
                                            type="button"
                                            onClick={handlePrevMonth}
                                            title="Previous month"
                                            className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#1c1c21] text-gray-500 dark:text-gray-400 transition cursor-pointer"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleNextMonth}
                                            title="Next month"
                                            className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#1c1c21] text-gray-500 dark:text-gray-400 transition cursor-pointer"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Calendar Month Grid */}
                                <div>
                                    <div className="grid grid-cols-7 text-center text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-2">
                                        <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                                        {calendarDays.map((item) => {
                                            if (item.isToday) {
                                                return (
                                                    <div
                                                        key={item.dateKey}
                                                        className="flex items-center justify-center py-1.5 rounded-lg bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30"
                                                    >
                                                        {item.day}
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div
                                                    key={item.dateKey}
                                                    className={`flex items-center justify-center py-1.5 font-medium rounded-lg transition ${item.isCurrentMonth
                                                        ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1c1c21]'
                                                        : 'text-gray-300 dark:text-gray-600'
                                                        }`}
                                                >
                                                    {item.day}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (1 Col): INSIGHTS CARD & REVENUE ANALYTICS */}
                    <div className="space-y-4">
                        {/* INSIGHTS / PERFORMANCE ANALYTICS CARD */}
                        <div className="rounded-3xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-4 shadow-xs flex flex-col justify-between space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Insights</h3>
                                    <p className="text-xs text-gray-400 mt-0.5">Performance analytics</p>
                                </div>
                                <div className="flex items-center gap-1 bg-gray-100/80 dark:bg-[#1c1c21] p-1 rounded-full text-xs font-semibold">
                                    <div className="flex items-center gap-1.5 rounded-full bg-white dark:bg-[#282830] px-3 py-1 text-gray-900 dark:text-white shadow-2xs">
                                        <TrendingUp className="h-3.5 w-3.5 text-gray-700 dark:text-gray-200" />
                                        <span>Performance</span>
                                    </div>
                                </div>
                            </div>

                            {/* Double Ring Circular Radial Chart */}
                            <div className="relative flex flex-col items-center justify-center my-2">
                                <svg className="h-40 w-40 transform -rotate-90" viewBox="0 0 100 100">
                                    {/* Background Tracks */}
                                    <circle cx="50" cy="50" r="38" stroke="#f1f5f9" className="dark:stroke-[#1f1f23]" strokeWidth="6" fill="transparent" />
                                    <circle cx="50" cy="50" r="28" stroke="#f1f5f9" className="dark:stroke-[#1f1f23]" strokeWidth="6" fill="transparent" />

                                    {/* Outer Blue Ring (Task Completion %) */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="38"
                                        stroke="#60a5fa"
                                        strokeWidth="6"
                                        strokeDasharray="238.76"
                                        strokeDashoffset={238.76 - (238.76 * dynamicTaskCompletionRate) / 100}
                                        strokeLinecap="round"
                                        fill="transparent"
                                        className="transition-all duration-500 ease-out"
                                    />
                                    {/* Inner Green Ring (Active / In Progress Tasks %) */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="28"
                                        stroke="#4ade80"
                                        strokeWidth="6"
                                        strokeDasharray="175.93"
                                        strokeDashoffset={175.93 - (175.93 * dynamicActiveTaskRate) / 100}
                                        strokeLinecap="round"
                                        fill="transparent"
                                        className="transition-all duration-500 ease-out"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center text-center">
                                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{dynamicTaskCompletionRate}%</span>
                                </div>
                            </div>

                            {/* Detailed Legend List */}
                            <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-[#1f1f23] text-xs">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-500">
                                            <TrendingUp className="h-3.5 w-3.5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800 dark:text-gray-200">Task Completion</div>
                                            <div className="text-[10px] text-gray-400">
                                                {totalTasksCount > 0 ? `Selesai (${completedTasks.length} dari ${totalTasksCount} task)` : 'Overall completion rate'}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="font-bold text-blue-500">{dynamicTaskCompletionRate}%</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500">
                                            <Users className="h-3.5 w-3.5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800 dark:text-gray-200">Task In Progress</div>
                                            <div className="text-[10px] text-gray-400">
                                                {totalTasksCount > 0 ? `Sedang berjalan (${activeTasks.length} dari ${totalTasksCount} task)` : 'Active task participation'}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="font-bold text-emerald-500">{dynamicActiveTaskRate}%</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1c1c21] text-gray-400">
                                            <Clock className="h-3.5 w-3.5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800 dark:text-gray-200">Response Time</div>
                                            <div className="text-[10px] text-gray-400">Average response efficiency</div>
                                        </div>
                                    </div>
                                    <span className="font-bold text-gray-400">78%</span>
                                </div>
                            </div>
                        </div>

                        {/* REVENUE & TASK ANALYTICS */}
                        <div className="rounded-3xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-6 shadow-sm space-y-4 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue &amp; Task Analytics</h3>
                                        <p className="text-xs text-gray-400 mt-0.5">Project completion tracking</p>
                                    </div>
                                    <span className="text-[11px] font-semibold text-gray-400">This Quarter</span>
                                </div>

                                {/* Dynamic Visual Bars for Quarter / Months */}
                                <div className="pt-8 pb-4 flex items-end justify-around border-b border-gray-100 dark:border-[#1f1f23] h-32">
                                    <div className="flex flex-col items-center gap-2 h-full justify-end group">
                                        <div className="w-8 bg-blue-100 dark:bg-blue-950/40 rounded-t-lg transition-all duration-500 relative flex items-end justify-center" style={{ height: '35%' }}>
                                            <div className="w-full bg-blue-400/40 rounded-t-lg" style={{ height: '50%' }} />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400">OCT</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 h-full justify-end group">
                                        <div className="w-8 bg-blue-100 dark:bg-blue-950/40 rounded-t-lg transition-all duration-500 relative flex items-end justify-center" style={{ height: '55%' }}>
                                            <div className="w-full bg-blue-400/60 rounded-t-lg" style={{ height: '70%' }} />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400">NOV</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 h-full justify-end group">
                                        <div 
                                            className="w-8 bg-blue-500/20 dark:bg-blue-600/30 rounded-t-lg transition-all duration-500 relative flex items-end justify-center overflow-hidden" 
                                            style={{ height: `${Math.max(25, Math.min(100, (completedTasks.length + 1) * 25))}%` }}
                                        >
                                            <div 
                                                className="w-full bg-blue-600 dark:bg-blue-500 rounded-t-lg transition-all duration-500" 
                                                style={{ height: `${totalTasksCount > 0 ? Math.max(10, (completedTasks.length / totalTasksCount) * 100) : 0}%` }} 
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-900 dark:text-white">DEC</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className="pt-2">
                                <div>
                                    <p className="text-[11px] font-medium text-gray-400">Total Project Selesai</p>
                                    <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-0.5">
                                        {completedTasks.length} <span className="text-xs font-semibold text-gray-400">/ {totalTasksCount} task</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== RECENT ACTIVITIES (BOTTOM CARD TABLE MATCHING SIDEBAR MODULES) ===== */}
                <div className="rounded-3xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-6 shadow-sm space-y-5">
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activities</h3>
                            <p className="text-xs text-gray-400 dark:text-gray-400 mt-0.5">Overview aktivitas pada {selectedMonthLabel || 'This Month'}</p>
                        </div>
                        <button
                            onClick={() => {
                                const items = recentActivities?.data || [];
                                if (items.length === 0) return;
                                const headers = ['ID', 'User', 'Module', 'Action', 'Title', 'Description', 'Status', 'Date'];
                                const rows = items.map(item => [
                                    item.id,
                                    `"${item.userName.replace(/"/g, '""')}"`,
                                    `"${item.module.replace(/"/g, '""')}"`,
                                    `"${item.action.replace(/"/g, '""')}"`,
                                    `"${item.title.replace(/"/g, '""')}"`,
                                    `"${item.description.replace(/"/g, '""')}"`,
                                    `"${item.status.replace(/"/g, '""')}"`,
                                    `"${item.lastUpdated}"`
                                ]);
                                const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
                                const encodedUri = encodeURI(csvContent);
                                const link = document.createElement('a');
                                link.setAttribute('href', encodedUri);
                                link.setAttribute('download', `recent_activities_${new Date().toISOString().slice(0, 10)}.csv`);
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#1c1c21] px-3.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-2xs hover:bg-gray-50 dark:hover:bg-[#25252c] transition self-start sm:self-auto cursor-pointer print:hidden"
                        >
                            <Download className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                            <span>Export</span>
                        </button>
                    </div>

                    {/* Projects / Activities Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-[#1f1f23] text-gray-500 dark:text-gray-400 font-bold">
                                    <th className="pb-3 pl-2 font-bold text-xs">Name</th>
                                    <th className="pb-3 font-bold text-xs">Status</th>
                                    <th className="pb-3 font-bold text-xs">Last Updated</th>
                                    <th className="pb-3 pr-2 text-right font-bold text-xs print:hidden">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-[#1f1f23]">
                                {recentActivities && recentActivities.data && recentActivities.data.length > 0 ? (
                                    recentActivities.data.map((activity) => {
                                        const getModuleIcon = (mod: string) => {
                                            switch (mod) {
                                                case 'Ruangan':
                                                    return (
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
                                                            <DoorClosed className="h-4 w-4" />
                                                        </div>
                                                    );
                                                case 'Fasilitas':
                                                    return (
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                                                            <Building2 className="h-4 w-4" />
                                                        </div>
                                                    );
                                                case 'Artikel':
                                                    return (
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 shrink-0">
                                                            <FileText className="h-4 w-4" />
                                                        </div>
                                                    );
                                                case 'Berita':
                                                    return (
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                                                            <Newspaper className="h-4 w-4" />
                                                        </div>
                                                    );
                                                case 'Task':
                                                    return (
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                                                            <CheckCircle2 className="h-4 w-4" />
                                                        </div>
                                                    );
                                                case 'Roles':
                                                    return (
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 shrink-0">
                                                            <Users className="h-4 w-4" />
                                                        </div>
                                                    );
                                                default:
                                                    return (
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 shrink-0">
                                                            <FolderKanban className="h-4 w-4" />
                                                        </div>
                                                    );
                                            }
                                        };

                                        const getStatusBadge = (st: string) => {
                                            switch (st) {
                                                case 'Ready':
                                                case 'Completed':
                                                case 'Online':
                                                    return (
                                                        <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/60">
                                                            {st}
                                                        </span>
                                                    );
                                                case 'In Progress':
                                                case 'Draft':
                                                    return (
                                                        <span className="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-950/60 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/60">
                                                            {st}
                                                        </span>
                                                    );
                                                case 'Blocked':
                                                case 'Deleted':
                                                case 'Offline':
                                                    return (
                                                        <span className="inline-flex items-center rounded-full bg-rose-50 dark:bg-rose-950/60 px-3 py-1 text-xs font-bold text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/60">
                                                            {st}
                                                        </span>
                                                    );
                                                default:
                                                    return (
                                                        <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                                            {st}
                                                        </span>
                                                    );
                                            }
                                        };

                                        return (
                                            <tr key={activity.id} className="hover:bg-gray-50/60 dark:hover:bg-[#1c1c21]/50 transition">
                                                <td className="py-4 pl-2">
                                                    <div className="flex items-center gap-3">
                                                        {getModuleIcon(activity.module)}
                                                        <div>
                                                            <p className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">
                                                                {activity.title}
                                                            </p>
                                                            <p className="text-[11px] text-gray-400 dark:text-gray-400 mt-0.5 line-clamp-1">
                                                                {activity.description || `${activity.action} by ${activity.userName}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    {getStatusBadge(activity.status)}
                                                </td>
                                                <td className="py-4 text-gray-600 dark:text-gray-300 font-medium">
                                                    <div>{activity.lastUpdated}</div>
                                                    <div className="text-[10px] text-gray-400 font-normal">{activity.created_at_human}</div>
                                                </td>
                                                <td className="py-4 pr-2 text-right relative print:hidden">
                                                    <button
                                                        onClick={() => setShowRowActionMenu(showRowActionMenu === activity.id ? null : activity.id)}
                                                        className={`flex h-8 w-8 items-center justify-center rounded-full transition ml-auto ${showRowActionMenu === activity.id
                                                            ? 'bg-gray-100 dark:bg-[#282830] text-gray-900 dark:text-white'
                                                            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1c1c21]'
                                                            }`}
                                                    >
                                                        <MoreVertical className="h-4 w-4" />
                                                    </button>

                                                    {showRowActionMenu === activity.id && (
                                                        <div className="absolute right-0 mt-1 w-36 rounded-2xl border border-gray-200/80 dark:border-[#2a2a32] bg-white dark:bg-[#1c1c21] p-1.5 shadow-xl z-20 text-left animate-in fade-in-50 slide-in-from-top-1">
                                                            {activity.link && activity.link !== '#' ? (
                                                                <Link
                                                                    href={activity.link}
                                                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#282830] transition"
                                                                >
                                                                    <Eye className="h-3.5 w-3.5 text-gray-500" />
                                                                    <span>View Details</span>
                                                                </Link>
                                                            ) : (
                                                                <button
                                                                    onClick={() => alert(`Title: ${activity.title}\nDescription: ${activity.description}\nUser: ${activity.userName}`)}
                                                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#282830] transition"
                                                                >
                                                                    <Eye className="h-3.5 w-3.5 text-gray-500" />
                                                                    <span>View Details</span>
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => {
                                                                    if (confirm('Apakah Anda yakin ingin menghapus log aktivitas ini?')) {
                                                                        router.delete(`/admin/activity-logs/${activity.id}`, {
                                                                            preserveScroll: true,
                                                                            onSuccess: () => setShowRowActionMenu(null),
                                                                        });
                                                                    }
                                                                }}
                                                                className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                                                            >
                                                                <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-gray-400">
                                            Belum ada aktivitas tercatat.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer Pagination */}
                    {recentActivities && recentActivities.total > 0 && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-gray-100 dark:border-[#1f1f23] text-xs print:hidden">
                            <p className="text-gray-500 dark:text-gray-400 font-medium">
                                Showing {recentActivities.from} to {recentActivities.to} of {recentActivities.total} results
                            </p>

                            <div className="flex items-center gap-1.5">
                                <button
                                    disabled={recentActivities.currentPage === 1}
                                    onClick={() => router.get(dashboard(), { page: recentActivities.currentPage - 1 }, { preserveState: true, preserveScroll: true })}
                                    className="rounded-full px-3 py-1 font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1c1c21] disabled:opacity-40 disabled:hover:bg-transparent transition cursor-pointer"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: recentActivities.lastPage }, (_, i) => i + 1).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => router.get(dashboard(), { page: p }, { preserveState: true, preserveScroll: true })}
                                        className={`flex h-7 w-7 items-center justify-center rounded-full font-semibold transition cursor-pointer ${p === recentActivities.currentPage
                                            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold shadow-xs'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1c1c21]'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    disabled={recentActivities.currentPage === recentActivities.lastPage}
                                    onClick={() => router.get(dashboard(), { page: recentActivities.currentPage + 1 }, { preserveState: true, preserveScroll: true })}
                                    className="rounded-full px-3 py-1 font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1c1c21] disabled:opacity-40 disabled:hover:bg-transparent transition cursor-pointer"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ===== PRINT-ONLY REPORT FOOTER ===== */}
                <div className="hidden print:flex items-center justify-between pt-4 mt-6 border-t border-gray-300 text-[10px] text-gray-500">
                    <p>Creative Culture — UPTD Pengelolaan Kebudayaan Daerah Jawa Barat</p>
                    <p>Laporan Resmi Dashboard Overview &amp; Monitoring Kinerja Platform</p>
                </div>
            </div>

            {/* CREATE TASK MODAL */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setIsCreateModalOpen(false)}>
                    <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#16161a] border border-gray-200 dark:border-[#25252d] shadow-2xl p-6 space-y-5" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Buat Task Baru</h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Judul *</label>
                                <input
                                    type="text"
                                    value={createForm.title}
                                    onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                                    placeholder="Nama kegiatan / tugas"
                                    className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-300 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Deskripsi</label>
                                <textarea
                                    value={createForm.description}
                                    onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                                    placeholder="Detail kegiatan (opsional)"
                                    rows={3}
                                    className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-300 transition resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Tanggal *</label>
                                    <input
                                        type="date"
                                        value={createForm.task_date}
                                        onChange={(e) => setCreateForm({ ...createForm, task_date: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-300 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Waktu</label>
                                    <input
                                        type="time"
                                        value={createForm.task_time}
                                        onChange={(e) => setCreateForm({ ...createForm, task_time: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-300 transition"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Kategori</label>
                                    <input
                                        type="text"
                                        value={createForm.category}
                                        onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
                                        placeholder="cth: Kebudayaan"
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-300 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                                    <select
                                        value={createForm.status}
                                        onChange={(e) => setCreateForm({ ...createForm, status: e.target.value as 'in_progress' | 'completed' })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-300 transition"
                                    >
                                        <option value="in_progress">Sedang Berjalan</option>
                                        <option value="completed">Selesai</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2.5 pt-2">
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="rounded-full border border-gray-200 dark:border-[#25252d] px-5 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f24] transition cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleCreateTask}
                                disabled={isSubmittingTask}
                                className="rounded-full bg-[#18181b] dark:bg-white px-6 py-2.5 text-xs font-bold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition shadow-xs cursor-pointer disabled:opacity-50"
                            >
                                {isSubmittingTask ? 'Menyimpan...' : 'Simpan Task'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT TASK MODAL */}
            {editingTask && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setEditingTask(null)}>
                    <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#16161a] border border-gray-200 dark:border-[#25252d] shadow-2xl p-6 space-y-5" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Task</h3>
                            <button onClick={() => setEditingTask(null)} className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Judul *</label>
                                <input
                                    type="text"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    placeholder="Nama kegiatan / tugas"
                                    className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-300 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Deskripsi</label>
                                <textarea
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    placeholder="Detail kegiatan (opsional)"
                                    rows={3}
                                    className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-300 transition resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Tanggal *</label>
                                    <input
                                        type="date"
                                        value={editForm.task_date}
                                        onChange={(e) => setEditForm({ ...editForm, task_date: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-300 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Waktu</label>
                                    <input
                                        type="time"
                                        value={editForm.task_time}
                                        onChange={(e) => setEditForm({ ...editForm, task_time: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-300 transition"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Kategori</label>
                                    <input
                                        type="text"
                                        value={editForm.category}
                                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                        placeholder="cth: Kebudayaan"
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-300 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                                    <select
                                        value={editForm.status}
                                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value as 'in_progress' | 'completed' })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-300 transition"
                                    >
                                        <option value="in_progress">Sedang Berjalan</option>
                                        <option value="completed">Selesai</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <button
                                onClick={() => handleDeleteTask(editingTask.id)}
                                className="rounded-full border border-red-200 dark:border-red-900/40 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition cursor-pointer"
                            >
                                Hapus
                            </button>
                            <div className="flex items-center gap-2.5">
                                <button
                                    onClick={() => setEditingTask(null)}
                                    className="rounded-full border border-gray-200 dark:border-[#25252d] px-5 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f24] transition cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleUpdateTask}
                                    disabled={isSubmittingTask}
                                    className="rounded-full bg-[#18181b] dark:bg-white px-6 py-2.5 text-xs font-bold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition shadow-xs cursor-pointer disabled:opacity-50"
                                >
                                    {isSubmittingTask ? 'Menyimpan...' : 'Simpan Task'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
