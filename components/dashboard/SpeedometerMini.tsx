"use client";

import { cn } from "@/lib/utils";

interface SpeedometerMiniProps {
    score: number; // 0-100
    label?: string;
    size?: number;
    className?: string;
}

export function SpeedometerMini({ score, label, size = 120, className }: SpeedometerMiniProps) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    // const offset = circumference - (score / 100) * (circumference * 0.75);

    const getColor = (s: number) => {
        if (s >= 80) return "text-emerald-400";
        if (s >= 60) return "text-blue-400";
        if (s >= 40) return "text-yellow-400";
        return "text-rose-400";
    };

    const getGlowColor = (s: number) => {
        if (s >= 80) return "drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]";
        if (s >= 60) return "drop-shadow-[0_0_10px_rgba(96,165,250,0.6)]";
        if (s >= 40) return "drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]";
        return "drop-shadow-[0_0_10px_rgba(251,113,133,0.6)]";
    };

    return (
        <div className={cn("relative flex flex-col items-center justify-center", className)} style={{ width: size, height: size }}>
            {/* Ambient Glow behind the gauge */}
            <div className={cn("absolute inset-0 rounded-full blur-[30px] opacity-20",
                score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-blue-500" : score >= 40 ? "bg-yellow-500" : "bg-rose-500"
            )} />

            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-[135deg] relative z-10">
                {/* Background Track with darker shade */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeDasharray={circumference * 0.75 + " " + circumference}
                    className="text-white/10"
                    strokeLinecap="round"
                />
                {/* Score Track with Glow */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeDasharray={circumference * 0.75 + " " + circumference}
                    strokeDashoffset={circumference * 0.75 - (score / 100) * (circumference * 0.75)}
                    className={cn(
                        "transition-all duration-1000 ease-out",
                        getColor(score),
                        getGlowColor(score)
                    )}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pt-2">
                <span className={cn("text-4xl font-extrabold tracking-tighter", getColor(score), getGlowColor(score))}>
                    {score}
                </span>
                {label && <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">{label}</span>}
            </div>
        </div>
    );
}
