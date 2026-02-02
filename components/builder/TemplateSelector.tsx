"use client";

import { cn } from "@/lib/utils";
import { Check, Layout, FileText, Smartphone, PenTool, Coffee, Monitor, BookOpen, GraduationCap, Briefcase, Globe } from "lucide-react";

export type TemplateId =
    | "modern-01"
    | "classic-02"
    | "minimal-03"
    | "creative-04"
    | "tech-05"
    | "executive-06"
    | "academic-07"
    | "graduate-08"
    | "freelance-09"
    | "international-10"
    | "clean" // Backward compatibility
    | "modern" // Backward compatibility
    | "minimal"; // Backward compatibility

interface Template {
    id: TemplateId;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const templates: Template[] = [
    {
        id: "modern-01",
        name: "Modern Professional",
        description: "Two-column layout with dark sidebar. Best for Tech & Corporate.",
        icon: <Layout className="h-6 w-6" />,
        color: "bg-slate-900"
    },
    {
        id: "classic-02",
        name: "Classic Corporate",
        description: "Timeless serif typography. Best for Finance & Law.",
        icon: <FileText className="h-6 w-6" />,
        color: "bg-blue-600"
    },
    {
        id: "minimal-03",
        name: "Simple Minimal",
        description: "Clean, content-focused. Best for ATS & General.",
        icon: <Smartphone className="h-6 w-6" />,
        color: "bg-emerald-600"
    },
    {
        id: "creative-04",
        name: "Creative Designer",
        description: "Bold colors and unique structure. Best for Creatives.",
        icon: <PenTool className="h-6 w-6" />,
        color: "bg-purple-600"
    },
    {
        id: "tech-05",
        name: "Tech FAANG",
        description: "Developer focused, monospace fonts. Best for Software.",
        icon: <Monitor className="h-6 w-6" />,
        color: "bg-cyan-600"
    },
    {
        id: "executive-06",
        name: "Executive Leader",
        description: "Authoritative and centralized. Best for Management.",
        icon: <Briefcase className="h-6 w-6" />,
        color: "bg-indigo-700"
    },
    {
        id: "academic-07",
        name: "Academic Research",
        description: "Dense, education-first layout. Best for PhDs & Research.",
        icon: <BookOpen className="h-6 w-6" />,
        color: "bg-stone-600"
    },
    {
        id: "graduate-08",
        name: "Fresh Graduate",
        description: "Highlights education and skills. Best for Entry Level.",
        icon: <GraduationCap className="h-6 w-6" />,
        color: "bg-pink-600"
    },
    {
        id: "freelance-09",
        name: "Freelance Portfolio",
        description: "Showcase projects and services. Best for Contractors.",
        icon: <Coffee className="h-6 w-6" />,
        color: "bg-orange-500"
    },
    {
        id: "international-10",
        name: "International CV",
        description: "Standard EU format with photo. Best for Global.",
        icon: <Globe className="h-6 w-6" />,
        color: "bg-teal-600"
    },
];

interface TemplateSelectorProps {
    selectedId: string; // Loosened to string to accept "clean" from legacy user data without mismatch issues in map
    onSelect: (id: TemplateId) => void;
}

export function TemplateSelector({ selectedId, onSelect }: TemplateSelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((t) => (
                <button
                    key={t.id}
                    onClick={() => onSelect(t.id)}
                    className={cn(
                        "relative p-4 rounded-xl border text-left transition-all duration-300 group hover:scale-[1.02]",
                        selectedId === t.id
                            ? "border-primary bg-primary/10 shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]"
                            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    )}
                >
                    <div className={cn("mb-3 w-10 h-10 rounded-lg flex items-center justify-center text-white", t.color)}>
                        {t.icon}
                    </div>

                    <h3 className={cn("font-bold text-sm", selectedId === t.id ? "text-primary" : "text-foreground")}>
                        {t.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {t.description}
                    </p>

                    {/* Active Checkmark */}
                    {selectedId === t.id && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                            <Check className="h-3 w-3" />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
}
