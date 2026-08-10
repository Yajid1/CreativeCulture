import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    AlertTriangle,
    Check,
    CheckSquare,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Plus,
    RotateCcw,
    Search,
} from 'lucide-react';

interface CalendarEvent {
    id: number;
    day: number;
    time?: string;
    title: string;
    color: 'emerald' | 'orange' | 'blue' | 'teal';
    icon?: string;
}

const sampleEvents: CalendarEvent[] = [
    {
        id: 1,
        day: 2,
        time: '9:00a',
        title: 'Status briefing',
        color: 'emerald',
    },
    {
        id: 2,
        day: 9,
        time: '9:00a',
        title: 'Status briefing',
        color: 'emerald',
    },
    {
        id: 3,
        day: 10,
        title: 'Acara Kebudayaan (Parahyangan)',
        color: 'orange',
        icon: '🎂',
    },
    {
        id: 4,
        day: 12,
        title: 'Accounting workshop UPTD',
        color: 'emerald',
    },
    {
        id: 5,
        day: 13,
        title: 'City trip kebudayaan',
        color: 'blue',
        icon: '🌴',
    },
    {
        id: 6,
        day: 15,
        title: 'City trip kebudayaan',
        color: 'blue',
        icon: '🌴',
    },
    {
        id: 7,
        day: 16,
        time: '9:00a',
        title: 'Status briefing',
        color: 'emerald',
    },
    {
        id: 8,
        day: 19,
        title: 'Konferensi Seni Parahyangan',
        color: 'teal',
        icon: '✈️',
    },
    {
        id: 9,
        day: 23,
        time: '9:00a',
        title: 'Status briefing',
        color: 'emerald',
    },
    {
        id: 10,
        day: 26,
        time: '11:00a',
        title: 'Status briefing',
        color: 'emerald',
    },
    {
        id: 11,
        day: 26,
        time: '12:00p',
        title: 'Lunch at Palataran',
        color: 'blue',
        icon: '🍴',
    },
    {
        id: 12,
        day: 27,
        time: '3:00p',
        title: 'Team meeting',
        color: 'emerald',
    },
    {
        id: 13,
        day: 27,
        time: '6:00p',
        title: 'Gelar Seni Parahyangan',
        color: 'blue',
    },
    {
        id: 14,
        day: 30,
        time: '9:00a',
        title: 'Status briefing',
        color: 'emerald',
    },
];

// August 2026 Calendar Grid Configuration
// August 2026 starts on Saturday (Aug 1)
const weeksData = [
    { weekNum: 31, days: [1, 2, 3, 4, 5, 6, 7] },
    { weekNum: 32, days: [8, 9, 10, 11, 12, 13, 14] },
    { weekNum: 33, days: [15, 16, 17, 18, 19, 20, 21] },
    { weekNum: 34, days: [22, 23, 24, 25, 26, 27, 28] },
    { weekNum: 35, days: [29, 30, 31, 1, 2, 3, 4] }, // 1,2,3,4 next month
];

