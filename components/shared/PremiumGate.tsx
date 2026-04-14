"use client";

import React, { useState } from "react";
import { useUser } from "@/components/providers/user-provider";
import { PremiumUnlockDialog } from "./PremiumUnlockDialog";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/lib/api/client";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

interface PremiumGateProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function PremiumGate({ children, fallback }: PremiumGateProps) {
    const { user, updateUser } = useUser();
    const { user: authUser } = useAuth();
    const [showUnlock, setShowUnlock] = useState(false);

    const isPremium = user.accountType === "premium";

    const handleUnlock = async () => {
        // Intercept upgrade actions as per requirement but allow demo for now
        toast.info("Feature under development", {
            description: "Actual payment integration is coming soon! Unlocking demo for now.",
            icon: <Sparkles className="h-4 w-4 text-indigo-400" />
        });
        
        if (!authUser) return;
        try {
            const response = await apiClient.post('/api/users/upgrade-demo');
            const { data } = response;
            if (data.success) {
                await updateUser({ accountType: "premium" });
                setShowUnlock(false);
            }
        } catch (error) {
            console.error("Failed to upgrade:", error);
            toast.error("Upgrade failed. Please try again later.");
        }
    };

    if (isPremium) {
        return <>{children}</>;
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowUnlock(true);
    };

    return (
        <>
            <div onClick={handleClick} className="cursor-pointer">
                {fallback || children}
            </div>
            <PremiumUnlockDialog 
                open={showUnlock} 
                onClose={() => setShowUnlock(false)} 
                onUnlock={handleUnlock} 
            />
        </>
    );
}

export function PremiumBadge() {
    return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-wider">
            Premium
        </span>
    );
}
