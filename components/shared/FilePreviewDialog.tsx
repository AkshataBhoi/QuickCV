"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ResumePreview } from "@/components/builder/ResumePreview";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { useUser } from "@/components/providers/user-provider";
import { CoverLetterPreview } from "@/components/builder/CoverLetterPreview";
import { X, ExternalLink, Download, FileText, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FilePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: {
    url?: string;
    data?: any;
    type?: string;
    name?: string;
    template?: string;
  } | null;
}

export function FilePreviewDialog({
  open,
  onOpenChange,
  file,
}: FilePreviewDialogProps) {
  const { user } = useUser(); // Removed toast from useUser as it's now imported from sonner
  const printRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isResume = file?.type === "Resume";
  const isCoverLetter = file?.type === "Cover Letter";
  const isATS = file?.type === "ATS Report";
  const isExternalFile = (file?.type === "PDF" || file?.type === "Image" || !!file?.url) && !isResume && !isCoverLetter && !isATS;

  // Fix for Next.js Hydration: Ensure PDF only renders on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (open && file) {
      if (isResume || isCoverLetter || isATS) {
        // These components are usually fast, but we'll show a quick loader
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
      } else {
        setIsLoading(true);
        setHasError(false);
      }
    }
  }, [open, file, isResume, isCoverLetter, isATS]);

  if (!file) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col bg-[#0f111a] border-white/10 text-white p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="px-6 py-4 border-b border-white/10 flex flex-row items-center justify-between shrink-0">
          <DialogTitle>{file.name}</DialogTitle>
          <div className="ml-auto mr-8 flex items-center gap-2">
            {isCoverLetter && user.accountType !== "premium" && (
              <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                Premium Only
              </span>
            )}

            {/* // --- PDF DOWNLOAD LOGIC --- */}
            <Button
              size="sm"
              onClick={() => {
                if (!file?.data) return;

                // Success toast
                toast("Preparing your download...", { description: "Your document is being generated." });

                // Use LocalStorage to pass data (Url length safe)
                const payload = {
                  type: isResume ? "resume" : "cover-letter",
                  template: file.template || "clean",
                  data: file.data
                };
                localStorage.setItem("print_payload", JSON.stringify(payload));

                // Open print page (it will read from storage)
                window.open("/print/resume", "_blank");
              }}
              className="text-primary text-black"
            >
              <Download className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline">Download PDF</span>
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-zinc-900/50 relative">
          {!isClient && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-900/80 backdrop-blur-sm">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Initializing preview...</p>
            </div>
          )}

          {isClient && isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-900/80 backdrop-blur-sm">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground animate-pulse">Loading document...</p>
            </div>
          )}

          {hasError && isExternalFile && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-900/80 backdrop-blur-sm p-6 text-center">
              <AlertCircle className="h-12 w-12 text-rose-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Failed to load document</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                There was an error loading the file. Please try downloading it instead or check your connection.
              </p>
              <Button variant="outline" onClick={() => setHasError(false)} className="border-white/10">
                Try Again
              </Button>
            </div>
          )}

          {isClient && (isResume || isCoverLetter) && file.data && (
            <div className="flex justify-center">
              <div
                ref={printRef}
                style={{
                  width: "100%",
                  maxWidth: "210mm",
                  minHeight: "297mm",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                }}
                className="pdf-safe shadow-2xl p-4 md:p-8 scale-90 sm:scale-100 origin-top"
              >
                <div className="w-full">
                  {isResume ? (
                    <ResumePreview
                      data={file.data}
                      template={file.template || "clean"}
                    />
                  ) : (
                    <CoverLetterPreview
                      data={file.data}
                      template={(file.template as any) || "clean"}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {isClient && isATS && file.data && (
            <div className="max-w-3xl mx-auto space-y-6 text-white">
              {/* ATS UI Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-400">{file.data.overallScore || file.data.score || 0}/100</div>
                  <div className="text-xs text-muted-foreground uppercase">Score</div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-emerald-400">{file.data.keywordScore || 0}%</div>
                  <div className="text-xs text-muted-foreground uppercase">Keywords</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-purple-400">{file.data.readabilityScore || 0}%</div>
                  <div className="text-xs text-muted-foreground uppercase">Readability</div>
                </div>
              </div>

              {/* Extracted Content Section */}
              {(file.data.extractedText || file.data.content) && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                       <FileText className="h-5 w-5 text-primary" />
                       Extracted Content Preview
                    </h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-7 border-white/10"
                      onClick={() => {
                        navigator.clipboard.writeText(file.data.extractedText || JSON.stringify(file.data.content));
                        toast.success("Content copied to clipboard");
                      }}
                    >
                      Copy Text
                    </Button>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-6 font-mono text-sm text-gray-400 max-h-[400px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {file.data.extractedText || (typeof file.data.content === 'string' ? file.data.content : JSON.stringify(file.data.content, null, 2))}
                  </div>
                </div>
              )}
            </div>
          )}

          {isClient && isExternalFile && file.url && (
            <div className="w-full h-full flex items-center justify-center min-h-[500px]">
              {file.type === "Image" ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="max-w-full h-auto shadow-2xl rounded-lg"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                  }}
                />
              ) : (
                <iframe
                  src={file.url}
                  className="w-full h-full border-0 rounded-lg shadow-2xl min-h-[600px] bg-white"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                  }}
                  title={file.name}
                />
              )}
            </div>
          )}

          {isClient && !isLoading && !hasError && !isResume && !isATS && !isCoverLetter && (!isExternalFile || !file.url) && (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-zinc-900/50 rounded-2xl border border-dashed border-white/10">
              <AlertCircle className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Unable to preview document</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Preview is not available for this file type or the source data is missing.
              </p>
              {isExternalFile && (
                <p className="text-xs text-primary mt-4 cursor-pointer hover:underline" onClick={() => window.open(file.url, '_blank')}>
                   Open in new tab instead
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}