"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Save, CheckCircle2, AlertTriangle, FileText, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MetricCardSmall } from "@/components/dashboard/MetricCardSmall";
import { SpeedometerMini } from "@/components/dashboard/SpeedometerMini";
import { Toast, useToast } from "@/components/ui/toast";
import { SaveFileDialog } from "@/components/shared/SaveFileDialog";

export default function ATSAnalysisPage() {
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const { showToast, toastMessage, toastType, displayToast, hideToast } = useToast();

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            simulateAnalysis();
        }
    };

    const handleSaveClick = () => {
        setSaveDialogOpen(true);
    };

    const onSaveFile = (name: string) => {
        // Save to local files (mock)
        const myFiles = JSON.parse(localStorage.getItem("my_files") || "[]");
        const reportId = `ats-${Date.now()}`;

        const newFile = {
            id: reportId,
            name: name.endsWith(".pdf") ? name : `${name}.pdf`, // Mock extension logic
            type: "ATS Report",
            template: "-",
            date: new Date().toLocaleDateString(),
            status: "Complete",
            data: result
        };

        myFiles.push(newFile);
        localStorage.setItem("my_files", JSON.stringify(myFiles));
        displayToast("ATS Report saved to My Files!", "success");
    };

    const simulateAnalysis = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setResult({
                score: 78,
                match: 85,
                grammar: 92,
                tone: "Professional",
                missingSkills: ["Docker", "Kubernetes", "AWS"],
                goodPoints: ["Clear contact info", "Good formatting", "Metrics included"],
                badPoints: ["Summary too long", "Passive voice usage", "Keyword density low"]
            });
            setAnalyzing(false);
        }, 2000);
    };

    return (
        <div className="space-y-6 animate-fade-in-up max-w-5xl mx-auto">
            <Toast message={toastMessage} isVisible={showToast} onClose={hideToast} type={toastType} />
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">ATS Analysis</h1>
                <p className="text-muted-foreground text-sm">Upload a specific resume to check its compatibility against job descriptions.</p>
            </div>

            {!result && (
                <div className="h-[65vh] flex items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-12 text-center bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer relative group">
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleUpload}
                        accept=".pdf,.docx"
                    />
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {analyzing ? (
                                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Upload className="h-8 w-8 text-primary" />
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{analyzing ? "Analyzing Document..." : "Drop your resume here"}</h3>
                            <p className="text-sm text-muted-foreground mt-1">PDF or DOCX up to 10MB</p>
                        </div>
                    </div>
                </div>
            )}

            {result && (
                <div className="space-y-6">
                    {/* Action Bar */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">{file?.name}</h3>
                                <p className="text-xs text-muted-foreground">Analyzed just now</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => { setResult(null); setFile(null); }}>
                                <X className="h-4 w-4 mr-2" /> Clear
                            </Button>
                            <Button size="sm" onClick={handleSaveClick}>
                                <Save className="h-4 w-4 mr-2" /> Save Report
                            </Button>
                        </div>
                    </div>

                    <SaveFileDialog
                        open={saveDialogOpen}
                        onOpenChange={setSaveDialogOpen}
                        onSave={onSaveFile}
                        defaultName={`ATS Report - ${file?.name || "Analysis"}`}
                        title="Save ATS Report"
                    />

                    {/* Compact Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="col-span-1 border border-white/10 rounded-xl p-4 bg-white/5 flex flex-col items-center justify-center">
                            <SpeedometerMini score={result.score} size={80} />
                            <span className="text-xs font-medium mt-2">Overall Score</span>
                        </div>
                        <MetricCardSmall title="Job Match" value={`${result.match}%`} color="blue" />
                        <MetricCardSmall title="Grammar" value={`${result.grammar}/100`} color="green" />
                        <MetricCardSmall title="Tone" value={result.tone} color="purple" />
                    </div>

                    {/* Split View Analysis */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-emerald-400 font-medium pb-2 border-b border-white/10">
                                <CheckCircle2 className="h-5 w-5" /> What You Did Well
                            </div>
                            <ul className="space-y-3">
                                {result.goodPoints.map((point: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-sm p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-rose-400 font-medium pb-2 border-b border-white/10">
                                <AlertTriangle className="h-5 w-5" /> Improve These Areas
                            </div>
                            <ul className="space-y-3">
                                {result.badPoints.map((point: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-sm p-3 rounded-lg bg-rose-500/5 border border-rose-500/10">
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
