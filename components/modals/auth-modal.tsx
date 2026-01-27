"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Toast, useToast } from "@/components/ui/toast";
import { signIn } from "@/lib/fakeAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const router = useRouter();
    const { showToast, toastMessage, displayToast, hideToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

    const handleSocialSignIn = async (provider: string) => {
        setIsLoading(true);
        setLoadingProvider(provider);

        try {
            // Call fake auth signIn
            const user = await signIn(provider);

            // Show success toast
            displayToast(`Signed in as ${user.name} (demo mode)`, "success");

            // Wait for toast to be visible before redirecting
            setTimeout(() => {
                onClose();
                router.push("/dashboard");
            }, 800);
        } catch (error) {
            displayToast("Sign in failed. Please try again.", "error");
            setIsLoading(false);
            setLoadingProvider(null);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Toast Notification */}
                    <Toast
                        message={toastMessage}
                        isVisible={showToast}
                        onClose={hideToast}
                        type="success"
                    />

                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 z-[101] w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
                    >
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F1117] p-8 shadow-2xl">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                {/* Logo */}
                                <div className="mb-6 scale-125">
                                    <Logo />
                                </div>

                                {/* Heading */}
                                <h2 className="mb-2 text-2xl font-bold text-white">
                                    Access Your Account
                                </h2>
                                <p className="mb-6 text-sm text-gray-400">
                                    Continue building your professional future with AI-powered resume tools
                                </p>

                                {/* Feature Badge */}
                                <div className="mb-8 flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
                                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                                        <Check size={10} className="text-black" />
                                    </div>
                                    <span className="text-xs font-medium text-primary">
                                        Always Free to Start
                                    </span>
                                </div>

                                {/* Social Buttons */}
                                <div className="w-full space-y-3">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-center gap-3 border-white/10 bg-white/5 py-6 text-white hover:bg-white/10 hover:text-white"
                                        onClick={() => handleSocialSignIn("google")}
                                        disabled={isLoading}
                                    >
                                        {loadingProvider === "google" ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                                <path
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                    fill="#4285F4"
                                                />
                                                <path
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                    fill="#34A853"
                                                />
                                                <path
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                    fill="#FBBC05"
                                                />
                                                <path
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                    fill="#EA4335"
                                                />
                                            </svg>
                                        )}
                                        Continue with Google
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full justify-center gap-3 border-white/10 bg-white/5 py-6 text-white hover:bg-white/10 hover:text-white"
                                        onClick={() => handleSocialSignIn("microsoft")}
                                        disabled={isLoading}
                                    >
                                        {loadingProvider === "microsoft" ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <svg className="h-5 w-5" viewBox="0 0 23 23">
                                                <path fill="#f35325" d="M1 1h10v10H1z" />
                                                <path fill="#81bc06" d="M12 1h10v10H12z" />
                                                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                                                <path fill="#ffba08" d="M12 12h10v10H12z" />
                                            </svg>
                                        )}
                                        Continue with Microsoft
                                    </Button>
                                </div>

                                {/* Terms */}
                                <p className="mt-8 text-center text-[10px] text-gray-500">
                                    By continuing, you agree to our{" "}
                                    <a href="#" className="text-primary hover:underline">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-primary hover:underline">
                                        Privacy Policy
                                    </a>
                                </p>

                                {/* Back to home */}
                                <button
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="mt-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                                >
                                    <ArrowLeft size={16} />
                                    Back to home
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

