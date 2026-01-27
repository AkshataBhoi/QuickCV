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
        <section id="pricing" className="relative w-full overflow-hidden bg-gray-50 py-20 md:py-32">
            <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
                <div className="mb-12 space-y-3 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-sm font-semibold uppercase tracking-wide text-indigo-600"
                    >
                        Our Professional Pricing
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl"
                    >
                        Simple, transparent plans for every stage of your search
                    </motion.p>
                    <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 md:text-base">
                        Pick the plan that matches how actively you&apos;re applying. All plans
                        include AI resume analysis and recruiter-style feedback.
                    </p>
                </div>

                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3 lg:gap-8">
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
                                {plan.badge && (
                                    <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                                        <span className="rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-md">
                                            {plan.badge}
                                        </span>
                                    </div>
                                )}

                                <motion.div
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={`
                                        relative h-full cursor-pointer rounded-2xl border-2 bg-white p-6
                                        transition-all duration-300
                                        ${isSelected
                                            ? "border-indigo-500 shadow-xl shadow-indigo-100"
                                            : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                                        }
                                        ${isPro ? "bg-indigo-50/70" : ""}
                                    `}
                                >
                                    <div className="mb-6">
                                        <div className={`inline-flex rounded-lg p-3 ${isPro ? "bg-indigo-100" : "bg-gray-100"}`}>
                                            <Icon className={`h-8 w-8 ${isPro ? "text-indigo-600" : "text-gray-500"}`} />
                                        </div>
                                    </div>

                                    <h3 className="mb-1 text-lg font-semibold text-gray-900">{plan.name}</h3>
                                    <p className="mb-6 text-sm text-gray-500">{plan.description}</p>

                                    <div className="mb-6">
                                        {plan.price !== null ? (
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-semibold text-gray-900">
                                                    ${plan.price}
                                                </span>
                                                {plan.originalPrice && (
                                                    <span className="text-xs text-gray-400 line-through">
                                                        ${plan.originalPrice}
                                                    </span>
                                                )}
                                                <span className="text-xs text-gray-500">
                                                    {plan.id === "basic" ? "one-time" : "per month"}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="text-2xl font-semibold text-gray-900">
                                                Contact Us
                                            </div>
                                        )}
                                    </div>

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
                                            mb-6 h-11 w-full rounded-full text-sm font-semibold
                                            transition-all duration-300
                                            ${isPro
                                                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200"
                                                : "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                                            }
                                        `}
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <span>💳</span>
                                            {plan.price === null ? "Contact Sales" : "Purchase Now"}
                                        </span>
                                    </Button>

                                    <div className="space-y-3 border-t border-gray-200 pt-6">
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            {plan.id === "basic"
                                                ? "Core features"
                                                : plan.id === "pro"
                                                    ? "Everything in Starter, plus"
                                                    : "Everything in Pro, plus"}
                                        </p>
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                {feature.included ? (
                                                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-50">
                                                        <Check className="h-3 w-3 text-green-600" />
                                                    </div>
                                                ) : (
                                                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                                                        <X className="h-3 w-3 text-gray-400" />
                                                    </div>
                                                )}
                                                <span
                                                    className={`text-sm ${feature.included ? "text-gray-700" : "text-gray-400 line-through"
                                                        }`}
                                                >
                                                    {feature.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {plan.price !== null && (
                                        <div className="mt-6 space-y-2 border-t border-gray-200 pt-6">
                                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Example breakdown
                                            </p>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Subtotal</span>
                                                <span className="font-medium text-gray-900">${plan.price}.00</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Tax</span>
                                                <span className="font-medium text-green-600">+$0.00</span>
                                            </div>
                                            <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-semibold">
                                                <span className="text-gray-900">Total</span>
                                                <span className="text-gray-900">${plan.price}.00</span>
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
