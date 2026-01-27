"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X, Gift, Grid3x3, Package } from "lucide-react";
import { useState } from "react";
import { useModal } from "@/components/providers/modal-provider";

const pricingPlans = [
    {
        id: "basic",
        name: "Basic",
        icon: Gift,
        description: "Perfect for getting started",
        price: 0,
        originalPrice: null,
        features: [
            { text: "3 Resume Templates", included: true },
            { text: "Basic AI Suggestions", included: true },
            { text: "PDF Export", included: true },
            { text: "Unlimited Resume Builds", included: false },
            { text: "Cover Letter Builder", included: false },
        ],
    },
    {
        id: "pro",
        name: "Pro Creator",
        icon: Grid3x3,
        description: "Most popular choice",
        price: 2,
        originalPrice: 5,
        badge: "Most Popular",
        features: [
            { text: "Unlimited Resume Builds", included: true },
            { text: "Cover Letter Builder", included: true },
            { text: "Job Description Match", included: true },
            { text: "AI Cover Letter Writer", included: true },
            { text: "All Premium Templates", included: true },
            { text: "Priority Support", included: true },
        ],
    },
    {
        id: "enterprise",
        name: "Ultimate Enterprise",
        icon: Package,
        description: "For teams and organizations",
        price: null,
        originalPrice: null,
        features: [
            { text: "Everything in Pro", included: true },
            { text: "Team Licensing", included: true },
            { text: "Custom Integrations", included: true },
            { text: "Dedicated Support", included: true },
            { text: "Custom Branding", included: true },
        ],
    },
];

export function Pricing() {
    const { openModal } = useModal();
    const [selectedPlan, setSelectedPlan] = useState("basic");

    return (
        <section id="pricing" className="relative w-full overflow-hidden bg-background py-20 md:py-32">

            <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">
                {/* Heading */}
                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
                    >
                        Our Professional Pricing
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        One-time purchase for lifetime access.
                    </motion.p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {pricingPlans.map((plan, index) => {
                        const Icon = plan.icon;
                        const isSelected = selectedPlan === plan.id;
                        const isPro = plan.id === "pro";

                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="relative"
                            >
                                {/* Most Popular Badge */}
                                {plan.badge && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                        <span className="bg-cyan-500 text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                            {plan.badge}
                                        </span>
                                    </div>
                                )}

                                <motion.div
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={`
                                        relative h-full bg-[#1a1f2e] rounded-2xl p-6 cursor-pointer
                                        border-2 transition-all duration-300
                                        ${isSelected
                                            ? 'border-cyan-500 shadow-2xl shadow-cyan-500/20'
                                            : 'border-slate-700/50 hover:border-slate-600'
                                        }
                                        ${isPro ? 'bg-gradient-to-br from-[#1a1f2e] to-[#0f172a]' : ''}
                                    `}
                                >
                                    {/* Icon */}
                                    <div className="mb-6">
                                        <div className={`inline-flex p-3 rounded-lg ${isPro ? 'bg-cyan-500/10' : 'bg-slate-800'}`}>
                                            <Icon className={`w-8 h-8 ${isPro ? 'text-cyan-400' : 'text-slate-400'}`} />
                                        </div>
                                    </div>

                                    {/* Plan Name */}
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-sm text-slate-400 mb-6">{plan.description}</p>

                                    {/* Price */}
                                    <div className="mb-6">
                                        {plan.price !== null ? (
                                            <div className="flex items-end gap-2">
                                                <span className="text-5xl font-bold text-white">
                                                    ${plan.price}
                                                </span>
                                                {plan.originalPrice && (
                                                    <span className="text-xl text-slate-500 line-through mb-2">
                                                        ${plan.originalPrice}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-3xl font-bold text-white">
                                                Contact Us
                                            </div>
                                        )}
                                    </div>

                                    {/* CTA Button */}
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (plan.price === null) {
                                                // Contact us action
                                                window.location.href = "mailto:contact@resumax.com";
                                            } else {
                                                openModal();
                                            }
                                        }}
                                        className={`
                                            w-full h-12 text-sm font-bold rounded-lg mb-6
                                            transition-all duration-300
                                            ${isPro
                                                ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                                                : 'bg-white hover:bg-slate-100 text-black'
                                            }
                                        `}
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <span>💳</span>
                                            {plan.price === null ? "Contact Sales" : "Purchase Now"}
                                        </span>
                                    </Button>

                                    {/* Features */}
                                    <div className="space-y-3 pt-6 border-t border-slate-700/50">
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                                            {plan.id === "basic" ? "Core Features:" : plan.id === "pro" ? "Everything in Starter, plus:" : "Everything in Pro, plus:"}
                                        </p>
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                {feature.included ? (
                                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                                                        <Check className="w-3 h-3 text-green-500" />
                                                    </div>
                                                ) : (
                                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center mt-0.5">
                                                        <X className="w-3 h-3 text-red-500" />
                                                    </div>
                                                )}
                                                <span className={`text-sm ${feature.included ? 'text-slate-300' : 'text-slate-500 line-through'}`}>
                                                    {feature.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Estimated Breakdown (Optional) */}
                                    {plan.price !== null && (
                                        <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-2">
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                                Estimated Breakdown (USD Mock)
                                            </p>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">Subtotal (Qty 1)</span>
                                                <span className="text-white font-medium">${plan.price}.00</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">Tax (0%)</span>
                                                <span className="text-green-400 font-medium">+$0.00</span>
                                            </div>
                                            <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-700/50">
                                                <span className="text-white">Total</span>
                                                <span className="text-white">${plan.price}.00</span>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
