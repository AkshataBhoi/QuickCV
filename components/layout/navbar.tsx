"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useModal } from "@/components/providers/modal-provider";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Templates", href: "/#templates" },
    { name: "Features", href: "/#features" },
    { name: "How it Works", href: "/#how-it-works" },
    { name: "Pricing", href: "/#pricing" },
    
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { openModal } = useModal();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 h-15 transition-all duration-300 ease-in-out",
                isScrolled
                    ? "bg-white/95 backdrop-blur-xl border-b border-gray-100"
                    : "bg-black/30 backdrop-blur-md"
            )}
        >
            <nav className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
                <Logo />

                {/* Desktop Nav */}
                <ul className="hidden lg:flex items-center gap-4">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 transition-all duration-300"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="hidden lg:flex items-center gap-6">
                    {/* <Link
                        href="/login"
                        className="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-300"
                    >
                        Login
                    </Link> */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={openModal}
                            className="bg-indigo-600 text-white rounded-xl px-8 py-2 font-bold hover:bg-indigo-700 transition-all duration-300"
                        >
                            Get Started
                        </Button>
                    </motion.div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <ul className="flex flex-col p-6 gap-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-lg font-medium text-gray-600 hover:text-indigo-600 block"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <hr className="border-gray-100" />
                            <div className="flex flex-col gap-4">
                                <Link
                                    href="/login"
                                    className="text-lg font-medium text-gray-600 hover:text-indigo-600"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        openModal();
                                    }}
                                    className="w-full bg-indigo-600 text-white rounded-xl py-6 text-lg font-bold"
                                >
                                    Get Started
                                </Button>
                            </div>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}