import { Link } from '@inertiajs/react';
import {
    Bot,
    Building2,
    DoorClosed,
    FileText,
    Home,
    LogOut,
    Newspaper,
    Settings,
    ShieldCheck,
    Users,
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
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { dashboard } from '@/routes';

type NavItem = {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
};

const mainItems: NavItem[] = [
    {
        title: 'Overview',
        href: dashboard().url,
        icon: Home,
    },
    {
        title: 'Fasilitas',
        href: '/bandung-creative-hub',
        icon: Building2,
    },
    {
        title: 'Ruangan',
        href: '#',
        icon: DoorClosed,
    },
    {
        title: 'Artikel',
        href: '/artikel',
        icon: FileText,
    },
    {
        title: 'Berita',
        href: '/berita-1',
        icon: Newspaper,
    },
    {
        title: 'AI Assistant',
        href: '#',
        icon: Bot,
    },
];

const adminItems: NavItem[] = [
    {
        title: 'Kelola Admin',
        href: '#',
        icon: Users,
    },
    {
        title: 'Admin Roles',
        href: '#',
        icon: ShieldCheck,
    },
    {
        title: 'Pengaturan',
        href: '/settings/profile',
        icon: Settings,
    },
];

export function AppSidebar() {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <Sidebar
            collapsible="icon"
            variant="floating"
            className="top-20 h-[calc(100vh-5.5rem)] w-52 sm:w-56 p-2 sm:px-3 [&_[data-sidebar=sidebar]]:border-none [&_[data-sidebar=sidebar]]:shadow-none [&_[data-sidebar=sidebar]]:bg-transparent"
        >
            <div className="flex h-full w-full flex-col justify-between rounded-3xl border border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] p-3.5 shadow-xs overflow-hidden transition-colors">
                <SidebarContent className="space-y-4 pt-1 overflow-y-auto pr-0.5">
                    {/* MAIN SECTION */}
                    <SidebarGroup className="p-0">
                        <SidebarGroupLabel className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                            MAIN
                        </SidebarGroupLabel>
                        <SidebarMenu className="mt-1.5 space-y-1">
                            {mainItems.map((item) => {
                                const active = isCurrentUrl(item.href);
                                const Icon = item.icon;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={active}
                                            className={`w-full rounded-2xl px-3 py-2 text-xs sm:text-sm font-semibold transition-all ${active
                                                    ? 'bg-[#f2f4f7] dark:bg-[#1c1c21] text-gray-900 dark:text-white shadow-2xs font-bold'
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-[#1a1a20] hover:text-gray-900 dark:hover:text-white'
                                                }`}
                                        >
                                            <Link href={item.href} prefetch className="flex items-center gap-3">
                                                <Icon className={`h-4 w-4 ${active ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>

                    {/* ADMIN SECTION */}
                    <SidebarGroup className="p-0">
                        <SidebarGroupLabel className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                            ADMIN
                        </SidebarGroupLabel>
                        <SidebarMenu className="mt-1.5 space-y-1">
                            {adminItems.map((item) => {
                                const active = isCurrentUrl(item.href);
                                const Icon = item.icon;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={active}
                                            className={`w-full rounded-2xl px-3 py-2 text-xs sm:text-sm font-semibold transition-all ${active
                                                    ? 'bg-[#f2f4f7] dark:bg-[#1c1c21] text-gray-900 dark:text-white shadow-2xs font-bold'
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-[#1a1a20] hover:text-gray-900 dark:hover:text-white'
                                                }`}
                                        >
                                            <Link href={item.href} prefetch className="flex items-center gap-3">
                                                <Icon className={`h-4 w-4 ${active ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                                                <span>{item.title}</span>
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
                                className="w-full rounded-2xl px-3 py-2 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 transition-all"
                            >
                                <Link href="/logout" method="post" as="button" className="flex items-center gap-3 w-full">
                                    <LogOut className="h-4 w-4 text-gray-500 dark:text-gray-400 hover:text-red-600" />
                                    <span>Logout</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </div>
        </Sidebar>
    );
}
