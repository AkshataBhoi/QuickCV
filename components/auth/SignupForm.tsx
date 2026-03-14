"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function SignupForm({ onToggle }: { onToggle: () => void }) {
    const { signup } = useAuth();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await signup(name, email, password);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Failed to create account");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        console.log("Google Login placeholder clicked");
    };

    return (
        <div className="w-full max-w-md mx-auto bg-[#0f111a] border border-white/10 shadow-2xl rounded-2xl p-8 space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="space-y-3 text-center">
                {/* <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-2"> */}
                    <span className="text-xl font-bold text-violet-500 italic">QuickCV</span>
                {/* </div> */}
                <h2 className="text-3xl font-extrabold tracking-tight text-white">Create Account</h2>
                <p className="text-sm text-muted-foreground">
                    Join QuickCV to build your professional future
                </p>
            </div>

            <div className="grid gap-6">
                {/* <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading}
                    onClick={handleGoogleLogin}
                    className="h-12 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all"
                >
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    Continue with Google
                </Button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#0f111a] px-3 text-muted-foreground font-medium">Or join with email</span>
                    </div>
                </div> */}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                        <Input
                            id="name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 transition-all text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 transition-all text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" title="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 transition-all text-white"
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-500 animate-shake">
                            {error}
                        </div>
                    )}

                    <Button
                        className="w-full h-12 bg-violet-700 hover:bg-violet-500/90 text-white font-bold rounded-xl shadow-lg shadow-violet-400/20 transition-all active:scale-[0.98]"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            "Get Started"
                        )}
                    </Button>
                </form>
            </div>

            <div className="text-center text-sm pt-2">
                <p className="text-muted-foreground">
                    Already have an account?{" "}
                    <button
                        onClick={onToggle}
                        className="font-bold text-violet-500 underline-offset-4 hover:underline decoration-2"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
}
