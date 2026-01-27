import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, AlertCircle, TrendingDown, Eye, Search, Target, Zap, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export const ProblemSection = () => {
  const problems = [
    {
      icon: <XCircle className="text-red-500" />,
      title: "Poor Formatting",
      desc: "ATS systems reject 75% of resumes due to unreadable fonts or layouts."
    },
    {
      icon: <AlertCircle className="text-orange-500" />,
      title: "Vague Descriptions",
      desc: "Students often list tasks instead of impactful, data-driven achievements."
    },
    {
      icon: <TrendingDown className="text-indigo-500" />,
      title: "Lack of Keywords",
      desc: "Missing the exact skills recruiters look for means you never get seen."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">The Challenge</h2>
          <h3 className="text-4xl font-extrabold text-gray-900 mb-6">Why most resumes end up in the trash</h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Recruiters spend only 6 seconds scanning your resume. If it's not optimized, it's invisible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((prob, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all"
            >
              <div className="mb-4">{prob.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{prob.title}</h4>
              <p className="text-gray-600 leading-relaxed">{prob.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const RecruitersEyes = () => {
  return (
    <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="relative bg-white rounded-lg p-6 overflow-hidden shadow-2xl">
              {/* Fake Resume Text */}
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-20 bg-gray-50 rounded border border-gray-100 p-3">
                  <span className="text-[10px] text-gray-400">Experience block...</span>
                </div>
                <div className="h-20 bg-gray-50 rounded border border-gray-100 p-3">
                   <div className="flex gap-2 items-center mb-2">
                      <div className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[8px] font-bold rounded">PYTHON</div>
                      <div className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[8px] font-bold rounded">REACT</div>
                   </div>
                   <div className="h-2 bg-gray-200 rounded w-full mb-1" />
                   <div className="h-2 bg-gray-200 rounded w-5/6" />
                </div>
              </div>

              {/* Scanning Light Effect */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-1 bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.8)] z-30"
              />

              {/* Spotlight Effect */}
              <motion.div
                animate={{ 
                  x: [0, 100, -50, 0],
                  y: [0, 150, 50, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"
              />

              {/* Keyword Highlights Overlay */}
              <div className="absolute inset-0 p-6">
                <div className="absolute top-[280px] left-[40px] px-2 py-1 bg-green-500/10 border border-green-500 rounded text-[10px] text-green-700 font-bold flex items-center gap-1 backdrop-blur-sm animate-pulse">
                   <Target size={10} /> Keyword Match: Python
                </div>
                <div className="absolute top-[310px] left-[100px] px-2 py-1 bg-indigo-500/10 border border-indigo-500 rounded text-[10px] text-indigo-700 font-bold flex items-center gap-1 backdrop-blur-sm animate-pulse delay-700">
                   <Zap size={10} /> Impact Quantified
                </div>
              </div>
            </div>

            {/* Recruiter Badge */}
            <div className="absolute -bottom-6 -right-6 bg-indigo-600 p-4 rounded-xl shadow-xl flex items-center gap-3 border border-indigo-500">
               <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
                 <ImageWithFallback src="https://images.unsplash.com/photo-1594278335945-5bebea747397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGNpdGVkJTIwcHJvZmVzc2lvbmFsJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NTIyNzAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Recruiter" className="w-full h-full object-cover" />
               </div>
               <div>
                 <p className="text-xs font-bold text-white leading-none">Sarah Miller</p>
                 <p className="text-[10px] text-indigo-200">Senior Recruiter @ Google</p>
               </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Eye size={16} /> RECRUITER'S EYE VIEW
            </h2>
            <h3 className="text-4xl font-extrabold mb-6 leading-tight">See your resume through their lens</h3>
            <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
              We don't just build resumes; we simulate the recruiter's scanning process. Our AI highlights exactly what top tech companies are looking for.
            </p>
            <ul className="space-y-4">
              {[
                "ATS-safe formatting that guarantees readability",
                "Skill gap analysis based on current job trends",
                "Impact-first bullet points generated by AI",
                "Differentiator scoring vs. other candidates"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-1 rounded">
                    <CheckCircle size={16} className="text-green-400" />
                  </div>
                  <span className="text-gray-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
