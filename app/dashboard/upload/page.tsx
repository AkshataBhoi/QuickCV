"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, Sparkles, CheckCircle2, AlertTriangle, Loader2, Save, ArrowRight, Target, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { Toast } from "@/components/ui/toast";
import { useUser } from "@/components/providers/user-provider";
import { useDashboardFile } from "@/components/providers/dashboard-file-provider";
import { useDebounce } from "@/hooks/use-debounce";
import { MetricCardSmall } from "@/components/dashboard/MetricCardSmall";
import { SpeedometerMini } from "@/components/dashboard/SpeedometerMini";
import { useRouter } from "next/navigation";

type ATSResult = {
    overallScore: number;
    jobMatchScore: number;
    readabilityScore: number;
    structureScore: number;
    metricsScore: number;
    grammarScore: number;
    completenessScore: number;
    strengths: string[];
    improvements: { issue: string; why: string; suggestion: string }[];
    missingKeywords: string[];
    detectedKeywords: string[];
};

export default function ResumeUploadPage() {
    const { user } = useUser();
    const { addFile, setActiveFile } = useDashboardFile();
    const { showToast, toastMessage, toastType, displayToast, hideToast } = useToast();
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [parsing, setParsing] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [extractedText, setExtractedText] = useState("");
    const [result, setResult] = useState<ATSResult | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [resumeId, setResumeId] = useState<string | null>(null);

    const debouncedJD = useDebounce(jobDescription, 800);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    // Trigger ATS scan when text or JD changes
    const runATSScan = useCallback(async (text: string, jd: string, existingId: string | null) => {
        if (!text) return;
        setAnalyzing(true);
        try {
            // Create a minimal content object for the analyzer
            const content = {
                summary: text.slice(0, 500), // Very rough, the analyzer usually expects a structured object
                experience: [], // In a real app, we'd parse this into structure first
                education: [],
                skills: [],
                rawText: text
            };

            const response = await fetch(`${API_URL}/api/ai/resume/analyze-ats`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?.id,
                    resumeId: existingId || "resume-draft",
                    content,
                    jobDescription: jd,
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || "Scan failed");

            setResult(data.analysis as ATSResult);

            // If we don't have a resumeId yet, let's "save" this as a draft if possible
            // This is a simplified flow
        } catch (error: any) {
            console.error("ATS Scan Error:", error);
            displayToast(error.message || "Failed to analyze resume", "error");
        } finally {
            setAnalyzing(false);
        }
    }, [user?.id, API_URL, displayToast]);

    // Handle file drop/selection
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setParsing(true);
        setResult(null);
        setExtractedText("");

        const formData = new FormData();
        formData.append("resume", selectedFile);

        try {
            const response = await fetch(`${API_URL}/api/files/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || "Upload failed");

            const text = data.data.text;
            setExtractedText(text);
            setParsing(false);

            // Successfully parsed, now auto-save and scan
            const saveResponse = await fetch(`${API_URL}/api/resume`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: selectedFile.name.replace(/\.[^/.]+$/, ""),
                    content: { rawText: text },
                    templateId: "modern",
                    type: "resume"
                }),
            });
            const saveData = await saveResponse.json();
            if (saveResponse.ok && saveData.data?._id) {
                setResumeId(saveData.data._id);
                addFile(saveData.data);
                // Trigger initial scan
                runATSScan(text, jobDescription, saveData.data._id);
            } else {
                // Fallback to draft scan
                runATSScan(text, jobDescription, null);
            }

            displayToast("File saved successfully ✓", "success");
        } catch (error: any) {
            console.error("Upload Error:", error);
            displayToast(error.message || "Failed to upload and parse", "error");
            setParsing(false);
        }
    }, [API_URL, displayToast, jobDescription, addFile, runATSScan]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        },
        multiple: false,
        disabled: parsing || analyzing,
    });

    // Re-scan when JD changes (debounced)
    useEffect(() => {
        if (extractedText && debouncedJD !== undefined) {
            runATSScan(extractedText, debouncedJD, resumeId);
        }
    }, [debouncedJD, extractedText, resumeId, runATSScan]);

    const handleGoToATS = () => {
        if (resumeId) {
            setActiveFile(resumeId);
            router.push("/dashboard/ats");
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-20">
            <Toast message={toastMessage} isVisible={showToast} onClose={hideToast} type={toastType} />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Upload & Scan</h1>
                    <p className="text-muted-foreground">Upload your resume and get instant ATS insights.</p>
                </div>
                {resumeId && (
                    <Button variant="outline" onClick={handleGoToATS} className="group">
                        View Full Analysis <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Upload & JD */}
                <div className="lg:col-span-12 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Dropzone */}
                        <div
                            {...getRootProps()}
                            className={`relative group h-64 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden ${isDragActive ? "border-primary bg-primary/5 active-scale-95" : "border-white/10 hover:border-white/20 hover:bg-white/5"
                                } ${parsing || analyzing ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <input {...getInputProps()} />

                            {/* Background Decor */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors" />

                            {(parsing || analyzing) ? (
                                <div className="flex flex-col items-center gap-4 text-center p-6 relative z-10">
                                    <div className="relative">
                                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                                        <div className="absolute inset-0 bg-primary/20 blur-[20px] rounded-full animate-pulse" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-lg">{parsing ? "Uploading & Parsing..." : "Analyzing ATS Match..."}</p>
                                        <p className="text-sm text-muted-foreground">This takes just a few seconds.</p>
                                    </div>
                                </div>
                            ) : file ? (
                                <div className="flex flex-col items-center gap-4 text-center p-6 relative z-10">
                                    <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                                        <FileText className="h-10 w-10" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-lg">{file.name}</p>
                                        <p className="text-sm text-emerald-400 font-medium flex items-center justify-center gap-1">
                                            <CheckCircle2 className="h-4 w-4" /> Ready for Scan
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="mt-2 text-muted-foreground hover:text-white" onClick={(e) => {
                                        e.stopPropagation();
                                        setFile(null);
                                        setResult(null);
                                        setResumeId(null);
                                    }}>
                                        Try a different file
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4 text-center p-8 relative z-10">
                                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                                        <Upload className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-lg">Click or drag to upload</p>
                                        <p className="text-sm text-muted-foreground max-w-[240px]">Support for PDF and DOCX files. Max size 5MB.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Job Description */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Target className="h-4 w-4" /> Job Description <span className="text-[10px] font-normal lowercase">(Optional)</span>
                                </h3>
                                {analyzing && <div className="flex items-center gap-1.5 text-[10px] text-primary animate-pulse font-medium uppercase tracking-tighter"><Loader2 className="h-2.5 w-2.5 animate-spin" /> Recalculating Match...</div>}
                            </div>
                            <Textarea
                                placeholder="Paste the target job description here to see your match score live. Our AI will analyze requirements and suggest improvements instantly."
                                className="h-[210px] bg-black/40 border-white/10 rounded-3xl resize-none focus:ring-1 focus:ring-primary/50 transition-all text-sm leading-relaxed p-6"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                disabled={parsing}
                            />
                        </div>
                    </div>
                </div>

                {/* Results Display */}
                {result && (
                    <div className="lg:col-span-12 space-y-8 mt-4 animate-scale-in">
                        {/* Quick Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            <div className="col-span-1 md:row-span-1 border border-white/10 rounded-3xl p-6 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center hover:border-primary/30 transition-all group overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 blur-[30px] rounded-full -mr-10 -mt-10" />
                                <SpeedometerMini score={result.overallScore} size={100} />
                                <span className="text-sm font-bold mt-4 tracking-tight uppercase text-muted-foreground">ATS Score</span>
                            </div>
                            <MetricCardSmall title="Job Match" value={`${result.jobMatchScore}%`} color="blue" subValue="Semantic alignment" />
                            <MetricCardSmall title="Structure" value={`${result.structureScore}%`} color="purple" subValue="Section hierarchy" />
                            <MetricCardSmall title="Readability" value={`${result.readabilityScore}%`} color="green" subValue="Complex sentence index" />
                            <MetricCardSmall title="Completeness" value={`${result.completenessScore}%`} subValue="Key section check" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Strengths */}
                            <div className="p-8 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/20 transition-all">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none" />
                                <h3 className="text-lg font-bold text-emerald-400 mb-6 flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-emerald-500/10"><Sparkles className="h-5 w-5" /></div>
                                    What You Did Well
                                </h3>
                                <ul className="space-y-4">
                                    {result.strengths.slice(0, 5).map((s, i) => (
                                        <li key={i} className="flex gap-4 text-sm text-gray-300 animate-slide-right" style={{ animationDelay: `${i * 100}ms` }}>
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                                            <span className="leading-relaxed">{s}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Improvements */}
                            <div className="p-8 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-md relative overflow-hidden group hover:border-rose-500/20 transition-all">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-[50px] rounded-full pointer-events-none" />
                                <h3 className="text-lg font-bold text-rose-400 mb-6 flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-rose-500/10"><AlertTriangle className="h-5 w-5" /></div>
                                    Immediate Improvements
                                </h3>
                                <div className="space-y-5">
                                    {result.improvements.slice(0, 3).map((imp, i) => (
                                        <div key={i} className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all animate-slide-right" style={{ animationDelay: `${i * 100}ms` }}>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-white">{imp.issue}</span>
                                                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-rose-500/10">Priority</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{imp.why}</p>
                                            <div className="pt-2 mt-2 border-t border-white/5 flex items-start gap-2">
                                                <Zap className="h-3 w-3 text-amber-400 mt-0.5 flex-shrink-0" />
                                                <p className="text-[11px] text-amber-400/90 font-medium italic">{imp.suggestion}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center pt-8">
                            <Button size="lg" onClick={handleGoToATS} className="h-14 px-8 rounded-2xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-xl shadow-primary/20 border-0 text-md font-bold group">
                                Unlock Full Report & Keyword Analysis <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
