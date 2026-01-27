"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { ResumePreview } from "@/components/builder/ResumePreview";
import { CoverLetterPreview } from "@/components/builder/CoverLetterPreview";

function PrintContent() {
  const searchParams = useSearchParams();
  const [template, setTemplate] = useState<any>("clean");
  const [data, setData] = useState<any>(null);
  const [type, setType] = useState<string>("resume");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Try LocalStorage
    const storedPayload = localStorage.getItem("print_payload");
    if (storedPayload) {
      try {
        const parsed = JSON.parse(storedPayload);
        if (parsed.data) setData(parsed.data);
        if (parsed.type) setType(parsed.type);
        if (parsed.template) setTemplate(parsed.template);
        return;
      } catch (e) {
        console.error("Failed to parse local storage payload", e);
      }
    }

    // 2. Fallback to URL Params
    const typeParam = searchParams.get("type");
    const templateParam = searchParams.get("template");
    const dataParam = searchParams.get("data");

    if (typeParam) setType(typeParam);
    if (templateParam) setTemplate(templateParam);

    if (dataParam) {
      try {
        const parsed = JSON.parse(dataParam);
        setData(parsed);
      } catch (e) {
        setError("Failed to load document data.");
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        window.print();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  if (error) return <div className="p-20 text-red-500 bg-white">{error}</div>;
  if (!data) return <div className="p-20 bg-zinc-950 text-white">Loading preview...</div>;

  return (
    <div className="min-h-screen w-full bg-zinc-800/50 flex justify-center py-12 print:bg-white print:p-0">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; -webkit-print-color-adjust: exact; }
          .no-print { display: none; }
        }
      `}</style>

      <div className="relative bg-white shadow-2xl w-[210mm] min-h-[297mm] print:shadow-none print:w-full print:m-0">
        {type === "resume" ? (
          <ResumePreview data={data} template={template} />
        ) : (
          <CoverLetterPreview data={data} template={template} />
        )}
      </div>
    </div>
  );
}

export default function PrintResumePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-blue-900" />}>
      <PrintContent />
    </Suspense>
  );
}