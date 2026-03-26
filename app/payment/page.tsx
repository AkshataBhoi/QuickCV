"use client";

import { Check, ArrowLeft, CreditCard, ShieldCheck, Lock, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubscribe = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            toast.success("Payment Successful 🎉", {
                description: "Your Premium features are now unlocked."
            });
            
            // Redirect after showing success state
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        }, 2500);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center space-y-6 bg-white/5 border border-white/10 p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl"
                >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-black text-white">Payment Successful 🎉</h1>
                    <p className="text-gray-400">Welcome to Premium! We're redirecting you back to your dashboard...</p>
                    <Loader2 className="h-6 w-6 text-indigo-500 animate-spin mx-auto" />
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500/30">
            {/* Background Decor */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 py-12 relative z-10">
                <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-white mb-12 transition-all group font-bold uppercase tracking-widest text-xs">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                </Link>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        
                        {/* Left: Summary */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-10"
                        >
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                    <Sparkles size={14} className="animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Premium Plan</span>
                                </div>
                                <h1 className="text-5xl font-black tracking-tight leading-none italic">
                                    Elevate Your <br />
                                    <span className="text-indigo-400">Career Trajectory.</span>
                                </h1>
                                <p className="text-xl text-gray-400 leading-relaxed font-medium">
                                    Join 50,000+ professionals landing their dream jobs with QuickCV Premium.
                                </p>
                            </div>

                            <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
                                <div className="absolute -top-4 -right-4 bg-indigo-500 text-white text-[10px] font-black px-6 py-2 rounded-full shadow-lg rotate-12 uppercase tracking-tighter">
                                    Best Value
                                </div>
                                
                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-5xl font-black italic">₹499</span>
                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">/ Monthly</span>
                                </div>

                                <ul className="space-y-5">
                                    {[
                                        "Unlimited Premium AI Re-writes",
                                        "Advanced ATS Real-time Scoring",
                                        "Unlimited Download Credits",
                                        "All 50+ Premium Templates Unlocked",
                                        "Priority AI Processing & Support"
                                    ].map((feature, i) => (
                                        <li key={i} className="flex gap-4 items-center group">
                                            <div className="h-6 w-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30 group-hover:scale-110 transition-transform">
                                                <Check className="h-3 w-3 text-indigo-400" strokeWidth={4} />
                                            </div>
                                            <span className="text-gray-300 font-bold text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Right: Payment Section */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-white italic">Secure Payment</h3>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">Stripe Protected</p>
                                </div>
                                <div className="flex gap-2 p-3 bg-white/5 rounded-2xl border border-white/10">
                                    <CreditCard className="h-6 w-6 text-indigo-400" />
                                </div>
                            </div>

                            <div className="space-y-6 mb-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Card Number</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            placeholder="XXXX XXXX XXXX XXXX" 
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all font-mono tracking-widest text-sm"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                                            <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                                            <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">MC</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Expiry Date</label>
                                        <input 
                                            type="text" 
                                            placeholder="MM / YY" 
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all font-mono text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">CVC</label>
                                        <input 
                                            type="text" 
                                            placeholder="•••" 
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all font-mono text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleSubscribe}
                                disabled={loading}
                                className="w-full h-16 bg-white text-indigo-950 hover:bg-gray-200 font-black text-lg rounded-2xl shadow-xl shadow-indigo-500/10 transition-all active:scale-[0.98] group overflow-hidden"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    {loading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                            <Lock size={18} />
                                            <span>Upgrade Now</span>
                                        </>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            </Button>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                    <span className="text-[9px] font-bold text-emerald-500/80 uppercase tracking-tighter">Secure Checkout</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                                    <Lock className="h-4 w-4 text-indigo-500" />
                                    <span className="text-[9px] font-bold text-indigo-500/80 uppercase tracking-tighter">No Hidden Fees</span>
                                </div>
                            </div>

                            <p className="text-[10px] text-center text-gray-500 mt-6 font-medium leading-relaxed">
                                Your subscription will begin immediately. You can cancel at any time from your account settings. Payments are processed securely via SSL encryption.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
