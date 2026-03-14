import { Layout, FileText, Smartphone, PenTool, Monitor, Briefcase, BookOpen, GraduationCap, Coffee, Globe } from "lucide-react";
import React from "react";

// Import all templates for dynamic rendering
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

export type TemplateId =
    | "modern-01"
    | "classic-02"
    | "minimal-03"
    | "creative-04"
    | "tech-05"
    | "executive-06"
    | "academic-07"
    | "graduate-08"
    | "freelance-09"
    | "international-10"
    | "clean" // Backward compatibility
    | "modern" // Backward compatibility
    | "minimal"; // Backward compatibility

export interface TemplateConfig {
    id: TemplateId;
    name: string;
    description: string;
    icon?: React.ReactNode;
    color?: string;
    tag?: string;
    component: React.ComponentType<any>;
    thumbnail?: string; // Optional if we use components for preview
}

export const TEMPLATES: TemplateConfig[] = [
    {
        id: "modern-01",
        name: "Modern Professional",
        description: "Two-column layout with dark sidebar. Best for Tech & Corporate.",
        icon: React.createElement(Layout, { className: "h-6 w-6" }),
        color: "bg-slate-900",
        tag: "Most Popular",
        component: ModernProfessional,
        thumbnail: "/images/templates/modern-01.png",
    },
    {
        id: "classic-02",
        name: "Classic Corporate",
        description: "Timeless serif typography. Best for Finance & Law.",
        icon: React.createElement(FileText, { className: "h-6 w-6" }),
        color: "bg-blue-600",
        tag: "Professional",
        component: ClassicCorporate,
        thumbnail: "/images/templates/classic-02.png",
    },
    {
        id: "minimal-03",
        name: "Simple Minimal",
        description: "Clean, content-focused. Best for ATS & General.",
        icon: React.createElement(Smartphone, { className: "h-6 w-6" }),
        color: "bg-emerald-600",
        tag: "ATS Ready",
        component: SimpleMinimal,
        thumbnail: "/images/templates/minimal-03.png",
    },
    {
        id: "creative-04",
        name: "Creative Designer",
        description: "Bold colors and unique structure. Best for Creatives.",
        icon: React.createElement(PenTool, { className: "h-6 w-6" }),
        color: "bg-purple-600",
        tag: "Creative",
        component: CreativeDesigner,
        thumbnail: "/images/templates/creative-04.png",
    },
    {
        id: "tech-05",
        name: "Tech FAANG",
        description: "Developer focused, monospace fonts. Best for Software.",
        icon: React.createElement(Monitor, { className: "h-6 w-6" }),
        color: "bg-cyan-600",
        tag: "Developer",
        component: TechFaang,
        thumbnail: "/images/templates/tech-05.png",
    },
    {
        id: "executive-06",
        name: "Executive Leader",
        description: "Authoritative and centralized. Best for Management.",
        icon: React.createElement(Briefcase, { className: "h-6 w-6" }),
        color: "bg-indigo-700",
        tag: "Management",
        component: ExecutiveLeadership,
        thumbnail: "/images/templates/executive-06.png",
    },
    {
        id: "academic-07",
        name: "Academic Research",
        description: "Dense, education-first layout. Best for PhDs & Research.",
        icon: React.createElement(BookOpen, { className: "h-6 w-6" }),
        color: "bg-stone-600",
        tag: "Education",
        component: AcademicResearch,
        thumbnail: "/images/templates/academic-07.png",
    },
    {
        id: "graduate-08",
        name: "Fresh Graduate",
        description: "Highlights education and skills. Best for Entry Level.",
        icon: React.createElement(GraduationCap, { className: "h-6 w-6" }),
        color: "bg-pink-600",
        tag: "Entry Level",
        component: FreshGraduate,
        thumbnail: "/images/templates/graduate-08.png",
    },
    {
        id: "freelance-09",
        name: "Freelance Portfolio",
        description: "Showcase projects and services. Best for Contractors.",
        icon: React.createElement(Coffee, { className: "h-6 w-6" }),
        color: "bg-orange-500",
        tag: "Portfolio",
        component: FreelancerPortfolio,
        thumbnail: "/images/templates/freelance-09.png",
    },
    {
        id: "international-10",
        name: "International CV",
        description: "Standard EU format with photo. Best for Global.",
        icon: React.createElement(Globe, { className: "h-6 w-6" }),
        color: "bg-teal-600",
        tag: "Global",
        component: InternationalFormat,
        thumbnail: "/images/templates/international-10.png",
    },
];

export const getTemplateById = (id: string): TemplateConfig | undefined => {
    return TEMPLATES.find(t => t.id === id) || TEMPLATES.find(t => t.id === "modern-01");
};
