"use client";

import dynamic from 'next/dynamic';

const LoadingFallback = ({ className, text }: { className?: string, text?: string }) => (
    <div className={`flex items-center justify-center text-muted-foreground ${className}`}>
        {text || ""}
    </div>
);

export const ResumePreview = dynamic(() => import("@/components/sections/resume-preview").then(mod => mod.ResumePreview), {
    loading: () => <LoadingFallback className="min-h-screen" text="Loading preview..." />,
    ssr: false
});

export const ATSAnalysis = dynamic(() => import("@/components/sections/ats-analysis").then(mod => mod.ATSAnalysis), {
    loading: () => <LoadingFallback className="min-h-screen" />,
    ssr: false
});

export const ResumeTemplates = dynamic(() => import("@/components/sections/resume-templates").then(mod => mod.ResumeTemplates), {
    loading: () => <LoadingFallback className="min-h-[600px]" />,
    ssr: false
});

export const CompanyLogos = dynamic(() => import("@/components/sections/company-logos").then(mod => mod.CompanyLogos), {
    loading: () => <LoadingFallback className="min-h-[400px]" />,
    ssr: false
});

export const Pricing = dynamic(() => import("@/components/sections/pricing").then(mod => mod.Pricing), {
    loading: () => <LoadingFallback className="min-h-[600px]" />,
    ssr: false
});
