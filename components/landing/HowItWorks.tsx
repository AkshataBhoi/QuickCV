"use client";

import React from "react";
import { motion } from "framer-motion";
import { Upload, Search, Zap } from "lucide-react";

const steps = [
  {
    title: "Upload Resume",
    description: "Import your current resume in PDF or Word format to get started.",
    icon: Upload,
    bg: "bg-indigo-500/15",
    iconColor: "text-indigo-600",
    border: "border-indigo-200",
  },
  {
    title: "AI Analysis",
    description: "Our AI scans your resume for ATS compatibility and skill gaps.",
    icon: Search,
    bg: "bg-purple-500/15",
    iconColor: "text-purple-600",
    border: "border-purple-200",
  },
  {
    title: "Get Optimized",
    description: "Receive instant suggestions to make your resume stand out.",
    icon: Zap,
    bg: "bg-green-500/15",
    iconColor: "text-green-600",
    border: "border-green-200",
  },
];


export function HowItWorks() {
    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-extrabold text-[#030213] mb-4"
                    >
                        How it Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[#717182] max-w-2xl mx-auto"
                    >
                        Three simple steps to a professional, ATS-ready resume that gets you hired.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-10" />

                    {steps.map((step, idx) => {
  const Icon = step.icon;

  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.2 }}
      className="flex flex-col items-center text-center bg-white p-6 rounded-2xl md:bg-transparent md:p-0"
    >
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${step.bg} ${step.border}`}
      >
        <Icon size={32} strokeWidth={2.5} className={step.iconColor} />
      </div>

      <h3 className="text-xl font-bold text-[#030213] mb-3">
        {step.title}
      </h3>

      <p className="text-[#717182] leading-relaxed text-sm">
        {step.description}
      </p>
    </motion.div>
  );
})}

                </div>
            </div>
        </section>
    );
}
