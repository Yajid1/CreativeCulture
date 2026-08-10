import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    AlertTriangle,
    Check,
    Eye,
    Filter,
    Folder,
    Loader2,
    MoreVertical,
    Plus,
    RotateCcw,
} from 'lucide-react';

interface Project {
    id: number;
    name: string;
    description: string;
    status: 'Ready' | 'In Progress' | 'Blocked';
    environment: string;
    lastUpdated: string;
}

const initialProjects: Project[] = [
    {
        id: 1,
        name: 'Saung Padepokan Sound System',
        description: 'Outdoor wireless microphone & amplifier installation...',
        status: 'Ready',
        environment: 'Production',
        lastUpdated: '07/22/2026',
    },
    {
        id: 2,
        name: 'Balé Puhun Roof Weatherproofing',
        description: 'Thatch roof restoration & bamboo beam reinforcement...',
        status: 'Ready',
        environment: 'Production',
        lastUpdated: '07/22/2026',
    },
    {
        id: 3,
        name: 'Wahana Kaulinan Field Lighting',
        description: 'Solar power LED floodlight installation for evening events...',
        status: 'In Progress',
        environment: 'Staging',
        lastUpdated: '07/20/2026',
    },
    {
        id: 4,
        name: 'Kalang Amphitheater Seating Expansion',
        description: 'Stone tier seating refurbishment & VIP pavilion...',
        status: 'Ready',
        environment: 'Production',
        lastUpdated: '07/18/2026',
    },
    {
        id: 5,
        name: 'Pasir Kunci Cultural Ticket Portal',
        description: 'QR code gate scanner & online booking integration...',
        status: 'Blocked',
        environment: 'Development',
        lastUpdated: '07/15/2026',
    },
];

