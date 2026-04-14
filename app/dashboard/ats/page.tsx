"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UploadCard } from "./components/UploadCard";
import { JobDescriptionModal } from "./components/JobDescriptionModal";
import { toast } from "sonner";
import { useDashboardFile } from "@/components/providers/dashboard-file-provider";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/lib/api/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Target,
  ArrowLeft,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  BrainCircuit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function ATSViewContent() {
  const { user } = useAuth();
  const { addFile } = useDashboardFile();
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for upload
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // State for result
  const [report, setReport] = useState<any>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const resumeIdFromParams = searchParams.get("resumeId");
  const [activeResumeId, setActiveResumeId] = useState<string | null>(resumeIdFromParams);

  useEffect(() => {
    if (resumeIdFromParams) {
      setActiveResumeId(resumeIdFromParams);
      fetchReport(resumeIdFromParams);
    }
  }, [resumeIdFromParams]);

  const fetchReport = async (rid: string) => {
    setIsLoadingReport(true);
    try {
      const response = await apiClient.get(`/api/ats/report/${rid}/latest`);
      const data = response.data;
      if (data.data) {
        setReport(data.data);
      } else {
        toast.error(data.message || "Failed to fetch analysis results.");
      }
    } catch (error: any) {
      console.error("Fetch report error:", error);
      const data = error.response?.data;
      toast.error(data?.message || "An error occurred while fetching the report.");
    } finally {
      setIsLoadingReport(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    setStatus("uploading");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 100);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await apiClient.post('/api/ats/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data;
      clearInterval(interval);
      setProgress(100);

      if (data.data || data.resumeId) {
        const newResumeId = data.data?.resumeId || data.resumeId;
        if (!newResumeId) {
          toast.error("Invalid resume ID from server.");
          setStatus("error");
          return;
        }
        setActiveResumeId(newResumeId);
        if (data.data?.file) {
          addFile(data.data.file);
        }
        setStatus("success");
        setIsJobModalOpen(true);
        toast.success("File saved successfully ✓");
      } else {
        setStatus("error");
        toast.error(data.message || "Upload failed. Please try again.");
      }
    } catch (error: any) {
      clearInterval(interval);
      setStatus("error");
      console.error("Upload error:", error);
      const data = error.response?.data;
      toast.error(data?.message || "An error occurred during upload.");
    }
  };

  const handleJDSubmit = async (jobDescription: string) => {
    if (!activeResumeId) {
      toast.error("Resume ID missing.");
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await apiClient.post('/api/ats/analyze', {
        resumeId: activeResumeId,
        jobDescription,
        ownerId: user?.uid
      });

      const data = response.data;
      if (data.data || response.status === 200) {
        setIsJobModalOpen(false);
        router.push(`/dashboard/ats?resumeId=${activeResumeId}`);
        fetchReport(activeResumeId);
      } else {
        toast.error(data.message || "Analysis failed.");
      }
    } catch (error: any) {
      console.error("Analysis error:", error);
      const data = error.response?.data;
      toast.error(data?.message || "An error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isLoadingReport) {
    return (
      <div className="min-h-[70vh] w-full flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm animate-pulse">Analyzing Resume...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start px-4 bg-background relative pb-20">

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <AnimatePresence mode="wait">
        {!report ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl w-full space-y-8 relative z-10 pt-0 sm:pt-12"
          >
            <div className="text-center space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-2 sm:mb-4"
              >
                <Sparkles size={16} />
                <span className="text-xs font-black uppercase tracking-widest">Premium ATS Analysis</span>
              </motion.div>

              <motion.h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Optimize for the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  Digital Gatekeepers
                </span>
              </motion.h1>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
                Upload your resume and see exactly how ATS filters see your application. 
                Get real-time feedback to beat the bots.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <UploadCard onFileSelect={handleFileSelect} status={status} progress={progress} />
              
              <div className="space-y-4">
                <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Target className="text-indigo-400 h-5 w-5" /> Why ATS Analysis?
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Identify missing critical keywords",
                      "Check for formatting compatibility",
                      "Compare against job descriptions",
                      "Improve your overall match score"
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Privacy Guaranteed</h4>
                      <p className="text-xs text-indigo-400/60">Your data is encrypted and secure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-6xl w-full space-y-8 relative z-10"
          >
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-gray-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-sm">
              <div className="space-y-4 text-center md:text-left">
                <Button
                  variant="ghost"
                  onClick={() => { setReport(null); router.push("/dashboard/ats"); }}
                  className="text-gray-500 hover:text-white p-0 h-auto"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Upload
                </Button>
                <div className="space-y-1">
                  <h1 className="text-3xl font-black text-white tracking-tight">Resume: {report.resumeName}</h1>
                  <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-xs justify-center md:justify-start">
                    <Target size={14} />
                    <span>Job Description Analysis</span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                <div className="relative z-10 bg-black/40 p-6 rounded-full border border-white/10">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                      <circle
                        cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8"
                        strokeDasharray={364.4}
                        strokeDashoffset={364.4 - (364.4 * (report?.atsScore || 0)) / 100}
                        strokeLinecap="round" fill="transparent"
                        className="text-indigo-500 transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-white">{report.atsScore}</span>
                      <span className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">ATS Score</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Analysis Bar - 2 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Keyword Match */}
              <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-5 space-y-3 hover:border-indigo-500/30 transition-colors">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Target size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Keyword Match</span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-black text-white">{report.keywordScore}%</span>
                  <span className="text-[10px] text-gray-500 font-bold">Dynamic Keyword Alignment</span>
                </div>
              </div>

              {/* Card 2: Readability */}
              <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-5 space-y-3 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Readability</span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-black text-white">{report.readabilityScore}%</span>
                  <span className="text-[10px] text-gray-500 font-bold">Sentence Complexity Score</span>
                </div>
              </div>
            </div>

            {/* Actionable Recommendations & Keyword Optimization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recommendations */}
              <div className="bg-gray-900/50 border border-white/10 rounded-3xl p-4 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-indigo-400" size={20} />
                  <h3 className="text-sm sm:text-lg font-black text-white tracking-tight uppercase">Actionable Improvements</h3>
                </div>
                <div className="space-y-4">
                  {(report.improvements || report.suggestions)?.map((s: any, idx: number) => (
                    <div key={idx} className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors group">
                      <div className="mt-1">
                        <CheckCircle2 size={16} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm text-white font-bold leading-relaxed">{s.title || s.issue || s}</h4>
                        <p className="text-[10px] sm:text-xs text-gray-400 font-medium leading-relaxed">{s.description || s.suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keyword Optimization */}
              <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-3xl p-4 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Target className="text-indigo-400" size={20} />
                    <h3 className="text-sm sm:text-lg font-black text-white tracking-tight uppercase">Keyword Optimization</h3>
                  </div>
                  <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[10px]">
                    Score: {report.keywordScore}%
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Matched Keywords */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">Matched Keywords</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {report.matchedKeywords?.slice(0, 8).map((kw: string, i: number) => (
                        <span key={i} className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase">
                          {kw}
                        </span>
                      )) || <span className="text-xs text-gray-500 italic">None matched yet</span>}
                    </div>
                  </div>

                  {/* Missing Keywords */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={14} className="text-rose-500" />
                      <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">Missing Keywords</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {report.missingKeywords?.slice(0, 8).map((kw: string, i: number) => (
                        <span key={i} className="px-2 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold text-rose-400 uppercase">
                          {kw}
                        </span>
                      )) || <span className="text-xs text-gray-500 italic">Excellent! No missing keywords.</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <JobDescriptionModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        onSubmit={handleJDSubmit}
        isLoading={isAnalyzing}
      />
    </div>
  );
}

export default function ATSUploadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] w-full flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
      </div>
    }>
      <ATSViewContent />
    </Suspense>
  );
}
