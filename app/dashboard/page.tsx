"use client";

export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { FileText, Plus, ArrowRight, Zap, Target, BookOpen, Upload, Sparkles, TrendingUp, Download } from "lucide-react";
import Link from "next/link";
import { FileSwitcher } from "@/components/dashboard/FileSwitcher";
import { MetricCardSmall } from "@/components/dashboard/MetricCardSmall";
import { useDashboardFile } from "@/components/providers/dashboard-file-provider";
import { ATSScorePie } from "@/components/dashboard/ATSScorePie";
import { MyResumes } from "@/components/dashboard/MyResumes";
import { useAuth } from "@/context/AuthContext";
import useSWR from "swr";
import apiClient from "@/lib/api/client";

const fetcher = async (url: string) => {
    const res = await apiClient.get(url);
    return res.data;
};


export default function DashboardPage() {
    const { user } = useAuth();
    const { activeFile, files, isLoading: providerLoading } = useDashboardFile();

    const fetcherKey = activeFile?.id ? `/api/ats/report/${activeFile.id}/latest` : null;

    const { data: reportData, isLoading: reportLoading } = useSWR(
        fetcherKey,
        fetcher
    );

    const report = reportData?.data;
    const analysis = activeFile?.data?.atsAnalysis || {};

    const keywordStrength = report ? (
        (report.matchedKeywords?.length + report.missingKeywords?.length) > 0 ?
            Math.round((report.matchedKeywords.length / (report.matchedKeywords.length + report.missingKeywords.length)) * 100) : 0
    ) : 0;

    const metrics = {
        ats: report?.overallScore || analysis.overallScore || 0,
        skills: report?.keywordScore || analysis.jobMatchScore || 0,
        keywordStrength: keywordStrength
    };

    if (providerLoading && files.length === 0) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-screen w-full overflow-hidden bg-background">
            {/* Ambient Background Elements */}
            <div className="fixed top-20 left-10 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-20 mix-blend-screen" />
            <div className="fixed bottom-20 right-10 w-[400px] h-[400px] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none opacity-20 mix-blend-screen" />

            <div className="h-full w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-8 px-4 sm:px-6 pt-6  ">
                {/* Floating Control Bar */}
                <div className="sticky top-0 z-40 bg-black/40 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.12)] gap-4 mx-auto max-w-7xl">
                    <FileSwitcher />

                    <div className="flex items-center gap-3">
                        <div className="md:flex items-center gap-2 border-r border-white/10 pr-4 mr-2">
                            <Link href="/dashboard/ats">
                                <Button variant="ghost" size="sm" className="hover:bg-white/5 text-muted-foreground hover:text-white">
                                    <Upload className="mr-2 h-4 w-4" /> Upload Analysis
                                </Button>
                            </Link>
                        </div>

                        <Link href="/dashboard/resume-builder">
                            <Button size="sm" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] border-0">
                                <Plus className="mr-2 h-4 w-4" /> New Resume
                            </Button>
                        </Link>
                    </div>
                </div>

                {!activeFile && files.length === 0 ? (
                    <MyResumes />

                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Left Column: Metrics & Score (8 cols) */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                <MetricCardSmall
                                    title="ATS Score"
                                    value={metrics.ats}
                                    icon={<Target className="h-5 w-5" />}
                                    trend="neutral"
                                    color="blue"
                                />
                                <MetricCardSmall
                                    title="Skills Match"
                                    value={`${metrics.skills}%`}
                                    icon={<Zap className="h-5 w-5" />}
                                    color="purple"
                                />
                                <MetricCardSmall
                                    title="Keyword Strength"
                                    value={`${metrics.keywordStrength}%`}
                                    icon={<Sparkles className="h-5 w-5" />}
                                    color="rose"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className=" relative p-1 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center min-h-[290px] overflow-hidden group hover:border-white/20 transition-all shadow-xl">
                                    <div className=" w-full h-full flex items-center justify-center bg-black/20">
                                        <ATSScorePie atsScore={metrics.ats} industryAverage={72} />
                                    </div>
                                </div>

                                <div className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-between min-h-[300px] hover:border-white/20 transition-all shadow-xl">
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2 uppercase tracking-wide">
                                                <TrendingUp className="h-4 w-4" /> Top Strengths
                                            </h3>
                                            <ul className="space-y-3">
                                                {report && report.matchedKeywords?.length > 0 ? (
                                                    report.matchedKeywords.slice(0, 3).map((kw: string, i: number) => (
                                                        <li key={i} className="flex gap-3 text-sm text-gray-300 items-start">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                                            <span>Keyword Match: <strong>{kw}</strong></span>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="text-sm text-muted-foreground italic px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                                                        Run analysis to see your resume strengths.
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-rose-400 mb-3 flex items-center gap-2 uppercase tracking-wide">
                                                <Target className="h-4 w-4" /> Missing Keywords
                                            </h3>
                                            <ul className="space-y-3">
                                                {report && report.missingKeywords?.length > 0 ? (
                                                    report.missingKeywords.slice(0, 3).map((kw: string, i: number) => (
                                                        <li key={i} className="flex gap-3 text-sm text-gray-300 items-start">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
                                                            <span className="opacity-80">Missing: <strong>{kw}</strong></span>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="text-sm text-muted-foreground italic px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                                                        No missing keywords identified yet.
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    <Link href={activeFile ? `/dashboard/ats?resumeId=${activeFile.id}&step=3` : "/dashboard/ats"}>
                                        <Button className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all">
                                            View Full Report <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 space-y-6">
                            <div className="p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md">
                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Zap className="h-3 w-3" /> Quick Actions
                                </h3>
                                <div className="space-y-3">
                                    <Link href="/dashboard/cover-letter">
                                        <Button variant="ghost" className="w-full mb-3 justify-between items-center h-14 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl px-4 group transition-all">
                                            <span className="flex items-center gap-3">
                                                <span className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                                                    <FileText className="h-4 w-4" />
                                                </span>
                                                <span className="text-sm font-medium">Cover Letter</span>
                                            </span>
                                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard/files">
                                        <Button variant="ghost" className="w-full justify-between items-center h-14 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl px-4 group transition-all">
                                            <span className="flex items-center gap-3">
                                                <span className="p-2 rounded-lg bg-orange-500/20 text-orange-400 group-hover:scale-110 transition-transform">
                                                    <BookOpen className="h-4 w-4" />
                                                </span>
                                                <span className="text-sm font-medium">My Library</span>
                                            </span>
                                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-black/40 backdrop-blur-xl relative overflow-hidden group shadow-2xl shadow-indigo-500/10">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/30 blur-[50px] rounded-full pointer-events-none group-hover:bg-indigo-500/50 transition-colors animate-pulse" />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                            <Sparkles className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest backdrop-blur-md">
                                            Unlock all features
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Upgrade to Pro</h3>
                                    <p className="text-sm text-indigo-200/80 mb-6 leading-relaxed">
                                        Get unlimited resume downloads, advanced ATS scoring, and premium AI suggestions.
                                    </p>
                                    <Link href="/payment">
                                        <Button className="w-full bg-white text-indigo-950 hover:bg-white/90 font-bold border-0 shadow-xl transition-all active:scale-[0.98]">
                                            Upgrade Plan
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