export default function TaskAdmin() {
    const [currentMonth] = useState('August 2026');
    const [searchQuery, setSearchQuery] = useState('');
    const [nameQuery, setNameQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const handleReset = () => {
        setSearchQuery('');
        setNameQuery('');
        setStatusFilter('');
        setCategoryFilter('');
    };

    const getEventsForDay = (dayNum: number, isCurrentMonth: boolean) => {
        if (!isCurrentMonth) return [];
        return sampleEvents.filter((ev) => ev.day === dayNum);
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

                    <button className="inline-flex items-center gap-2 rounded-full bg-[#18181b] dark:bg-white px-5 py-2.5 text-xs font-bold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition self-start sm:self-auto cursor-pointer">
                        <Plus className="h-4 w-4 stroke-[3]" />
                        <span>Buat Task</span>
                    </button>
                </div>

                {/* 2. STAT CARDS ROW */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* Card 1: Total Task */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs transition hover:shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-[#1c1c21] text-gray-600 dark:text-gray-300">
                                <CheckSquare className="h-4.5 w-4.5" />
                            </div>
                            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 tracking-tighter">:::</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Total Task
                            </p>
                            <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
                                15
                            </h3>
                        </div>
                        <CheckSquare className="absolute -right-3 -bottom-3 h-20 w-20 text-gray-100/60 dark:text-gray-800/10 pointer-events-none stroke-[1]" />
                    </div>

                    {/* Card 2: In Progress */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs transition hover:shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-[#1c1c21] text-gray-600 dark:text-gray-300">
                                <Loader2 className="h-4.5 w-4.5 text-gray-500" />
                            </div>
                            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 tracking-tighter">:::</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                In Progress
                            </p>
                            <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
                                5
                            </h3>
                        </div>
                        <Loader2 className="absolute -right-3 -bottom-3 h-20 w-20 text-gray-100/60 dark:text-gray-800/10 pointer-events-none stroke-[1]" />
                    </div>

                    {/* Card 3: Ready */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs transition hover:shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-[#1c1c21] text-gray-600 dark:text-gray-300">
                                <Check className="h-4.5 w-4.5 text-gray-600" />
                            </div>
                            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 tracking-tighter">:::</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Ready
                            </p>
                            <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
                                10
                            </h3>
                        </div>
                        <Check className="absolute -right-3 -bottom-3 h-20 w-20 text-gray-100/60 dark:text-gray-800/10 pointer-events-none stroke-[1]" />
                    </div>

                    {/* Card 4: Blocked */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs transition hover:shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-[#1c1c21] text-gray-600 dark:text-gray-300">
                                <AlertTriangle className="h-4.5 w-4.5 text-gray-600" />
                            </div>
                            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 tracking-tighter">:::</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Blocked
                            </p>
                            <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
                                0
                            </h3>
                        </div>
                        <AlertTriangle className="absolute -right-3 -bottom-3 h-20 w-20 text-gray-100/60 dark:text-gray-800/10 pointer-events-none stroke-[1]" />
                    </div>
                </div>

                {/* 3. FILTER / SEARCH BOX SECTION */}
                <div className="rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search Input */}
                        <div>
                            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari task..."
                                className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#121215] focus:ring-2 focus:ring-gray-300 transition"
                            />
                        </div>

                        {/* Judul Input */}
                        <div>
                            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">
                                Judul
                            </label>
                            <input
                                type="text"
                                value={nameQuery}
                                onChange={(e) => setNameQuery(e.target.value)}
                                placeholder="Cari judul task"
                                className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#121215] focus:ring-2 focus:ring-gray-300 transition"
                            />
                        </div>

                        {/* Status Select */}
                        <div>
                            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">
                                Filter Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-600 dark:text-gray-300 focus:bg-white dark:focus:bg-[#121215] focus:ring-2 focus:ring-gray-300 transition"
                            >
                                <option value="">Semua status</option>
                                <option value="Ready">Ready</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Blocked">Blocked</option>
                            </select>
                        </div>

                        {/* Category Input */}
                        <div>
                            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">
                                Filter Kategori
                            </label>
                            <input
                                type="text"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                placeholder="Filter kategori"
                                className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#121215] focus:ring-2 focus:ring-gray-300 transition"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
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

                {/* 4. FULL MONTHLY CALENDAR GRID SECTION (REFERENCE MATCH 100%) */}
                <div className="rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] overflow-hidden shadow-xs">
                    {/* Calendar Top Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-[#1c1c21]">
                        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-gray-600 dark:text-gray-200">
                            {currentMonth}
                        </h2>

                        <div className="flex items-center gap-2">
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a20] transition">
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button className="px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1a20] rounded-lg transition">
                                Today
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a20] transition">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Calendar Table Container */}
                    <div className="overflow-x-auto">
                        <div className="min-w-[800px]">
                            {/* Days Header */}
                            <div className="grid grid-cols-[50px_repeat(7,1fr)] border-b border-gray-100 dark:border-[#1c1c21] bg-gray-50/50 dark:bg-[#16161b] text-xs font-semibold text-gray-500 dark:text-gray-400 py-3">
                                <div className="text-center font-mono opacity-0">#</div>
                                <div className="px-3">Sunday</div>
                                <div className="px-3">Monday</div>
                                <div className="px-3">Tuesday</div>
                                <div className="px-3">Wednesday</div>
                                <div className="px-3">Thursday</div>
                                <div className="px-3">Friday</div>
                                <div className="px-3">Saturday</div>
                            </div>

                            {/* Weeks & Days Grid Rows */}
                            <div className="divide-y divide-gray-100 dark:divide-[#1c1c21]">
                                {weeksData.map((week, weekIdx) => (
                                    <div
                                        key={week.weekNum}
                                        className="grid grid-cols-[50px_repeat(7,1fr)] min-h-[120px] bg-white dark:bg-[#121215]"
                                    >
                                        {/* Left Column: Week Number */}
                                        <div className="border-r border-gray-100 dark:border-[#1c1c21] flex items-center justify-center bg-[#fbfcfd] dark:bg-[#141418] text-lg font-light text-gray-400 dark:text-gray-500 select-none">
                                            {week.weekNum}
                                        </div>

                                        {/* 7 Days in Week */}
                                        {week.days.map((dayNum, dayIdx) => {
                                            const isNextMonth = weekIdx === 4 && dayIdx >= 3;
                                            const dayEvents = getEventsForDay(dayNum, !isNextMonth);

                                            return (
                                                <div
                                                    key={dayIdx}
                                                    className={`border-r border-gray-100 dark:border-[#1c1c21] p-2 flex flex-col justify-start transition hover:bg-gray-50/40 dark:hover:bg-[#18181f] ${
                                                        isNextMonth ? 'bg-gray-50/30 dark:bg-[#0f0f13] text-gray-300 dark:text-gray-700' : ''
                                                    }`}
                                                >
                                                    {/* Day Number */}
                                                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 px-1">
                                                        {dayNum}
                                                    </div>

                                                    {/* Event Badges Container */}
                                                    <div className="space-y-1.5 flex-1">
                                                        {dayEvents.map((ev) => {
                                                            let colorClass = 'bg-emerald-500 text-white';
                                                            if (ev.color === 'orange') colorClass = 'bg-orange-500 text-white';
                                                            if (ev.color === 'blue') colorClass = 'bg-blue-500 text-white';
                                                            if (ev.color === 'teal') colorClass = 'bg-emerald-500 text-white';

                                                            return (
                                                                <div
                                                                    key={ev.id}
                                                                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold leading-tight flex items-center gap-1.5 shadow-2xs transition hover:brightness-105 cursor-pointer truncate ${colorClass}`}
                                                                >
                                                                    {ev.icon && (
                                                                        <span className="text-[10px] shrink-0">
                                                                            {ev.icon}
                                                                        </span>
                                                                    )}
                                                                    {ev.time && (
                                                                        <span className="font-mono text-[10px] opacity-90 shrink-0">
                                                                            {ev.time}
                                                                        </span>
                                                                    )}
                                                                    <span className="truncate">
                                                                        {ev.title}
                                                                    </span>
                                                                </div>
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
                </div>
            </div>
        </>
    );
}
