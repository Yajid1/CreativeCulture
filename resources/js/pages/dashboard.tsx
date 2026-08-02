import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
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
    Search,
    Sun,
    Trash2,
    TrendingUp,
    Users,
} from 'lucide-react';

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

export default function Dashboard() {
    // Live clock time state
    const [timeString, setTimeString] = useState<string>('10:08 AM');
    const [dateString, setDateString] = useState<string>('Saturday, Dec 27, 2025');

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

    // Quick tasks state
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskText, setNewTaskText] = useState('');
    const [taskFilter, setTaskFilter] = useState<'active' | 'completed'>('active');

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        setTasks([
            ...tasks,
            { id: Date.now(), text: newTaskText.trim(), completed: false },
        ]);
        setNewTaskText('');
    };

    const toggleTask = (id: number) => {
        setTasks(
            tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
    };

    const activeTasks = tasks.filter((t) => !t.completed);
    const completedTasks = tasks.filter((t) => t.completed);

    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

    const [showRowActionMenu, setShowRowActionMenu] = useState<number | null>(2);

    return (
        <>
            <Head title="Dashboard Overview — Ani-UI Admin" />

            <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#09090b] text-gray-800 dark:text-gray-200 font-sans p-4 sm:p-6 lg:p-8 space-y-6">

                {/* ===== PAGE TITLE ROW ===== */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                        <button className="inline-flex items-center gap-1.5 rounded-full border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] px-3.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-2xs hover:bg-gray-50 dark:hover:bg-[#1c1c21] transition">
                            <CalendarIcon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                            <span>This Month</span>
                            <ChevronDown className="h-3 w-3 text-gray-400" />
                        </button>
                        <button className="inline-flex items-center gap-1.5 rounded-full border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] px-3.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-2xs hover:bg-gray-50 dark:hover:bg-[#1c1c21] transition">
                            <Download className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
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
                                <div className="flex flex-col items-end text-right">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl sm:text-3xl">☀️</span>
                                        <span className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight leading-none">31°C</span>
                                    </div>
                                    <div className="text-[11px] text-gray-400 dark:text-gray-400 font-medium mt-1">Sunny</div>
                                    <div className="text-[11px] text-gray-400 dark:text-gray-400 font-medium">Bandung</div>
                                    <div className="text-[10px] text-gray-400 dark:text-gray-400 mt-0.5">{dateString}</div>
                                </div>
                            </div>
                        </div>

                        {/* 4 STAT CARDS ROW */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {/* Card 1 */}
                            <div className="rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] px-3.5 py-3 shadow-xs hover:shadow-sm transition">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                                            <FolderKanban className="h-3.5 w-3.5" />
                                        </div>
                                        <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Total Projects</p>
                                    </div>
                                    <button className="text-gray-300 dark:text-gray-600 hover:text-gray-500"><MoreHorizontal className="h-3.5 w-3.5" /></button>
                                </div>
                                <div className="flex items-end justify-between">
                                    <p className="text-xl font-extrabold text-gray-900 dark:text-white">24</p>
                                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                        <TrendingUp className="h-3 w-3" /> +3
                                    </span>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] px-3.5 py-3 shadow-xs hover:shadow-sm transition">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:indigo-400">
                                            <Users className="h-3.5 w-3.5" />
                                        </div>
                                        <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Active Users</p>
                                    </div>
                                    <button className="text-gray-300 dark:text-gray-600 hover:text-gray-500"><MoreHorizontal className="h-3.5 w-3.5" /></button>
                                </div>
                                <div className="flex items-end justify-between">
                                    <p className="text-xl font-extrabold text-gray-900 dark:text-white">1.847</p>
                                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                        <TrendingUp className="h-3 w-3" /> +12%
                                    </span>
                                </div>
                            </div>

                            {/* Card 3 */}
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
                                <div className="flex items-end justify-between">
                                    <p className="text-xl font-extrabold text-gray-900 dark:text-white">78%</p>
                                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                        <TrendingUp className="h-3 w-3" /> +5%
                                    </span>
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div className="rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] px-3.5 py-3 shadow-xs hover:shadow-sm transition">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 dark:bg-[#1c1c21] text-gray-600 dark:text-gray-400">
                                            <Clock className="h-3.5 w-3.5" />
                                        </div>
                                        <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Avg. Response Time</p>
                                    </div>
                                    <button className="text-gray-300 dark:text-gray-600 hover:text-gray-500"><MoreHorizontal className="h-3.5 w-3.5" /></button>
                                </div>
                                <div className="flex items-end justify-between">
                                    <p className="text-xl font-extrabold text-gray-900 dark:text-white">32 min</p>
                                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-gray-400 dark:text-gray-500">
                                        → 0%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* QUICK TASKS & CALENDAR ROW */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* QUICK TASKS */}
                            <div className="rounded-3xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-6 shadow-sm space-y-5 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quick Tasks</h3>
                                        <div className="flex items-center rounded-xl bg-gray-100 dark:bg-[#1c1c21] p-1 gap-1">
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
                                    <form onSubmit={handleAddTask} className="flex gap-2">
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
                                                <p className="text-xs font-bold text-gray-700 dark:text-gray-300">No active tasks</p>
                                                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Create a task to get started</p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full space-y-2">
                                            {(taskFilter === 'active' ? activeTasks : completedTasks).map((t) => (
                                                <div
                                                    key={t.id}
                                                    onClick={() => toggleTask(t.id)}
                                                    className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer text-left transition ${t.completed
                                                        ? 'bg-gray-50 dark:bg-[#1c1c21]/40 border-gray-200 dark:border-[#2a2a32] text-gray-400 line-through'
                                                        : 'bg-white dark:bg-[#1c1c21] border-gray-200 dark:border-[#2a2a32] text-gray-700 dark:text-gray-200 hover:border-blue-300'
                                                        }`}
                                                >
                                                    <div
                                                        className={`flex h-4 w-4 items-center justify-center rounded border transition ${t.completed
                                                            ? 'bg-blue-600 border-blue-600 text-white'
                                                            : 'border-gray-300 dark:border-[#33333d]'
                                                            }`}
                                                    >
                                                        {t.completed && <Check className="h-3 w-3 stroke-[3]" />}
                                                    </div>
                                                    <span className="text-xs font-medium">{t.text}</span>
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
                                        <p className="text-[11px] text-gray-400 dark:text-gray-400 mt-0.5">Saturday, December 27, 2025</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#1c1c21] text-gray-500 dark:text-gray-400">
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                        <button className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#1c1c21] text-gray-500 dark:text-gray-400">
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
                                        <div className="py-1.5 text-gray-300 dark:text-gray-600 font-medium">30</div>
                                        <div className="py-1.5 text-gray-700 dark:text-gray-300 font-medium">1</div>
                                        <div className="py-1.5 text-gray-700 dark:text-gray-300 font-medium">2</div>
                                        <div className="py-1.5 text-gray-700 dark:text-gray-300 font-medium">3</div>
                                        <div className="py-1.5 text-gray-700 dark:text-gray-300 font-medium">4</div>
                                        <div className="py-1.5 text-gray-700 dark:text-gray-300 font-medium">5</div>
                                        <div className="py-1.5 text-gray-700 dark:text-gray-300 font-medium">6</div>
                                        <div className="py-1.5 text-gray-300 dark:text-gray-600 font-medium">25</div>
                                        <div className="py-1.5 text-gray-300 dark:text-gray-600 font-medium">26</div>
                                        <div className="flex items-center justify-center py-1.5 rounded-lg bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30">
                                            27
                                        </div>
                                        <div className="py-1.5 text-gray-700 dark:text-gray-300 font-medium">28</div>
                                        <div className="py-1.5 text-gray-700 dark:text-gray-300 font-medium">29</div>
                                        <div className="py-1.5 text-gray-700 dark:text-gray-300 font-medium">30</div>
                                        <div className="py-1.5 text-gray-700 dark:text-gray-300 font-medium">31</div>
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
                                    <button className="flex items-center gap-1.5 rounded-full bg-white dark:bg-[#282830] text-gray-900 dark:text-white shadow-2xs">
                                        <TrendingUp className="h-3.5 w-3.5 text-gray-700 dark:text-gray-200" />
                                        <span>Performance</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 rounded-full px-3 py-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                                        <TrendingUp className="h-3.5 w-3.5" />
                                        <span>Trends</span>
                                    </button>
                                </div>
                            </div>

                            {/* Double Ring Circular Radial Chart */}
                            <div className="relative flex flex-col items-center justify-center my-2">
                                <svg className="h-40 w-40 transform -rotate-90" viewBox="0 0 100 100">
                                    {/* Background Tracks */}
                                    <circle cx="50" cy="50" r="38" stroke="#f1f5f9" className="dark:stroke-[#1f1f23]" strokeWidth="6" fill="transparent" />
                                    <circle cx="50" cy="50" r="28" stroke="#f1f5f9" className="dark:stroke-[#1f1f23]" strokeWidth="6" fill="transparent" />

                                    {/* Outer Blue Ring (85%) */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="38"
                                        stroke="#60a5fa"
                                        strokeWidth="6"
                                        strokeDasharray="238.76"
                                        strokeDashoffset="35.8"
                                        strokeLinecap="round"
                                        fill="transparent"
                                    />
                                    {/* Inner Green Ring (84%) */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="28"
                                        stroke="#4ade80"
                                        strokeWidth="6"
                                        strokeDasharray="175.93"
                                        strokeDashoffset="28.15"
                                        strokeLinecap="round"
                                        fill="transparent"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center text-center">
                                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">85%</span>
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
                                            <div className="text-[10px] text-gray-400">Overall completion rate</div>
                                        </div>
                                    </div>
                                    <span className="font-bold text-blue-500">85%</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500">
                                            <Users className="h-3.5 w-3.5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800 dark:text-gray-200">User Engagement</div>
                                            <div className="text-[10px] text-gray-400">Active user participation</div>
                                        </div>
                                    </div>
                                    <span className="font-bold text-emerald-500">84%</span>
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

                        {/* REVENUE ANALYTICS */}
                        <div className="rounded-3xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-6 shadow-sm space-y-4 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Analytics</h3>
                                    <span className="text-[11px] font-semibold text-gray-400">This Quarter</span>
                                </div>

                                {/* Chart ticks area */}
                                <div className="pt-10 pb-6 flex items-end justify-around border-b border-gray-100 dark:border-[#1f1f23]">
                                    <span className="text-[10px] font-bold text-gray-400">OCT</span>
                                    <span className="text-[10px] font-bold text-gray-400">NOV</span>
                                    <span className="text-[10px] font-bold text-gray-900 dark:text-white">DEC</span>
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className="flex items-center justify-between pt-2">
                                <div>
                                    <p className="text-[11px] font-medium text-gray-400">Total Projected</p>
                                    <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-0.5">$128,430</p>
                                </div>
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900">
                                    +18.5%
                                </span>
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
                            <p className="text-xs text-gray-400 dark:text-gray-400 mt-0.5">Overview of active updates across Fasilitas, Ruangan, Artikel &amp; Berita</p>
                        </div>
                        <button className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#1c1c21] px-3.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-2xs hover:bg-gray-50 dark:hover:bg-[#25252c] transition self-start sm:self-auto">
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
                                    <th className="pb-3 pr-2 text-right font-bold text-xs">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-[#1f1f23]">
                                {/* Row 1: Fasilitas (Gedung Baru) */}
                                <tr className="hover:bg-gray-50/60 dark:hover:bg-[#1c1c21]/50 transition">
                                    <td className="py-4 pl-2">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                                                <Building2 className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">Penambahan Gedung Baru Teras Sunda</p>
                                                <p className="text-[11px] text-gray-400 dark:text-gray-400 mt-0.5">Penyelesaian renovasi &amp; penambahan fasilitas sanggar seni...</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/60">
                                            Ready
                                        </span>
                                    </td>
                                    <td className="py-4 text-gray-600 dark:text-gray-300 font-medium">
                                        7/22/2026
                                    </td>
                                    <td className="py-4 pr-2 text-right relative">
                                        <button
                                            onClick={() => setShowRowActionMenu(showRowActionMenu === 1 ? null : 1)}
                                            className={`flex h-8 w-8 items-center justify-center rounded-full transition ml-auto ${
                                                showRowActionMenu === 1
                                                    ? 'bg-gray-100 dark:bg-[#282830] text-gray-900 dark:text-white'
                                                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1c1c21]'
                                            }`}
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                        </button>

                                        {showRowActionMenu === 1 && (
                                            <div className="absolute right-0 mt-1 w-36 rounded-2xl border border-gray-200/80 dark:border-[#2a2a32] bg-white dark:bg-[#1c1c21] p-1.5 shadow-xl z-20 text-left animate-in fade-in-50 slide-in-from-top-1">
                                                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#282830] transition">
                                                    <Eye className="h-3.5 w-3.5 text-gray-500" />
                                                    <span>View Details</span>
                                                </button>
                                                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#282830] transition">
                                                    <Edit3 className="h-3.5 w-3.5 text-gray-500" />
                                                    <span>Edit</span>
                                                </button>
                                                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition">
                                                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>

                                {/* Row 2: Ruangan */}
                                <tr className="hover:bg-gray-50/60 dark:hover:bg-[#1c1c21]/50 transition">
                                    <td className="py-4 pl-2">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
                                                <DoorClosed className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">Pembaruan Data Ruangan Teater Mayang Sunda</p>
                                                <p className="text-[11px] text-gray-400 dark:text-gray-400 mt-0.5">Pembaruan kapasitas, fasilitas pencahayaan &amp; galeri foto...</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-950/60 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/60">
                                            In Progress
                                        </span>
                                    </td>
                                    <td className="py-4 text-gray-600 dark:text-gray-300 font-medium">
                                        7/22/2026
                                    </td>
                                    <td className="py-4 pr-2 text-right relative">
                                        <button
                                            onClick={() => setShowRowActionMenu(showRowActionMenu === 2 ? null : 2)}
                                            className={`flex h-8 w-8 items-center justify-center rounded-full transition ml-auto ${
                                                showRowActionMenu === 2
                                                    ? 'bg-gray-100 dark:bg-[#282830] text-gray-900 dark:text-white'
                                                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1c1c21]'
                                            }`}
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                        </button>

                                        {showRowActionMenu === 2 && (
                                            <div className="absolute right-0 mt-1 w-36 rounded-2xl border border-gray-200/80 dark:border-[#2a2a32] bg-white dark:bg-[#1c1c21] p-1.5 shadow-xl z-20 text-left animate-in fade-in-50 slide-in-from-top-1">
                                                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#282830] transition">
                                                    <Eye className="h-3.5 w-3.5 text-gray-500" />
                                                    <span>View Details</span>
                                                </button>
                                                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#282830] transition">
                                                    <Edit3 className="h-3.5 w-3.5 text-gray-500" />
                                                    <span>Edit</span>
                                                </button>
                                                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition">
                                                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>

                                {/* Row 3: Artikel */}
                                <tr className="hover:bg-gray-50/60 dark:hover:bg-[#1c1c21]/50 transition">
                                    <td className="py-4 pl-2">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 shrink-0">
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">Publikasi Artikel Kebudayaan Bandung</p>
                                                <p className="text-[11px] text-gray-400 dark:text-gray-400 mt-0.5">Dokumentasi sejarah seni tari daerah &amp; kearifan lokal...</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/60">
                                            Ready
                                        </span>
                                    </td>
                                    <td className="py-4 text-gray-600 dark:text-gray-300 font-medium">
                                        7/22/2026
                                    </td>
                                    <td className="py-4 pr-2 text-right relative">
                                        <button
                                            onClick={() => setShowRowActionMenu(showRowActionMenu === 3 ? null : 3)}
                                            className={`flex h-8 w-8 items-center justify-center rounded-full transition ml-auto ${
                                                showRowActionMenu === 3
                                                    ? 'bg-gray-100 dark:bg-[#282830] text-gray-900 dark:text-white'
                                                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1c1c21]'
                                            }`}
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                        </button>

                                        {showRowActionMenu === 3 && (
                                            <div className="absolute right-0 mt-1 w-36 rounded-2xl border border-gray-200/80 dark:border-[#2a2a32] bg-white dark:bg-[#1c1c21] p-1.5 shadow-xl z-20 text-left animate-in fade-in-50 slide-in-from-top-1">
                                                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#282830] transition">
                                                    <Eye className="h-3.5 w-3.5 text-gray-500" />
                                                    <span>View Details</span>
                                                </button>
                                                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#282830] transition">
                                                    <Edit3 className="h-3.5 w-3.5 text-gray-500" />
                                                    <span>Edit</span>
                                                </button>
                                                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition">
                                                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>

                                {/* Row 4: Berita */}
                                <tr className="hover:bg-gray-50/60 dark:hover:bg-[#1c1c21]/50 transition">
                                    <td className="py-4 pl-2">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                                                <Newspaper className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">Rilis Berita Festival Seni &amp; Budaya 2026</p>
                                                <p className="text-[11px] text-gray-400 dark:text-gray-400 mt-0.5">Liputan pers persiapan penyelenggaraan event tahunan...</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/60">
                                            Ready
                                        </span>
                                    </td>
                                    <td className="py-4 text-gray-600 dark:text-gray-300 font-medium">
                                        7/22/2026
                                    </td>
                                    <td className="py-4 pr-2 text-right relative">
                                        <button
                                            onClick={() => setShowRowActionMenu(showRowActionMenu === 4 ? null : 4)}
                                            className={`flex h-8 w-8 items-center justify-center rounded-full transition ml-auto ${
                                                showRowActionMenu === 4
                                                    ? 'bg-gray-100 dark:bg-[#282830] text-gray-900 dark:text-white'
                                                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1c1c21]'
                                            }`}
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                        </button>

                                        {showRowActionMenu === 4 && (
                                            <div className="absolute right-0 mt-1 w-36 rounded-2xl border border-gray-200/80 dark:border-[#2a2a32] bg-white dark:bg-[#1c1c21] p-1.5 shadow-xl z-20 text-left animate-in fade-in-50 slide-in-from-top-1">
                                                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#282830] transition">
                                                    <Eye className="h-3.5 w-3.5 text-gray-500" />
                                                    <span>View Details</span>
                                                </button>
                                                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#282830] transition">
                                                    <Edit3 className="h-3.5 w-3.5 text-gray-500" />
                                                    <span>Edit</span>
                                                </button>
                                                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition">
                                                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer Pagination */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-gray-100 dark:border-[#1f1f23] text-xs">
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            Showing 1 to 4 of 15 results
                        </p>

                        <div className="flex items-center gap-1.5">
                            <button className="rounded-full px-3 py-1 font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1c1c21] transition">
                                Previous
                            </button>
                            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold shadow-xs">
                                1
                            </button>
                            <button className="flex h-7 w-7 items-center justify-center rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1c1c21] font-semibold transition">
                                2
                            </button>
                            <button className="flex h-7 w-7 items-center justify-center rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1c1c21] font-semibold transition">
                                3
                            </button>
                            <button className="rounded-full px-3 py-1 font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1c1c21] transition">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
