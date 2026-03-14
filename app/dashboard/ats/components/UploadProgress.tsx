"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

interface UploadProgressProps {
  progress: number;
  status: "idle" | "uploading" | "success" | "error";
}

export function UploadProgress({ progress, status }: UploadProgressProps) {
  if (status === "idle") return null;

  const isSuccess = status === "success";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-8 max-w-xl mx-auto p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-4 text-center shadow-xl backdrop-blur-md"
    >
      <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${isSuccess ? "bg-emerald-500" : "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="flex items-center gap-3">
        {status === "uploading" ? (
          <>
            <Loader2 className="h-5 w-5 text-indigo-400 animate-spin" />
            <p className="text-sm font-bold text-white tracking-tight uppercase">Uploading Resume... <span className="text-indigo-400">{progress}%</span></p>
          </>
        ) : isSuccess ? (
          <>
            <div className="p-1.5 bg-emerald-500/10 rounded-full text-emerald-500">
              <CheckCircle2 size={20} />
            </div>
            <p className="text-sm font-black text-white tracking-tight uppercase">Upload Successful!</p>
          </>
        ) : null}
      </div>

      {isSuccess && (
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest animate-pulse">
          Analyzing content for Job Description alignment...
        </p>
      )}
    </motion.div>
  );
}
