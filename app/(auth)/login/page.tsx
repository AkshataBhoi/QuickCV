"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Loader2 } from "lucide-react";
import { Toast, useToast } from "@/components/ui/toast";
import { signIn } from "@/lib/fakeAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const { showToast, toastMessage, displayToast, hideToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

    const handleSocialSignIn = async (provider: string) => {
        setIsLoading(true);
        setLoadingProvider(provider);

        try {
            const user = await signIn(provider);
            displayToast(`Signed in as ${user.name} (demo mode)`, "success");

            // Reduced delay for better UX
            setTimeout(() => {
                router.push("/dashboard");
                // Refresh to ensure middleware/state updates if needed
                router.refresh();
            }, 300);
        } catch (error) {
            console.error("Login error:", error);
            displayToast("Sign in failed. Please try again.", "error");
            setIsLoading(false);
            setLoadingProvider(null);
        }
    };

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleSocialSignIn("email");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
            {/* Toast Notification */}
            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={hideToast}
                type="success"
            />

            <Card className="w-full max-w-md relative z-10 pointer-events-auto">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <Logo />
                    </div>
                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                    <CardDescription>
                        Enter your email to sign in to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        <Button
                            variant="outline"
                            onClick={() => handleSocialSignIn("github")}
                            disabled={isLoading}
                        >
                            {loadingProvider === "github" ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Github className="mr-2 h-4 w-4" />
                            )}
                            Github
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleSocialSignIn("google")}
                            disabled={isLoading}
                        >
                            {loadingProvider === "google" ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                            )}
                            Google
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <form onSubmit={handleEmailSignIn}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2 mt-4">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <Button className="w-full mt-4" type="submit" disabled={isLoading}>
                            {loadingProvider === "email" ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
                    <Link href="/forgot-password" className="hover:text-primary underline underline-offset-4">Forgot password?</Link>
                    <div>
                        Don't have an account?{" "}
                        <Link href="/signup" className="hover:text-primary underline underline-offset-4 font-medium">Sign up</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

