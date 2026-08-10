import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    Bot,
    ChevronDown,
    Cpu,
    History,
    Plus,
    Send,
    Sparkles,
    User,
} from 'lucide-react';

interface Message {
    id: number;
    sender: 'user' | 'ai';
    text: string;
}

export default function AiAssistant() {
    const [selectedModel, setSelectedModel] = useState('Gemini 3 Flash');
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
    const [inputPrompt, setInputPrompt] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const models = [
        'Gemini 3 Flash',
        'Gemini 3 Pro',
        'Claude 3.5 Sonnet',
        'GPT-4o',
    ];

    const handleSendMessage = (textToSend?: string) => {
        const query = textToSend || inputPrompt;
        if (!query.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            sender: 'user',
            text: query,
        };

        setMessages((prev) => [...prev, userMsg]);
        if (!textToSend) setInputPrompt('');
        setIsGenerating(true);

        setTimeout(() => {
            const aiMsg: Message = {
                id: Date.now() + 1,
                sender: 'ai',
                text: `Tentu! Mengenai "${query}", UPTD Kebudayaan memiliki berbagai data dan program fasilitas terkait. Apakah Anda memerlukan ringkasan laporan, draf publikasi, atau bantuan analisis jadwal ruangan?`,
            };
            setMessages((prev) => [...prev, aiMsg]);
            setIsGenerating(false);
        }, 1000);
    };

    const handleNewChat = () => {
        setMessages([]);
        setInputPrompt('');
    };

    return (
        <>
            <Head title="AI Assistant — UPTD Kebudayaan" />

            {/* SEAMLESS FLUID ORGANIC BLOB KEYFRAMES */}
            <style>{`
                @keyframes organicMorph {
                    0% {
                        border-radius: 58% 42% 38% 62% / 52% 48% 52% 48%;
                    }
                    25% {
                        border-radius: 45% 55% 62% 38% / 48% 58% 42% 52%;
                    }
                    50% {
                        border-radius: 64% 36% 48% 52% / 60% 40% 60% 40%;
                    }
                    75% {
                        border-radius: 42% 58% 55% 45% / 45% 62% 38% 55%;
                    }
                    100% {
                        border-radius: 58% 42% 38% 62% / 52% 48% 52% 48%;
                    }
                }

                @keyframes slowRotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .animate-organic-blob {
                    animation:
                        organicMorph 12s ease-in-out infinite,
                        slowRotate 26s linear infinite;
                    will-change: border-radius, transform;
                }
            `}</style>

            <div className="relative min-h-[calc(100vh-5rem)] bg-[#f8f9fb] dark:bg-[#09090b] text-gray-900 dark:text-gray-100 flex flex-col font-sans overflow-hidden select-none">
                {/* BACKGROUND FINE GRID PATTERN WITH RADIAL MASK */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-15"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
                        `,
                        backgroundSize: '36px 36px',
                        maskImage: 'radial-gradient(circle at 50% 45%, black 35%, transparent 80%)',
                        WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black 35%, transparent 80%)',
                    }}
                />

                {/* TOP BAR HEADER */}
                <header className="relative z-20 flex items-center justify-between px-6 sm:px-8 py-5">
                    {/* Left: Clean Model Selector Text Button */}
                    <div className="relative">
                        <button
                            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                        >
                            <Cpu className="h-4 w-4 text-gray-600 dark:text-gray-400 stroke-[1.8]" />
                            <span>{selectedModel}</span>
                            <ChevronDown className="h-3.5 w-3.5 text-gray-500 stroke-[2]" />
                        </button>

                        {isModelDropdownOpen && (
                            <div className="absolute left-0 top-9 z-30 w-48 rounded-2xl border border-gray-100 dark:border-[#25252d] bg-white dark:bg-[#16161a] p-1.5 shadow-xl">
                                {models.map((model) => (
                                    <button
                                        key={model}
                                        onClick={() => {
                                            setSelectedModel(model);
                                            setIsModelDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold rounded-xl transition flex items-center justify-between ${selectedModel === model
                                            ? 'bg-gray-100 dark:bg-[#202028] text-gray-900 dark:text-white font-bold'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a1a20]'
                                            }`}
                                    >
                                        <span>{model}</span>
                                        {selectedModel === model && (
                                            <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Clean Unbordered Action Icons */}
                    <div className="flex items-center gap-4">
                        <button
                            title="Chat History"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                        >
                            <History className="h-4.5 w-4.5 stroke-[1.8]" />
                        </button>

                        <button
                            onClick={handleNewChat}
                            title="New Chat"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                        >
                            <Plus className="h-5 w-5 stroke-[2]" />
                        </button>
                    </div>
                </header>

                {/* MAIN CONTENT AREA */}
                <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
                    {messages.length === 0 ? (
                        /* INITIAL HERO STATE (REFERENCE MATCH 100%) */
                        <div className="flex flex-col items-center justify-center text-center max-w-2xl w-full my-auto space-y-7">
                            {/* Animated Fluid Organic Glowing Blob */}
                            <div className="relative flex items-center justify-center my-3">
                                {/* Outer Cyan Ambient Glow */}
                                <div className="absolute h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" />

                                {/* Morphing Fluid Blob Outer Ring */}
                                <div
                                    className="animate-organic-blob relative h-36 w-36 sm:h-40 sm:w-40 p-[3.5px] transition-transform duration-700 hover:scale-105"
                                    style={{
                                        background: `conic-gradient(
                                            from 180deg,
                                            #00f2fe 0%,
                                            #00c6ff 25%,
                                            #0891b2 42%,
                                            #0f172a 58%,
                                            #1e293b 72%,
                                            #0284c7 88%,
                                            #00f2fe 100%
                                        )`,
                                        boxShadow: '0 0 22px rgba(0, 242, 254, 0.4), 0 0 45px rgba(0, 242, 254, 0.15)',
                                    }}
                                >
                                    {/* Inner Core Surface matching background */}
                                    <div
                                        className="h-full w-full bg-[#f8f9fb] dark:bg-[#09090b] relative overflow-hidden"
                                        style={{
                                            borderRadius: 'inherit',
                                            boxShadow: 'inset -5px -5px 12px rgba(0,0,0,0.22), inset 5px 5px 10px rgba(255,255,255,0.7)',
                                        }}
                                    >
                                        {/* Soft Blended Radial Overlays */}
                                        <div
                                            className="absolute inset-0 pointer-events-none opacity-80"
                                            style={{
                                                borderRadius: 'inherit',
                                                background: 'radial-gradient(circle at 35% 25%, rgba(0, 242, 254, 0.35) 0%, transparent 65%)',
                                            }}
                                        />
                                        <div
                                            className="absolute inset-0 pointer-events-none opacity-80"
                                            style={{
                                                borderRadius: 'inherit',
                                                background: 'radial-gradient(circle at 75% 75%, rgba(15, 23, 42, 0.6) 0%, transparent 65%)',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Welcome Text */}
                            <h2 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-gray-900 dark:text-white pt-1">
                                Good to see you, Admin UPTD Kebudayaan
                                .
                            </h2>

                            {/* Input Pill Box */}
                            <div className="w-full max-w-[700px] pt-3">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }}
                                    className="relative flex items-center rounded-full bg-white dark:bg-[#121216] border border-gray-200/80 dark:border-[#22222a] shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] focus-within:shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-all px-7 py-4"
                                >
                                    <input
                                        type="text"
                                        value={inputPrompt}
                                        onChange={(e) => setInputPrompt(e.target.value)}
                                        placeholder="Ask me anything..."
                                        className="w-full border-0 bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0"
                                    />

                                    <button
                                        type="submit"
                                        disabled={!inputPrompt.trim()}
                                        className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white disabled:opacity-30 transition cursor-pointer"
                                    >
                                        <Send className="h-4 w-4 stroke-[1.8]" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        /* CHAT MESSAGES STATE */
                        <div className="w-full max-w-3xl flex-1 flex flex-col justify-between space-y-6 my-auto">
                            <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex items-start gap-3 ${msg.sender === 'user'
                                            ? 'justify-end'
                                            : 'justify-start'
                                            }`}
                                    >
                                        {msg.sender === 'ai' && (
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/40">
                                                <Bot className="h-4 w-4" />
                                            </div>
                                        )}

                                        <div
                                            className={`rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium max-w-[80%] leading-relaxed ${msg.sender === 'user'
                                                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-tr-none'
                                                : 'bg-white dark:bg-[#141418] text-gray-900 dark:text-gray-100 border border-gray-100 dark:border-[#222228] shadow-xs rounded-tl-none'
                                                }`}
                                        >
                                            {msg.text}
                                        </div>

                                        {msg.sender === 'user' && (
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                                                <User className="h-4 w-4" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {isGenerating && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400">
                                            <Bot className="h-4 w-4 animate-spin" />
                                        </div>
                                        <div className="rounded-2xl bg-white dark:bg-[#141418] px-4 py-2.5 text-xs text-gray-400 border border-gray-100 dark:border-[#222228]">
                                            Gemini is thinking...
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sticky Input Bar at Bottom when Chat active */}
                            <div className="pt-4">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }}
                                    className="relative flex items-center rounded-full bg-white dark:bg-[#121216] border border-gray-200/80 dark:border-[#22222a] shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] focus-within:shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-all px-7 py-4"
                                >
                                    <input
                                        type="text"
                                        value={inputPrompt}
                                        onChange={(e) => setInputPrompt(e.target.value)}
                                        placeholder="Ask me anything..."
                                        className="w-full border-0 bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0"
                                    />

                                    <button
                                        type="submit"
                                        disabled={!inputPrompt.trim()}
                                        className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white disabled:opacity-30 transition cursor-pointer"
                                    >
                                        <Send className="h-4 w-4 stroke-[1.8]" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
