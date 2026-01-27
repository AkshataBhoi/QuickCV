"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MovingGradientProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    asText?: boolean;
    from?: string;
    via?: string;
    to?: string;
}

export const MovingGradient = ({
    children,
    className,
    asText = false,
    ...props
}: MovingGradientProps) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden",
                asText && "inline-block",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "animate-text-gradient motion-reduce:animate-none",
                    "bg-[length:200%_auto]",
                    "transform-gpu will-change-[background-position]",
                    asText
                        ? "bg-clip-text text-transparent [webkit-background-clip:text] [-webkit-text-fill-color:transparent] backface-hidden"
                        : "absolute inset-0 h-full w-full"
                )}
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #22d3ee, #06b6d4, #3b82f6, #a855f7, #22d3ee, #06b6d4, #3b82f6, #a855f7, #22d3ee)",
                }}
            >
                {children}
            </div>
        </div>
    );
};
