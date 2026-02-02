"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";

interface AISummaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (summary: string) => void;
}

import { useUser } from "@/components/providers/user-provider";
import { useToast } from "@/components/ui/toast";

export function AISummaryModal({ isOpen, onClose, onGenerate }: AISummaryModalProps) {
    const { user } = useUser();
    const { displayToast } = useToast();
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("Junior");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!jobTitle) return;

        setIsGenerating(true);
const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
            const response = await fetch(`${API_URL}/api/ai/resume/summary`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // userId: user.id,
                    jobTitle,
                    experienceLevel,
                    jobDescription,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.code === "AI_LIMIT_REACHED") {
                    displayToast(data.message, "error");
                } else {
                    displayToast(data.message || "Failed to generate summary", "error");
                }
                return;
            }

            onGenerate(data.summary);
            onClose();
            displayToast("Summary optimized with AI!", "success");
        } catch (error) {
            console.error("Error generating summary:", error);
            displayToast("Backend server not reachable. Please ensure the backend is running on port 5000.", "error");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-[#0A0A0A] border-white/10 text-white shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <Sparkles className="h-5 w-5 text-indigo-400" />
                        Improve with AI
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground pt-2">
                        Providing job details helps AI generate a highly relevant and ATS-optimized summary.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Target Job Title *</label>
                        <Input
                            placeholder="e.g. Senior Frontend Engineer"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="bg-white/5 border-white/10 focus:border-indigo-500/50 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Job Description</label>
                            <span className="text-[10px] text-indigo-400">Optional but recommended</span>
                        </div>
                        <Textarea
                            placeholder="Paste the job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="bg-white/5 border-white/10 focus:border-indigo-500/50 min-h-[120px] resize-none transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Experience Level</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {["Fresher", "Junior", "Mid", "Senior"].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setExperienceLevel(level)}
                                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${experienceLevel === level
                                        ? "bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="ghost" onClick={onClose} disabled={isGenerating} className="border border-white/5 hover:bg-white/5">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleGenerate}
                        disabled={!jobTitle || isGenerating}
                        className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white border-0 shadow-lg shadow-indigo-500/20"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            "Generate Summary"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
