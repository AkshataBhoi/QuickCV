"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { ShinyBadge } from "@/components/ui/shiny-badge";
import { DotBackground } from "@/components/ui/dot-background";
import { useModal } from "@/components/providers/modal-provider";
import { MovingGradient } from "@/components/ui/moving-gradient";

export function Hero() {
    const { openModal } = useModal();

    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 lg:min-h-screen flex items-center justify-center overflow-hidden">
            {/* Top Right Blur - Optimized with Radial Gradient */}
            <div
                className="absolute top-0 right-0 w-[80vh] h-[80vh] max-w-[800px] max-h-[800px] pointer-events-none -translate-y-1/2 translate-x-1/2 mix-blend-screen"
                style={{
                    background: "radial-gradient(circle at center, rgba(var(--primary-rgb, 6, 182, 212), 0.15) 0%, transparent 70%)"
                }}
            />
            {/* Bottom Left Blur - Optimized with Radial Gradient */}
            <div
                className="absolute bottom-0 left-0 w-[80vh] h-[80vh] max-w-[800px] max-h-[800px] pointer-events-none translate-y-1/2 -translate-x-1/2 mix-blend-screen"
                style={{
                    background: "radial-gradient(circle at center, rgba(var(--secondary-rgb, 59, 130, 246), 0.15) 0%, transparent 70%)"
                }}
            />

            <DotBackground />

            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
                    <div className="space-y-4 flex flex-col items-center animate-fade-in-up">
                        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                            Free Online Resume Builder
                        </div>
                        <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl leading-[1.1] font-bold tracking-tighter lg:text-[70px] xl:text-[82px] max-w-3xl mx-auto">
                            Build a standout{" "}
                            <span className="inline-block">resume with</span>
                            <span className="block relative">
                                <MovingGradient asText className="font-bold tracking-tighter">
                                    zero cost
                                </MovingGradient>
                            </span>
                        </h1>
                        <p className="max-w-[600px] text-base md:text-lg lg:text-xl text-muted-foreground mx-auto leading-relaxed px-4">
                            Your first resume is completely free. Unlimited downloads. No hidden costs. Yes, really 🚀
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <Button
                            onClick={openModal}
                            size="lg"
                            aria-label="Start building your resume for free"
                            className="group relative w-full lg:w-auto h-14 sm:h-16 rounded-xl px-6 sm:px-8 text-lg sm:text-xl font-semibold text-white transition-all duration-300 ease-out hover:scale-[1.03] hover:brightness-110 active:scale-95 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5),0_4px_6px_-1px_rgba(6,182,212,0.1),inset_0_-4px_4px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7),0_8px_12px_-1px_rgba(6,182,212,0.3),inset_0_-4px_4px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.4)]"
                        >
                            <span className="flex items-center gap-2">
                                Get Started Free <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                            </span>
                        </Button>
                        <ShinyBadge text="ATS Check" href="/#upload" className="h-14 sm:h-16 text-lg rounded-xl bg-slate-800/80 border-slate-700 hover:bg-slate-700/80 w-full lg:w-auto justify-center" aria-label="Upload resume for ATS check" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-x-6 sm:gap-y-2 text-sm md:text-base text-muted-foreground" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center justify-center gap-2">
                            <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                            <span>Optimized for modern ATS systems</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                            <span>Free</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                            <span>Setup in 1 minute</span>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
