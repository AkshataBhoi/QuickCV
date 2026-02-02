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
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Plus, Check } from "lucide-react";

interface AISkillsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddSkills: (skills: string[]) => void;
    existingSkills: string[];
}

import { useUser } from "@/components/providers/user-provider";
import { useToast } from "@/components/ui/toast";

export function AISkillsModal({ isOpen, onClose, onAddSkills, existingSkills }: AISkillsModalProps) {
    const { user } = useUser();
    const { displayToast } = useToast();
    const [jobDescription, setJobDescription] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const handleAnalyze = async () => {
        if (!jobDescription) return;

        setIsAnalyzing(true);
const API_URL = process.env.NEXT_PUBLIC_API_URL;

        try {
            const response = await fetch(`${API_URL}/api/ai/resume/skills`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    jobDescription,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.code === "AI_LIMIT_REACHED") {
                    displayToast(data.message, "error");
                } else {
                    displayToast(data.message || "Failed to extract skills", "error");
                }
                return;
            }

            setSuggestedSkills(data.skills || []);
            displayToast("Skills suggested by AI!", "success");
        } catch (error) {
            console.error("Error extracting skills:", error);
            displayToast("Backend server not reachable. Please ensure the backend is running on port 5000.", "error");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const toggleSkill = (skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    const handleAddSelected = () => {
        onAddSkills(selectedSkills);
        onClose();
        // Reset state for next time
        setJobDescription("");
        setSuggestedSkills([]);
        setSelectedSkills([]);
    };

    const handleAddAll = () => {
        onAddSkills(suggestedSkills);
        onClose();
        setJobDescription("");
        setSuggestedSkills([]);
        setSelectedSkills([]);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[550px] bg-[#0A0A0A] border-white/10 text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <Sparkles className="h-5 w-5 text-emerald-400" />
                        Suggest Skills
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground pt-2">
                        Paste the job description and AI will extract the most relevant skills for your resume.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto py-4 space-y-6 custom-scrollbar">
                    {!suggestedSkills.length ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Job Description</label>
                                <Textarea
                                    placeholder="Paste the job requirements here..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    className="bg-white/5 border-white/10 focus:border-emerald-500/50 min-h-[200px] resize-none transition-colors"
                                />
                            </div>
                            <Button
                                onClick={handleAnalyze}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border-0"
                                disabled={!jobDescription || isAnalyzing}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing Description...
                                    </>
                                ) : (
                                    "Extract Skills"
                                )}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-scale-in">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold uppercase tracking-tight text-white">Suggested Skills</h3>
                                <Button variant="ghost" size="sm" onClick={handleAddAll} className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 text-xs">
                                    Add All
                                </Button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {suggestedSkills.map((skill) => {
                                    const isSelected = selectedSkills.includes(skill);
                                    const isAlreadyAdded = existingSkills.includes(skill);

                                    return (
                                        <button
                                            key={skill}
                                            onClick={() => !isAlreadyAdded && toggleSkill(skill)}
                                            disabled={isAlreadyAdded}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 border ${isAlreadyAdded
                                                ? "bg-white/5 border-white/5 text-muted-foreground cursor-not-allowed opacity-50"
                                                : isSelected
                                                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                                                    : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                                                }`}
                                        >
                                            {skill}
                                            {isAlreadyAdded ? (
                                                <Check className="h-3 w-3" />
                                            ) : isSelected ? (
                                                <Plus className="h-3 w-3 rotate-45" />
                                            ) : (
                                                <Plus className="h-3 w-3" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="text-[10px] text-muted-foreground text-center italic">
                                Click on the chips to select individual skills or click "Add All"
                            </p>
                        </div>
                    )}
                </div>

                <DialogFooter className="pt-4 border-t border-white/5">
                    {suggestedSkills.length > 0 ? (
                        <>
                            <Button variant="ghost" onClick={() => setSuggestedSkills([])} className="text-xs">
                                Back to Edit
                            </Button>
                            <Button
                                onClick={handleAddSelected}
                                disabled={selectedSkills.length === 0}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white border-0"
                            >
                                Add Selected ({selectedSkills.length})
                            </Button>
                        </>
                    ) : (
                        <Button variant="ghost" onClick={onClose} className="border border-white/5">
                            Cancel
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
