"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultView?: "login" | "signup";
}

export function AuthModal({
    isOpen,
    onClose,
    defaultView = "login",
}: AuthModalProps) {
    const [view, setView] = useState<"login" | "signup">(defaultView);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[400px] p-0 bg-transparent border-none shadow-none overflow-hidden">
                {view === "login" ? (
                    <LoginForm onToggle={() => setView("signup")} />
                ) : (
                    <SignupForm onToggle={() => setView("login")} />
                )}
            </DialogContent>
        </Dialog>
    );
}

