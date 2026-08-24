import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Calendar as CalendarIcon,
    Check,
    Clock,
    Eye,
    Folder,
    Mail,
    MoreVertical,
    Plus,
    Power,
    RotateCcw,
    Shield,
    ShieldAlert,
    Trash2,
    X,
} from 'lucide-react';

export interface RoleItem {
    id: number;
    name: string;
    email?: string;
    description: string;
    status: 'Online' | 'Offline';
    environment: 'Production' | 'Staging' | 'Development';
    permissions?: string;
    lastUpdated: string;
}

const initialRoles: RoleItem[] = [
    {
        id: 1,
        name: 'Super Admin',
        email: 'superadmin@gmail.com',
        description: 'Akses kontrol penuh seluruh sistem & manajemen UPTD Kebudayaan...',
        status: 'Online',
        environment: 'Production',
        permissions: 'Full Access (All Menus, Create, Edit, Delete, Status Toggle)',
        lastUpdated: '07/22/2026',
    },
    {
        id: 2,
        name: 'Admin BCH',
        email: 'admin.bch@gmail.com',
        description: 'Pengelola fasilitas, reservasi ruangan, & program Bandung Creative Hub...',
        status: 'Online',
        environment: 'Production',
        permissions: 'Bandung Creative Hub (Fasilitas BCH & Ruangan BCH)',
        lastUpdated: '07/22/2026',
    },
    {
        id: 3,
        name: 'Admin PSMS',
        email: 'admin.psms@gmail.com',
        description: 'Pengelola fasilitas, panggung pertunjukan, & perizinan Mayang Sunda...',
        status: 'Online',
        environment: 'Staging',
        permissions: 'Mayang Sunda (Fasilitas PSMS & Ruangan PSMS)',
        lastUpdated: '07/20/2026',
    },
    {
        id: 4,
        name: 'Admin TSC',
        email: 'admin.tsc@gmail.com',
        description: 'Pengelola bale riung, amphitheater, & operasional Teras Sunda Cibiru...',
        status: 'Online',
        environment: 'Production',
        permissions: 'Teras Sunda Cibiru (Fasilitas TSC & Ruangan TSC)',
        lastUpdated: '07/18/2026',
    },
    {
        id: 5,
        name: 'Admin KWPK',
        email: 'admin.kwpk@gmail.com',
        description: 'Pengelola wahana kaulinan, saung, & edukasi Kampung Wisata Pasir Kunci...',
        status: 'Online',
        environment: 'Development',
        permissions: 'Kampung Wisata Pasir Kunci (Fasilitas KWPK & Ruangan KWPK)',
        lastUpdated: '07/15/2026',
    },
];

interface Props {
    roles?: RoleItem[];
}

