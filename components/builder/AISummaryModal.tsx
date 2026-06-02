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
import { Loader2, Sparkles, Check, Copy, RotateCcw } from "lucide-react";
import { useUser } from "@/components/providers/user-provider";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import apiClient from "@/lib/api/client";

interface AISummaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (summary: string, skills?: string[], skillsAction?: "merge" | "replace") => void;
}

interface GeneratedSummaries {
    version_1: string;
    version_2: string;
    version_3: string;
    skills?: string[];
}

export function AISummaryModal({ isOpen, onClose, onGenerate }: AISummaryModalProps) {
    const { user } = useUser();
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("Junior");
    const [yearsOfExperience, setYearsOfExperience] = useState("");
    const [currentRole, setCurrentRole] = useState("");
    const [keySkills, setKeySkills] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedSummaries, setGeneratedSummaries] = useState<GeneratedSummaries | null>(null);
    const [skillsAction, setSkillsAction] = useState<"merge" | "replace">("merge");

    const handleGenerate = async () => {
        if (!jobTitle) return;

        setIsGenerating(true);
        try {
            const response = await apiClient.post('/api/ai/generate-summary', {
                userId: user?.id || undefined,
                targetJobTitle: jobTitle,
                experienceLevel,
                yearsOfExperience,
                currentRole,
                keySkills,
                jobDescription,
            });

            const { data } = response;

            setGeneratedSummaries(data);
            toast.success("Generated 3 ATS-optimized summaries!");
        } catch (error: any) {
            console.error("Error generating summary:", error);
            const data = error.response?.data;
            if (data?.code === "AI_LIMIT_REACHED") {
                toast.error(data.message);
            } else {
                toast.error(data?.message || "Failed to generate summary");
            }
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSelectSummary = (summary: string) => {
        onGenerate(summary, generatedSummaries?.skills, skillsAction);
        onClose();
        // Reset state for next time
        setGeneratedSummaries(null);
        setSkillsAction("merge");
    };

    const handleReset = () => {
        setGeneratedSummaries(null);
        setSkillsAction("merge");
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) {
                onClose();
                setGeneratedSummaries(null);
            }
        }}>
            <DialogContent className={cn(
                "bg-[#0A0A0A] border-white/10 text-white shadow-2xl transition-all duration-300",
                generatedSummaries ? "sm:max-w-[900px]" : "sm:max-w-[500px]"
            )}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
                        <Sparkles className="h-5 w-5 text-indigo-400" />
                        AI Summary Generator
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground pt-2">
                        {generatedSummaries 
                            ? "Choose the version that best represents your professional profile."
                            : "Provide your details to generate 3 distinct, ATS-optimized professional summaries."}
                    </DialogDescription>
                </DialogHeader>

                {!generatedSummaries ? (
                    <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Target Job Title *</label>
                                <Input
                                    placeholder="e.g. Senior Frontend Engineer"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    className="bg-white/5 border-white/10 focus:border-indigo-500/50 transition-colors h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Years of Experience</label>
                                <Input
                                    placeholder="e.g. 5+ years"
                                    value={yearsOfExperience}
                                    onChange={(e) => setYearsOfExperience(e.target.value)}
                                    className="bg-white/5 border-white/10 focus:border-indigo-500/50 transition-colors h-11"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Current Role (Optional)</label>
                            <Input
                                placeholder="e.g. Frontend Engineer at Acme"
                                value={currentRole}
                                onChange={(e) => setCurrentRole(e.target.value)}
                                className="bg-white/5 border-white/10 focus:border-indigo-500/50 transition-colors h-11"
                            />
                        </div>

                        {/* <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Key Skills (Optional)</label>
                            <Input
                                placeholder="e.g. React, Node.js, AWS, System Design"
                                value={keySkills}
                                onChange={(e) => setKeySkills(e.target.value)}
                                className="bg-white/5 border-white/10 focus:border-indigo-500/50 transition-colors h-11"
                            />
                        </div> */}

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Target Job Description</label>
                                <span className="text-[10px] text-indigo-400">Recommended for best results</span>
                            </div>
                            <Textarea
                                placeholder="Paste the job description here..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="bg-white/5 border-white/10 focus:border-indigo-500/50 min-h-[100px] resize-none transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Experience Level</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {["Fresher", "Junior", "Mid", "Senior"].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setExperienceLevel(level)}
                                        className={`px-3 py-2.5 rounded-lg text-xs font-medium border transition-all ${experienceLevel === level
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
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
                        {[
                            { id: 'version_1', title: 'Balanced', content: generatedSummaries.version_1, color: 'from-blue-500/20 to-indigo-500/20' },
                            { id: 'version_2', title: 'Technical', content: generatedSummaries.version_2, color: 'from-purple-500/20 to-pink-500/20' },
                            { id: 'version_3', title: 'Achievement', content: generatedSummaries.version_3, color: 'from-emerald-500/20 to-teal-500/20' }
                        ].map((v) => (
                            <div 
                                key={v.id} 
                                className={cn(
                                    "flex flex-col rounded-xl border border-white/10 bg-linear-to-br p-5 hover:border-white/20 transition-all group",
                                    v.color
                                )}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded">
                                        {v.title}
                                    </span>
                                </div>
                                <p className="text-sm leading-relaxed text-gray-300 mb-6 grow">
                                    {v.content}
                                </p>
                                <Button 
                                    onClick={() => handleSelectSummary(v.content)}
                                    className="w-full bg-white/10 hover:bg-white/20 text-white border-0 group-hover:bg-indigo-600 group-hover:text-white transition-all"
                                >
                                    Use This Version
                                </Button>
                            </div>
                        ))}
                        
                        {generatedSummaries.skills && generatedSummaries.skills.length > 0 && (
                            <div className="col-span-1 md:col-span-3 mt-4 border-t border-white/10 pt-4">
                                <h3 className="text-sm font-bold text-white mb-3">Extracted Technical Skills</h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {generatedSummaries.skills.map((skill, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-muted-foreground">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 bg-black/20 p-3 rounded-lg border border-white/5">
                                    <label className="text-xs text-muted-foreground flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="skillsAction" 
                                            value="replace" 
                                            checked={skillsAction === "replace"} 
                                            onChange={() => setSkillsAction("replace")} 
                                            className="accent-indigo-500" 
                                        />
                                        Replace Skills Completely
                                    </label>
                                    <label className="text-xs text-muted-foreground flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="skillsAction" 
                                            value="merge" 
                                            checked={skillsAction === "merge"} 
                                            onChange={() => setSkillsAction("merge")} 
                                            className="accent-indigo-500" 
                                        />
                                        Merge With Existing Skills
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <DialogFooter className="gap-2 sm:gap-0 pt-4 border-t border-white/5">
                    {generatedSummaries ? (
                        <Button 
                            variant="ghost" 
                            onClick={handleReset} 
                            className="text-muted-foreground hover:text-white"
                        >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Regenerate
                        </Button>
                    ) : (
                        <Button variant="ghost" onClick={onClose} disabled={isGenerating} className="border border-white/5 hover:bg-white/5">
                            Cancel
                        </Button>
                    )}
                    
                    {!generatedSummaries && (
                        <Button
                            onClick={handleGenerate}
                            disabled={!jobTitle || isGenerating}
                            className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-indigo-500/20 px-8"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Analyzing & Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate 3 Versions
                                </>
                            )}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
