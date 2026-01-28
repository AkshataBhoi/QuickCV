"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Shield, Zap } from "lucide-react";

const plans = [
    {
        name: "Free Plan",
        icon: Zap,
        price: "$0",
        description: "Perfect for exploring our platform and starting your journey.",
        accent: "text-indigo-500",
        bgColor: "bg-indigo-500/10",
        features: ["3 Resume Templates", "Basic AI Suggestions", "PDF Export", "Unlimited Resume Builds"],
    },
    {
        name: "Pro Plan",
        icon: Star,
        price: "$19",
        oldPrice: "$29",
        description: "For active seekers who want advanced tools to grow.",
        accent: "text-white",
        bgColor: "bg-white/10",
        popular: true,
        features: [
            "Everything in Free",
            "Advanced AI Assistant",
            "Cover Letter Builder",
            "Job Description Match",
            "Priority Support",
        ],
    },
    {
        name: "Advance Plan",
        icon: Shield,
        price: "Custom",
        description: "For professionals seeking tailored solutions and end results.",
        accent: "text-green-500",
        bgColor: "bg-green-500/10",
        features: [
            "Everything in Pro",
            "Dedicated account manager",
            "Customizable tools",
            "Team collaboration",
            "Advanced insights",
        ],
    },
];

export function Pricing() {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <section id="pricing" className="py-24 bg-[#030213] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#717182] mb-6"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        PRICING
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-white mb-6"
                    >
                        Plans and Pricing
                    </motion.h2>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className={`text-xs font-bold transition-colors ${!isAnnual ? "text-white" : "text-gray-500"}`}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="relative w-11 h-6 rounded-full bg-white/10 border border-white/20 p-1 flex items-center transition-colors hover:border-white/40"
                        >
                            <motion.div
                                animate={{ x: isAnnual ? 20 : 0 }}
                                className="w-4 h-4 rounded-full bg-white shadow-sm"
                            />
                        </button>
                        <span className={`text-xs font-bold transition-colors ${isAnnual ? "text-white" : "text-gray-500"}`}>Annually</span>
                        <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-black text-green-400">SAVE 30%</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, idx) => {
                        const Icon = plan.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`flex flex-col rounded-[2.5rem] p-10 bg-white/5 border border-white/10 backdrop-blur-xl relative group ${plan.popular ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/10' : ''}`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg tracking-widest uppercase border border-indigo-400">
                                        Most Popular
                                    </div>
                                )}
                                <div className={`w-12 h-12 rounded-2xl ${plan.bgColor} flex items-center justify-center mb-8 border border-white/5`}>
                                    <Icon className={plan.accent} size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-sm text-gray-500 mb-8 leading-relaxed h-12">{plan.description}</p>

                                <div className="mb-10">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-white tracking-tighter">{isAnnual && plan.price !== "Custom" ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.7)}` : plan.price}</span>
                                        {plan.price !== "Custom" && <span className="text-gray-500 font-bold">/mo</span>}
                                    </div>
                                    {plan.oldPrice && (
                                        <span className="text-sm text-gray-600 line-through font-bold">{plan.oldPrice}</span>
                                    )}
                                </div>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-400">
                                            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="text-green-500" size={12} />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/20' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}`}>
                                    {plan.name === "Free Plan" ? "Start for Free" : "Get Started"}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
