import { Hero } from "@/components/sections/hero";
import {
    ResumePreview,
    ATSAnalysis,
    ResumeTemplates,
    CompanyLogos,
    Pricing
} from "@/components/sections/lazy-components";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            {/* Hero Section - Loaded immediately */}
            <Hero />

            {/* Below-fold sections - Lazy loaded via Client Component */}
            <ResumePreview />
            <ATSAnalysis />
            <ResumeTemplates />
            <CompanyLogos />
            <Pricing />
        </div>
    );
}
