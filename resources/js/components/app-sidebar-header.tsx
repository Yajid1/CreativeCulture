import { useState, useRef, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Bell, ChevronDown, Moon, Sun, ChevronRight } from 'lucide-react';
import { SearchCommandPalette } from '@/components/search-command-palette';
import AppLogo from '@/components/app-logo';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAppearance } from '@/hooks/use-appearance';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { dashboard } from '@/routes';

type NotificationItem = {
    id: number;
    userName: string;
    action: string;
    title: string;
    description: string;
    module: string;
    link: string;
    created_at_human: string;
};

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth, recentNotifications } = usePage().props as unknown as {
        auth?: { user?: { name?: string } };
        recentNotifications?: NotificationItem[];
    };

    const userName = auth?.user?.name || 'Demo';
    const userInitials = userName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'DT';

    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    // Close notification dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const notificationsList = recentNotifications && recentNotifications.length > 0 ? recentNotifications : [];
    const badgeCount = notificationsList.length;

    return (
        <header className="sticky top-0 z-30 px-4 sm:px-6 pt-4 pb-2 bg-[#f5f7fa] dark:bg-[#09090b] transition-colors">
            <div className="flex h-14 items-center justify-between gap-4 rounded-2xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] px-4 shadow-sm transition-all">
                {/* Left Side: Sidebar Toggle + Logo */}
                <div className="flex items-center gap-3">
                    <SidebarTrigger className="-ml-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1c1c21] rounded-xl" />
                    <div className="flex items-center gap-2">
                        <AppLogo />
                    </div>
                </div>

                {/* Right Side: Search, Language, Dark Mode, Notification, Profile */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Search Command Palette */}
                    <SearchCommandPalette />

                    {/* Language Selector */}
                    <button className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#f1f4f9] dark:bg-[#1c1c21] px-2.5 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-[#282830] transition">
                        <span className="text-xs">🇮🇩</span>
                        <span>ID</span>
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                    </button>

                    {/* Dark / Light Mode Toggle */}
                    <button
                        onClick={() => updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark')}
                        title={resolvedAppearance === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1c1c21] transition"
                    >
                        {resolvedAppearance === 'dark' ? (
                            <Sun className="h-4 w-4 text-amber-400" />
                        ) : (
                            <Moon className="h-4 w-4 text-gray-600" />
                        )}
                    </button>

                    {/* Notification Bell with Badge & Popover */}
                    <div className="relative" ref={notificationRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative flex h-8 w-8 items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1c1c21] transition"
                        >
                            <Bell className="h-4 w-4" />
                            {badgeCount > 0 && (
                                <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-2xs">
                                    {badgeCount}
                                </span>
                            )}
                        </button>

                        {/* Recent Activities Dropdown Popover */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-gray-200 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-4 shadow-xl z-50 animate-in fade-in-50 slide-in-from-top-2">
                                <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#1f1f23] pb-3 mb-3">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Recent Activities</h3>
                                        <span className="rounded-full bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                                            {badgeCount} New
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setShowNotifications(false)}
                                        className="text-xs font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                    >
                                        Tutup
                                    </button>
                                </div>

                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                    {notificationsList.length > 0 ? (
                                        notificationsList.map((item) => {
                                            const initial = item.userName ? item.userName.charAt(0).toUpperCase() : 'A';
                                            return (
                                                <Link
                                                    key={item.id}
                                                    href={item.link && item.link !== '#' ? item.link : dashboard()}
                                                    onClick={() => setShowNotifications(false)}
                                                    className="flex items-start gap-3 rounded-xl p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition cursor-pointer"
                                                >
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold text-xs shrink-0 mt-0.5">
                                                        {initial}
                                                    </div>
                                                    <div className="flex-1 text-xs">
                                                        <p className="text-gray-700 dark:text-gray-300 leading-snug">
                                                            <strong className="font-bold text-gray-900 dark:text-white">{item.userName}</strong>{' '}
                                                            {item.action}{' '}
                                                            {item.title && (
                                                                <span className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                                                    {item.title}
                                                                </span>
                                                            )}
                                                        </p>
                                                        <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 block">
                                                            {item.created_at_human}
                                                        </span>
                                                    </div>
                                                </Link>
                                            );
                                        })
                                    ) : (
                                        <p className="text-xs text-gray-400 text-center py-4">Belum ada aktivitas terbaru.</p>
                                    )}
                                </div>

                                <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800 text-center">
                                    <Link
                                        href={dashboard()}
                                        onClick={() => setShowNotifications(false)}
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        Lihat Semua Aktivitas <ChevronRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Dropdown Chip */}
                    <div className="flex items-center gap-2 rounded-full bg-[#f1f4f9] dark:bg-gray-800 px-2 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-gray-700 cursor-pointer transition">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-extrabold text-[10px]">
                            {userInitials}
                        </div>
                        <span className="hidden sm:inline">{userName}</span>
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                    </div>
                </div>
            </div>
        </header>
    );
}
