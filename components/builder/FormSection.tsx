"use client";

import { useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export function FormSection({ title, description, children, defaultOpen = false }: FormSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="rounded-xl border border-white/10 bg-black/20 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
            >
                <div className="text-left">
                    <h3 className="font-semibold text-sm text-foreground">{title}</h3>
                    {description && <p className="text-xs text-muted-foreground">{description}</p>}
                </div>
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-300", isOpen ? "rotate-180" : "")} />
            </button>

            <div className={cn(
                "transition-[max-height] duration-300 ease-in-out overflow-hidden",
                isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            )}>
                <div className="p-4 border-t border-white/5 space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
