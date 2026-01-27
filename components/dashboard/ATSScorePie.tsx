import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface ATSScorePieProps {
    atsScore: number;
    industryAverage: number;
    className?: string;
}

export const ATSScorePie: React.FC<ATSScorePieProps> = ({
    atsScore = 0,
    industryAverage = 0,
    className
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const score = Math.min(100, Math.max(0, atsScore));
    const avg = Math.min(100, Math.max(0, industryAverage));

    // SVG Implementation
    const size = 200;
    const strokeWidth = 16;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - ((mounted ? score : 0) / 100) * circumference;

    // Rotation for industry average marker
    const avgRotation = (avg / 100) * 360;

    return (
        <div className={cn("w-full h-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-md p-6", className)}>
            <div className="relative flex items-center justify-center">
                {/* SVG Chart */}
                <svg width={size} height={size} className="transform -rotate-90">
                    {/* Track */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        className="text-white/10"
                    />

                    {/* Score Progress */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="transition-all duration-1000 ease-out"
                    />

                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" /> {/* Blue-500 */}
                            <stop offset="100%" stopColor="#34d399" /> {/* Emerald-400 */}
                        </linearGradient>
                    </defs>
                </svg>

                {/* Inner Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-bold text-white tracking-tight">{score}%</span>
                    <span className="text-xs text-white/50 font-medium uppercase tracking-wider mt-1">ATS Match</span>
                </div>

                {/* Industry Average Marker (Rotated Div) */}
                <div
                    className="absolute w-full h-full pointer-events-none"
                    style={{ transform: `rotate(${avgRotation}deg)` }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 flex flex-col items-center">
                        <div className="w-0.5 h-6 bg-white shadow-[0_0_10px_white] rounded-full" />
                    </div>
                </div>
            </div>

            {/* Legend / Info */}
            <div className="mt-8 grid grid-cols-2 gap-8 w-full max-w-[200px]">
                <div className="text-center">
                    <div className="text-2xl font-semibold text-emerald-400">{score}%</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Your Score</div>
                </div>
                <div className="text-center border-l border-white/10">
                    <div className="text-2xl font-semibold text-white/70">{avg}%</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Ind. Avg</div>
                </div>
            </div>
        </div>
    );
};
