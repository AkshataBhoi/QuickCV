"use client";

import { cn } from "@/lib/utils";
import { TemplateId } from "./TemplateSelector";

export interface CoverLetterData {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    role: string;
    company: string;
    hiringManager: string;
    body: string;
}

interface CoverLetterPreviewProps {
    data: CoverLetterData;
    template: TemplateId;
}

export function CoverLetterPreview({ data, template }: CoverLetterPreviewProps) {
    const today = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="w-full h-full bg-white text-black overflow-y-auto print:overflow-visible" id="cl-preview">
            <div className={cn(
                "aspect-[210/297] w-full min-h-[1000px] mx-auto bg-white p-[15mm] shadow-xl print:shadow-none transition-all duration-300 flex flex-col",
                template === "clean" && "font-serif",
                template === "modern" && "font-sans",
                template === "minimal" && "font-mono"
            )}>

                {/* === CLASSIC FORMAL === */}
                {template === "clean" && (
                    <div className="flex-1 flex flex-col">
                        <header className="border-b border-gray-300 pb-6 mb-8 flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{data.fullName || "Your Name"}</h1>
                                <p className="text-sm text-gray-600 mt-1">{data.role}</p>
                            </div>
                            <div className="text-right text-xs text-gray-500 space-y-1">
                                <div>{data.email}</div>
                                <div>{data.phone}</div>
                                <div>{data.city}</div>
                            </div>
                        </header>

                        <div className="space-y-6 flex-1">
                            <div className="text-sm text-gray-900 font-medium">{today}</div>

                            <div className="text-sm text-gray-800 space-y-1">
                                <div className="font-bold">{data.hiringManager || "Hiring Manager"}</div>
                                <div>{data.company || "Company Name"}</div>
                            </div>

                            <div className="text-sm leading-relaxed whitespace-pre-wrap text-gray-800">
                                {data.body || "Your cover letter content will appear here..."}
                            </div>
                        </div>

                        <footer className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-sm font-bold">Sincerely,</p>
                            <p className="text-lg mt-2 font-serif italic text-gray-900">{data.fullName || "Your Name"}</p>
                        </footer>
                    </div>
                )}

                {/* === MODERN CONVERSATIONAL === */}
                {template === "modern" && (
                    <div className="flex-1 flex flex-col relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        <header className="mb-10 text-center">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold tracking-widest uppercase mb-4">
                                Cover Letter
                            </div>
                            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{data.fullName || "Your Name"}</h1>
                            <div className="flex justify-center gap-4 text-xs font-medium text-purple-600">
                                <span>{data.email}</span>
                                <span>•</span>
                                <span>{data.phone}</span>
                                <span>•</span>
                                <span>{data.city}</span>
                            </div>
                        </header>

                        <div className="flex-1 max-w-2xl mx-auto w-full">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">to: {data.company}</div>
                            <div className="text-base leading-7 text-slate-700 whitespace-pre-wrap font-medium">
                                {data.body || "Start writing to see your letter take shape..."}
                            </div>
                        </div>

                        <footer className="mt-12 text-center">
                            <div className="w-16 h-1 bg-purple-500 mx-auto mb-4"></div>
                            <p className="font-bold text-slate-900">{data.fullName}</p>
                        </footer>
                    </div>
                )}

                {/* === EXECUTIVE POLISHED === */}
                {template === "minimal" && (
                    <div className="flex-1 flex flex-col bg-stone-50 p-8 -m-8 h-[calc(100%+4rem)]">
                        <div className="flex justify-between items-start mb-12">
                            <div className="w-12 h-12 bg-emerald-900 text-white flex items-center justify-center font-bold text-xl">
                                {data.fullName ? data.fullName[0] : "Y"}
                            </div>
                            <div className="text-right text-xs font-mono text-emerald-900" style={{ writingMode: 'vertical-rl' }}>
                                {today}
                            </div>
                        </div>

                        <div className="grid grid-cols-[1fr_3fr] gap-12 flex-1">
                            <div className="space-y-8 border-r border-emerald-900/10 pr-6">
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-900 mb-2">From</h3>
                                    <div className="text-xs space-y-1 text-stone-600">
                                        <div className="font-bold text-stone-900">{data.fullName}</div>
                                        <div>{data.email}</div>
                                        <div>{data.phone}</div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-900 mb-2">To</h3>
                                    <div className="text-xs space-y-1 text-stone-600">
                                        <div className="font-bold text-stone-900">{data.hiringManager}</div>
                                        <div>{data.company}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="font-serif text-sm leading-8 text-stone-800 whitespace-pre-wrap">
                                {data.body || "Content..."}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
