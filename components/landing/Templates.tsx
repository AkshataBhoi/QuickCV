"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DEFAULT_RESUME_DATA } from "@/lib/defaultResumeData";

// Import all templates
import { ModernProfessional } from "@/components/templates/modern-01";
import { ClassicCorporate } from "@/components/templates/classic-02";
import { SimpleMinimal } from "@/components/templates/minimal-03";
import { CreativeDesigner } from "@/components/templates/creative-04";
import { TechFaang } from "@/components/templates/tech-05";
import { ExecutiveLeadership } from "@/components/templates/executive-06";
import { AcademicResearch } from "@/components/templates/academic-07";
import { FreshGraduate } from "@/components/templates/graduate-08";
import { FreelancerPortfolio } from "@/components/templates/freelance-09";
import { InternationalFormat } from "@/components/templates/international-10";

// Template definitions with IDs matching the builder
const templates = [
    {
        id: "modern-01",
        name: "Modern Professional",
        tag: "Most Popular",
        component: ModernProfessional,
    },
    {
        id: "tech-05",
        name: "Tech FAANG",
        tag: "Developer",
        component: TechFaang,
    },
    {
        id: "classic-02",
        name: "Classic Corporate",
        tag: "Professional",
        component: ClassicCorporate,
    },
    {
        id: "creative-04",
        name: "Creative Designer",
        tag: "Creative",
        component: CreativeDesigner,
    },
    {
        id: "executive-06",
        name: "Executive Leader",
        tag: "Management",
        component: ExecutiveLeadership,
    },
    {
        id: "minimal-03",
        name: "Simple Minimal",
        tag: "ATS Ready",
        component: SimpleMinimal,
    },
    {
        id: "academic-07",
        name: "Academic Research",
        tag: "Education",
        component: AcademicResearch,
    },
    {
        id: "graduate-08",
        name: "Fresh Graduate",
        tag: "Entry Level",
        component: FreshGraduate,
    },
    {
        id: "freelance-09",
        name: "Freelance Portfolio",
        tag: "Portfolio",
        component: FreelancerPortfolio,
    },
    {
        id: "international-10",
        name: "International CV",
        tag: "Global",
        component: InternationalFormat,
    },
];

export function Templates() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(3);
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerSlide(1);
            else if (window.innerWidth < 1024) setItemsPerSlide(2);
            else setItemsPerSlide(3);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(0, templates.length - itemsPerSlide);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }, [maxIndex]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }, []);

    const handleUseTemplate = (id: string) => {
        router.push(`/dashboard/resume-builder?template=${id}`);
    };

    return (
        <section id="templates" className="py-24 bg-[#f8f9fa] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-6"
                        >
                            <LayoutGrid size={12} />
                            Professional Templates
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-black text-[#030213] mb-4 tracking-tight"
                        >
                            Expertly Crafted Templates
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-[#717182] text-lg"
                        >
                            Choose from a variety of ATS-optimized templates designed by hiring experts to make your resume shine.
                        </motion.p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={prevSlide}
                            disabled={currentIndex === 0}
                            className="p-3 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
                            aria-label="Previous templates"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentIndex >= maxIndex}
                            className="p-3 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
                            aria-label="Next templates"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div className="overflow-hidden">
                        <motion.div
                            animate={{ x: `-${currentIndex * (100 / itemsPerSlide)}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex"
                        >
                            {templates.map((template, idx) => {
                                const TemplateComponent = template.component;
                                return (
                                    <div
                                        key={idx}
                                        className="px-4 shrink-0 transition-opacity duration-300"
                                        style={{ width: `${100 / itemsPerSlide}%` }}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                                            whileHover={{ y: -8 }}
                                            className="bg-white rounded-[2rem] overflow-hidden border border-[#ececf0] group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                                        >
                                            {/* Preview Container - "Image" */}
                                            <div className="aspect-[3/4] relative overflow-hidden bg-white border-b border-gray-100">
                                                {/* Scaled Resume Component */}
                                                <div className="pointer-events-none absolute inset-0 w-full h-full flex items-start justify-center pt-4">
                                                    {/* 
                                                        Scale calculation: 
                                                        A4 Width = 210mm (~793px at 96dpi)
                                                        Container Width approx 300-400px.
                                                        Scale 0.4 seems appropriate for a thumbnail.
                                                        We center it.
                                                     */}
                                                    <div className="origin-top transform scale-[0.4] w-[210mm] min-h-[297mm] shadow-lg bg-white">
                                                        <TemplateComponent data={DEFAULT_RESUME_DATA} />
                                                    </div>
                                                </div>

                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                    <Button
                                                        onClick={() => handleUseTemplate(template.id)}
                                                        className="bg-white text-black font-bold px-8 py-3 rounded-xl shadow-xl hover:bg-gray-50 border-0 transition-all transform group-hover:scale-105 active:scale-95"
                                                    >
                                                        Use This Template
                                                    </Button>
                                                </div>

                                                {template.tag && (
                                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm border border-indigo-100 z-10">
                                                        {template.tag}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-6 flex justify-between items-center bg-white">
                                                <h3 className="font-bold text-lg md:text-xl text-[#030213]">{template.name}</h3>
                                                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                                    <CheckCircle2 size={14} /> ATS Friendly
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <Button
                        onClick={() => router.push("/dashboard")}
                        variant="outline"
                        className="rounded-2xl px-12 py-7 text-lg bg-transparent font-bold border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 group"
                    >
                        View All Templates
                        <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
