"use client";

import { cn } from "@/lib/utils";

interface MetricCardSmallProps {
    title: string;
    value: string | number;
    subValue?: string;
    icon?: React.ReactNode;
    trend?: "up" | "down" | "neutral";
    color?: "default" | "green" | "blue" | "purple" | "rose";
    className?: string;
}

export function MetricCardSmall({
    title,
    value,
    subValue,
    icon,
    trend,
    color = "default",
    className,
}: MetricCardSmallProps) {
    const colorStyles = {
        default: "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 text-foreground",
        green: "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] text-emerald-100",
        blue: "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/30 hover:bg-blue-500/10 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] text-blue-100",
        purple: "border-purple-500/20 bg-purple-500/5 hover:border-purple-500/30 hover:bg-purple-500/10 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] text-purple-100",
        rose: "border-rose-500/20 bg-rose-500/5 hover:border-rose-500/30 hover:bg-rose-500/10 hover:shadow-[0_0_20px_-5px_rgba(244,63,94,0.3)] text-rose-100",
    };

    const iconColors = {
        default: "text-muted-foreground",
        green: "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]",
        blue: "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]",
        purple: "text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]",
        rose: "text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]",
    };

    return (
        <div className={cn(
            "p-5 rounded-2xl border backdrop-blur-md flex flex-col justify-between h-28 transition-all duration-300 ease-out group relative overflow-hidden",
            colorStyles[color],
            className
        )}>
            {/* Subtle Gradient Glow in Background */}
            <div className={cn("absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[40px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-40",
                color === "green" ? "bg-emerald-500" :
                    color === "blue" ? "bg-blue-500" :
                        color === "purple" ? "bg-purple-500" :
                            color === "rose" ? "bg-rose-500" : "bg-white"
            )} />

            <div className="flex justify-between items-start relative z-10">
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">{title}</span>
                {icon && <div className={cn("transition-transform duration-300 group-hover:scale-110", iconColors[color])}>{icon}</div>}
            </div>

            <div className="relative z-10">
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold tracking-tight">{value}</span>
                    {subValue && <span className="text-xs font-medium opacity-60">{subValue}</span>}
                </div>
            </div>
        </div>
    );
}
