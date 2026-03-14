"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  Download, 
  Sparkles, 
  Target, 
  BrainCircuit, 
  BookOpen, 
  ShieldCheck,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpeedometerMini } from "@/components/dashboard/SpeedometerMini";
import { MetricCardSmall } from "@/components/dashboard/MetricCardSmall";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { Toast } from "@/components/ui/toast";

function ATSResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast, toastMessage, toastType, displayToast, hideToast } = useToast();
  
  const resumeId = searchParams.get("resumeId");
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (!resumeId) {
      router.push("/dashboard/ats");
      return;
    }

    const fetchReport = async () => {
      try {
        const response = await fetch(`${API_URL}/api/ats/report/${resumeId}/latest`);
        const data = await response.json();
        if (response.ok) {
          setReport(data.data);
        } else {
          displayToast(data.message || "Failed to fetch analysis results.", "error");
        }
      } catch (error) {
        console.error("Fetch report error:", error);
        displayToast("An error occurred while fetching the report.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [resumeId, API_URL, router, displayToast]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] w-full flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm animate-pulse">Fetching Your Results...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-[70vh] w-full flex flex-col items-center justify-center gap-6">
        <div className="p-4 bg-rose-500/10 rounded-full text-rose-500">
          <AlertTriangle size={48} />
        </div>
        <h2 className="text-2xl font-bold text-white">No Analysis Found</h2>
        <Button onClick={() => router.push("/dashboard/ats")} className="bg-indigo-600">
          Go Back to Upload
        </Button>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto px-4 py-8 space-y-8 bg-black/20"
    >
      <Toast message={toastMessage} isVisible={showToast} onClose={hideToast} type={toastType} />

      {/* Top Section - Merged Header and Score */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-gray-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-sm">
        <div className="space-y-4 text-center md:text-left">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/dashboard/ats")}
            className="text-gray-500 hover:text-white p-0 h-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Upload
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-white tracking-tight">{report.resumeName || "Untitled Resume"}</h1>
            <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-xs justify-center md:justify-start">
              <Target size={14} />
              <span>Target Role: {report.jobRole || "Software Engineer"}</span>
            </div>
          </div>
          <div className="flex gap-3 justify-center md:justify-start">
            <Badge variant="outline" className="bg-white/5 border-white/10 text-gray-400 px-4 py-1">ATS Verified</Badge>
            <Badge variant="outline" className="bg-indigo-500/10 border-indigo-500/20 text-indigo-400 px-4 py-1">Latest Scan</Badge>
          </div>
        </div>
        
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
          <div className="relative z-10 bg-black/40 p-6 rounded-full border border-white/10">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-white/5"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={364.4}
                  strokeDashoffset={364.4 - (364.4 * report.overallScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="text-indigo-500 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{report.overallScore}</span>
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Grid - 3 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Keyword Match */}
        <div className="bg-gray-900/50 border border-white/10 rounded-[2rem] p-8 space-y-6 flex flex-col hover:border-indigo-500/30 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                <Target size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Keyword Match</h3>
            </div>
            <span className="text-2xl font-black text-blue-500">{report.keywordScore}%</span>
          </div>
          
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80 block">Found Keywords</span>
              <div className="flex flex-wrap gap-2">
                {report.matchedKeywords.slice(0, 8).map((kw: string, i: number) => (
                  <Badge key={i} variant="outline" className="bg-emerald-500/5 border-emerald-500/10 text-emerald-400/80 text-[10px] font-bold">
                    {kw}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-500/80 block">Missing Keywords</span>
              <div className="flex flex-wrap gap-2">
                {report.missingKeywords.slice(0, 8).map((kw: string, i: number) => (
                  <Badge key={i} variant="outline" className="bg-rose-500/5 border-rose-500/10 text-rose-400/80 text-[10px] font-bold">
                    {kw}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Readability Score */}
        <div className="bg-gray-900/50 border border-white/10 rounded-[2rem] p-8 space-y-6 flex flex-col hover:border-emerald-500/30 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Readability</h3>
            </div>
            <span className="text-2xl font-black text-emerald-500">{report.readabilityScore}%</span>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-xs text-gray-400 font-medium">Sentence Clarity</span>
              <span className="text-xs text-white font-black uppercase tracking-widest">{report.readabilityDetails?.sentenceClarity || "High"}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-xs text-gray-400 font-medium">Avg Sentence Length</span>
              <span className="text-xs text-white font-black uppercase tracking-widest">{report.readabilityDetails?.avgSentenceLength || "18"} words</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-xs text-gray-400 font-medium">Bullet Point Quality</span>
              <span className="text-xs text-white font-black uppercase tracking-widest">{report.readabilityDetails?.bulletPointQuality || "Good"}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-xs text-gray-400 font-medium">Grammar Indicators</span>
              <span className="text-xs text-emerald-400 font-black uppercase tracking-widest">{report.readabilityDetails?.grammarIndicators || "Good"}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Resume Structure */}
        <div className="bg-gray-900/50 border border-white/10 rounded-[2rem] p-8 space-y-6 flex flex-col hover:border-rose-500/30 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500/10 rounded-xl text-rose-500">
                <BookOpen size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Structure</h3>
            </div>
            <span className="text-2xl font-black text-rose-500">{report.structureScore}%</span>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80 block">Detected Sections</span>
              <div className="flex flex-wrap gap-2">
                {report.structureDetails?.sectionsDetected.map((sec: string, i: number) => (
                  <Badge key={i} variant="outline" className="bg-white/5 border-white/10 text-white/70 text-[10px] font-bold capitalize">
                    {sec}
                  </Badge>
                ))}
              </div>
            </div>
            {report.structureDetails?.missingSections.length > 0 && (
              <div className="space-y-3 p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
                <div className="flex items-center gap-2 text-rose-400">
                  <AlertTriangle size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Missing Sections</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {report.structureDetails.missingSections.map((sec: string, i: number) => (
                    <span key={i} className="text-[10px] text-rose-300/60 font-bold uppercase tracking-tight">{sec}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <Sparkles className="text-indigo-400" size={20} />
          <h3 className="text-xl font-black text-white tracking-tight uppercase">Actionable Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.suggestions.slice(0, 4).map((s: any, idx: number) => (
            <div key={idx} className="bg-white/5 border border-white/5 rounded-[2rem] p-6 flex gap-6 hover:bg-white/[0.08] transition-all group">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={24} />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white leading-tight">{s.issue}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{s.suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Keyword Suggestions */}
      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-[2.5rem] p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Keyword Optimization</h3>
            <p className="text-indigo-300/60 text-sm font-medium">Top missing keywords detected in the job description</p>
          </div>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-8 font-black uppercase tracking-widest text-xs">
            Auto-Inject Keywords
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          {report.missingKeywords.slice(0, 15).map((kw: string, i: number) => (
            <Badge key={i} className="bg-black/40 border-white/10 text-indigo-300 px-5 py-2 rounded-full text-xs font-bold hover:bg-indigo-500/20 transition-colors">
              + {kw}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


export default function ATSResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] w-full flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
      </div>
    }>
      <ATSResultContent />
    </Suspense>
  );
}
