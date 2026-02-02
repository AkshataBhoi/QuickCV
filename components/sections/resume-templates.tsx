"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useModal } from "@/components/providers/modal-provider";
import { DEFAULT_RESUME_DATA } from "@/lib/defaultResumeData";
import { ModernProfessional } from "@/components/templates/modern-01";
import { ClassicCorporate } from "@/components/templates/classic-02";
import { SimpleMinimal } from "@/components/templates/minimal-03";

const templates = [
    {
        id: 1,
        name: "Professional",
        description: "Clean & Standard",
        component: ClassicCorporate,
        features: ["ATS-Optimized", "Classic Layout", "All Industries"]
    },
    {
        id: 2,
        name: "FAANG",
        description: "Tech-Focused",
        component: ModernProfessional,
        features: ["Modern Design", "Two-Column", "Tech Roles"]
    },
    {
        id: 3,
        name: "Executive",
        description: "Leadership-Ready",
        component: SimpleMinimal,
        features: ["Bold Header", "Premium Feel", "Senior Positions"]
    },
];

export function ResumeTemplates() {
    const { openModal } = useModal();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-rotate templates
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % templates.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextTemplate = () => {
        setCurrentIndex((prev) => (prev + 1) % templates.length);
    };

    const prevTemplate = () => {
        setCurrentIndex((prev) => (prev - 1 + templates.length) % templates.length);
    };

    return (
        <section
            id="templates"
            className="relative w-full py-24 md:py-32 bg-gradient-to-b from-background via-background to-slate-950/50 overflow-hidden"
            itemScope
            itemType="https://schema.org/ItemList"
        >
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(6,182,212,0.1),transparent_50%)]" />

            <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">
                {/* SEO-Optimized Heading */}
                <div className="text-center mb-16 space-y-4">
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
                        itemProp="name"
                    >
                        Professional Resume Templates
                    </h2>
                    <p
                        className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
                        itemProp="description"
                    >
                        Choose from our collection of ATS-friendly resume templates designed by experts.
                        Each template is optimized to help you land your dream job.
                    </p>
                </div>

                {/* Fanned Cards Display */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Template Cards Container */}
                    <div className="relative h-[500px] md:h-[600px] flex items-center justify-center perspective-[2000px]">
                        {templates.map((template, index) => {
                            const offset = index - currentIndex;
                            const absOffset = Math.abs(offset);

                            // Calculate positioning for fanned effect
                            let rotation = 0;
                            let translateX = 0;
                            let translateZ = 0;
                            let scale = 1;
                            let opacity = 1;
                            let zIndex = 10;

                            if (offset === 0) {
                                // Center card (active)
                                rotation = 0;
                                translateX = 0;
                                translateZ = 0;
                                scale = 1;
                                opacity = 1;
                                zIndex = 30;
                            } else if (offset === -1 || (offset === 2 && templates.length === 3)) {
                                // Left card
                                rotation = -15;
                                translateX = -280;
                                translateZ = -100;
                                scale = 0.85;
                                opacity = 0.7;
                                zIndex = 20;
                            } else if (offset === 1 || (offset === -2 && templates.length === 3)) {
                                // Right card
                                rotation = 15;
                                translateX = 280;
                                translateZ = -100;
                                scale = 0.85;
                                opacity = 0.7;
                                zIndex = 20;
                            } else {
                                // Hidden cards
                                opacity = 0;
                                scale = 0.7;
                                zIndex = 0;
                            }

                            const TemplateComponent = template.component;

                            return (
                                <div
                                    key={template.id}
                                    className="absolute transition-all duration-700 ease-out"
                                    style={{
                                        transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotation}deg) scale(${scale})`,
                                        opacity,
                                        zIndex,
                                        transformStyle: 'preserve-3d',
                                    }}
                                    itemProp="itemListElement"
                                    itemScope
                                    itemType="https://schema.org/Product"
                                >
                                    {/* Template Card */}
                                    <div
                                        className={`w-[300px] md:w-[380px] aspect-[210/297] bg-white rounded-xl shadow-2xl overflow-hidden border-2 transition-all duration-300 ${offset === 0
                                            ? 'border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.3)]'
                                            : 'border-slate-200 hover:border-cyan-400'
                                            }`}
                                        onClick={() => offset !== 0 && setCurrentIndex(index)}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        {/* Scaled Template Preview */}
                                        <div className="w-full h-full relative overflow-hidden pointer-events-none">
                                            <div className="absolute top-0 left-0 w-[595px] h-[842px] origin-top-left transform scale-[0.64] md:scale-[0.64] bg-white">
                                                <TemplateComponent data={DEFAULT_RESUME_DATA} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* SEO Meta */}
                                    <meta itemProp="name" content={`${template.name} Resume Template`} />
                                    <meta itemProp="description" content={template.description} />
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Controls */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none z-40">
                        <Button
                            onClick={prevTemplate}
                            variant="outline"
                            size="icon"
                            aria-label="Previous template"
                            className="pointer-events-auto h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-slate-700 hover:bg-slate-800 hover:border-cyan-500"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button
                            onClick={nextTemplate}
                            variant="outline"
                            size="icon"
                            aria-label="Next template"
                            className="pointer-events-auto h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-slate-700 hover:bg-slate-800 hover:border-cyan-500"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-16 text-center space-y-6">
                    <Button
                        onClick={openModal}
                        className="group relative h-11 md:h-14 rounded-xl px-6 md:px-10 font-semibold text-white transition-all duration-300 ease-out hover:scale-[1.03] hover:brightness-110 active:scale-95 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5),0_4px_6px_-1px_rgba(6,182,212,0.1),inset_0_-4px_4px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7),0_8px_12px_-1px_rgba(6,182,212,0.3),inset_0_-4px_4px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.4)]"
                    >
                        <span className="flex items-center gap-2 text-sm md:text-lg">
                            Start Building Your Resume <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                    </Button>
                    <p className="mt-4 text-sm text-slate-500">
                        All templates are ATS-friendly and fully customizable
                    </p>
                </div>

            </div>
        </section>
    );
}
