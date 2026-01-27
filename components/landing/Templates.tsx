"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const templates = [
    {
        name: "Modern Professional",
        tag: "Most Popular",
        image: "https://images.unsplash.com/photo-1586281380349-631533a3c947?auto=format&fit=crop&q=80&w=400",
    },
    {
        name: "Creative Executive",
        tag: "Creative",
        image: "https://images.unsplash.com/photo-1626197031507-c17099753214?auto=format&fit=crop&q=80&w=400",
    },
    {
        name: "Classic Academic",
        tag: "Academic",
        image: "https://images.unsplash.com/photo-1544650031-fbcd12104234?auto=format&fit=crop&q=80&w=400",
    },
    {
        name: "Tech Focused",
        tag: "Minimal",
        image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=400",
    },
    {
        name: "Minimalist Entry",
        tag: "Clean",
        image: "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?auto=format&fit=crop&q=80&w=400",
    },
    {
        name: "Sleek Manager",
        tag: "Premium",
        image: "https://images.unsplash.com/photo-1693045181254-08462917f681?auto=format&fit=crop&q=80&w=400",
    },
];

export function Templates() {
    return (
        <section className="py-24 bg-[#f8f9fa]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-extrabold text-[#030213] mb-4"
                        >
                            Expertly Crafted Templates
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-[#717182]"
                        >
                            Choose from a variety of ATS-optimized templates designed by hiring experts to make your resume shine.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <button className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors flex items-center gap-2 group">
                            View All Templates
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl overflow-hidden border border-[#ececf0] group cursor-pointer shadow-sm hover:shadow-xl transition-all"
                        >
                            <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                                <img
                                    src={template.image}
                                    alt={template.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button className="bg-white text-black font-bold px-6 py-2 rounded-lg shadow-lg">
                                        Use This Template
                                    </button>
                                </div>
                                {template.tag && (
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm border border-indigo-100">
                                        {template.tag}
                                    </div>
                                )}
                            </div>
                            <div className="p-5 flex justify-between items-center bg-white">
                                <h3 className="font-bold text-[#030213]">{template.name}</h3>
                                <CheckCircle2 size={18} className="text-green-500 opacity-60" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
