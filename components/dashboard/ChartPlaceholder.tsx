"use client";

import { cn } from "@/lib/utils";

interface ChartPlaceholderProps {
    type?: "bar" | "line" | "pie";
    title?: string;
    className?: string;
}

export function ChartPlaceholder({ type = "bar", title, className }: ChartPlaceholderProps) {
    return (
        <div className={cn("w-full h-full flex flex-col items-center justify-center p-4 border border-dashed border-muted rounded-lg bg-muted/10", className)}>
            <div className="text-muted-foreground text-sm font-medium mb-4">{title || "Chart Visualization"}</div>

            {/* Simple CSS-only representations */}
            {type === "bar" && (
                <div className="flex items-end gap-2 h-32 w-full justify-center opacity-70">
                    <div className="w-8 bg-primary/40 h-[40%] rounded-t-sm" />
                    <div className="w-8 bg-primary/60 h-[70%] rounded-t-sm" />
                    <div className="w-8 bg-primary/30 h-[30%] rounded-t-sm" />
                    <div className="w-8 bg-primary/80 h-[90%] rounded-t-sm" />
                    <div className="w-8 bg-primary/50 h-[50%] rounded-t-sm" />
                </div>
            )}

            {type === "line" && (
                <div className="relative w-full h-32 opacity-70 flex items-center justify-center">
                    <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                        <path
                            d="M0 35 Q 25 35, 25 20 T 50 15 T 75 25 T 100 5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary"
                        />
                        <path
                            d="M0 35 Q 25 35, 25 20 T 50 15 T 75 25 T 100 5 V 40 H 0 Z"
                            fill="currentColor"
                            className="text-primary/10"
                        />
                    </svg>
                </div>
            )}
            {type === "pie" && (
                <div className="w-32 h-32 rounded-full border-8 border-primary/30 border-t-primary border-l-primary/60 rotate-45" />
            )}
        </div>
    );
}
