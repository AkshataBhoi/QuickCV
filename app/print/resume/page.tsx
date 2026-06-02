"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { ViewRenderer } from "@/components/shared/ViewRenderer";
import apiClient from "@/lib/api/client";

function PrintContent() {
  const searchParams = useSearchParams();
  const [template, setTemplate] = useState<any>("clean");
  const [data, setData] = useState<any>(null);
  const [type, setType] = useState<string>("resume");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchById = async (id: string) => {
      try {
        const response = await apiClient.get(`/api/resume/${id}/print`);
        const result = response.data;
        if (result.data) {
          let finalType = result.data.type || "resume";
          let finalData = result.data.content;

          // If it's an ATS scan, fetch the actual ATS report
          if (result.data.status === "ATS_SCAN" || finalType === "ATS Scan") {
            try {
              const atsRes = await apiClient.get(`/api/ats/report/${id}/latest`);
              if (atsRes.data && atsRes.data.data) {
                finalData = atsRes.data.data;
                finalType = "ats";
              }
            } catch (e) {
              console.error("Failed to fetch ATS report for print", e);
            }
          }

          setData(finalData);
          setType(finalType);
          setTemplate(result.data.templateId || "clean");
        } else {
          setError(result.message || "Failed to load document.");
        }
      } catch (e: any) {
        console.error("Print fetch error:", e);
        setError("Network error. Please try again.");
      }
    };

    // 1. Check for ID in URL (Best Practice)
    const id = searchParams.get("id");
    if (id) {
      fetchById(id);
      return;
    }

    // 2. Fallback to LocalStorage (Legacy)
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

    // 3. Fallback to URL Params (Legacy)
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
    if (data && type) {
      console.log("Export Data:", data);
      // Delay printing to allow components and fonts to fully render
      const timer = setTimeout(() => {
        window.print();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [data, type]);

  if (error) return <div className="p-20 text-red-500 bg-white">{error}</div>;
  if (!data) return <div className="p-20 bg-zinc-950 text-white">Loading document data...</div>;

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
        <ViewRenderer type={type as "resume" | "cover-letter" | "ats"} data={data} template={template} isPrintMode={true} />
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