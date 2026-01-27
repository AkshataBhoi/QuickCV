import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Github, Twitter, Linkedin } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto relative rounded-[2rem] overflow-hidden bg-indigo-600 px-8 py-20 text-center text-white">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Stop guessing. Start getting interviews.
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join 10,000+ graduates and early professionals who used QuickCV to land roles at top tech companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl cursor-pointer">
              Upload Your Resume
            </button>
            <button className="bg-indigo-700 text-white border border-indigo-500 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-800 transition-all cursor-pointer flex items-center gap-2">
              Browse Templates <ArrowRight size={20} />
            </button>
          </div>
          <p className="mt-8 text-indigo-200 text-sm font-medium opacity-80 uppercase tracking-widest">
            No credit card required for free tier
          </p>
        </div>
      </div>
    </section>
  );
};

export const TrustStats = () => {
  const stats = [
    { label: "Resumes Built", value: "250K+" },
    { label: "Success Rate", value: "88%" },
    { label: "Top Tech Partners", value: "45+" },
    { label: "Avg Score Boost", value: "+34" }
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <FileText size={20} />
              </div>
              <span className="text-xl font-bold text-gray-900">QuickCV</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-6 leading-relaxed">
              The AI-powered resume architect designed for the modern job market. We help students and early professionals stand out in the 6-second scan.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-600 transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-600 transition-all"><Linkedin size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-600 transition-all"><Github size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Product</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">AI Analysis</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2026 QuickCV AI. All rights reserved.</p>
          <div className="flex gap-6 text-gray-400 text-sm">
             <span>Made with confidence by Figma Make.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
