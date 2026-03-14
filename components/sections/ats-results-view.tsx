"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, FileText, Sparkles, Download, ArrowLeft, BrainCircuit, Target, BookOpen, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpeedometerMini } from "@/components/dashboard/SpeedometerMini";
import { MetricCardSmall } from "@/components/dashboard/MetricCardSmall";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ATSResultsViewProps {
  report: {
    overallScore: number;
    keywordScore: number;
    skillsScore: number;
    structureScore: number;
    readabilityScore: number;
    atsComplianceScore: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    suggestions: { issue: string; why: string; suggestion: string }[];
  };
  onBack: () => void;
  onExport?: () => void;
}

export function ATSResultsView({ report, onBack, onExport }: ATSResultsViewProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    if (score >= 60) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    return "text-rose-400 bg-rose-400/10 border-rose-400/20";
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

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12"
    >
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white hover:bg-white/5">
          <ArrowLeft className="mr-2 h-4 w-4" /> New Analysis
        </Button>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={onExport} variant="outline" className="flex-1 sm:flex-none border-white/10 hover:bg-white/5">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-700">
            <Sparkles className="mr-2 h-4 w-4" /> Boost Resume
          </Button>
        </div>
      </div>

      {/* Main Score Card */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <SpeedometerMini score={report.overallScore} size={180} />
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
              <span className="text-5xl font-black text-white">{report.overallScore}</span>
              <span className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Overall ATS Score</span>
            </div>
          </div>
          <Badge className={`px-4 py-1.5 rounded-full border ${getScoreColor(report.overallScore)}`}>
            {report.overallScore >= 80 ? "Premium Grade" : report.overallScore >= 60 ? "Solid Base" : "Needs Improvement"}
          </Badge>
          <p className="text-gray-400 text-sm mt-4 max-w-[200px]">
            {report.overallScore >= 80 ? "Your resume is highly optimized for modern ATS systems." : "A few strategic changes could significantly improve your visibility."}
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <MetricCardSmall title="Keyword Match" value={`${report.keywordScore}%`} color="blue"  icon={<Target size={14} />} />
          <MetricCardSmall title="Skills Gap" value={`${report.skillsScore}%`} color="purple" icon={<BrainCircuit size={14} />} />
          <MetricCardSmall title="Structure" value={`${report.structureScore}%`} color="rose"  icon={<BookOpen size={14} />} />
          <MetricCardSmall title="Readability" value={`${report.readabilityScore}%`} color="green" icon={<ShieldCheck size={14} />} />
        </div>
      </motion.div>

      {/* Keywords Analysis */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-white/10 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <CheckCircle2 className="text-emerald-400 h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Matched Keywords</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {report.matchedKeywords.length > 0 ? (
              report.matchedKeywords.map((kw, idx) => (
                <Badge key={idx} variant="outline" className="bg-emerald-400/5 border-emerald-400/20 text-emerald-400 px-3 py-1">
                  {kw}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No keyword matches detected.</span>
            )}
          </div>
        </div>

        <div className="bg-gray-900/50 border border-white/10 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-rose-500/10 rounded-lg">
              <AlertTriangle className="text-rose-400 h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Missing Keywords</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {report.missingKeywords.length > 0 ? (
              report.missingKeywords.map((kw, idx) => (
                <Badge key={idx} variant="outline" className="bg-rose-400/5 border-rose-400/20 text-rose-400 px-3 py-1">
                  {kw}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 text-sm">Excellent coverage! No key terms missing.</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Suggestions */}
      <motion.div variants={item} className="space-y-4">
        <div className="flex items-center gap-2 mb-2 px-2">
          <Sparkles className="text-primary h-5 w-5" />
          <h3 className="font-bold text-lg text-white">Actionable Suggestions</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {report.suggestions.map((s, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-6 items-start hover:border-primary/30 transition-colors group">
              <div className="hidden sm:flex p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <BrainCircuit className="text-primary h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white text-lg">{s.issue}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{s.why}</p>
                <div className="mt-4 p-4 bg-primary/5 border border-primary/10 rounded-xl">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">How to Fix</span>
                  <p className="text-white text-sm font-medium">{s.suggestion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
