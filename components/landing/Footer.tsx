"use client";

import React from 'react';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#f8f9fa] pt-20 pb-10 border-t border-[#ececf0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                                <FileText size={20} />
                            </div>
                            <span className="text-xl font-bold text-[#030213]">QuickCV</span>
                        </div>
                        <p className="text-[#717182] max-w-sm mb-6 leading-relaxed">
                            The AI-powered resume architect designed for the modern job market. We help students and early professionals stand out in the 6-second scan.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-[#ececf0] flex items-center justify-center text-[#717182] hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm"><Twitter size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-[#ececf0] flex items-center justify-center text-[#717182] hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm"><Linkedin size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-[#ececf0] flex items-center justify-center text-[#717182] hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm"><Github size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-[#030213] mb-6">Product</h4>
                        <ul className="space-y-4 text-[#717182] text-sm">
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">How it works</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Templates</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">AI Analysis</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-[#030213] mb-6">Company</h4>
                        <ul className="space-y-4 text-[#717182] text-sm">
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Success Stories</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#ececf0] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#717182] text-sm">© 2026 QuickCV AI. All rights reserved.</p>
                    <div className="flex gap-6 text-[#717182] text-sm">
                        <span>Premium SaaS Resume Builder</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}