import React, { Suspense } from "react";
import { ResumePreview } from "@/components/builder/ResumePreview";
import { CoverLetterPreview } from "@/components/builder/CoverLetterPreview";
import { Loader2 } from "lucide-react";

interface ViewRendererProps {
  type: "resume" | "cover-letter" | "ats";
  data: any;
  template?: string;
  isPrintMode?: boolean;
}

export function ViewRenderer({ type, data, template = "clean", isPrintMode = false }: ViewRendererProps) {
  if (!data) return null;

  return (
    <Suspense
      fallback={
        <div className="h-full w-full flex items-center justify-center bg-white min-h-[500px]">
          <Loader2 className="animate-spin text-gray-400 h-8 w-8" />
        </div>
      }
    >
      <div 
        className={`w-full bg-white text-black ${isPrintMode ? 'print-mode' : ''}`}
        style={{
          width: "100%",
          maxWidth: "210mm",
          minHeight: "297mm",
          margin: "0 auto",
        }}
      >
        {type === "resume" ? (
          <ResumePreview data={data.content || data} template={template} />
        ) : type === "cover-letter" ? (
          <CoverLetterPreview data={data.content || data} template={template as any} />
        ) : (
          <div className="p-8 text-black">
            {/* Minimal ATS Print View */}
            <h1 className="text-2xl font-bold mb-4">ATS Report</h1>
            <div className="mb-6 grid grid-cols-3 gap-4">
               <div><strong>Score:</strong> {data.overallScore || data.score || data.atsScore || 0}/100</div>
               <div><strong>Keywords:</strong> {data.keywordScore || 0}%</div>
               <div><strong>Readability:</strong> {data.readabilityScore || 0}%</div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Extracted Text</h2>
            <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded border">
               {data.extractedText || (typeof data.content === 'string' ? data.content : JSON.stringify(data.content, null, 2))}
            </pre>
          </div>
        )}
      </div>
    </Suspense>
  );
}
