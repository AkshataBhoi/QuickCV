"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

interface AuthModalProps {
    children?: React.ReactNode;
    defaultView?: "login" | "signup";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function AuthModal({
    children,
    defaultView = "login",
    open,
    onOpenChange,
}: AuthModalProps) {
    const [view, setView] = useState<"login" | "signup">(defaultView);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[400px] p-6 bg-background rounded-xl border-border/50 shadow-2xl overflow-hidden">
                {view === "login" ? (
                    <LoginForm onToggle={() => setView("signup")} />
                ) : (
                    <SignupForm onToggle={() => setView("login")} />
                )}
            </DialogContent>
        </Dialog>
    );
}
