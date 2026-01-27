import { Hero } from "@/components/landing/Hero";
import { RecruiterEyes } from "@/components/landing/RecruiterEyes";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Templates } from "@/components/landing/Templates";
import { UploadCTA } from "@/components/landing/UploadCTA";
import { Pricing } from "@/components/landing/Pricing";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden pt-16">
            <Hero />
            <RecruiterEyes />
            <HowItWorks />
            <Templates />
            <UploadCTA />
            <Pricing />
            {/* <Footer /> */}
        </div>
    );
}
