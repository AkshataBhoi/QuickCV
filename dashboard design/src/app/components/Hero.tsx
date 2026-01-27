import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold mb-6">
              <Sparkles size={14} />
              <span>AI-POWERED RESUME BUILDER</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
              Get hired at top companies with{" "}
              <span className="text-indigo-600">QuickCV</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Optimize your resume for ATS, highlight your best
              skills, and land 3x more interviews with our
              AI-driven resume architect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-indigo-700 hover:scale-105 transition-all cursor-pointer shadow-lg shadow-indigo-200">
                Build My Resume <ArrowRight size={20} />
              </button>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                  >
                    <ImageWithFallback
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="pl-4 flex flex-col justify-center">
                  <div className="flex gap-0.5 text-yellow-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-500">
                    Joined by 10k+ grads
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-20 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="aspect-[3/4] overflow-hidden rounded-xl border border-gray-100 bg-gray-50 relative group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1693045181254-08462917f681?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHJlc3VtZSUyMHRlbXBsYXRlJTIwZGVzaWduJTIwd2hpdGV8ZW58MXx8fHwxNzY5NTIyNzAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Resume Mockup"
                  className="w-full h-full object-cover"
                />

                {/* AI Overlay Analysis Mockup */}
                <div className="absolute top-1/4 right-4 w-48 bg-white/95 backdrop-blur shadow-xl rounded-xl p-3 border border-indigo-100 animate-bounce-slow">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      AI Analysis
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-800 mb-1">
                    Impactful Achievement
                  </p>
                  <p className="text-[10px] text-gray-500 leading-tight">
                    Quantified results by 40% with Python
                    automation.
                  </p>
                  <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="h-full bg-green-500"
                    />
                  </div>
                </div>

                <div className="absolute bottom-1/4 left-4 w-56 bg-indigo-600 shadow-xl rounded-xl p-3 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold opacity-80">
                      ATS Score
                    </span>
                    <span className="text-xs font-bold">
                      92/100
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${i <= 7 ? "bg-white" : "bg-white/20"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-100 rounded-full -z-10 blur-xl animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};