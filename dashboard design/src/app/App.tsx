import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Hero } from '@/app/components/Hero';
import { ProblemSection, RecruitersEyes } from '@/app/components/ProblemSection';
import { HowItWorks, TemplatesPreview, Pricing } from '@/app/components/DetailsSections';
import { FinalCTA, TrustStats, Footer } from '@/app/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900 font-sans text-gray-900 scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <TrustStats />
        <ProblemSection />
        <RecruitersEyes />
        <HowItWorks />
        <TemplatesPreview />
        <FinalCTA />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
