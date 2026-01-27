"use client";

import { Button } from "@/components/ui/button";
import { Upload, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useModal } from "@/components/providers/modal-provider";

const initialCategories = [
    { name: "Content Analysis", score: 20, max: 35, color: "bg-green-500", labelColor: "text-green-500" },
    { name: "ATS Compliance", score: 13, max: 25, color: "bg-amber-500", labelColor: "text-amber-500" },
    { name: "Keyword Optimization", score: 13, max: 25, color: "bg-red-500", labelColor: "text-red-500" },
    { name: "Writing Impact", score: 10, max: 10, color: "bg-green-500", labelColor: "text-green-500" },
];

export function ATSAnalysis() {
    const { openModal } = useModal();
    const [categories, setCategories] = useState(initialCategories);
    const [score, setScore] = useState(0);

    // Animate score with random changes every 5 seconds
    useEffect(() => {
        const updateScore = () => {
            setScore(prev => {
                // Randomize score between 75 and 98 to keep it in "Good" range
                return Math.floor(Math.random() * (98 - 75 + 1)) + 75;
            });
        };

        // Initial update
        updateScore();

        const interval = setInterval(updateScore, 5000);
        return () => clearInterval(interval);
    }, []);

    // Derived values for animations
    const normalizedScore = (score - 70) / 25;

    // Calculate category scores based on total score percentage
    // We assume the random score (75-98) maps roughly to high performance in categories
    const categoryScores = categories.map(cat => ({
        ...cat,
        currentScore: Math.round((score / 100) * cat.max)
    }));

    return (
        <section id="upload" className="relative w-full overflow-hidden bg-background py-20 md:py-32">
            <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">

                {/* Heading Section */}
                <div className="text-center mb-16 space-y-4 animate-fade-in-up">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Upload Your Resume to Start for Free
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
                        Get your ResuStack Score instantly and discover how to maximize your resume's impact.
                    </p>
                </div>

                {/* Dashboard Card */}
                <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-3xl p-6 md:p-12 shadow-2xl border border-slate-700/50 relative overflow-hidden">
                        {/* Subtle background pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">

                            {/* Left Column: Gauge */}
                            <div className="flex flex-col items-center justify-center border-r-0 md:border-r border-slate-700/50 pr-0 md:pr-10">
                                <div className="relative mb-6">
                                    {/* Gauge Glow - Optimized */}
                                    <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full transform -translate-y-1/2 animate-pulse-slow pointer-events-none" />

                                    <div className="relative w-56 h-28 overflow-hidden">
                                        {/* Gauge Background Track */}
                                        <div className="absolute inset-0 w-56 h-56 rounded-full border-[14px] border-slate-800/80 border-b-0 rounded-b-none rotate-0"></div>

                                        {/* Gauge Active Arc */}
                                        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                                            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#1e293b" strokeWidth="12" />
                                            <path
                                                d="M 10 50 A 40 40 0 0 1 90 50"
                                                fill="none"
                                                stroke="url(#gradient)"
                                                strokeWidth="12"
                                                strokeDasharray="126"
                                                strokeDashoffset={126 - (126 * score) / 100}
                                                className="transition-[stroke-dashoffset] duration-1000 ease-in-out will-change-[stroke-dashoffset]"
                                            />
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#22d3ee" />
                                                    <stop offset="100%" stopColor="#06b6d4" />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                        {/* Needle */}
                                        <div
                                            className="absolute bottom-0 left-1/2 w-1.5 h-28 bg-gradient-to-t from-slate-400 to-white origin-bottom transform -translate-x-1/2 transition-transform duration-1000 ease-in-out z-10 will-change-transform"
                                            style={{ transform: `translateX(-50%) rotate(${(score / 100) * 180 - 90}deg)` }}
                                        >
                                            <div className="w-4 h-4 bg-white rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center z-20">
                                        <div className="bg-[#0f172a] px-3 py-1 rounded-full border border-slate-700/50">
                                            <span className="text-4xl font-bold text-white tracking-tighter">
                                                {score}
                                            </span>
                                            <span className="text-slate-400 text-sm font-medium ml-1">/100</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Text */}
                                <div className="text-center mt-6">
                                    <p className="text-3xl font-bold tracking-widest uppercase text-cyan-400 animate-pulse">
                                        ATS Score
                                    </p>
                                    <p className="text-sm text-slate-500 mt-2">Your resume is optimized efficiently.</p>
                                </div>
                            </div>

                            {/* Right Column: Analysis Detail */}
                            <div className="flex flex-col h-full justify-between">
                                <div className="space-y-4">
                                    {categoryScores.map((cat, i) => (
                                        <div key={i} className="group">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="text-slate-200 text-xs font-semibold uppercase tracking-wide group-hover:text-white transition-colors">{cat.name}</span>
                                                <span className={`${cat.labelColor} text-xs font-bold`}>{cat.currentScore}/{cat.max}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden backdrop-blur-sm">
                                                <div
                                                    className={`h-full ${cat.color} rounded-full relative shadow-[0_0_10px_rgba(34,211,238,0.4)] transition-all duration-1000 ease-out`}
                                                    style={{ width: `${(cat.currentScore / cat.max) * 100}%` }}
                                                >
                                                    <div className="absolute inset-0 bg-white/20"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Application Readiness (Collapsed look for cleanliness) */}
                                    <div className="pt-3 mt-2 border-t border-slate-700/50 flex flex-wrap gap-2">
                                        <div className="px-2 py-1 rounded bg-slate-800/50 border border-slate-700 text-[10px] text-slate-300 flex items-center gap-1.5">
                                            <CheckCircle2 className="w-3 h-3 text-cyan-400" /> Checklist Passed
                                        </div>
                                        <div className="px-2 py-1 rounded bg-slate-800/50 border border-slate-700 text-[10px] text-slate-300 flex items-center gap-1.5">
                                            <CheckCircle2 className="w-3 h-3 text-cyan-400" /> Writing Quality Good
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <Button
                                        onClick={openModal}
                                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm h-11 shadow-lg shadow-cyan-900/20 hover:shadow-cyan-500/40 transition-all duration-300 rounded-lg group"
                                    >
                                        <Upload className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                                        Upload New Resume
                                    </Button>
                                    <p className="text-center text-[10px] text-slate-500 mt-2">
                                        Free analysis. No credit card required.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

