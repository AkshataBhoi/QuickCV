"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, PenLine, Type } from "lucide-react";

export function HowItWorks() {
    return (
        <section className="py-24">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        How ResuStack works
                    </h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        Create your professional resume in three simple steps
                    </p>
                </div>

                <div className="grid gap-12 lg:gap-8">
                    {/* Step 1: Add Content */}
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="order-2 lg:order-1 bg-background rounded-2xl shadow-xl border p-6 md:p-8 max-w-xl mx-auto w-full"
                        >
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-lg">Edit personal details</h3>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-muted-foreground">Full name</label>
                                            <div className="h-10 w-full rounded-md border bg-muted/20 px-3 py-2 text-sm">
                                                Brian T. Wayne
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-muted-foreground">Job title <span className="text-muted-foreground/50">optional</span></label>
                                            <div className="h-10 w-full rounded-md border bg-muted/20 px-3 py-2 text-sm">
                                                Business Development Consultant
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative shrink-0">
                                        <div className="h-24 w-24 rounded-xl bg-muted overflow-hidden">
                                            <img
                                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
                                                alt="Avatar"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                                            <PenLine className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="order-1 lg:order-2 space-y-4 lg:pl-10"
                        >
                            <div className="text-4xl font-bold text-muted-foreground/20">01</div>
                            <h3 className="text-2xl font-bold">Add content</h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Build your resume — we'll guide you every step of the way to ensure it's professional and polished.
                            </p>
                        </motion.div>
                    </div>

                    {/* Step 2: Design Effortlessly */}
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="space-y-4 lg:pr-10"
                        >
                            <div className="text-4xl font-bold text-muted-foreground/20">02</div>
                            <h3 className="text-2xl font-bold">Design effortlessly</h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Choose from over 50 templates and customize every detail to suit your style and career.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-background rounded-2xl shadow-xl border p-6 md:p-8 max-w-xl mx-auto w-full flex items-center justify-center min-h-[200px]"
                        >
                            <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className={`
                                            w-10 h-10 sm:w-14 sm:h-14 rounded-lg border-2 flex items-center justify-center text-lg sm:text-2xl font-serif cursor-pointer transition-all
                                            ${i === 2
                                                ? "border-primary bg-primary/5 text-primary scale-110 shadow-lg"
                                                : "border-muted hover:border-primary/50 text-muted-foreground"
                                            }
                                        `}
                                    >
                                        T
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Step 3: Download & Share */}
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="order-2 lg:order-1 bg-background rounded-2xl shadow-xl border p-6 md:p-8 max-w-xl mx-auto w-full relative overflow-hidden group"
                        >
                            {/* Resume Preview Mockup */}
                            <div className="bg-white text-black p-6 rounded shadow-sm text-[10px] opacity-80 group-hover:opacity-100 transition-opacity">
                                <div className="flex justify-between border-b pb-4 mb-4 border-gray-200">
                                    <div>
                                        <div className="font-bold text-lg">Brian T. Wayne</div>
                                        <div className="text-gray-500">Business Development Consultant</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1 space-y-2">
                                        <div className="h-2 w-12 bg-gray-200 rounded" />
                                        <div className="h-2 w-full bg-gray-100 rounded" />
                                        <div className="h-2 w-full bg-gray-100 rounded" />
                                        <div className="h-2 w-20 bg-gray-100 rounded" />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <div className="h-2 w-24 bg-gray-200 rounded" />
                                        <div className="h-2 w-full bg-gray-100 rounded" />
                                        <div className="h-2 w-full bg-gray-100 rounded" />
                                        <div className="h-2 w-full bg-gray-100 rounded" />
                                        <div className="h-2 w-3/4 bg-gray-100 rounded" />
                                    </div>
                                </div>
                            </div>

                            {/* Download Overlay */}
                            <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button size="lg" className="shadow-2xl">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download PDF
                                </Button>
                            </div>

                            {/* Permanent Floating Button for mobile/default view */}
                            <div className="absolute bottom-6 right-6 group-hover:opacity-0 transition-opacity">
                                <div className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg animate-bounce">
                                    <Download className="h-5 w-5" />
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="order-1 lg:order-2 space-y-4 lg:pl-10"
                        >
                            <div className="text-4xl font-bold text-muted-foreground/20">03</div>
                            <h3 className="text-2xl font-bold">Download & Share</h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Download your resume as a PDF or share it online with your unique link.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
