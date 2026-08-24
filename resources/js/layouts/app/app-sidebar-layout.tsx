import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <div className="flex min-h-screen w-full flex-col bg-[#f5f7fa] dark:bg-[#09090b] text-gray-900 dark:text-gray-100 transition-colors duration-200">
                <AppSidebarHeader />
                <div className="flex flex-1 w-full">
                    <AppSidebar />
                    <AppContent variant="sidebar" className="overflow-x-hidden flex-1">
                        {children}
                    </AppContent>
                </div>
            </div>
        </AppShell>
    );
}