export default function RolesAdmin({ roles: serverRoles }: Props) {
    const rolesList = serverRoles && serverRoles.length > 0 ? serverRoles : initialRoles;
    const [roles] = useState<RoleItem[]>(rolesList);

    // Filters
    const [roleNameQuery, setRoleNameQuery] = useState('');
    const [createdFrom, setCreatedFrom] = useState('');
    const [createdTo, setCreatedTo] = useState('');
    const [activeRowMenu, setActiveRowMenu] = useState<number | null>(null);

    // Modals state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RoleItem | null>(null);

    // Form data
    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        description: string;
        status: 'Online' | 'Offline';
        environment: 'Production' | 'Staging' | 'Development';
        permissions: string;
    }>({
        name: '',
        email: '',
        description: '',
        status: 'Online',
        environment: 'Production',
        permissions: '',
    });

    const activeRolesCount = rolesList.filter((r) => r.status === 'Online').length;
    const inactiveRolesCount = rolesList.filter((r) => r.status === 'Offline').length;

    const filteredRoles = rolesList.filter((role) => {
        return (
            roleNameQuery === '' ||
            role.name.toLowerCase().includes(roleNameQuery.toLowerCase()) ||
            role.description.toLowerCase().includes(roleNameQuery.toLowerCase()) ||
            (role.email && role.email.toLowerCase().includes(roleNameQuery.toLowerCase()))
        );
    });

    const handleReset = () => {
        setRoleNameQuery('');
        setCreatedFrom('');
        setCreatedTo('');
    };

    // Actions
    const handleToggleStatus = (role: RoleItem) => {
        router.patch(
            `/admin/roles/${role.id}/toggle-status`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => setActiveRowMenu(null),
            }
        );
    };

    const handleOpenAdd = () => {
        setFormData({
            name: '',
            email: '',
            description: '',
            status: 'Online',
            environment: 'Production',
            permissions: '',
        });
        setIsAddModalOpen(true);
    };

    const handleOpenEdit = (role: RoleItem) => {
        setSelectedRole(role);
        setFormData({
            name: role.name,
            email: role.email || '',
            description: role.description,
            status: role.status,
            environment: role.environment,
            permissions: role.permissions || '',
        });
        setActiveRowMenu(null);
        setIsEditModalOpen(true);
    };

    const handleOpenView = (role: RoleItem) => {
        setSelectedRole(role);
        setActiveRowMenu(null);
        setIsViewModalOpen(true);
    };

    const handleOpenDelete = (role: RoleItem) => {
        setSelectedRole(role);
        setActiveRowMenu(null);
        setIsDeleteModalOpen(true);
    };

    const handleSubmitAdd = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/admin/roles', formData, {
            onSuccess: () => {
                setIsAddModalOpen(false);
            },
        });
    };

    const handleSubmitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRole) return;
        router.put(`/admin/roles/${selectedRole.id}`, formData, {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setSelectedRole(null);
            },
        });
    };

    const handleConfirmDelete = () => {
        if (!selectedRole) return;
        router.delete(`/admin/roles/${selectedRole.id}`, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setSelectedRole(null);
            },
        });
    };

    return (
        <>
            <Head title="Admin Roles — Admin UPTD Kebudayaan" />

            <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#09090b] text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 space-y-6 pb-16 font-sans">
                {/* 1. TITLE HEADER & ADD ROLE BUTTON */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                            Admin Roles
                        </h1>
                        <p className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-400 mt-1">
                            Kelola role, scope hak akses, dan status keaktifan admin UPTD Kebudayaan
                        </p>
                    </div>

                    <button
                        onClick={handleOpenAdd}
                        className="inline-flex items-center gap-2 rounded-full bg-[#18181b] dark:bg-white px-5 py-2.5 text-xs font-bold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition self-start sm:self-auto cursor-pointer"
                    >
                        <Plus className="h-4 w-4 stroke-[3]" />
                        <span>Add Admin / Role</span>
                    </button>
                </div>

                {/* 2. STAT CARDS ROW */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Card 1: Total Roles */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs transition hover:shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-gray-500" />
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                    Total Roles
                                </span>
                            </div>
                            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 tracking-tighter">:::</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                                {rolesList.length}
                            </h3>
                        </div>
                        <Shield className="absolute -right-3 -bottom-3 h-20 w-20 text-gray-100/60 dark:text-gray-800/10 pointer-events-none stroke-[1]" />
                    </div>

                    {/* Card 2: Active Roles (Online) */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs transition hover:shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-emerald-500" />
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                    Online Admins
                                </span>
                            </div>
                            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 tracking-tighter">:::</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                                {activeRolesCount}
                            </h3>
                        </div>
                        <Shield className="absolute -right-3 -bottom-3 h-20 w-20 text-emerald-100/60 dark:text-emerald-950/20 pointer-events-none stroke-[1]" />
                    </div>

                    {/* Card 3: Inactive Roles (Offline) */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs transition hover:shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShieldAlert className="h-4 w-4 text-gray-400" />
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                    Offline Admins
                                </span>
                            </div>
                            <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 tracking-tighter">:::</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-black text-gray-500 dark:text-gray-400">
                                {inactiveRolesCount}
                            </h3>
                        </div>
                        <ShieldAlert className="absolute -right-3 -bottom-3 h-20 w-20 text-gray-100/60 dark:text-gray-800/10 pointer-events-none stroke-[1]" />
                    </div>
                </div>

                {/* 3. FILTER BOX SECTION */}
                <div className="rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-5 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        {/* Name / Email Search */}
                        <div className="w-full sm:max-w-md">
                            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2">
                                Search Name / Email
                            </label>
                            <input
                                type="text"
                                value={roleNameQuery}
                                onChange={(e) => setRoleNameQuery(e.target.value)}
                                placeholder="Search role name or email"
                                className="w-full rounded-xl border-0 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2.5 text-xs font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#121215] focus:ring-2 focus:ring-gray-300 transition"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-2.5">
                            <button
                                onClick={handleReset}
                                className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-[#25252d] bg-white dark:bg-[#16161a] px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f1f24] transition cursor-pointer"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                <span>Reset</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4. SPACIOUS DATA TABLE SECTION */}
                <div className="rounded-2xl border border-gray-100 dark:border-[#1f1f23] bg-white dark:bg-[#121215] overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-[#1c1c21]">
                                    <th className="py-4 px-6 text-xs font-bold text-gray-900 dark:text-white">
                                        Name & Email
                                    </th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-900 dark:text-white">
                                        Status (Toggle)
                                    </th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-900 dark:text-white">
                                        Last Updated
                                    </th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-900 dark:text-white text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-[#1c1c21]">
                                {filteredRoles.map((role) => (
                                    <tr
                                        key={role.id}
                                        className="hover:bg-gray-50/50 dark:hover:bg-[#1a1a20] transition-colors group"
                                    >
                                        {/* Name & Email */}
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-3.5">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-[#1c1c21] border border-gray-200/50 dark:border-[#25252d] text-gray-400 group-hover:text-gray-600 transition">
                                                    <Folder className="h-5 w-5 stroke-[1.5]" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight">
                                                        {role.name}
                                                    </h4>
                                                    {role.email && (
                                                        <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                                                            <Mail className="h-3 w-3 text-gray-400" />
                                                            <span>{role.email}</span>
                                                        </p>
                                                    )}
                                                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 line-clamp-1">
                                                        {role.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Status Badge (Interactive Toggle) */}
                                        <td className="py-5 px-6">
                                            <button
                                                onClick={() => handleToggleStatus(role)}
                                                title={`Click to set status to ${role.status === 'Online' ? 'Offline' : 'Online'}`}
                                                className="cursor-pointer group/badge"
                                            >
                                                {role.status === 'Online' ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/40 group-hover/badge:ring-2 group-hover/badge:ring-emerald-400 transition">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                        <span>Online</span>
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800/60 px-3.5 py-1 text-[11px] font-bold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700/40 group-hover/badge:ring-2 group-hover/badge:ring-gray-400 transition">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                                                        <span>Offline</span>
                                                    </span>
                                                )}
                                            </button>
                                        </td>

                                        {/* Last Updated */}
                                        <td className="py-5 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">
                                            {role.lastUpdated}
                                        </td>

                                        {/* Actions */}
                                        <td className="py-5 px-6 text-right relative">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenView(role)}
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition py-1 px-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f1f25] cursor-pointer"
                                                >
                                                    <Eye className="h-3.5 w-3.5 stroke-[2.5]" />
                                                    <span>View</span>
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        setActiveRowMenu(
                                                            activeRowMenu === role.id ? null : role.id
                                                        )
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1c1c21] transition cursor-pointer"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>

                                                {/* Dropdown Options */}
                                                {activeRowMenu === role.id && (
                                                    <div className="absolute right-6 top-12 z-20 w-44 rounded-xl border border-gray-100 dark:border-[#25252d] bg-white dark:bg-[#16161a] p-1.5 shadow-lg text-left">
                                                        <button
                                                            onClick={() => handleOpenEdit(role)}
                                                            className="w-full text-left px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#202026] rounded-lg transition cursor-pointer"
                                                        >
                                                            Edit Role
                                                        </button>

                                                        <button
                                                            onClick={() => handleToggleStatus(role)}
                                                            className="w-full text-left px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#202026] rounded-lg transition cursor-pointer flex items-center justify-between"
                                                        >
                                                            <span>Toggle Status</span>
                                                            <span className="text-[10px] font-mono text-gray-400">
                                                                {role.status === 'Online' ? 'Offline' : 'Online'}
                                                            </span>
                                                        </button>

                                                        <button
                                                            onClick={() => handleOpenDelete(role)}
                                                            className="w-full text-left px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition cursor-pointer"
                                                        >
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

            {/* ===== MODAL: ADD ADMIN / ROLE ===== */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="w-full max-w-lg rounded-3xl border border-gray-100 dark:border-[#25252d] bg-white dark:bg-[#121215] p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white">
                                Add New Admin / Role
                            </h3>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmitAdd} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                    Name / Role Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Admin BCH"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="admin.bch@gmail.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    rows={2}
                                    placeholder="Deskripsi tugas dan tanggung jawab admin"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                        Status
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                status: e.target.value as 'Online' | 'Offline',
                                            })
                                        }
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-[#f5f6f9] dark:bg-[#1a1a20] px-3 py-2 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                        Environment
                                    </label>
                                    <select
                                        value={formData.environment}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                environment: e.target.value as 'Production' | 'Staging' | 'Development',
                                            })
                                        }
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-[#f5f6f9] dark:bg-[#1a1a20] px-3 py-2 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="Production">Production</option>
                                        <option value="Staging">Staging</option>
                                        <option value="Development">Development</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                    Permissions Scope
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Bandung Creative Hub (Fasilitas BCH & Ruangan BCH)"
                                    value={formData.permissions}
                                    onChange={(e) => setFormData({ ...formData, permissions: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="rounded-full border border-gray-200 dark:border-gray-800 px-5 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 text-xs font-bold shadow-sm transition"
                                >
                                    Save Admin Role
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ===== MODAL: EDIT ADMIN / ROLE ===== */}
            {isEditModalOpen && selectedRole && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="w-full max-w-lg rounded-3xl border border-gray-100 dark:border-[#25252d] bg-white dark:bg-[#121215] p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white">
                                Edit Admin Role: {selectedRole.name}
                            </h3>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmitEdit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                    Name / Role Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                        Status
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                status: e.target.value as 'Online' | 'Offline',
                                            })
                                        }
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-[#f5f6f9] dark:bg-[#1a1a20] px-3 py-2 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                        Environment
                                    </label>
                                    <select
                                        value={formData.environment}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                environment: e.target.value as 'Production' | 'Staging' | 'Development',
                                            })
                                        }
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-[#f5f6f9] dark:bg-[#1a1a20] px-3 py-2 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="Production">Production</option>
                                        <option value="Staging">Staging</option>
                                        <option value="Development">Development</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                    Permissions Scope
                                </label>
                                <input
                                    type="text"
                                    value={formData.permissions}
                                    onChange={(e) => setFormData({ ...formData, permissions: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-[#f5f6f9] dark:bg-[#1a1a20] px-4 py-2 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="rounded-full border border-gray-200 dark:border-gray-800 px-5 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 text-xs font-bold shadow-sm transition"
                                >
                                    Update Role
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ===== MODAL: VIEW DETAIL ADMIN ===== */}
            {isViewModalOpen && selectedRole && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-3xl border border-gray-100 dark:border-[#25252d] bg-white dark:bg-[#121215] p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-gray-900 dark:text-white">
                                        {selectedRole.name}
                                    </h3>
                                    <p className="text-xs text-gray-400">{selectedRole.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-3.5 text-xs">
                            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800/60">
                                <span className="font-bold text-gray-500">Status Keaktifan:</span>
                                <button
                                    onClick={() => handleToggleStatus(selectedRole)}
                                    className="cursor-pointer"
                                >
                                    {selectedRole.status === 'Online' ? (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/40">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                            Online (Click to Offline)
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800/60 px-3 py-1 text-[11px] font-bold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700/40">
                                            <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                                            Offline (Click to Online)
                                        </span>
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800/60">
                                <span className="font-bold text-gray-500">Environment:</span>
                                <span className="font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-md">
                                    {selectedRole.environment}
                                </span>
                            </div>

                            <div className="py-2 border-b border-gray-100 dark:border-gray-800/60">
                                <span className="font-bold text-gray-500 block mb-1">Permissions Scope:</span>
                                <p className="font-medium text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-[#18181c] p-2.5 rounded-xl">
                                    {selectedRole.permissions || 'Full Access (All System Controls)'}
                                </p>
                            </div>

                            <div className="py-2 border-b border-gray-100 dark:border-gray-800/60">
                                <span className="font-bold text-gray-500 block mb-1">Deskripsi Tugas:</span>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {selectedRole.description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-1 text-[11px] text-gray-400">
                                <span>Terakhir diperbarui:</span>
                                <span>{selectedRole.lastUpdated}</span>
                            </div>
                        </div>

                        <div className="pt-2 flex justify-end gap-2">
                            <button
                                onClick={() => handleToggleStatus(selectedRole)}
                                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-gray-800 px-4 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                <Power className="h-3.5 w-3.5" />
                                <span>Toggle Status</span>
                            </button>
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-1.5 text-xs font-bold shadow-sm transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== MODAL: DELETE ADMIN / ROLE ===== */}
            {isDeleteModalOpen && selectedRole && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="w-full max-w-sm rounded-3xl border border-gray-100 dark:border-[#25252d] bg-white dark:bg-[#121215] p-6 shadow-2xl space-y-4 text-center animate-in fade-in zoom-in-95 duration-200">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                            <Trash2 className="h-6 w-6" />
                        </div>

                        <div>
                            <h3 className="text-base font-black text-gray-900 dark:text-white">
                                Hapus Admin Role?
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Apakah Anda yakin ingin menghapus <strong className="text-gray-900 dark:text-white">{selectedRole.name}</strong> ({selectedRole.email})? Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-3 pt-2">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="w-full rounded-full border border-gray-200 dark:border-gray-800 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="w-full rounded-full bg-red-600 hover:bg-red-700 text-white py-2 text-xs font-bold shadow-sm transition"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
