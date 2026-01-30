"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";

interface PlanFeature {
    text: string;
    included: boolean;
}

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
        description: "Perfect for a quick start.",
        icon: Zap,
        features: [
            "3 resume templates",
        "Limited AI generations",
        "PDF download",
        "Watermark",
        ],
        cta: "Get Started Free",
    },
    {
        name: "Pro",
        id: "pro",
        monthlyPrice: 499,
        yearlyPrice: 349,
        description: "For serious job seekers.",
        icon: Star,
        popular: true,
        features: [
             "All resume templates",
        "High AI limits",
        "ATS-friendly resumes",
        "PDF export",
        "Resume analytics / scoring",
        "Cover letter generator"
        ],
        cta: "Upgrade to Pro",
    },
    {
        name: "Premium",
        id: "premium",
        monthlyPrice: 999,
        yearlyPrice: 699,
        description: "The complete career kit.",
        icon: Crown,
        features: [
            "Everything in Pro",
        "DOCX export",
        "Multiple resumes per account",
        "Resume version history",
        "Custom resume sections",
        ],
        cta: "Go Premium",
    },
];

export function Pricing() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    return (
        <section id="pricing" className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Choose the plan that fits your career goals. No hidden fees.
                        </p>
                    </motion.div>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
                        <button
                            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                            className="relative w-14 h-7 rounded-full bg-muted border border-border p-1 flex items-center transition-colors cursor-pointer"
                        >
                            <motion.div
                                animate={{ x: billingCycle === "monthly" ? 0 : 28 }}
                                className="w-5 h-5 rounded-full bg-primary shadow-lg"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                        <span className={`text-sm font-medium ${billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"}`}>Yearly</span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary animate-pulse">
                            SAVE UP TO 30%
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`group relative flex flex-col p-8 rounded-[2rem] bg-card/50 border border-border/50 backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-10px_rgba(var(--primary),0.2)] ${plan.popular ? "ring-2 ring-primary ring-offset-4 ring-offset-background" : ""
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[11px] font-black px-4 py-1.5 rounded-full shadow-xl tracking-wider uppercase">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300`}>
                                        <plan.icon size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold">{plan.name}</h3>
                                </div>
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-4xl font-black">
                                        ₹{billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                                    </span>
                                    <span className="text-muted-foreground font-medium">/mo</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{plan.description}</p>
                            </div>

                            <div className="h-px bg-border/50 w-full mb-8" />

                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-3 text-sm text-foreground/80">
                                        <div className="mt-0.5 shrink-0 text-primary">
                                            <Check size={16} strokeWidth={3} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`relative w-full py-4 rounded-xl font-bold text-sm overflow-hidden group/btn transition-all duration-300 active:scale-95 ${plan.popular
                                    ? "bg-primary text-primary-foreground hover:shadow-[0_0_20px_rgba(var(--primary),0.4)]"
                                    : "bg-muted text-foreground border border-border hover:bg-muted/80"
                                }`}>
                                <span className="relative z-10 transition-colors duration-300 group-hover/btn:scale-105 inline-block">
                                    {plan.cta}
                                </span>
                                {plan.popular && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:animate-shimmer" />
                                )}
                            </button>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12 text-sm text-muted-foreground font-medium"
                >
                    No credit card required to start • Secure payment processing
                </motion.p>
            </div>

            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        </section>
    );
}
