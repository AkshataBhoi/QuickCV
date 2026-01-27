import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, FileCheck, Check, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload size={32} className="text-indigo-600" />,
      title: "Upload",
      desc: "Drag and drop your current resume or start from a blank slate with our templates."
    },
    {
      icon: <Cpu size={32} className="text-green-600" />,
      title: "Analyze",
      desc: "Our AI scans for 50+ criteria including ATS score, impact, and keyword density."
    },
    {
      icon: <FileCheck size={32} className="text-indigo-600" />,
      title: "Improve",
      desc: "Apply AI-suggested changes to fix errors and make your experience pop."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-4">3 Simple Steps to Success</h3>
          <p className="text-gray-600 text-lg">From invisible to irresistible in under 10 minutes.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gray-100 -z-10" />
          
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-gray-100 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-indigo-100">
                {step.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h4>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TemplatesPreview = () => {
  const templates = [
    "https://images.unsplash.com/photo-1693045181254-08462917f681?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1618410325698-018bb3eb2318?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1594278335945-5bebea747397?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1629791787426-f33f2c52b236?auto=format&fit=crop&q=80&w=600"
  ];

  return (
    <section id="templates" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">Professional Templates</h2>
            <h3 className="text-4xl font-extrabold text-gray-900 mb-4">ATS-optimized designs for every career path</h3>
            <p className="text-gray-600 text-lg">Hand-crafted by recruitment experts to ensure maximum readability and professional impact.</p>
          </div>
          <button className="text-indigo-600 font-bold flex items-center gap-2 hover:translate-x-1 transition-transform cursor-pointer">
            View All Templates <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((src, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group relative"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <ImageWithFallback src={src} alt="Template" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-800">
                  {['Executive', 'Modern Tech', 'Creative Minimal', 'Professional Standard'][i]}
                </span>
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">ATS-SAFE</span>
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-indigo-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                   Use This Template
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Pricing = () => {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      desc: "Perfect for students starting out.",
      features: ["1 Basic Template", "AI Analysis (3 scans)", "PDF Export", "Skill Suggestions"],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "Pro",
      price: "$12",
      period: "/mo",
      desc: "Accelerate your job search today.",
      features: ["Unlimited Templates", "Unlimited AI Improvements", "Custom Cover Letters", "ATS Keyword Optimization", "LinkedIn Profile Audit"],
      cta: "Go Pro Now",
      highlight: true
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-extrabold text-gray-900 mb-4">Transparent Pricing</h3>
          <p className="text-gray-600 text-lg">No hidden fees. Cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`p-10 rounded-3xl border ${tier.highlight ? 'border-indigo-600 bg-indigo-50/30 ring-4 ring-indigo-50' : 'border-gray-100 bg-white shadow-sm'}`}
            >
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h4>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                  {tier.period && <span className="text-gray-500 font-medium">{tier.period}</span>}
                </div>
                <p className="text-gray-600 text-sm">{tier.desc}</p>
              </div>

              <ul className="space-y-4 mb-10">
                {tier.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <div className={`p-0.5 rounded-full ${tier.highlight ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-gray-700 text-sm">{feat}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all cursor-pointer ${tier.highlight ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' : 'bg-white border-2 border-gray-100 text-gray-900 hover:border-indigo-600 hover:text-indigo-600'}`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
