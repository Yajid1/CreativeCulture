import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { router } from '@inertiajs/react';
import {
    Building2,
    CheckSquare,
    DoorClosed,
    FileText,
    Home,
    Newspaper,
    Bot,
    ShieldCheck,
    Search,
    ArrowRight,
    CornerDownLeft,
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from '@/components/ui/dialog';

type SearchItem = {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    category: string;
    keywords?: string[];
};

const searchItems: SearchItem[] = [
    // Main
    { title: 'Overview (Dashboard)', href: '/dashboard', icon: Home, category: 'Main', keywords: ['home', 'beranda', 'overview', 'dashboard'] },

    // Fasilitas
    { title: 'Bandung Creative HUB', href: '/admin/fasilitas/bch', icon: Building2, category: 'Fasilitas', keywords: ['bch', 'fasilitas', 'bandung'] },
    { title: 'Padepokan Seni Mayang Sunda', href: '/admin/fasilitas/psms', icon: Building2, category: 'Fasilitas', keywords: ['psms', 'padepokan', 'mayang', 'sunda'] },
    { title: 'Teras Sunda Cibiru', href: '/admin/fasilitas/tsc', icon: Building2, category: 'Fasilitas', keywords: ['tsc', 'teras', 'cibiru'] },
    { title: 'Kampung Wisata Pasir Kunci', href: '/admin/fasilitas/kwpk', icon: Building2, category: 'Fasilitas', keywords: ['kwpk', 'kampung', 'wisata', 'pasir', 'kunci'] },

    // Ruangan
    { title: 'Ruangan BCH', href: '/admin/ruangan/bch', icon: DoorClosed, category: 'Ruangan', keywords: ['ruangan', 'bch', 'bandung'] },
    { title: 'Ruangan PSMS', href: '/admin/ruangan/psms', icon: DoorClosed, category: 'Ruangan', keywords: ['ruangan', 'psms', 'padepokan'] },
    { title: 'Ruangan TSC', href: '/admin/ruangan/tsc', icon: DoorClosed, category: 'Ruangan', keywords: ['ruangan', 'tsc', 'teras'] },
    { title: 'Ruangan KWPK', href: '/admin/ruangan/kwpk', icon: DoorClosed, category: 'Ruangan', keywords: ['ruangan', 'kwpk', 'kampung'] },

    // Content
    { title: 'Artikel', href: '/admin/artikel', icon: FileText, category: 'Content', keywords: ['artikel', 'article', 'tulisan'] },
    { title: 'Berita', href: '/admin/berita', icon: Newspaper, category: 'Content', keywords: ['berita', 'news', 'kabar'] },

    // Tools
    { title: 'AI Assistant', href: '/admin/ai-assistant', icon: Bot, category: 'Tools', keywords: ['ai', 'assistant', 'chatbot', 'asisten'] },
    { title: 'Task', href: '/admin/task', icon: CheckSquare, category: 'Tools', keywords: ['task', 'tugas', 'todo'] },

    // Admin
    { title: 'Admin Roles', href: '/admin/roles', icon: ShieldCheck, category: 'Admin', keywords: ['roles', 'admin', 'hak akses', 'permission'] },
];

function fuzzyMatch(text: string, query: string): boolean {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    // Direct substring match
    if (lowerText.includes(lowerQuery)) return true;

    // Fuzzy character-by-character match
    let queryIndex = 0;
    for (let i = 0; i < lowerText.length && queryIndex < lowerQuery.length; i++) {
        if (lowerText[i] === lowerQuery[queryIndex]) {
            queryIndex++;
        }
    }
    return queryIndex === lowerQuery.length;
}

function matchScore(item: SearchItem, query: string): number {
    const lowerQuery = query.toLowerCase();
    const lowerTitle = item.title.toLowerCase();

    // Exact title match = highest score
    if (lowerTitle === lowerQuery) return 100;
    // Title starts with query
    if (lowerTitle.startsWith(lowerQuery)) return 90;
    // Title contains query as substring
    if (lowerTitle.includes(lowerQuery)) return 80;
    // Category match
    if (item.category.toLowerCase().includes(lowerQuery)) return 60;
    // Keyword match
    if (item.keywords?.some((kw) => kw.includes(lowerQuery))) return 70;
    // Fuzzy match on title
    if (fuzzyMatch(lowerTitle, lowerQuery)) return 40;
    // Fuzzy match on keywords
    if (item.keywords?.some((kw) => fuzzyMatch(kw, lowerQuery))) return 30;

    return 0;
}

export function SearchCommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Global Ctrl+K handler
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when dialog opens
    useEffect(() => {
        if (open) {
            setQuery('');
            setSelectedIndex(0);
            // Small delay to ensure dialog content has rendered
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    // Filter and sort results
    const filteredItems = useMemo(() => {
        if (!query.trim()) return searchItems;

        return searchItems
            .map((item) => ({ item, score: matchScore(item, query) }))
            .filter(({ score }) => score > 0)
            .sort((a, b) => b.score - a.score)
            .map(({ item }) => item);
    }, [query]);

    // Group by category for display
    const groupedItems = useMemo(() => {
        const groups: Record<string, SearchItem[]> = {};
        filteredItems.forEach((item) => {
            if (!groups[item.category]) {
                groups[item.category] = [];
            }
            groups[item.category].push(item);
        });
        return groups;
    }, [filteredItems]);

    // Navigate to selected item
    const navigateTo = useCallback(
        (item: SearchItem) => {
            setOpen(false);
            router.visit(item.href);
        },
        [],
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredItems[selectedIndex]) {
                    navigateTo(filteredItems[selectedIndex]);
                }
            }
        },
        [filteredItems, selectedIndex, navigateTo],
    );

    // Keep selected item in view
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        const selected = list.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement | null;
        if (selected) {
            selected.scrollIntoView({ block: 'nearest' });
        }
    }, [selectedIndex]);

    // Reset selection when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    // Flatten index tracker for grouped items
    let flatIndex = -1;

    return (
        <>
            {/* Search Trigger (replaces the old static input) */}
            <div className="relative hidden md:flex items-center">
                <button
                    id="search-command-trigger"
                    type="button"
                    onClick={() => setOpen(true)}
                    className="flex h-8 w-44 lg:w-56 items-center rounded-full border-0 bg-[#f1f4f9] dark:bg-[#1c1c21] py-1 pl-8 pr-14 text-xs text-gray-400 dark:text-gray-500 hover:bg-gray-200/70 dark:hover:bg-[#282830] focus:outline-none transition-all cursor-pointer text-left"
                >
                    <Search className="absolute left-3 h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
                    Search...
                </button>
                <kbd className="absolute right-2.5 inline-flex items-center rounded bg-white dark:bg-[#282830] px-1.5 py-0.5 text-[10px] font-mono text-gray-400 dark:text-gray-300 border border-gray-200/80 dark:border-[#33333d] shadow-2xs pointer-events-none">
                    Ctrl+K
                </kbd>
            </div>

            {/* Mobile search button */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="md:hidden flex h-8 w-8 items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1c1c21] transition"
            >
                <Search className="h-4 w-4" />
            </button>

            {/* Search Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="!p-0 gap-0 overflow-hidden sm:max-w-lg max-w-[calc(100%-2rem)] rounded-2xl border-gray-200/80 dark:border-[#1f1f23] bg-white dark:bg-[#121215] shadow-2xl">
                    <DialogTitle className="sr-only">Cari Halaman</DialogTitle>

                    {/* Search Input */}
                    <div className="flex items-center border-b border-gray-200/80 dark:border-[#1f1f23] px-4">
                        <Search className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
                        <input
                            ref={inputRef}
                            id="search-command-input"
                            type="text"
                            placeholder="Cari halaman, fitur, atau menu..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 border-0 bg-transparent py-3.5 pl-3 pr-8 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0"
                            autoComplete="off"
                        />
                    </div>

                    {/* Results */}
                    <div
                        ref={listRef}
                        className="max-h-[340px] overflow-y-auto py-2 px-2 scroll-smooth"
                    >
                        {filteredItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1c1c21] mb-3">
                                    <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                </div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Tidak ditemukan
                                </p>
                                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                    Coba kata kunci lain
                                </p>
                            </div>
                        ) : (
                            Object.entries(groupedItems).map(([category, items]) => (
                                <div key={category} className="mb-2">
                                    <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                        {category}
                                    </div>
                                    {items.map((item) => {
                                        flatIndex++;
                                        const currentFlatIndex = flatIndex;
                                        const isSelected = selectedIndex === currentFlatIndex;
                                        const Icon = item.icon;

                                        return (
                                            <button
                                                key={item.href}
                                                type="button"
                                                data-index={currentFlatIndex}
                                                onClick={() => navigateTo(item)}
                                                onMouseEnter={() => setSelectedIndex(currentFlatIndex)}
                                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                                                    isSelected
                                                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a20]'
                                                }`}
                                            >
                                                <div
                                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                                        isSelected
                                                            ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                                                            : 'bg-gray-100 dark:bg-[#1c1c21] text-gray-500 dark:text-gray-400'
                                                    }`}
                                                >
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium truncate">
                                                        {item.title}
                                                    </div>
                                                    <div className="text-[11px] text-gray-400 dark:text-gray-500 truncate">
                                                        {item.href}
                                                    </div>
                                                </div>
                                                {isSelected && (
                                                    <div className="flex items-center gap-1 shrink-0">
                                                        <ArrowRight className="h-3.5 w-3.5 text-blue-400 dark:text-blue-500" />
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-gray-200/80 dark:border-[#1f1f23] px-4 py-2 text-[11px] text-gray-400 dark:text-gray-500">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                                <kbd className="inline-flex h-4 items-center rounded bg-gray-100 dark:bg-[#1c1c21] px-1 font-mono text-[10px] border border-gray-200/60 dark:border-[#33333d]">
                                    ↑
                                </kbd>
                                <kbd className="inline-flex h-4 items-center rounded bg-gray-100 dark:bg-[#1c1c21] px-1 font-mono text-[10px] border border-gray-200/60 dark:border-[#33333d]">
                                    ↓
                                </kbd>
                                <span className="ml-0.5">navigasi</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="inline-flex h-4 items-center rounded bg-gray-100 dark:bg-[#1c1c21] px-1 font-mono text-[10px] border border-gray-200/60 dark:border-[#33333d]">
                                    <CornerDownLeft className="h-2.5 w-2.5" />
                                </kbd>
                                <span className="ml-0.5">buka</span>
                            </span>
                        </div>
                        <span className="flex items-center gap-1">
                            <kbd className="inline-flex h-4 items-center rounded bg-gray-100 dark:bg-[#1c1c21] px-1 font-mono text-[10px] border border-gray-200/60 dark:border-[#33333d]">
                                esc
                            </kbd>
                            <span className="ml-0.5">tutup</span>
                        </span>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
