"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useModal } from "@/components/providers/modal-provider";

const navLinks = [
    { name: "AI Resume Builder", href: "/#resume-preview" },
    { name: "ATS Analysis", href: "/#upload" },
    { name: "Templates", href: "/#templates" },
    { name: "Pricing", href: "/#pricing" },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { openModal } = useModal();

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <nav className="w-full max-w-7xl px-6 py-[13px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Logo />
                </div>

                {/* Desktop Nav - Centered */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-base font-medium text-foreground/80 transition-colors hover:text-foreground hover:text-primary"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden lg:flex items-center gap-4">
                    <Button
                        onClick={openModal}
                        aria-label="Get started with free resume builder"
                        className="group relative h-10 rounded-xl px-8 font-semibold text-white transition-all duration-300 ease-out hover:scale-[1.03] hover:brightness-110 active:scale-95 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5),0_4px_6px_-1px_rgba(6,182,212,0.1),inset_0_-4px_4px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7),0_8px_12px_-1px_rgba(6,182,212,0.3),inset_0_-4px_4px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.4)]"
                    >
                        <span className="flex items-center gap-2">
                            Get Started <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Nav */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 border-t bg-background p-4 shadow-lg lg:hidden">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-2 mt-2">
                                <div onClick={() => { setIsMobileMenuOpen(false); openModal(); }} className="cursor-pointer">
                                    <Button className="w-full rounded-full" variant="default">Get Started</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}