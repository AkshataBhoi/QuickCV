"use client";

import { Check, ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";

export default function PaymentPage() {
    const router = useRouter();
    const { displayToast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubscribe = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            displayToast("Subscription successful! Welcome to Pro.", "success");
            router.push("/dashboard");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-foreground flex flex-col">
            <div className="container mx-auto px-4 py-8">
                <Link href="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Link>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left: Summary */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">Upgrade to Pro</h1>
                            <p className="text-xl text-muted-foreground">Unlock the full power of AI for your career.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="mt-1 h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                    <Check className="h-3 w-3 text-emerald-500" />
                                </div>
                                <p className="text-gray-300">Unlimited AI Resume Re-writes</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                    <Check className="h-3 w-3 text-emerald-500" />
                                </div>
                                <p className="text-gray-300">Advanced ATS Scoring & Analysis</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                    <Check className="h-3 w-3 text-emerald-500" />
                                </div>
                                <p className="text-gray-300">Premium Templates</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                    <Check className="h-3 w-3 text-emerald-500" />
                                </div>
                                <p className="text-gray-300">Priority Support</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Payment Form (Mock) */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-lg font-semibold text-white">Payment Details</h3>
                            <div className="flex gap-2 text-muted-foreground">
                                <CreditCard className="h-5 w-5" />
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="p-4 rounded-lg border border-indigo-500/50 bg-indigo-500/10 flex justify-between items-center cursor-pointer ring-1 ring-indigo-500">
                                <div>
                                    <p className="font-semibold text-white">Monthly Plan</p>
                                    <p className="text-sm text-indigo-300">$19.00 / month</p>
                                </div>
                                <div className="h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center">
                                    <Check className="h-3 w-3 text-white" />
                                </div>
                            </div>
                            <div className="p-4 rounded-lg border border-white/10 bg-white/5 opacity-50 cursor-pointer hover:opacity-80 transition-opacity">
                                <div>
                                    <p className="font-semibold text-white">Yearly Plan</p>
                                    <p className="text-sm text-muted-foreground">$190.00 / year (Save 17%)</p>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleSubscribe}
                            disabled={loading}
                            className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold text-lg"
                        >
                            {loading ? "Processing..." : "Subscribe Now"}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Secure payment powered by Stripe. Cancel anytime.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
