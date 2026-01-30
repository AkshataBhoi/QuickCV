"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    ChevronLeft,
    Plus,
    Save,
    Trash2,
    Eye,
    Loader2,
    Sparkles,
    Link as LinkIcon,
    Github,
    Linkedin,
    MapPin,
    Mail,
    Phone,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
    TemplateSelector,
    TemplateId,
} from "@/components/builder/TemplateSelector";
import { FormSection } from "@/components/builder/FormSection";
import { cn } from "@/lib/utils";
import { Toast, useToast } from "@/components/ui/toast";
import { useUser } from "@/components/providers/user-provider";
import { SaveFileDialog } from "@/components/shared/SaveFileDialog";
import { ResumeData } from "@/lib/types";
import { DEFAULT_RESUME_DATA } from "@/lib/defaultResumeData";

// Lazy load heavy preview component
const ResumePreview = lazy(() =>
    import("@/components/builder/ResumePreview").then((mod) => ({
        default: mod.ResumePreview,
    }))
);

export default function ResumeBuilderPage() {
    const { user } = useUser();
    const [template, setTemplate] = useState<TemplateId>(
        user.preferredTemplate || "clean"
    );
    const [isClient, setIsClient] = useState(false);
    const [resumeTitle, setResumeTitle] = useState("Untitled Resume");
    const [saveStatus, setSaveStatus] = useState<"Saved" | "Saving..." | "Unsaved">("Saved");

    const [data, setData] = useState<ResumeData>(() => ({
        ...DEFAULT_RESUME_DATA,
        fullName: user.firstName ? `${user.firstName} ${user.lastName}` : "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
    }));

    const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const { showToast, toastMessage, toastType, displayToast, hideToast } =
        useToast();

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Form Handlers
    const updateField = (field: keyof ResumeData, value: any) => {
        setData((prev) => ({ ...prev, [field]: value }));
        setSaveStatus("Unsaved");
    };

    const updateNested = (
        section: "experience" | "education" | "projects" | "certifications" | "languages",
        id: number,
        field: string,
        value: string
    ) => {
        setData((prev) => ({
            ...prev,
            [section]: prev[section].map((item: any) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
        setSaveStatus("Unsaved");
    };

    const addItem = (section: "experience" | "education" | "projects" | "certifications" | "languages", newItem: any) => {
        setData((prev) => ({
            ...prev,
            [section]: [...prev[section], { ...newItem, id: Date.now() }],
        }));
        setSaveStatus("Unsaved");
    };

    const removeItem = (section: "experience" | "education" | "projects" | "certifications" | "languages", id: number) => {
        setData((prev) => ({
            ...prev,
            [section]: prev[section].filter((item: any) => item.id !== id),
        }));
        setSaveStatus("Unsaved");
    };

    const handleSaveClick = () => {
        setSaveDialogOpen(true);
    };

    const onSaveFile = (name: string) => {
        setSaveStatus("Saving...");
        // Mock save logic
        setTimeout(() => {
            setSaveStatus("Saved");
            displayToast("Resume saved successfully!", "success");
        }, 1000);
    };

    const handleDuplicate = () => {
        displayToast("Resume duplicated successfully!", "success");
        // Mock logic: could open a new builder session with the same data
    };

    const handleAIImprove = (field: keyof ResumeData) => {
        displayToast("AI is improving your summary...", "info");
        // Mock AI logic
        setTimeout(() => {
            if (field === "summary") {
                updateField("summary", "Result-oriented Senior Software Engineer with a passion for building scalable web applications. Expert in modern JavaScript frameworks and cloud infrastructure, committed to delivering high-quality code and exceptional user experiences.");
            }
        }, 2000);
    };

    if (!isClient) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col h-screen overflow-hidden">
            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={hideToast}
                type={toastType}
            />

            {/* Top Bar */}
            <header className="h-16 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between px-4 md:px-6 shrink-0 z-50">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-white"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            value={resumeTitle}
                            onChange={(e) => setResumeTitle(e.target.value)}
                            className="bg-transparent border-none text-sm font-semibold focus:ring-0 p-0 text-white w-40 md:w-auto"
                        />
                        <span className="text-[10px] text-muted-foreground">{saveStatus}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        className="md:flex hidden bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 border-0"
                        onClick={() => handleAIImprove("summary")}
                    >
                        <Sparkles className="h-4 w-4 mr-2" /> Generate with AI
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="hidden md:flex text-muted-foreground hover:text-white"
                        onClick={() => displayToast("Template selection coming soon!", "info")}
                    >
                        Change Template
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="hidden md:flex text-muted-foreground hover:text-white"
                        onClick={handleDuplicate}
                    >
                        Duplicate
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="hidden md:flex text-muted-foreground hover:text-white"
                        onClick={handleSaveClick}
                    >
                        <Save className="h-4 w-4 mr-2" /> Save
                    </Button>
                    <Button
                        size="sm"
                        className="bg-white/10 text-white hover:bg-white/20"
                        onClick={() => displayToast("Downloading PDF...", "info")}
                    >
                        Download
                    </Button>
                    <SaveFileDialog
                        open={saveDialogOpen}
                        onOpenChange={setSaveDialogOpen}
                        onSave={onSaveFile}
                        defaultName={resumeTitle}
                        title="Save Resume"
                    />
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden relative">
                {/* === LEFT: EDITOR === */}
                <div
                    className={cn(
                        "w-full lg:w-1/2 overflow-y-auto p-6 pb-32 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent custom-scrollbar",
                        mobilePreviewOpen ? "hidden lg:block" : "block"
                    )}
                >
                    <div className="max-w-2xl mx-auto space-y-6">

                        <div className="flex items-center justify-between mb-8 md:hidden">
                            <h1 className="text-xl font-bold">Resume Editor</h1>
                            <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0">
                                <Sparkles className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Personal Info */}
                        <FormSection title="Personal Information" defaultOpen={true}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground uppercase">Full Name</label>
                                    <Input value={data.fullName} onChange={(e) => updateField("fullName", e.target.value)} className="bg-black/20 border-white/10" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground uppercase">Email Address</label>
                                    <Input value={data.email} onChange={(e) => updateField("email", e.target.value)} className="bg-black/20 border-white/10" placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground uppercase">Phone Number</label>
                                    <Input value={data.phone} onChange={(e) => updateField("phone", e.target.value)} className="bg-black/20 border-white/10" placeholder="+1 (555) 000-0000" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground uppercase">Location</label>
                                    <Input value={data.location} onChange={(e) => updateField("location", e.target.value)} className="bg-black/20 border-white/10" placeholder="City, Country" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground uppercase">LinkedIn</label>
                                    <Input value={data.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} className="bg-black/20 border-white/10" placeholder="linkedin.com/in/username" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground uppercase">GitHub</label>
                                    <Input value={data.github} onChange={(e) => updateField("github", e.target.value)} className="bg-black/20 border-white/10" placeholder="github.com/username" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground uppercase">Portfolio / Website</label>
                                    <Input value={data.portfolio} onChange={(e) => updateField("portfolio", e.target.value)} className="bg-black/20 border-white/10" placeholder="yourportfolio.com" />
                                </div>
                            </div>
                        </FormSection>

                        {/* Professional Summary */}
                        <FormSection title="Professional Summary">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-medium text-muted-foreground uppercase">Summary</label>
                                    <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300 h-7 text-[10px]" onClick={() => handleAIImprove("summary")}>
                                        <Sparkles className="h-3 w-3 mr-1" /> Improve with AI
                                    </Button>
                                </div>
                                <Textarea
                                    value={data.summary}
                                    onChange={(e) => updateField("summary", e.target.value)}
                                    className="bg-black/20 border-white/10 min-h-[120px] resize-none"
                                    placeholder="Briefly describe your professional background and key achievements..."
                                />
                            </div>
                        </FormSection>

                        {/* Skills */}
                        <FormSection title="Skills">
                            <div className="space-y-4">
                                <label className="text-xs font-medium text-muted-foreground uppercase">Skills (Comma separated)</label>
                                <Textarea
                                    value={data.skills.join(", ")}
                                    onChange={(e) => updateField("skills", e.target.value.split(",").map(s => s.trim()))}
                                    className="bg-black/20 border-white/10 min-h-[80px] resize-none"
                                    placeholder="React, TypeScript, Node.js, Project Management..."
                                />
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill, i) => skill && (
                                        <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-muted-foreground">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </FormSection>

                        {/* Work Experience */}
                        <FormSection title="Work Experience">
                            <div className="space-y-6">
                                {data.experience.map((exp) => (
                                    <div key={exp.id} className="p-4 rounded-lg bg-white/5 border border-white/10 relative group bg-gradient-to-b from-white/[0.02] to-transparent">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <Input
                                                value={exp.company}
                                                onChange={(e) => updateNested("experience", exp.id, "company", e.target.value)}
                                                placeholder="Company"
                                                className="bg-black/20 border-white/10 h-9"
                                            />
                                            <Input
                                                value={exp.role}
                                                onChange={(e) => updateNested("experience", exp.id, "role", e.target.value)}
                                                placeholder="Role"
                                                className="bg-black/20 border-white/10 h-9"
                                            />
                                            <Input
                                                value={exp.dates}
                                                onChange={(e) => updateNested("experience", exp.id, "dates", e.target.value)}
                                                placeholder="Duration (e.g. 2021 - Present)"
                                                className="bg-black/20 border-white/10 h-9 md:col-span-2"
                                            />
                                        </div>
                                        <Textarea
                                            value={exp.description}
                                            onChange={(e) => updateNested("experience", exp.id, "description", e.target.value)}
                                            placeholder="Key responsibilities and achievements (use bullet points)"
                                            className="bg-black/20 border-white/10 min-h-[100px] text-sm"
                                        />
                                        <button
                                            onClick={() => removeItem("experience", exp.id)}
                                            className="absolute -right-2 -top-2 bg-red-500/10 text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full border-dashed border-white/20 hover:border-white/40 bg-transparent" onClick={() => addItem("experience", { company: "", role: "", dates: "", description: "" })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Work Experience
                                </Button>
                            </div>
                        </FormSection>

                        {/* Projects */}
                        <FormSection title="Projects">
                            <div className="space-y-6">
                                {data.projects.map((proj) => (
                                    <div key={proj.id} className="p-4 rounded-lg bg-white/5 border border-white/10 relative group bg-gradient-to-b from-white/[0.02] to-transparent">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <Input
                                                value={proj.title}
                                                onChange={(e) => updateNested("projects", proj.id, "title", e.target.value)}
                                                placeholder="Project Name"
                                                className="bg-black/20 border-white/10 h-9"
                                            />
                                            <Input
                                                value={proj.tech}
                                                onChange={(e) => updateNested("projects", proj.id, "tech", e.target.value)}
                                                placeholder="Tech Stack"
                                                className="bg-black/20 border-white/10 h-9"
                                            />
                                        </div>
                                        <Textarea
                                            value={proj.description}
                                            onChange={(e) => updateNested("projects", proj.id, "description", e.target.value)}
                                            placeholder="Project description and your impact..."
                                            className="bg-black/20 border-white/10 min-h-[80px] text-sm"
                                        />
                                        <button
                                            onClick={() => removeItem("projects", proj.id)}
                                            className="absolute -right-2 -top-2 bg-red-500/10 text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full border-dashed border-white/20 hover:border-white/40 bg-transparent" onClick={() => addItem("projects", { title: "", tech: "", description: "" })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Project
                                </Button>
                            </div>
                        </FormSection>

                        {/* Education */}
                        <FormSection title="Education">
                            <div className="space-y-6">
                                {data.education.map((edu) => (
                                    <div key={edu.id} className="p-4 rounded-lg bg-white/5 border border-white/10 relative group bg-gradient-to-b from-white/[0.02] to-transparent">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                value={edu.school}
                                                onChange={(e) => updateNested("education", edu.id, "school", e.target.value)}
                                                placeholder="Institution"
                                                className="bg-black/20 border-white/10 h-9"
                                            />
                                            <Input
                                                value={edu.degree}
                                                onChange={(e) => updateNested("education", edu.id, "degree", e.target.value)}
                                                placeholder="Degree / Major"
                                                className="bg-black/20 border-white/10 h-9"
                                            />
                                            <Input
                                                value={edu.dates}
                                                onChange={(e) => updateNested("education", edu.id, "dates", e.target.value)}
                                                placeholder="Duration (e.g. 2014 - 2018)"
                                                className="bg-black/20 border-white/10 h-9 md:col-span-2"
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeItem("education", edu.id)}
                                            className="absolute -right-2 -top-2 bg-red-500/10 text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full border-dashed border-white/20 hover:border-white/40 bg-transparent" onClick={() => addItem("education", { school: "", degree: "", dates: "" })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Education
                                </Button>
                            </div>
                        </FormSection>

                        {/* Certifications */}
                        <FormSection title="Certifications">
                            <div className="space-y-6">
                                {data.certifications.map((cert) => (
                                    <div key={cert.id} className="p-4 rounded-lg bg-white/5 border border-white/10 relative group bg-gradient-to-b from-white/[0.02] to-transparent">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                value={cert.name}
                                                onChange={(e) => updateNested("certifications", cert.id, "name", e.target.value)}
                                                placeholder="Certification Name"
                                                className="bg-black/20 border-white/10 h-9"
                                            />
                                            <Input
                                                value={cert.issuer}
                                                onChange={(e) => updateNested("certifications", cert.id, "issuer", e.target.value)}
                                                placeholder="Issuer"
                                                className="bg-black/20 border-white/10 h-9"
                                            />
                                            <Input
                                                value={cert.date}
                                                onChange={(e) => updateNested("certifications", cert.id, "date", e.target.value)}
                                                placeholder="Date"
                                                className="bg-black/20 border-white/10 h-9 md:col-span-2"
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeItem("certifications", cert.id)}
                                            className="absolute -right-2 -top-2 bg-red-500/10 text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full border-dashed border-white/20 hover:border-white/40 bg-transparent" onClick={() => addItem("certifications", { name: "", issuer: "", date: "" })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Certification
                                </Button>
                            </div>
                        </FormSection>

                        {/* Languages */}
                        <FormSection title="Languages">
                            <div className="space-y-6">
                                {data.languages.map((lang) => (
                                    <div key={lang.id} className="p-4 rounded-lg bg-white/5 border border-white/10 relative group bg-gradient-to-b from-white/[0.02] to-transparent">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                value={lang.language}
                                                onChange={(e) => updateNested("languages", lang.id, "language", e.target.value)}
                                                placeholder="Language"
                                                className="bg-black/20 border-white/10 h-9"
                                            />
                                            <Input
                                                value={lang.level}
                                                onChange={(e) => updateNested("languages", lang.id, "level", e.target.value)}
                                                placeholder="Level (e.g. Native, Professional)"
                                                className="bg-black/20 border-white/10 h-9"
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeItem("languages", lang.id)}
                                            className="absolute -right-2 -top-2 bg-red-500/10 text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full border-dashed border-white/20 hover:border-white/40 bg-transparent" onClick={() => addItem("languages", { language: "", level: "" })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Language
                                </Button>
                            </div>
                        </FormSection>
                    </div>
                </div>

                {/* === RIGHT: PREVIEW === */}
                <div
                    className={cn(
                        "w-full lg:w-1/2 bg-[#020202] p-4 lg:p-8 overflow-y-auto flex justify-center custom-scrollbar",
                        mobilePreviewOpen
                            ? "block fixed inset-0 z-[60] pt-20"
                            : "hidden lg:flex"
                    )}
                >
                    {mobilePreviewOpen && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 z-50 h-10 w-10 bg-white/10 hover:bg-white/20 rounded-full"
                            onClick={() => setMobilePreviewOpen(false)}
                        >
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    )}

                    {/* Scale Container to fit A4 */}
                    <div
                        id="preview-container"
                        className="w-full max-w-[210mm] shadow-[0_20px_50px_rgba(0,0,0,0.5)] origin-top transition-transform duration-300 transform scale-[0.55] sm:scale-[0.65] md:scale-[0.8] lg:scale-[0.85] xl:scale-90 mb-20"
                    >
                        <Suspense fallback={<div className="h-[297mm] w-full bg-white flex items-center justify-center"><Loader2 className="animate-spin text-gray-400" /></div>}>
                            <ResumePreview data={data} template={template} />
                        </Suspense>
                    </div>
                </div>

                {/* Mobile Preview Toggle */}
                <div className="lg:hidden fixed bottom-6 right-6 z-50">
                    <Button
                        size="lg"
                        onClick={() => setMobilePreviewOpen(!mobilePreviewOpen)}
                        className="rounded-full h-14 w-14 shadow-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        {mobilePreviewOpen ? (
                            <ChevronLeft className="h-6 w-6" />
                        ) : (
                            <Eye className="h-6 w-6" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: auto;
          }
          body * {
            visibility: hidden;
          }
          #preview-container,
          #preview-container * {
            visibility: visible;
          }
          #preview-container {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            z-index: 9999;
            background: white;
            overflow: visible;
          }
          #preview-container {
            transform: none !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>
        </div>
    );
}
