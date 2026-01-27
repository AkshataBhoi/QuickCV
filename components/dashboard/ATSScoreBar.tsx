import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface ATSScoreBarProps {
    atsScore: number;
    industryAverage: number;
    className?: string;
}

export const ATSScoreBar: React.FC<ATSScoreBarProps> = ({
    atsScore = 0,
    industryAverage = 0,
    className
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Ensure values are between 0 and 100
    const score = Math.min(100, Math.max(0, atsScore));
    const avg = Math.min(100, Math.max(0, industryAverage));

    return (
        <div className={cn("w-full px-6 py-4 bg-black/60 backdrop-blur-md border-t border-white/10", className)}>
            <div className="flex justify-between items-end mb-2">
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white/90 tracking-wide uppercase">ATS Match</span>
                    <span className="text-[10px] text-white/50">Based on job description</span>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-white leading-none">{score}%</span>
                </div>
            </div>

            {/* Progress Bar Container */}
            <div className="relative h-2 w-full bg-white/10 rounded-full overflow-visible">
                {/* Background Track */}
                <div className="absolute inset-0 rounded-full bg-white/5" />

                {/* User Score Bar */}
                <div
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                    style={{ width: mounted ? `${score}%` : '0%' }}
                />

                {/* Industry Average Marker */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-white/60 z-10"
                    style={{ left: `${avg}%` }}
                >
                </div>
            </div>

            <div className="flex justify-between items-center mt-1.5 px-0.5">
                <span className="text-[10px] text-emerald-400/90 font-medium">Your Score</span>
                <span className="text-[10px] text-white/40">Industry Avg: {avg}%</span>
            </div>

            {/* Backend Integration Note */}
            {/* TODO: Connect `atsScore` and `industryAverage` to real data from the analysis API */}
        </div>
    );
};
