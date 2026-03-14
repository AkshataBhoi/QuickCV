"use client";

import React, { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";

export default function LoginPage() {
    const [view, setView] = useState<"login" | "signup">("login");

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-[400px]">
                {view === "login" ? (
                    <LoginForm onToggle={() => setView("signup")} />
                ) : (
                    <SignupForm onToggle={() => setView("login")} />
                )}
            </div>
        </div>
    );
}

