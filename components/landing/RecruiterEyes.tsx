"use client";

import React from "react";
import { motion } from "framer-motion";

const keywords = [
    { text: "JavaScript", x: "20%", y: "45%" },
    { text: "React", x: "65%", y: "45%" },
    { text: "Node.js", x: "25%", y: "65%" },
    { text: "Tailwind CSS", x: "55%", y: "65%" },
    { text: "Next.js", x: "40%", y: "55%" },
];

export function RecruiterEyes() {
    return (
        <section className=" py-24 bg-[#030213] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                            See Your Resume Through a{" "}
                            <span className="text-green-500">Recruiter&apos;s Eyes</span>
                        </h2>
                        <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
                            Recruiters spend an average of 6 seconds eyeing a resume. Our
                            visualizer shows you exactly what they see—and what they miss.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Keyword Matching</h4>
                                    <p className="text-sm text-gray-500">
                                        We highlight the essential keywords ATS looking for.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Visual Hierarchy</h4>
                                    <p className="text-sm text-gray-500">
                                        Optimize layout to draw eyes to your biggest wins.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* The "Resume" Card */}
                        <div className="relative aspect-[3/3] bg-[#1a1926] rounded-2xl border border-white/10 p-8 shadow-2xl overflow-hidden group">
                            {/* Dummy text lines */}
                            <div className="space-y-4 opacity-20">
                                <div className="h-4 w-1/3 bg-gray-500 rounded" />
                                <div className="space-y-2">
                                    <div className="h-2 w-full bg-gray-600 rounded" />
                                    <div className="h-2 w-full bg-gray-600 rounded" />
                                    <div className="h-2 w-2/3 bg-gray-600 rounded" />
                                </div>
                                <div className="h-3 w-1/4 bg-gray-500 rounded mt-8" />
                                <div className="space-y-2">
                                    <div className="h-2 w-full bg-gray-600 rounded" />
                                    <div className="h-2 w-full bg-gray-600 rounded" />
                                    <div className="h-2 w-full bg-gray-600 rounded" />
                                    <div className="h-2 w-4/5 bg-gray-600 rounded" />
                                </div>
                                <div className="h-3 w-1/4 bg-gray-500 rounded mt-8" />
                                <div className="space-y-2">
                                    <div className="h-2 w-full bg-gray-600 rounded" />
                                    <div className="h-2 w-full bg-gray-600 rounded" />
                                    <div className="h-2 w-3/4 bg-gray-600 rounded" />
                                </div>
                            </div>

                            {/* Animated Keywords */}
                            {keywords.map((kw, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.5 + i * 0.1,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        repeatDelay: 2,
                                    }}
                                    className="absolute px-3 py-1 rounded-md bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-bold shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                                    style={{ top: kw.y, left: kw.x }}
                                >
                                    {kw.text}
                                </motion.div>
                            ))}

                            {/* Horizontal Scan Line */}
                            <motion.div
                                animate={{
                                    top: ["0%", "100%", "0%"],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 shadow-[0_0_20px_rgba(79,70,229,0.5)] z-10"
                            />

                            {/* Spotlight Effect */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),_transparent_0%,_rgba(3,2,19,0.8)_60%)] pointer-events-none group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Decorative background glow */}
                        <div className="absolute -inset-4 bg-indigo-500/10 rounded-[2.5rem] blur-2xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
