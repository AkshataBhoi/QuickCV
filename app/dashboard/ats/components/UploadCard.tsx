"use client";

import React, { useRef, useState, useCallback } from "react";
import { Upload, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface UploadCardProps {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
  uploadProgress: number;
}

export function UploadCard({ onFileSelect, isUploading, uploadProgress }: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF or DOCX file.");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative group rounded-3xl border-2 border-dashed transition-all duration-300 p-12 text-center overflow-hidden
          ${isDragging ? "border-indigo-500 bg-indigo-500/5 shadow-[0_0_30px_rgba(99,102,241,0.2)]" : "border-white/10 bg-black/40 hover:border-white/20"}
          ${isUploading ? "pointer-events-none opacity-80" : "cursor-pointer"}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.docx,.doc"
          onChange={handleFileChange}
        />

        {/* Glow Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="space-y-6">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
            <Upload size={32} />
            <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">Upload Resume for ATS Scan</h3>
            <p className="text-gray-400 font-medium">Drag & drop or click to select a file</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">PDF or DOCX up to 10MB</p>
          </div>

          {!selectedFile && (
            <Button
              variant="outline"
              className="mt-4 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl px-8"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Select File
            </Button>
          )}

          <AnimatePresence>
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 flex-shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-sm font-bold text-white truncate max-w-[200px]">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                {!isUploading && (
                  <button
                    onClick={removeFile}
                    className="p-1 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
                {isUploading && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-indigo-400 font-bold">{uploadProgress}%</span>
                  </div>
                )}
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 justify-center text-rose-400 text-sm font-medium"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isUploading && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
            <motion.div
              className="h-full bg-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
