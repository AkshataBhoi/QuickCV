"use client";

import { cn } from "@/lib/utils";
import { Check, Layout, FileText, Smartphone } from "lucide-react";

export type TemplateId = "clean" | "modern" | "minimal";

interface Template {
    id: TemplateId;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const templates: Template[] = [
    {
        id: "clean",
        name: "Clean Professional",
        description: "Standard corporate layout. Best for ATS.",
        icon: <FileText className="h-6 w-6" />,
        color: "bg-blue-500"
    },
    {
        id: "modern",
        name: "Modern Gradient",
        description: "Stand out with subtle colors. Best for Creative.",
        icon: <Layout className="h-6 w-6" />,
        color: "bg-purple-500"
    },
    {
        id: "minimal",
        name: "Simple Minimal",
        description: "Focus purely on content. Very dense.",
        icon: <Smartphone className="h-6 w-6" />,
        color: "bg-emerald-500"
    },
];

interface TemplateSelectorProps {
    selectedId: TemplateId;
    onSelect: (id: TemplateId) => void;
}

export function TemplateSelector({ selectedId, onSelect }: TemplateSelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
