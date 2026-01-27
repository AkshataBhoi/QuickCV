"use client";

import React from "react";
import { motion } from "framer-motion";
import { Upload, ArrowRight, Sparkles } from "lucide-react";

export function UploadCTA() {
    return (
        <section className="py-24 bg-white dark:bg-black/90 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-blob-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-blob-pulse" style={{ animationDelay: "2s" }} />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[3rem] bg-gray-950/50 backdrop-blur-xl border border-white/10 p-8 md:p-20 overflow-hidden shadow-2xl hover:border-primary/30 transition-colors duration-500 group"
                >
                    {/* Decorative Grid */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`, backgroundSize: '24px 24px' }}
                    />

                    <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                        >
                            <Sparkles className="text-primary" size={16} />
                            <span className="text-sm font-medium text-gray-300 tracking-wide uppercase">Boost Your Career</span>
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                            Elevate your resume with <span className="text-gradient">AI Precision</span>
                        </h2>

                        <p className="text-gray-400 text-lg md:text-xl mb-12 leading-relaxed font-medium">
                            Join thousands of professionals using QuickCV to land their dream roles.
                            Our AI analyzes recruiters' patterns to give you the competitive edge.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto relative group overflow-hidden"
                            >
                                <div className="absolute inset-0 rounded-xl bg-indigo-600 opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="relative flex items-center justify-center gap-3 px-10 py-5  text-white font-bold text-xl rounded-2xl border border-white/20 backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all">
                                    <Upload size={22} className=" transition-transform" />
                                    <span>Upload Resume</span>
                                    {/* <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" /> */}
                                </div>
                            </motion.button>

                            <div className="flex flex-col items-start sm:items-center">
                                <span className="text-white/80 text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    Free for 5 scans
                                </span>
                                <span className="text-gray-500 text-xs mt-1">No credit card required • Instant results</span>
                            </div>
                        </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors" />
                </motion.div>
            </div>
        </section>
    );
}
