"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Check, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumUnlockDialogProps {
    open: boolean;
    onClose: () => void;
    onUnlock: () => void;
}

export function PremiumUnlockDialog({ open, onClose, onUnlock }: PremiumUnlockDialogProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-[#0f111a] border border-indigo-500/20 rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Decorative Background */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-indigo-600/20 to-transparent pointer-events-none" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/30 blur-[60px] rounded-full pointer-events-none" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-20"
                >
                    <X className="h-5 w-5 text-muted-foreground" />
                </button>

                <div className="p-8 relative z-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/30 transform rotate-3">
                        <Lock className="h-8 w-8 text-white" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">Unlock Premium Generators</h2>
                    <p className="text-indigo-200/70 mb-8 leading-relaxed">
                        Get access to advanced AI tools, premium templates, and unlimited downloads.
                    </p>

                    <div className="space-y-3 mb-8 text-left max-w-xs mx-auto">
                        {["Unlimited Cover Letters", "Premium Design Templates", "ATS Formatting Checks", "PDF & Word Export"].map((feature) => (
                            <div key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                                <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                                    <Check className="h-3 w-3" />
                                </div>
                                {feature}
                            </div>
                        ))}
                    </div>

                    <Button
                        onClick={onUnlock}
                        className="w-full h-12 text-base font-semibold bg-white text-indigo-950 hover:bg-white/90 shadow-xl shadow-indigo-500/10"
                    >
                        Unlock Now - $0 (Demo)
                    </Button>
                    <p className="text-[10px] text-muted-foreground mt-4 uppercase tracking-widest">No credit card required for demo</p>
                </div>
            </div>
        </div>
    );
}
