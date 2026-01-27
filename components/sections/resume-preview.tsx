"use client";

import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Wand2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useModal } from "@/components/providers/modal-provider";

// Lazy load templates for performance
// Lazy load templates for performance
const ResumeTemplate1 = dynamic(() => import("@/components/templates/template-1").then(mod => mod.ResumeTemplate1), {
    loading: () => <TemplateSkeleton />,
});
const ResumeTemplate2 = dynamic(() => import("@/components/templates/template-2").then(mod => mod.ResumeTemplate2), {
    loading: () => <TemplateSkeleton />,
});
const ResumeTemplate3 = dynamic(() => import("@/components/templates/template-3").then(mod => mod.ResumeTemplate3), {
    loading: () => <TemplateSkeleton />,
});

const TemplateSkeleton = () => (
    <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-slate-300 animate-spin" />
    </div>
);

export function ResumePreview() {
    const { openModal } = useModal();
    const [currentTemplate, setCurrentTemplate] = useState(0);

    // Auto-swap templates
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTemplate((prev) => (prev + 1) % 3);
        }, 4500);

        return () => clearInterval(interval);
    }, []);

    const scores = [92, 88, 95];
    const currentScore = scores[currentTemplate];

    const categories = [
        { name: "Formatting", score: 90, max: 100 },
        { name: "Keywords", score: 85, max: 100 },
        { name: "Impact", score: 95, max: 100 },
        { name: "Conciseness", score: 88, max: 100 },
    ];

    // Calculate circumference for circle animation (r=40)
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (currentScore / 100) * circumference;

    return (
        <section id="resume-preview" className="relative w-full overflow-hidden bg-background py-20 md:py-32">
            <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">
                {/* Heading */}
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                        See Your Resume Through a Recruiter’s Eyes
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                        Our AI evaluates your resume with ATS-level precision, revealing strengths and gaps so you can boost your interview success.
                    </p>
                </div>

                {/* Main Content Grid - Left + Center/Overlay */}
                <div className="grid lg:grid-cols-[300px_1fr] gap-6 lg:gap-12 items-start max-w-6xl mx-auto">

                    {/* Left Sidebar - AI Analysis Insights */}
                    <div className="space-y-4 lg:mt-6 order-2 lg:order-1">
                        {/* Analysis Header */}
                        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 shadow-sm text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-cyan-500/10 rounded-lg">
                                    <Sparkles className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">AI Analysis</h3>
                                    <p className="text-xs text-slate-400">Real-time feedback</p>
                                </div>
                            </div>
                        </div>

                        {/* Insights Stream */}
                        <div className="relative space-y-3 pl-4 hidden md:block">
                            {/* Vertical Line */}
                            <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-transparent via-border to-transparent" />

                            {/* Strengths Insight 1 */}
                            <div className="relative pl-6">
                                <div className="absolute left-[-5px] top-3 w-3 h-3 rounded-full bg-green-500 ring-4 ring-background" />
                                <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl shadow-sm text-white">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-500 mb-1 block">Strength</span>
                                    <p className="text-sm font-medium mb-1">Quantified Impact</p>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Using concrete numbers like "$15M" and "40%" significantly improves credibility.
                                    </p>
                                </div>
                            </div>

                            {/* Strengths Insight 2 */}
                            <div className="relative pl-6">
                                <div className="absolute left-[-5px] top-3 w-3 h-3 rounded-full bg-green-500 ring-4 ring-background" />
                                <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl shadow-sm text-white">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-500 mb-1 block">Strength</span>
                                    <p className="text-sm font-medium mb-1">Clear Formatting</p>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Headers are distinct and hierarchy is consistent. Good use of whitespace.
                                    </p>
                                </div>
                            </div>

                            {/* Improvement Insight 1 */}
                            <div className="relative pl-6">
                                <div className="absolute left-[-5px] top-3 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-background animate-pulse" />
                                <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl shadow-sm text-white">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1 block">Improvement</span>
                                    <p className="text-sm font-medium mb-1">Skill Gap</p>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Consider adding "Cloud Infrastructure" keywords to match the job description better.
                                    </p>
                                </div>
                            </div>

                            {/* Improvement Insight 2 */}
                            <div className="relative pl-6">
                                <div className="absolute left-[-5px] top-3 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-background animate-pulse" />
                                <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl shadow-sm text-white">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1 block">Improvement</span>
                                    <p className="text-sm font-medium mb-1">Keyword Optimization</p>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Your summary lacks specific industry keywords often scanned by ATS bots.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Resume Preview with Overlay Cards */}
                    <div className="order-1 lg:order-2 relative">
                        {/* Resume Preview */}
                        <div
                            className="relative z-10 mx-auto w-full max-w-[600px] shadow-2xl shadow-primary/10 rounded-lg overflow-hidden border border-border/40 bg-white"
                            style={{ aspectRatio: "8.5/11", willChange: "transform" }}
                        >
                            {/* Template Container with Fade Animation */}
                            <div className="absolute inset-0 w-full h-full bg-white">
                                <div
                                    key={currentTemplate}
                                    className="w-full h-full animate-in fade-in zoom-in-95 duration-500"
                                >
                                    {currentTemplate === 0 && <ResumeTemplate1 />}
                                    {currentTemplate === 1 && <ResumeTemplate2 />}
                                    {currentTemplate === 2 && <ResumeTemplate3 />}
                                </div>
                            </div>

                            {/* subtle sheen effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                        </div>

                        {/* OVERLAY CARD 1: Resume Score (Top Right - overlapping) */}
                        <div className="absolute -right-12 top-8 z-20 hidden lg:block w-[280px]">
                            <div className="bg-[#0f172a]/90 backdrop-blur-md text-white border border-slate-700/50 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                                <div className="text-center mb-4">
                                    <div className="relative w-24 h-24 mx-auto mb-2 flex items-center justify-center">
                                        {/* Circular Progress (CSS transition) */}
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="48" cy="48" r="40" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                                            <circle
                                                cx="48" cy="48" r="40"
                                                stroke="#22d3ee" strokeWidth="6" fill="transparent"
                                                strokeDasharray={circumference}
                                                strokeDashoffset={strokeDashoffset}
                                                style={{ transition: "stroke-dashoffset 1s ease-out" }}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-bold tracking-tighter text-white">{currentScore}</span>
                                            <span className="text-[10px] text-slate-400 font-medium">/ 100</span>
                                        </div>
                                    </div>
                                    <p className="text-cyan-400 font-bold text-sm">Excellent Resume!</p>
                                </div>

                                {/* Detailed Breakdown */}
                                <div className="space-y-3 pt-3 border-t border-slate-700/50">
                                    <div className="flex justify-between items-center text-sm text-slate-300 font-medium mb-1">
                                        <span>Category Breakdown</span>
                                    </div>
                                    {categories.map((cat) => (
                                        <div key={cat.name} className="space-y-1">
                                            <div className="flex justify-between text-xs text-slate-400">
                                                <span>{cat.name}</span>
                                                <span className="text-cyan-400">
                                                    {cat.score}/{cat.max}
                                                </span>
                                            </div>
                                            <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-cyan-500 transition-all duration-500 ease-out"
                                                    style={{ width: `${(cat.score / cat.max) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* OVERLAY CARD 2: Bullet Improver (Bottom Right - overlapping) */}
                        <div className="absolute -right-12 bottom-12 z-20 hidden lg:block w-[320px]">
                            <div className="rounded-2xl border border-slate-700/50 bg-[#0f172a]/90 backdrop-blur-md shadow-2xl overflow-hidden text-white">
                                <div className="bg-slate-900/50 p-3 border-b border-slate-700/50 flex items-center justify-between">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Bullet Improver</span>
                                    <Wand2 className="h-4 w-4 text-cyan-400" />
                                </div>
                                <div className="p-4 space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Before</label>
                                        <div className="p-3 rounded-lg bg-slate-800/50 text-[13px] text-slate-400 border border-dashed border-slate-700 italic leading-relaxed">
                                            "Managed team and improved sales."
                                        </div>
                                    </div>

                                    <div className="flex justify-center -my-1">
                                        <ArrowRight className="h-4 w-4 text-slate-600 rotate-90" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">After (AI)</label>
                                        <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-[13px] text-slate-200 shadow-sm leading-relaxed relative overflow-hidden">
                                            <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay"></div>
                                            "Led a team of 15, driving a <span className="font-bold text-cyan-400 bg-cyan-400/10 px-0.5 rounded">20% increase</span> in regional sales revenue."
                                        </div>
                                    </div>

                                    <Button size="sm" onClick={openModal} className="w-full h-9 text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/20 rounded-lg">
                                        Fix My Bullets
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile view fallback for cards */}
                        <div className="lg:hidden mt-8 space-y-4">
                            {/* Mobile Score Card */}
                            <div className="bg-[#0f172a]/90 backdrop-blur-md text-white border border-slate-700/50 rounded-xl p-5 shadow-sm">
                                <h3 className="font-bold text-xs mb-3 text-slate-400 uppercase tracking-widest">Resume Score</h3>
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-4xl font-bold tracking-tighter text-white">{currentScore}</span>
                                    <span className="text-sm text-slate-500 mb-1.5">/ 100</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-cyan-400 transition-all duration-500 ease-out"
                                        style={{ width: `${currentScore}%` }}
                                    />
                                </div>
                            </div>

                            {/* Mobile Bullet Improver Card */}
                            <div className="rounded-xl border border-slate-700/50 bg-[#0f172a]/90 backdrop-blur-md text-white overflow-hidden">
                                <div className="p-4 space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase">After (AI)</label>
                                        <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-[13px] text-slate-200">
                                            "Led a team of 15, driving a <span className="font-bold text-cyan-400">20% increase</span> in regional sales revenue."
                                        </div>
                                    </div>
                                    <Button size="sm" onClick={openModal} className="w-full h-8 text-sm font-bold bg-cyan-500 text-black">
                                        Fix My Bullets
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
