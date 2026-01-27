"use client";

import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string;
    subtitle?: string;
    icon?: React.ReactNode;
    trend?: string;
    trendUp?: boolean;
    className?: string;
    delay?: number;
}

export function StatCard({
    title,
    value,
    subtitle,
    icon,
    trend,
    trendUp,
    className,
    delay = 0,
}: StatCardProps) {
    return (
        <div
            className={cn(
                "relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]",
                "animate-fade-in-up",
                className
            )}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                    {icon && <div className="text-primary/80">{icon}</div>}
                </div>

                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        {value}
                    </span>
                    {trend && (
                        <span className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10",
                            trendUp ? "text-green-400" : "text-red-400"
                        )}>
                            {trend}
                        </span>
                    )}
                </div>

                {subtitle && (
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-1">{subtitle}</p>
                )}
            </div>
        </div>
    );
}
