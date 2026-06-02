"use client";

import { useState } from "react";
import { Loader2, Zap, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import apiClient from "@/lib/api/client";

interface SkillGapAnalysisProps {
  resumeSkills: string[];
}

export function SkillGapAnalysis({ resumeSkills }: SkillGapAnalysisProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    matchingSkills: string[];
    missingSkills: string[];
    score: number;
  } | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please provide a job description");
      return;
    }

    if (resumeSkills.length === 0) {
      toast.error("Add some skills to your resume first");
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await apiClient.post("/api/ai/skill-gap", {
        resumeSkills,
        jobDescription,
      });
      setResult(response.data);
      toast.success("Skill gap analysis complete!");
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast.error(error.response?.data?.message || "Failed to analyze skill gap");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mt-6 border border-indigo-500/20 rounded-xl bg-indigo-500/5 p-4 sm:p-6 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
          <Zap className="h-4 w-4 text-indigo-400" />
          Smart Skill Gap Analysis
        </h3>
        <p className="text-xs text-muted-foreground mb-4 max-w-[90%]">
          Paste the job description you're applying for to see which skills you're missing.
        </p>

        <Textarea
          placeholder="Paste Job Description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="bg-black/20 border-white/10 text-sm min-h-[100px] resize-none mb-4 focus:border-indigo-500/50"
        />

        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !jobDescription.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Skills...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Analyze Match
            </>
          )}
        </Button>

        {result && (
          <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm font-medium text-white">Match Score</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{result.score}%</span>
                <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${result.score > 80 ? 'bg-emerald-500' : result.score > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Matching Skills ({result.matchingSkills.length})
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {result.matchingSkills.length > 0 ? result.matchingSkills.map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">
                      {skill}
                    </span>
                  )) : (
                    <span className="text-xs text-muted-foreground italic">None found</span>
                  )}
                </div>
              </div>

              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                <h4 className="text-xs font-bold text-red-400 flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Missing Skills ({result.missingSkills.length})
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {result.missingSkills.length > 0 ? result.missingSkills.map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-red-500/20 text-red-300 border border-red-500/20">
                      {skill}
                    </span>
                  )) : (
                    <span className="text-xs text-muted-foreground italic">None missing!</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
