"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";

interface JobDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jd: string) => void;
  isLoading: boolean;
}

export function JobDescriptionModal({ isOpen, onClose, onSubmit, isLoading }: JobDescriptionModalProps) {
  const [jd, setJd] = useState("");
  const [error, setError] = useState<string | null>(null);

  const wordCount = jd.trim() ? jd.trim().split(/\s+/).length : 0;
  const charCount = jd.trim().length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (charCount < 50) {
      setError("Please provide a more detailed job description (min 50 characters).");
      return;
    }
    setError(null);
    onSubmit(jd);
  };

  return (
    // <Dialog open={isOpen} onOpenChange={(open) => !isLoading && !open && onClose()}>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] bg-gray-900 border-white/10 text-white shadow-2xl p-8 rounded-3xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400">
                <Sparkles size={24} />
              </div>
              <DialogTitle className="text-3xl font-black tracking-tight">Let's Target Your Scan</DialogTitle>
            </div>
            <DialogDescription className="text-gray-400 text-lg leading-relaxed font-medium">
              Paste the job description you're targeting. Our AI will analyze your resume against these specific requirements to give you the most accurate match score.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Target Job Description</label>
                <div className="flex gap-4">
                  <span className={`text-xs font-bold ${charCount < 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {charCount} / 50 chars
                  </span>
                  <span className="text-xs font-bold text-gray-500">
                    {wordCount} words
                  </span>
                </div>
              </div>
              <Textarea
                placeholder="Paste the full job description here (Role, Requirements, Qualifications)..."
                className="min-h-[300px] bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-indigo-500/50 rounded-2xl p-6 text-base leading-relaxed resize-none transition-all duration-300"
                value={jd}
                onChange={(e) => {
                  setJd(e.target.value);
                  if (e.target.value.length >= 100) setError(null);
                }}
                disabled={isLoading}
              />
              {error && (
                <div className="flex items-center gap-2 text-rose-400 text-sm font-medium mt-2 px-1">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex-row sm:justify-between items-center gap-4 mt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
              className="text-gray-500 hover:text-white hover:bg-white/5 font-bold rounded-xl h-12 px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || jd.trim().length === 0}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl h-12 px-10 shadow-lg shadow-indigo-600/20 group overflow-hidden relative"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Deep Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>Analyze Resume</span>
                </div>
              )}
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
