"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-17 pb-20 overflow-hidden bg-gray-300">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px] opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] opacity-60 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8"
                        >
                            <Sparkles size={16} className="text-indigo-600" />
                            <span>AI-POWERED RESUME BUILDER</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl font-[900] text-gray-900 leading-[1.05] mb-8 tracking-tight">
                            Build a resume that <br />
                            <span className="text-indigo-600 bg-clip-text">gets interviews.</span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl font-medium">
                            Join 10,000+ professionals using QuickCV to optimize their resumes for ATS and land 3x more interviews with AI-driven insights.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 items-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all cursor-pointer shadow-2xl shadow-indigo-200"
                            >
                                Build Your Resume <ArrowRight size={22} />
                            </motion.button>

                            <div className="flex flex-col gap-2">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-12 h-12 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-sm"
                                        >
                                            <img
                                                src={`https://i.pravatar.cc/100?img=${i + 20}`}
                                                alt="Professional"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5 text-yellow-400">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} size={14} fill="currentColor" />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-gray-500">
                                        4.9/5 by 10k+ users
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative z-20 bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 p-5 transform lg:rotate-3 hover:rotate-0 transition-transform duration-700 ease-out group">
                            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-gray-50 bg-gray-50 relative">
                                <img
                                    src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000"
                                    alt="Professional Resume Design"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* AI Floating Badge */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-8 right-8 w-56 bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-4 border border-indigo-100"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                                            AI Optimizer
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900 mb-2">
                                        Impact Score Improved!
                                    </p>
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "94%" }}
                                            transition={{ duration: 2, delay: 1 }}
                                            className="h-full bg-indigo-600"
                                        />
                                    </div>
                                </motion.div>

                                {/* ATS Badge */}
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-12 left-8 bg-gray-900 shadow-2xl rounded-2xl p-5 text-white border border-white/10"
                                >
                                    <div className="flex items-center justify-between mb-3 gap-6">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                            ATS Compatibility
                                        </span>
                                        <span className="text-lg font-[900] text-emerald-400">
                                            98%
                                        </span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1.5 flex-1 rounded-full ${i <= 7 ? "bg-emerald-500" : "bg-white/20"}`}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        {/* Abstract Background Shapes */}
                        <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-100 rounded-full -z-10 blur-3xl opacity-50" />
                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-100 rounded-full -z-10 blur-3xl opacity-50" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
