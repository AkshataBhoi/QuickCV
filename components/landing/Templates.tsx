"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DEFAULT_RESUME_DATA } from "@/lib/defaultResumeData";

import { TEMPLATES } from "@/lib/templates.config";

export function Templates() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerSlide(1);
      else if (window.innerWidth < 1024) setItemsPerSlide(2);
      else setItemsPerSlide(5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, TEMPLATES.length - itemsPerSlide);

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
              className="text-3xl md:text-4xl font-black text-[#030213] mb-4 tracking-tight"
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
              Choose from a variety of ATS-optimized templates designed by
              hiring experts to make your resume shine.
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
              {TEMPLATES.map((template, idx) => {
                const TemplateComponent = template.component;
                return (
                  <div
                    key={idx}
                    className="px-2 shrink-0 transition-opacity duration-300"
                    style={{ width: `${100 / itemsPerSlide}%` }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="bg-white rounded-2xl overflow-hidden border border-[#ececf0] group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 max-w-[280px] mx-auto"
                    >
                      {/* Preview Container - "Image" */}
                      <div className="aspect-[3/4] relative overflow-hidden bg-white border-b border-gray-100">
                        {/* Static Image Support (Fallback to Component) */}
                        {template.thumbnail ? (
                          <img
                            src={template.thumbnail}
                            alt={template.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          /* Scaled Resume Component */
                          <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-2">
                            <div
                              style={{
                                transform: "scale(0.35)",
                                transformOrigin: "top center",
                                width: "794px", // A4 width at 96dpi
                              }}
                              className="shadow-2xl bg-white origin-top"
                            >
                              <TemplateComponent
                                data={DEFAULT_RESUME_DATA}
                                isPdf={false}
                              />
                            </div>
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 backdrop-blur-[2px]">
                          <Button
                            onClick={() => handleUseTemplate(template.id)}
                            className="bg-white text-black hover:bg-gray-100 font-bold px-8 py-6 rounded-xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                          >
                            Use Template
                          </Button>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate pr-2">
                            {template.name}
                          </h3>
                          {template.tag && (
                            <span className="shrink-0 px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold">
                              {template.tag}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[#717182] text-xs">
                          <CheckCircle2
                            size={14}
                            className="text-emerald-500"
                          />
                          ATS Optimized
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
            <ChevronRight
              className="ml-2 transition-transform group-hover:translate-x-1"
              size={20}
            />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
