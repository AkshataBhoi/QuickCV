"use client";

import { cn } from "@/lib/utils";
import { TemplateId } from "@/lib/types"; // Ensure TemplateId is imported from types if moved, or locally if not.
// Assuming TemplateId is string or union. In step 74 it was in TemplateSelector. 
// Ideally it should be in types.ts. I will assume types.ts or simple string for now.
// Actually TemplateId was imported from ./TemplateSelector in the original file. 

// Import all template components
import { ModernProfessional } from "@/components/templates/modern-01";
import { ClassicCorporate } from "@/components/templates/classic-02";
import { SimpleMinimal } from "@/components/templates/minimal-03";
import { CreativeDesigner } from "@/components/templates/creative-04";
import { TechFaang } from "@/components/templates/tech-05";
import { ExecutiveLeadership } from "@/components/templates/executive-06";
import { AcademicResearch } from "@/components/templates/academic-07";
import { FreshGraduate } from "@/components/templates/graduate-08";
import { FreelancerPortfolio } from "@/components/templates/freelance-09";
import { InternationalFormat } from "@/components/templates/international-10";

import { ResumeData } from "@/lib/types";

interface ResumePreviewProps {
  data: ResumeData;
  template: string; // Using string to be safe, loosely typed to TemplateId
}

export function ResumePreview({ data, template }: ResumePreviewProps) {

  // Map of template IDs to Components
  const TemplateMap: Record<string, React.ComponentType<{ data: ResumeData }>> = {
    "modern-01": ModernProfessional,
    "classic-02": ClassicCorporate,
    "minimal-03": SimpleMinimal,
    "creative-04": CreativeDesigner,
    "tech-05": TechFaang,
    "executive-06": ExecutiveLeadership,
    "academic-07": AcademicResearch,
    "graduate-08": FreshGraduate,
    "freelance-09": FreelancerPortfolio,
    "international-10": InternationalFormat,

    // Legacy maps for backward compatibility (optional but good for safety)
    "modern": ModernProfessional,
    "clean": ClassicCorporate,
    "minimal": SimpleMinimal,
  };

  const SelectedTemplate = TemplateMap[template] || ModernProfessional;

  return (
    <div className="text-black bg-white" id="resume-preview">
      {/* A4 Container Aspect Ratio */}
      <div
        className={cn(
          "w-full min-h-[297mm] h-auto mx-auto bg-white shadow-2xl transition-all duration-300",
          // General print styles can go here
          "print:shadow-none print:w-full print:h-full print:m-0"
        )}
      >
        <SelectedTemplate data={data} />
      </div>
    </div>
  );
}
