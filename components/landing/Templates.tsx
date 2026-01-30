"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { useUser } from "@/components/providers/user-provider";
import { useModal } from "@/components/providers/modal-provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/fakeAuth";

const templates = [
    {
        name: "Modern Professional",
        tag: "Most Popular",
        image: "https://images.openai.com/static-rsc-3/pvgvHA39P8RxyJhtkb5Lp8rNgaAE8TkYvWusJHpAFIY0loA4NOy349fA9l43Vta1hScRa79NHBtunDMc5ig6HamZl21vol2H0FRK8bKwmpU?purpose=fullsize",
    },
    {
        name: "Creative Executive",
        tag: "Creative",
        image: "https://images.openai.com/static-rsc-3/pvgvHA39P8RxyJhtkb5Lp8rNgaAE8TkYvWusJHpAFIY0loA4NOy349fA9l43Vta1hScRa79NHBtunDMc5ig6HamZl21vol2H0FRK8bKwmpU?purpose=fullsize",
    },
    {
        name: "Classic Academic",
        tag: "Academic",
        image: "https://cdn.prod.website-files.com/62f0854c1cef28185535ab61/65f985a44f52c1def4988acd_minimalist-1.png",
    },
    {
        name: "Tech Focused",
        tag: "Minimal",
        image: "https://i.etsystatic.com/20769234/r/il/faf394/2004290491/il_fullxfull.2004290491_530n.jpg",
    },
    {
        name: "Minimalist Entry",
        tag: "Clean",
        image: "https://images.openai.com/static-rsc-3/4o7tiR4ncszPrBsG1PhoioDLGbUTo8IvxukSA59pvlnuj7ibOz7yniS1g8ZHTESz6JXFIfXN7wtYFqogOg7TCg1L2ufnRzoxqRn5LjRKKh4?purpose=fullsize",
    },
    {
        name: "Sleek Manager",
        tag: "Premium",
        image: "https://images.unsplash.com/photo-1693045181254-08462917f681?auto=format&fit=crop&q=80&w=400",
    },
];

export function Templates() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(3);
    const { user } = useUser();
    const { openModal } = useModal();
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

    const handleViewAll = () => {
        if (isAuthenticated()) {
            router.push("/dashboard");
        } else {
            openModal();
        }
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
                            {templates.map((template, idx) => (
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
                                        className="bg-white rounded-[2rem] overflow-hidden border border-[#ececf0] group cursor-pointer shadow-sm transition-all duration-300"
                                    >
                                        <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                                            <img
                                                src={template.image}
                                                alt={template.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                <Button className="bg-white text-black font-bold px-8 py-3 rounded-xl shadow-xl hover:bg-gray-50 border-0 transition-all transform group-hover:scale-105 active:scale-95">
                                                    Use This Template
                                                </Button>
                                            </div>
                                            {template.tag && (
                                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm border border-indigo-100">
                                                    {template.tag}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-8 flex justify-between items-center bg-white">
                                            <h3 className="font-bold text-xl text-[#030213]">{template.name}</h3>
                                            <CheckCircle2 size={22} className="text-emerald-500 opacity-80" />
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
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
                        onClick={handleViewAll}
                        variant="outline"
                        className="rounded-2xl px-12 py-7 text-lg bg-transparent font-bold border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 group"
                    >
                        View All 20+ Templates
                        <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
