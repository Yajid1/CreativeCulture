import { Head, router } from '@inertiajs/react';
import { useState, useMemo, useCallback } from 'react';
import {
    Check,
    CheckSquare,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Plus,
    RotateCcw,
    Search,
    X,
} from 'lucide-react';

interface Task {
    id: number;
    title: string;
    description: string;
    category: string;
    status: 'in_progress' | 'completed';
    task_date: string;
    task_time: string | null;
    created_at: string;
}

interface Props {
    tasks: Task[];
    stats: {
        total: number;
        in_progress: number;
        completed: number;
    };
}

export default function TaskAdmin({ tasks, stats }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [nameQuery, setNameQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    // Calendar navigation state
    const [calendarDate, setCalendarDate] = useState(() => new Date());

    // Modal states
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Create form state
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: '',
        status: 'in_progress' as 'in_progress' | 'completed',
        task_date: '',
        task_time: '',
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleReset = () => {
        setSearchQuery('');
        setNameQuery('');
        setStatusFilter('');
        setCategoryFilter('');
    };

    // Calendar helpers
    const calendarYear = calendarDate.getFullYear();
    const calendarMonth = calendarDate.getMonth();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const calendarGrid = useMemo(() => {
        const firstDay = new Date(calendarYear, calendarMonth, 1).getDay(); // 0=Sun
        const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(calendarYear, calendarMonth, 0).getDate();

        const weeks: { days: { dayNum: number; isCurrentMonth: boolean }[] }[] = [];
        let currentWeek: { dayNum: number; isCurrentMonth: boolean }[] = [];

        // Fill leading days from previous month
        for (let i = firstDay - 1; i >= 0; i--) {
            currentWeek.push({ dayNum: daysInPrevMonth - i, isCurrentMonth: false });
        }

        // Fill current month days
        for (let d = 1; d <= daysInMonth; d++) {
            currentWeek.push({ dayNum: d, isCurrentMonth: true });
            if (currentWeek.length === 7) {
                weeks.push({ days: [...currentWeek] });
                currentWeek = [];
            }
        }

        // Fill trailing days from next month
        if (currentWeek.length > 0) {
            let nextDay = 1;
            while (currentWeek.length < 7) {
                currentWeek.push({ dayNum: nextDay++, isCurrentMonth: false });
            }
            weeks.push({ days: currentWeek });
        }

        return weeks;
    }, [calendarYear, calendarMonth]);

    const getEventsForDay = useCallback((dayNum: number, isCurrentMonth: boolean) => {
        if (!isCurrentMonth) return [];
        const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
        return tasks.filter((t) => t.task_date === dateStr);
    }, [tasks, calendarYear, calendarMonth]);

    const goToPrevMonth = () => setCalendarDate(new Date(calendarYear, calendarMonth - 1, 1));
    const goToNextMonth = () => setCalendarDate(new Date(calendarYear, calendarMonth + 1, 1));
    const goToToday = () => setCalendarDate(new Date());

    const todayDate = new Date();
    const isToday = (dayNum: number, isCurrentMonth: boolean) =>
        isCurrentMonth &&
        dayNum === todayDate.getDate() &&
        calendarMonth === todayDate.getMonth() &&
        calendarYear === todayDate.getFullYear();

    // Format time for display
    const formatTime = (time: string | null) => {
        if (!time) return '';
        const [h, m] = time.split(':');
        const hour = parseInt(h, 10);
        const ampm = hour >= 12 ? 'p' : 'a';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${m}${ampm}`;
    };

    // Create task handler
    const handleCreateTask = () => {
        setIsSubmitting(true);
        setFormErrors({});

        router.post('/admin/task', {
            ...form,
            task_time: form.task_time || null,
        }, {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                setForm({ title: '', description: '', category: '', status: 'in_progress', task_date: '', task_time: '' });
            },
            onError: (errors) => {
                setFormErrors(errors);
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    // Delete task handler
    const handleDeleteTask = (taskId: number) => {
        if (!confirm('Yakin ingin menghapus task ini?')) return;
        router.delete(`/admin/task/${taskId}`);
    };

    // Toggle status handler
    const handleToggleStatus = (task: Task) => {
        router.put(`/admin/task/${task.id}`, {
            ...task,
            status: task.status === 'completed' ? 'in_progress' : 'completed',
            task_time: task.task_time || null,
        });
    };

    return (
        <>
            <Head title="Task & Calendar — Admin UPTD Kebudayaan" />

            <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#09090b] text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 space-y-6 pb-16 font-sans">
                {/* 1. TITLE HEADER & CREATE BUTTON */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                            Task & Calendar
                        </h1>
                        <p className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-400 mt-1">
                            Kelola daftar tugas, agenda kegiatan, dan penjadwalan UPTD Kebudayaan
                        </p>
                    </div>

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-full bg-[#18181b] dark:bg-white px-5 py-2.5 text-xs font-bold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition self-start sm:self-auto cursor-pointer"
                    >
                        <Plus className="h-4 w-4 stroke-[3]" />
                        <span>Buat Task</span>
                    </button>
                </div>

                {/* 2. STAT CARDS ROW */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Card 1: Total Task */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs transition hover:shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-[#1c1c21] text-gray-600 dark:text-gray-300">
                                <CheckSquare className="h-4.5 w-4.5" />
                            </div>
                            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 tracking-tighter">:::</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Task</p>
                            <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">{stats.total}</h3>
                        </div>
                        <CheckSquare className="absolute -right-3 -bottom-3 h-20 w-20 text-gray-100/60 dark:text-gray-800/10 pointer-events-none stroke-[1]" />
                    </div>

                    {/* Card 2: In Progress */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs transition hover:shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                                <Loader2 className="h-4.5 w-4.5" />
                            </div>
                            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 tracking-tighter">:::</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Sedang Berjalan</p>
                            <h3 className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">{stats.in_progress}</h3>
                        </div>
                        <Loader2 className="absolute -right-3 -bottom-3 h-20 w-20 text-emerald-100/60 dark:text-emerald-800/10 pointer-events-none stroke-[1]" />
                    </div>

                    {/* Card 3: Completed */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs transition hover:shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                                <Check className="h-4.5 w-4.5" />
                            </div>
                            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 tracking-tighter">:::</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Selesai</p>
                            <h3 className="mt-1 text-2xl font-black text-blue-600 dark:text-blue-400">{stats.completed}</h3>
                        </div>
                        <Check className="absolute -right-3 -bottom-3 h-20 w-20 text-blue-100/60 dark:text-blue-800/10 pointer-events-none stroke-[1]" />
                    </div>
                </div>

                {/* 3. FILTER / SEARCH BOX SECTION */}
                <div className="rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">Search</label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari task..."
                                className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#121215] focus:ring-2 focus:ring-gray-300 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">Judul</label>
                            <input
                                type="text"
                                value={nameQuery}
                                onChange={(e) => setNameQuery(e.target.value)}
                                placeholder="Cari judul task"
                                className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#121215] focus:ring-2 focus:ring-gray-300 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">Filter Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-600 dark:text-gray-300 focus:bg-white dark:focus:bg-[#121215] focus:ring-2 focus:ring-gray-300 transition"
                            >
                                <option value="">Semua status</option>
                                <option value="in_progress">Sedang Berjalan</option>
                                <option value="completed">Selesai</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">Filter Kategori</label>
                            <input
                                type="text"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                placeholder="Filter kategori"
                                className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#121215] focus:ring-2 focus:ring-gray-300 transition"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2.5 pt-3">
                        <button className="inline-flex items-center gap-2 rounded-full bg-[#18181b] dark:bg-white px-5 py-2 text-xs font-bold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition shadow-xs cursor-pointer">
                            <Search className="h-3.5 w-3.5 stroke-[2.5]" />
                            <span>Filter</span>
                        </button>
                        <button
                            onClick={handleReset}
                            className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#16161a] px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f24] transition cursor-pointer"
                        >
                            <RotateCcw className="h-3.5 w-3.5" />
                            <span>Reset</span>
                        </button>
                    </div>
                </div>

                {/* 4. FULL MONTHLY CALENDAR GRID */}
                <div className="rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] overflow-hidden shadow-xs">
                    {/* Calendar Top Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-[#1c1c21]">
                        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-gray-600 dark:text-gray-200">
                            {monthNames[calendarMonth]} {calendarYear}
                        </h2>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={goToPrevMonth}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a20] transition cursor-pointer"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                onClick={goToToday}
                                className="px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1a20] rounded-lg transition cursor-pointer"
                            >
                                Today
                            </button>
                            <button
                                onClick={goToNextMonth}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a20] transition cursor-pointer"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Calendar Table Container */}
                    <div className="overflow-x-auto">
                        <div className="min-w-[800px]">
                            {/* Days Header */}
                            <div className="grid grid-cols-7 border-b border-gray-100 dark:border-[#1c1c21] bg-gray-50/50 dark:bg-[#16161b] text-xs font-semibold text-gray-500 dark:text-gray-400 py-3">
                                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
                                    <div key={d} className="px-3">{d}</div>
                                ))}
                            </div>

                            {/* Weeks & Days Grid */}
                            <div className="divide-y divide-gray-100 dark:divide-[#1c1c21]">
                                {calendarGrid.map((week, weekIdx) => (
                                    <div key={weekIdx} className="grid grid-cols-7 min-h-[120px] bg-white dark:bg-[#121215]">
                                        {week.days.map((dayCell, dayIdx) => {
                                            const dayEvents = getEventsForDay(dayCell.dayNum, dayCell.isCurrentMonth);
                                            const isTodayCell = isToday(dayCell.dayNum, dayCell.isCurrentMonth);

                                            return (
                                                <div
                                                    key={dayIdx}
                                                    className={`border-r border-gray-100 dark:border-[#1c1c21] p-2 flex flex-col justify-start transition hover:bg-gray-50/40 dark:hover:bg-[#18181f] ${
                                                        !dayCell.isCurrentMonth ? 'bg-gray-50/30 dark:bg-[#0f0f13] text-gray-300 dark:text-gray-700' : ''
                                                    }`}
                                                >
                                                    {/* Day Number */}
                                                    <div className={`text-xs font-semibold mb-1.5 px-1 ${
                                                        isTodayCell
                                                            ? 'text-white bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center'
                                                            : 'text-gray-500 dark:text-gray-400'
                                                    }`}>
                                                        {dayCell.dayNum}
                                                    </div>

                                                    {/* Event Badges */}
                                                    <div className="space-y-1.5 flex-1">
                                                        {dayEvents.map((ev) => {
                                                            const colorClass = ev.status === 'completed'
                                                                ? 'bg-blue-500 text-white'
                                                                : 'bg-emerald-500 text-white';

                                                            return (
                                                                <button
                                                                    key={ev.id}
                                                                    onClick={() => setSelectedTask(ev)}
                                                                    className={`w-full text-left rounded-full px-2.5 py-1 text-[11px] font-semibold leading-tight flex items-center gap-1.5 shadow-2xs transition hover:brightness-110 cursor-pointer truncate ${colorClass}`}
                                                                >
                                                                    {ev.task_time && (
                                                                        <span className="font-mono text-[10px] opacity-90 shrink-0">
                                                                            {formatTime(ev.task_time)}
                                                                        </span>
                                                                    )}
                                                                    <span className="truncate">{ev.title}</span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Status Legend */}
                    <div className="flex items-center gap-6 px-6 py-3 border-t border-gray-100 dark:border-[#1c1c21] bg-gray-50/50 dark:bg-[#16161b]">
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-emerald-500" />
                            <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">Sedang Berjalan</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-blue-500" />
                            <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">Selesai</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* DETAIL MODAL */}
            {selectedTask && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setSelectedTask(null)}>
                    <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#16161a] border border-gray-200 dark:border-[#25252d] shadow-2xl p-6 space-y-5" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-start justify-between">
                            <div>
                                <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                    selectedTask.status === 'completed'
                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                                }`}>
                                    {selectedTask.status === 'completed' ? 'Selesai' : 'Sedang Berjalan'}
                                </span>
                            </div>
                            <button onClick={() => setSelectedTask(null)} className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedTask.title}</h3>

                        {selectedTask.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{selectedTask.description}</p>
                        )}

                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                                <span className="font-bold text-gray-500 dark:text-gray-400 block mb-1">Tanggal</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {new Date(selectedTask.task_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                            {selectedTask.task_time && (
                                <div>
                                    <span className="font-bold text-gray-500 dark:text-gray-400 block mb-1">Waktu</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{formatTime(selectedTask.task_time)}</span>
                                </div>
                            )}
                            {selectedTask.category && (
                                <div>
                                    <span className="font-bold text-gray-500 dark:text-gray-400 block mb-1">Kategori</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{selectedTask.category}</span>
                                </div>
                            )}
                            {selectedTask.created_at && (
                                <div>
                                    <span className="font-bold text-gray-500 dark:text-gray-400 block mb-1">Dibuat</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{selectedTask.created_at}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-[#25252d]">
                            <button
                                onClick={() => { handleToggleStatus(selectedTask); setSelectedTask(null); }}
                                className={`flex-1 rounded-full py-2.5 text-xs font-bold text-white transition cursor-pointer ${
                                    selectedTask.status === 'completed'
                                        ? 'bg-emerald-500 hover:bg-emerald-600'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                            >
                                {selectedTask.status === 'completed' ? 'Tandai Sedang Berjalan' : 'Tandai Selesai'}
                            </button>
                            <button
                                onClick={() => { handleDeleteTask(selectedTask.id); setSelectedTask(null); }}
                                className="rounded-full px-4 py-2.5 text-xs font-bold text-red-600 border border-red-200 dark:border-red-900/40 hover:bg-red-50 dark:hover:bg-red-950/20 transition cursor-pointer"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CREATE MODAL */}
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
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="Nama kegiatan / tugas"
                                    className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-300 transition"
                                />
                                {formErrors.title && <p className="text-red-500 text-[10px] mt-1">{formErrors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Deskripsi</label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
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
                                        value={form.task_date}
                                        onChange={(e) => setForm({ ...form, task_date: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-300 transition"
                                    />
                                    {formErrors.task_date && <p className="text-red-500 text-[10px] mt-1">{formErrors.task_date}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Waktu</label>
                                    <input
                                        type="time"
                                        value={form.task_time}
                                        onChange={(e) => setForm({ ...form, task_time: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-300 transition"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Kategori</label>
                                    <input
                                        type="text"
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        placeholder="cth: Kebudayaan"
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#121215] px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-300 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                                    <select
                                        value={form.status}
                                        onChange={(e) => setForm({ ...form, status: e.target.value as 'in_progress' | 'completed' })}
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
                                disabled={isSubmitting}
                                className="rounded-full bg-[#18181b] dark:bg-white px-6 py-2.5 text-xs font-bold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition shadow-xs cursor-pointer disabled:opacity-50"
                            >
                                {isSubmitting ? 'Menyimpan...' : 'Simpan Task'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
