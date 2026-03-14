"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Link as LinkIcon } from "lucide-react";

interface JobDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jd: string) => void;
  isLoading: boolean;
}

export function JobDescriptionModal({ isOpen, onClose, onSubmit, isLoading }: JobDescriptionModalProps) {
  const [jd, setJd] = useState("");

  const handleClear = () => setJd("");

  const wordCount = jd.trim() ? jd.trim().split(/\s+/).length : 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isLoading && !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-primary" size={24} />
            Target Job Description
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Paste the job description you're targeting. Our AI will analyze your resume against these specific requirements.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-300">Job Description Text</label>
              <span className={`text-xs ${wordCount < 50 ? 'text-yellow-500' : 'text-gray-500'}`}>
                {wordCount} words {wordCount < 50 && "(Min 50 recommended)"}
              </span>
            </div>
            <Textarea
              placeholder="Paste the full job description here..."
              className="min-h-[250px] bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 transition-colors"
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs">
            <LinkIcon size={14} />
            <span>Optional: We'll soon support direct LinkedIn/Indeed URL parsing!</span>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={handleClear}
            disabled={isLoading || !jd}
            className="text-gray-400 hover:text-white hover:bg-white/5"
          >
            Clear
          </Button>
          <Button
            onClick={() => onSubmit(jd)}
            disabled={isLoading || wordCount < 10}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze Resume
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