export default function RuanganKWPKAdmin() {
    const [projects] = useState<Project[]>(initialProjects);
    const [searchQuery, setSearchQuery] = useState('');
    const [nameQuery, setNameQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [envFilter, setEnvFilter] = useState('');
    const [activeRowMenu, setActiveRowMenu] = useState<number | null>(null);

    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            searchQuery === '' ||
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesName =
            nameQuery === '' ||
            project.name.toLowerCase().includes(nameQuery.toLowerCase());

        const matchesStatus =
            statusFilter === '' || project.status === statusFilter;

        const matchesEnv =
            envFilter === '' ||
            project.environment.toLowerCase().includes(envFilter.toLowerCase());

        return matchesSearch && matchesName && matchesStatus && matchesEnv;
    });

    const handleReset = () => {
        setSearchQuery('');
        setNameQuery('');
        setStatusFilter('');
        setEnvFilter('');
    };

    return (
        <>
            <Head title="All Projects - Ruangan KWPK Admin" />

            <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#09090b] text-gray-800 dark:text-gray-200 font-sans p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            All Projects
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Manage development projects and deployments (Ruangan KWPK)
                        </p>
                    </div>

                    <button className="inline-flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-white dark:text-gray-900 shadow-md hover:bg-gray-800 dark:hover:bg-gray-100 transition self-start sm:self-auto">
                        <Plus className="h-4 w-4" />
                        <span>Create Project</span>
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-4 shadow-2xs">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-[#1c1c21] text-gray-600 dark:text-gray-300">
                                <Folder className="h-4.5 w-4.5" />
                            </div>
                            <span className="text-xs text-gray-400">:::</span>
                        </div>
                        <div className="mt-3">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Total Projects
                            </p>
                            <h3 className="mt-1 text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                                15
                            </h3>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-4 shadow-2xs">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                                <Loader2 className="h-4.5 w-4.5 animate-spin" />
                            </div>
                            <span className="text-xs text-gray-400">:::</span>
                        </div>
                        <div className="mt-3">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                In Progress
                            </p>
                            <h3 className="mt-1 text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                                5
                            </h3>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-4 shadow-2xs">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                                <Check className="h-4.5 w-4.5" />
                            </div>
                            <span className="text-xs text-gray-400">:::</span>
                        </div>
                        <div className="mt-3">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Ready
                            </p>
                            <h3 className="mt-1 text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                                10
                            </h3>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-4 shadow-2xs">
                        <div className="flex items-center justify-between">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400">
                                <AlertTriangle className="h-4.5 w-4.5" />
                            </div>
                            <span className="text-xs text-gray-400">:::</span>
                        </div>
                        <div className="mt-3">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Blocked
                            </p>
                            <h3 className="mt-1 text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                                0
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-4 sm:p-5 shadow-2xs space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                Search
                            </label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search projects..."
                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] px-3.5 py-2 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:border-gray-400 focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                Name
                            </label>
                            <input
                                type="text"
                                value={nameQuery}
                                onChange={(e) => setNameQuery(e.target.value)}
                                placeholder="Search by project name"
                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] px-3.5 py-2 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:border-gray-400 focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                Filter by Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] px-3.5 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 focus:border-gray-400 focus:outline-none transition"
                            >
                                <option value="">Select status</option>
                                <option value="Ready">Ready</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Blocked">Blocked</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                Filter by Environment
                            </label>
                            <input
                                type="text"
                                value={envFilter}
                                onChange={(e) => setEnvFilter(e.target.value)}
                                placeholder="Filter by environment"
                                className="w-full rounded-xl border border-gray-200 dark:border-[#25252d] bg-gray-50/70 dark:bg-[#1a1a20] px-3.5 py-2 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:border-gray-400 focus:outline-none transition"
                            />
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

                <div className="rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] overflow-hidden shadow-2xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-[#1c1c21] bg-gray-50/50 dark:bg-[#16161a]">
                                    <th className="py-3.5 px-4 text-xs font-extrabold text-gray-900 dark:text-white">
                                        Name
                                    </th>
                                    <th className="py-3.5 px-4 text-xs font-extrabold text-gray-900 dark:text-white">
                                        Status
                                    </th>
                                    <th className="py-3.5 px-4 text-xs font-extrabold text-gray-900 dark:text-white">
                                        Environment
                                    </th>
                                    <th className="py-3.5 px-4 text-xs font-extrabold text-gray-900 dark:text-white">
                                        Last Updated
                                    </th>
                                    <th className="py-3.5 px-4 text-xs font-extrabold text-gray-900 dark:text-white text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-[#1c1c21]">
                                {filteredProjects.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="hover:bg-gray-50/60 dark:hover:bg-[#1a1a20] transition-colors group"
                                    >
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-[#1c1c21] text-gray-400 group-hover:text-gray-600 transition">
                                                    <Folder className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                                                        {project.name}
                                                    </h4>
                                                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                                                        {project.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4 px-4">
                                            {project.status === 'Ready' && (
                                                <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
                                                    Ready
                                                </span>
                                            )}
                                            {project.status === 'In Progress' && (
                                                <span className="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-950/60 px-3 py-1 text-[11px] font-extrabold text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/40">
                                                    In Progress
                                                </span>
                                            )}
                                            {project.status === 'Blocked' && (
                                                <span className="inline-flex items-center rounded-full bg-red-50 dark:bg-red-950/60 px-3 py-1 text-[11px] font-extrabold text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-800/40">
                                                    Blocked
                                                </span>
                                            )}
                                        </td>

                                        <td className="py-4 px-4 text-xs font-semibold text-gray-700 dark:text-gray-300">
                                            {project.environment}
                                        </td>

                                        <td className="py-4 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                                            {project.lastUpdated}
                                        </td>

                                        <td className="py-4 px-4 text-right relative">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition py-1 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f1f25]">
                                                    <Eye className="h-3.5 w-3.5" />
                                                    <span>View</span>
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        setActiveRowMenu(
                                                            activeRowMenu === project.id ? null : project.id
                                                        )
                                                    }
                                                    className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1c1c21] transition"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>

                                                {activeRowMenu === project.id && (
                                                    <div className="absolute right-4 top-12 z-20 w-36 rounded-xl border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#16161a] p-1.5 shadow-lg text-left">
                                                        <button className="w-full text-left px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#202026] rounded-lg transition">
                                                            Edit Project
                                                        </button>
                                                        <button className="w-full text-left px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition">
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
