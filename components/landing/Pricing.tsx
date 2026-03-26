"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface PricingPlan {
    name: string;
    id: string;
    monthlyPrice: number | string;
    yearlyPrice: number | string;
    description: string;
    features: string[];
    cta: string;
    popular?: boolean;
    icon: React.ElementType;
}

const plans: PricingPlan[] = [
    {
        name: "Free",
        id: "free",
        monthlyPrice: 0,
        yearlyPrice: 0,
        description: "Explore the basics of QuickCV.",
        icon: Zap,
        features: [
            "4 Resume Templates",
            "1 Resume Download",
            "No Cover Letters",
            "Premium Templates Locked"
        ],
        cta: "Get Started Free",
    },
    {
        name: "Premium",
        id: "premium",
        monthlyPrice: 499,
        yearlyPrice: 299,
        description: "Everything you need to land the job.",
        icon: Crown,
        popular: true,
        features: [
            "10 Resume Templates",
            "10 AI Cover Letters",
            "7 Resume Downloads",
            "Premium Templates Unlocked",
            "No Watermarks",
            "Priority Support"
        ],
        cta: "Unlock Premium",
    },
];

export function Pricing() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
    const router = useRouter();

    return (
        <section id="pricing" className="py-10 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                            <Sparkles size={10} className="text-indigo-400" /> Investment in your future
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter italic italic-shadow text-white">
                            Simple, <span className="text-indigo-500">Transparent</span> Pricing.
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-7 font-medium">
                            Choose the plan that fits your career goals. No hidden fees.
                        </p>
                    </motion.div>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-6">
                        <span className={`text-xs font-black uppercase tracking-widest ${billingCycle === "monthly" ? "text-white" : "text-gray-500"}`}>Monthly</span>
                        <button
                            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                            className="relative w-16 h-8 rounded-full bg-white/5 border border-white/10 p-1 flex items-center transition-all cursor-pointer hover:border-white/20"
                        >
                            <motion.div
                                animate={{ x: billingCycle === "monthly" ? 0 : 32 }}
                                className="w-6 h-6 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                        <span className={`text-xs font-black uppercase tracking-widest ${billingCycle === "yearly" ? "text-white" : "text-gray-500"}`}>Yearly</span>
                        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-tighter">
                            Save 30%
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`group relative flex flex-col p-10 rounded-[2.5rem] transition-all duration-500 ${
                                plan.popular 
                                ? "bg-white/[0.03] border border-indigo-500/30 shadow-[0_20px_40px_-15px_rgba(79,70,229,0.15)] scale-100 z-20" 
                                : "bg-white/[0.02] border border-white/5 hover:border-white/10 z-10"
                            }`}
                        >
                            {plan.popular && (
                                <>
                                    <div className="absolute inset-0 rounded-[2.5rem] bg-indigo-500/5 blur-2xl -z-10 group-hover:bg-indigo-500/10 transition-colors" />
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black px-6 py-2 rounded-full shadow-2xl tracking-widest uppercase italic">
                                        Most Popular
                                    </div>
                                </>
                            )}

                            <div className="mb-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-3 rounded-2xl ${plan.popular ? "bg-indigo-500 text-white" : "bg-white/5 text-gray-400"} shadow-xl`}>
                                        <plan.icon size={22} />
                                    </div>
                                    <h3 className="text-2xl font-black italic">{plan.name}</h3>
                                </div>
                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-6xl font-black italic tracking-tighter">
                                        ₹{billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                                    </span>
                                    <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">/ month</span>
                                </div>
                                <p className="text-sm text-gray-400 font-medium leading-relaxed">{plan.description}</p>
                            </div>

                            <div className="h-px bg-white/5 w-full mb-10" />

                            <ul className="space-y-5 mb-12 flex-grow">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-4 text-sm font-bold text-gray-300 group/item">
                                        <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                            plan.popular 
                                            ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400 group-hover/item:scale-110" 
                                            : "bg-white/5 border-white/10 text-gray-500"
                                        }`}>
                                            <Check size={10} strokeWidth={4} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button 
                                onClick={() => router.push("/login")}
                                className={`relative w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] overflow-hidden group/btn transition-all duration-300 active:scale-95 shadow-2xl ${
                                    plan.popular
                                    ? "bg-white text-indigo-950 hover:bg-gray-100 shadow-indigo-500/10"
                                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                                }`}
                            >
                                <span className="relative z-10 inline-block group-hover/btn:scale-105 transition-transform duration-300">
                                    {plan.cta}
                                </span>
                                {plan.popular && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                                )}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-8 mt-20"
                >
                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner">
                        <Zap size={16} className="text-amber-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">No credit card required to start</span>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner">
                        <Sparkles size={16} className="text-indigo-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Secure 256-bit SSL processing</span>
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
}
