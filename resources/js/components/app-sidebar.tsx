import { Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    Bot,
    Building2,
    CheckSquare,
    ChevronDown,
    DoorClosed,
    FileText,
    Home,
    LogOut,
    Newspaper,
    ShieldCheck,
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { dashboard } from '@/routes';

const fasilitasItems = [
    { title: 'Bandung Creative HUB', href: '/admin/fasilitas/bch' },
    { title: 'Padepokan Seni Mayang Sunda', href: '/admin/fasilitas/psms' },
    { title: 'Teras Sunda Cibiru', href: '/admin/fasilitas/tsc' },
    { title: 'Kampung Wisata Pasir Kunci', href: '/admin/fasilitas/kwpk' },
];

const ruanganItems = [
    { title: 'Ruangan BCH', href: '/admin/ruangan/bch' },
    { title: 'Ruangan PSMS', href: '/admin/ruangan/psms' },
    { title: 'Ruangan TSC', href: '/admin/ruangan/tsc' },
    { title: 'Ruangan KWPK', href: '/admin/ruangan/kwpk' },
];

type NavItem = {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
};

const adminItems: NavItem[] = [
    {
        title: 'Admin Roles',
        href: '/admin/roles',
        icon: ShieldCheck,
    },
];

export function AppSidebar() {
    const { isCurrentUrl } = useCurrentUrl();
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    const isAnyFasilitasActive = fasilitasItems.some((item) => isCurrentUrl(item.href));
    const isAnyRuanganActive = ruanganItems.some((item) => isCurrentUrl(item.href));

    const [isFasilitasOpen, setIsFasilitasOpen] = useState(isAnyFasilitasActive);
    const [isRuanganOpen, setIsRuanganOpen] = useState(isAnyRuanganActive);

    return (
        <Sidebar
            collapsible="icon"
            variant="floating"
            className="top-20 h-[calc(100vh-5.5rem)] w-60 group-data-[collapsible=icon]:w-16 p-2 sm:px-3 [&_[data-sidebar=sidebar]]:border-none [&_[data-sidebar=sidebar]]:shadow-none [&_[data-sidebar=sidebar]]:bg-transparent"
        >
            <div className="flex h-full w-full flex-col justify-between rounded-3xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-3.5 group-data-[collapsible=icon]:p-2 shadow-xs overflow-hidden transition-all">
                <SidebarContent className="space-y-4 group-data-[collapsible=icon]:space-y-2 pt-1 overflow-y-auto pr-0.5">
                    {/* MAIN SECTION */}
                    <SidebarGroup className="p-0">
                        <SidebarGroupLabel className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 group-data-[collapsible=icon]:hidden">
                            MAIN
                        </SidebarGroupLabel>

                        <SidebarMenu className="mt-1.5 space-y-2 group-data-[collapsible=icon]:space-y-1.5">
                            {/* 1. OVERVIEW */}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isCurrentUrl(dashboard().url)}
                                    className={`w-full rounded-2xl px-3 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 text-xs sm:text-sm font-semibold transition-all ${
                                        isCurrentUrl(dashboard().url)
                                            ? 'bg-[#f2f4f7] dark:bg-[#1c1c21] text-gray-900 dark:text-white shadow-2xs font-bold'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-[#1a1a20] hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                >
                                    <Link href={dashboard().url} prefetch className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                                        <Home className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                                        <span className="group-data-[collapsible=icon]:hidden">Overview</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* 2. FASILITAS DROPDOWN */}
                            <SidebarMenuItem className="space-y-1">
                                <button
                                    onClick={() => setIsFasilitasOpen(!isFasilitasOpen)}
                                    title="Fasilitas"
                                    className={`flex w-full items-center rounded-2xl bg-[#f4f5f8] dark:bg-[#1c1c21] px-4 py-2.5 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center text-xs sm:text-sm font-bold text-gray-900 dark:text-white shadow-2xs transition-all hover:bg-gray-200/70 dark:hover:bg-[#25252d] ${
                                        isAnyFasilitasActive ? 'ring-1 ring-gray-300 dark:ring-gray-700' : ''
                                    }`}
                                >
                                    <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                                        <Building2 className="h-4.5 w-4.5 shrink-0 text-gray-700 dark:text-gray-300" />
                                        <span className="font-extrabold text-gray-900 dark:text-white group-data-[collapsible=icon]:hidden">Fasilitas</span>
                                    </div>
                                    <ChevronDown
                                        className={`h-4 w-4 text-gray-500 transition-transform duration-200 group-data-[collapsible=icon]:hidden ${
                                            isFasilitasOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Dropdown Sub-menu */}
                                {!isCollapsed && isFasilitasOpen && (
                                    <div className="mt-1.5 ml-4 pl-3 border-l-2 border-gray-200 dark:border-gray-800 space-y-1 py-1">
                                        {fasilitasItems.map((sub) => {
                                            const active = isCurrentUrl(sub.href);
                                            return (
                                                <Link
                                                    key={sub.title}
                                                    href={sub.href}
                                                    prefetch
                                                    className={`block text-xs sm:text-sm font-semibold transition-all leading-snug ${
                                                        active
                                                            ? 'text-gray-900 dark:text-white font-extrabold bg-gray-100 dark:bg-[#1c1c21] px-2.5 py-1.5 rounded-xl'
                                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-2.5 py-1.5 rounded-xl hover:bg-gray-100/60 dark:hover:bg-[#1a1a20]'
                                                    }`}
                                                >
                                                    {sub.title}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </SidebarMenuItem>

                            {/* 3. RUANGAN DROPDOWN */}
                            <SidebarMenuItem className="space-y-1">
                                <button
                                    onClick={() => setIsRuanganOpen(!isRuanganOpen)}
                                    title="Ruangan"
                                    className={`flex w-full items-center rounded-2xl bg-[#f4f5f8] dark:bg-[#1c1c21] px-4 py-2.5 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center text-xs sm:text-sm font-bold text-gray-900 dark:text-white shadow-2xs transition-all hover:bg-gray-200/70 dark:hover:bg-[#25252d] ${
                                        isAnyRuanganActive ? 'ring-1 ring-gray-300 dark:ring-gray-700' : ''
                                    }`}
                                >
                                    <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                                        <DoorClosed className="h-4.5 w-4.5 shrink-0 text-gray-700 dark:text-gray-300" />
                                        <span className="font-extrabold text-gray-900 dark:text-white group-data-[collapsible=icon]:hidden">Ruangan</span>
                                    </div>
                                    <ChevronDown
                                        className={`h-4 w-4 text-gray-500 transition-transform duration-200 group-data-[collapsible=icon]:hidden ${
                                            isRuanganOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Dropdown Sub-menu */}
                                {!isCollapsed && isRuanganOpen && (
                                    <div className="mt-1.5 ml-4 pl-3 border-l-2 border-gray-200 dark:border-gray-800 space-y-1 py-1">
                                        {ruanganItems.map((sub) => {
                                            const active = isCurrentUrl(sub.href);
                                            return (
                                                <Link
                                                    key={sub.title}
                                                    href={sub.href}
                                                    prefetch
                                                    className={`block text-xs sm:text-sm font-semibold transition-all leading-snug ${
                                                        active
                                                            ? 'text-gray-900 dark:text-white font-extrabold bg-gray-100 dark:bg-[#1c1c21] px-2.5 py-1.5 rounded-xl'
                                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-2.5 py-1.5 rounded-xl hover:bg-gray-100/60 dark:hover:bg-[#1a1a20]'
                                                    }`}
                                                >
                                                    {sub.title}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </SidebarMenuItem>

                            {/* 4. ARTIKEL */}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isCurrentUrl('/admin/artikel')}
                                    className={`w-full rounded-2xl px-3 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 text-xs sm:text-sm font-semibold transition-all ${
                                        isCurrentUrl('/admin/artikel')
                                            ? 'bg-[#f2f4f7] dark:bg-[#1c1c21] text-gray-900 dark:text-white shadow-2xs font-bold'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-[#1a1a20] hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                >
                                    <Link href="/admin/artikel" prefetch className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                                        <FileText className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                                        <span className="group-data-[collapsible=icon]:hidden">Artikel</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* 5. BERITA */}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isCurrentUrl('/admin/berita')}
                                    className={`w-full rounded-2xl px-3 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 text-xs sm:text-sm font-semibold transition-all ${
                                        isCurrentUrl('/admin/berita')
                                            ? 'bg-[#f2f4f7] dark:bg-[#1c1c21] text-gray-900 dark:text-white shadow-2xs font-bold'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-[#1a1a20] hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                >
                                    <Link href="/admin/berita" prefetch className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                                        <Newspaper className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                                        <span className="group-data-[collapsible=icon]:hidden">Berita</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* 6. AI ASSISTANT */}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isCurrentUrl('/admin/ai-assistant')}
                                    className={`w-full rounded-2xl px-3 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 text-xs sm:text-sm font-semibold transition-all ${
                                        isCurrentUrl('/admin/ai-assistant')
                                            ? 'bg-[#f2f4f7] dark:bg-[#1c1c21] text-gray-900 dark:text-white shadow-2xs font-bold'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-[#1a1a20] hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                >
                                    <Link href="/admin/ai-assistant" prefetch className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                                        <Bot className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                                        <span className="group-data-[collapsible=icon]:hidden">AI Assistant</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* 7. TASK */}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isCurrentUrl('/admin/task')}
                                    className={`w-full rounded-2xl px-3 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 text-xs sm:text-sm font-semibold transition-all ${
                                        isCurrentUrl('/admin/task')
                                            ? 'bg-[#f2f4f7] dark:bg-[#1c1c21] text-gray-900 dark:text-white shadow-2xs font-bold'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-[#1a1a20] hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                >
                                    <Link href="/admin/task" prefetch className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                                        <CheckSquare className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                                        <span className="group-data-[collapsible=icon]:hidden">Task</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>

                    {/* ADMIN SECTION */}
                    <SidebarGroup className="p-0 pt-2">
                        <SidebarGroupLabel className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 group-data-[collapsible=icon]:hidden">
                            ADMIN
                        </SidebarGroupLabel>
                        <SidebarMenu className="mt-1.5 space-y-1 group-data-[collapsible=icon]:space-y-1.5">
                            {adminItems.map((item) => {
                                const active = isCurrentUrl(item.href);
                                const Icon = item.icon;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={active}
                                            className={`w-full rounded-2xl px-3 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 text-xs sm:text-sm font-semibold transition-all ${
                                                active
                                                    ? 'bg-[#f2f4f7] dark:bg-[#1c1c21] text-gray-900 dark:text-white shadow-2xs font-bold'
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-[#1a1a20] hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                        >
                                            <Link href={item.href} prefetch className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                                                <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                                                <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>

                {/* LOGOUT FOOTER */}
                <SidebarFooter className="p-0 pt-3 border-t border-gray-100 dark:border-[#1f1f23]">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="w-full rounded-2xl px-3 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 transition-all"
                            >
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex w-full items-center gap-3 group-data-[collapsible=icon]:justify-center"
                                >
                                    <LogOut className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
                                    <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </div>
        </Sidebar>
    );
}
