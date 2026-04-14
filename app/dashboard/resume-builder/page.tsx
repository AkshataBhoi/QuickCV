"use client";

import { useState, useEffect, Suspense, lazy, useCallback, useMemo } from "react";
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
  LayoutTemplate,
  Link as LinkIcon,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { TemplateSelector } from "@/components/builder/TemplateSelector";
import { TEMPLATES, getTemplateById, TemplateId } from "@/lib/templates.config";
import { ChangeTemplateDialog } from "@/components/builder/ChangeTemplateDialog";
import { FormSection } from "@/components/builder/FormSection";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUser } from "@/components/providers/user-provider";
import { useDashboardFile } from "@/components/providers/dashboard-file-provider";
import { PremiumUnlockDialog } from "@/components/shared/PremiumUnlockDialog";
import { SaveFileDialog } from "@/components/shared/SaveFileDialog";
import { FilePreviewDialog } from "@/components/shared/FilePreviewDialog";
import { ResumeData } from "@/lib/types";
import { DEFAULT_RESUME_DATA } from "@/lib/defaultResumeData";
const AISummaryModal = lazy(() =>
  import("@/components/builder/AISummaryModal").then((mod) => ({
    default: mod.AISummaryModal,
  })),
);
const AISkillsModal = lazy(() =>
  import("@/components/builder/AISkillsModal").then((mod) => ({
    default: mod.AISkillsModal,
  })),
);
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/lib/api/client";

// Lazy load heavy preview component
const ResumePreview = lazy(() =>
  import("@/components/builder/ResumePreview").then((mod) => ({
    default: mod.ResumePreview,
  })),
);

export default function ResumeBuilderWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="animate-spin h-8 text-muted-foreground" />
        </div>
      }
    >
      <ResumeBuilderPage />
    </Suspense>
  );
}

function ResumeBuilderPage() {
  const { user: authUser } = useAuth();
  const { user, updateUser } = useUser();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");
  const templateParam = searchParams.get("template");
  const { addFile } = useDashboardFile();

  const getInitialTemplate = (): TemplateId => {
    if (templateParam) {
      const t = getTemplateById(templateParam);
      if (t) return t.id;
    }
    return user.preferredTemplate || "modern-01";
  };

  const [template, setTemplate] = useState<TemplateId>(getInitialTemplate());
  const [isClient, setIsClient] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("Untitled Resume");
  const [saveStatus, setSaveStatus] = useState<
    "Saved" | "Saving..." | "Unsaved"
  >("Saved");

  const [data, setData] = useState<ResumeData>(() => ({
    ...DEFAULT_RESUME_DATA,
    fullName: user.firstName ? `${user.firstName} ${user.lastName}` : "",
    email: user.email || "",
    phone: user.phone || "",
    location: user.location || "",
  }));

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [changeTemplateOpen, setChangeTemplateOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Debounced ATS Analysis
  useEffect(() => {
    if (!isClient) return;

    const timer = setTimeout(async () => {
      if (data.fullName || data.summary || data.experience.length > 0) {
        setIsAnalyzing(true);
        try {
          const response = await apiClient.post("/api/ai/resume/analyze-ats", {
            userId: authUser?.uid || user.id, // Prefer Firebase UID
            resumeId: data.id,
            content: data,
            jobDescription: "", // Could be added later
          });

          if (response.status === 200) {
            const result = response.data;
            // You can store this in a local state if needed for immediate UI updates
            // but the backend already saved it to the resume object
            console.log("ATS Analysis Updated:", result.analysis);
          }
        } catch (error) {
          console.error("ATS Analysis error:", error);
        } finally {
          setIsAnalyzing(false);
        }
      }
    }, 800); // 0.8s debounce

    return () => clearTimeout(timer);
  }, [data, user.id, isClient]);

  useEffect(() => {
    setIsClient(true);

    // Update template if param changes
    if (templateParam) {
      const t = getTemplateById(templateParam);
      if (t) setTemplate(t.id);
    }

    const fetchResume = async () => {
      if (!resumeId || resumeId === "resume-draft") return;

      try {
        const response = await apiClient.get(`/api/resume/${resumeId}`);
        const result = response.data;

        if (result.data) {
          const r = result.data;
          const resumeData = r.content || {}; // Using 'content' from backend
          setData({
            id: r._id,
            fullName: resumeData.fullName || "",
            email: resumeData.email || "",
            phone: resumeData.phone || "",
            location: resumeData.location || "",
            summary: resumeData.summary || "",
            experience: resumeData.experience || [],
            education: resumeData.education || [],
            skills: resumeData.skills || [],
            linkedin: resumeData.linkedin || "",
            github: resumeData.github || "",
            portfolio: resumeData.portfolio || "",
            projects: resumeData.projects || [],
            certifications: resumeData.certifications || [],
            languages: resumeData.languages || [],
          });
          setResumeTitle(r.title || "Untitled Resume");
          setTemplate(r.templateId || "clean");
          setSaveStatus("Saved");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load resume");
      }
    };

    if (isClient) {
      fetchResume();
    }
  }, [resumeId, isClient]);

  // Form Handlers
  const updateField = useCallback((field: keyof ResumeData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setSaveStatus("Unsaved");
  }, []);

  const updateNested = useCallback((
    section:
      | "experience"
      | "education"
      | "projects"
      | "certifications"
      | "languages",
    id: number,
    field: string,
    value: string,
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item: any) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
    setSaveStatus("Unsaved");
  }, []);

  const addItem = useCallback((
    section:
      | "experience"
      | "education"
      | "projects"
      | "certifications"
      | "languages",
    newItem: any,
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...newItem, id: Date.now() }],
    }));
    setSaveStatus("Unsaved");
  }, []);

  const removeItem = useCallback((
    section:
      | "experience"
      | "education"
      | "projects"
      | "certifications"
      | "languages",
    id: number,
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item: any) => item.id !== id),
    }));
    setSaveStatus("Unsaved");
  }, []);

  const handleSaveClick = () => {
    setSaveDialogOpen(true);
  };

  const onSaveFile = async (name: string) => {
    setSaveStatus("Saving...");
    try {
      const response = await apiClient.post("/api/resume", {
        ownerId: authUser?.uid || user.id,
        id: data.id,
        title: name,
        templateId: template,
        content: { ...data }, // Nested as requested
      });

      const result = response.data;

      setData((prev) => ({ ...prev, id: result.data._id }));
      addFile(result.data);
      setResumeTitle(name);
      setSaveStatus("Saved");
      setSaveDialogOpen(false);
      toast.success("File saved successfully ✓");
    } catch (error: any) {
      console.error("Save error:", error);
      setSaveStatus("Unsaved");
      const data = error.response?.data;
      toast.error(data?.message || "Error saving resume");
    }
  };

  const [showUnlockModal, setShowUnlockModal] = useState(false);

  const handleDownload = async () => {
    if (saveStatus !== "Saved") {
      toast.info("Please save your resume before downloading");
      return;
    }

    if (user.accountType !== "premium" && user.resumeDownloadCredits <= 0) {
      return;
    }
    toast.info("Preparing your PDF...");

    const element = document.getElementById("resume-preview");
    if (!element) {
      toast.error("Resume preview not found");
      return;
    }

    try {
      // Use dynamic import for html2pdf to avoid SSR issues if any
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: 0,
        filename: `${resumeTitle.replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: {
          unit: "mm" as const,
          format: "a4" as const,
          orientation: "portrait" as const,
        },
      };

      await html2pdf().set(opt).from(element).save();

      // Decrement credits
      if (user.resumeDownloadCredits > 0) {
        await updateUser({
          resumeDownloadCredits: user.resumeDownloadCredits - 1,
        });
      }

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to generate PDF");
    }
  };

  // const handleDuplicate = () => {
  //     displayToast("Resume duplicated successfully!", "success");
  //     // Mock logic: could open a new builder session with the same data
  // };

  const handleAIImprove = (field: keyof ResumeData) => {
    if (field === "summary") {
      setSummaryModalOpen(true);
    }
  };

  const onAddSkills = (newSkills: string[]) => {
    setData((prev) => {
      const uniqueSkills = Array.from(new Set([...prev.skills, ...newSkills]));
      return { ...prev, skills: uniqueSkills };
    });
    setSaveStatus("Unsaved");
    toast.success(`Added ${newSkills.length} skills to your resume!`);
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
      <FilePreviewDialog
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        file={{
          name: resumeTitle,
          type: "Resume",
          data: { content: data },
          template: template
        }}
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
              className="bg-transparent border-none text-sm font-semibold focus:ring-0 p-0 text-white w-32 sm:w-48"
            />
            <span className="text-[10px] text-muted-foreground">
              {saveStatus}
            </span>
          </div>
          {isAnalyzing && (
            <div className="hidden sm:flex items-center gap-2 ml-2 px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Loader2 className="h-3 w-3 animate-spin text-primary" />
              <span className="text-[10px] font-sm text-primary uppercase tracking-wider">
                ATS Scanning...
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center border gap-1">
           <Button
            onClick={() => setIsPreviewOpen(true)}
            size="sm"
            variant="ghost"
            className="h-8 sm:h-9 text-muted-foreground hover:text-white px-2 sm:px-3"
            title="View Preview"
          >
            <Sparkles className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Preview</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-white"
            onClick={() => setChangeTemplateOpen(true)}
            title="Change Template"
            aria-label="Change Template"
          >
            <LayoutTemplate className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Template</span>
          </Button>

          <Button
            size="sm"
            className="hover:bg-primary/90 text-primary bg-transparent"
            onClick={handleSaveClick}
            title="Save Resume"
            aria-label="Save Resume"
          >
            <Save className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Save</span>
          </Button>
          
          {/* <Button
            size="sm"
            variant="outline"
            className="border-white/10 hover:bg-white/5"
            onClick={handleDownload}
            title="Download PDF"
            aria-label="Download PDF"
          >
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">PDF</span>
          </Button> */}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* === LEFT: EDITOR === */}
        <div className="w-full lg:w-1/2 overflow-y-auto bg-[#0a0a0a] border-r border-white/5 custom-scrollbar">
          <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-8 pb-32">
            {/* Template Selector */}
            <ChangeTemplateDialog
              currentTemplate={template}
              onSelect={(id) => setTemplate(id)}
              open={changeTemplateOpen}
              onOpenChange={setChangeTemplateOpen}
            />

            <SaveFileDialog
              open={saveDialogOpen}
              onOpenChange={setSaveDialogOpen}
              onSave={onSaveFile}
              defaultName={resumeTitle}
              title="Save Resume"
              isLoading={saveStatus === "Saving..."}
            />

            {/* Personal Info */}
            <FormSection title="Personal Information" defaultOpen={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase">
                    Full Name
                  </label>
                  <Input
                    value={data.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className="bg-black/20 border-white/10"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase">
                    Email
                  </label>
                  <Input
                    value={data.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="bg-black/20 border-white/10"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase">
                    Phone
                  </label>
                  <Input
                    value={data.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="bg-black/20 border-white/10"
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase">
                    Location
                  </label>
                  <Input
                    value={data.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    className="bg-black/20 border-white/10"
                    placeholder="City, Country"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase">
                    LinkedIn
                  </label>
                  <Input
                    value={data.linkedin}
                    onChange={(e) => updateField("linkedin", e.target.value)}
                    className="bg-black/20 border-white/10"
                    placeholder="linkedin.com/in/username"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase">
                    GitHub
                  </label>
                  <Input
                    value={data.github}
                    onChange={(e) => updateField("github", e.target.value)}
                    className="bg-black/20 border-white/10"
                    placeholder="github.com/username"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase">
                    Portfolio / Website
                  </label>
                  <Input
                    value={data.portfolio}
                    onChange={(e) => updateField("portfolio", e.target.value)}
                    className="bg-black/20 border-white/10"
                    placeholder="yourportfolio.com"
                  />
                </div>
              </div>
            </FormSection>

            {/* Professional Summary */}
            <FormSection title="Professional Summary">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground uppercase">
                    Summary
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-indigo-400 hover:text-indigo-300 h-7 text-[10px]"
                    onClick={() => handleAIImprove("summary")}
                  >
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
                <label className="text-xs font-medium text-muted-foreground uppercase">
                  Skills (Comma separated)
                </label>
                <Textarea
                  value={data.skills.join(", ")}
                  onChange={(e) =>
                    updateField(
                      "skills",
                      e.target.value.split(",").map((s) => s.trim()),
                    )
                  }
                  className="bg-black/20 border-white/10 min-h-[80px] resize-none"
                  placeholder="React, TypeScript, Node.js, Project Management..."
                />
                <div className="flex flex-wrap gap-2">
                  {data.skills.map(
                    (skill, i) =>
                      skill && (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-muted-foreground flex items-center gap-1"
                        >
                          {skill}
                          <button
                            onClick={() =>
                              updateField(
                                "skills",
                                data.skills.filter((_, idx) => idx !== i),
                              )
                            }
                            className="hover:text-red-400 transition-colors"
                          >
                            <Plus className="h-3 w-3 rotate-45" />
                          </button>
                        </span>
                      ),
                  )}
                  {/* <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 h-7 text-[10px] border border-emerald-500/20"
                                        onClick={() => setSkillsModalOpen(true)}
                                    >
                                        <Sparkles className="h-3 w-3 mr-1" /> Suggest Skills
                                    </Button> */}
                </div>
              </div>
            </FormSection>

            {/* Work Experience */}
            <FormSection title="Work Experience">
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 relative group bg-gradient-to-b from-white/[0.02] to-transparent"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input
                        value={exp.company}
                        onChange={(e) =>
                          updateNested(
                            "experience",
                            exp.id,
                            "company",
                            e.target.value,
                          )
                        }
                        placeholder="Company"
                        className="bg-black/20 border-white/10 h-9"
                      />
                      <Input
                        value={exp.role}
                        onChange={(e) =>
                          updateNested(
                            "experience",
                            exp.id,
                            "role",
                            e.target.value,
                          )
                        }
                        placeholder="Role"
                        className="bg-black/20 border-white/10 h-9"
                      />
                      <Input
                        value={exp.dates}
                        onChange={(e) =>
                          updateNested(
                            "experience",
                            exp.id,
                            "dates",
                            e.target.value,
                          )
                        }
                        placeholder="Duration (e.g. 2021 - Present)"
                        className="bg-black/20 border-white/10 h-9 md:col-span-2"
                      />
                    </div>
                    <Textarea
                      value={exp.description}
                      onChange={(e) =>
                        updateNested(
                          "experience",
                          exp.id,
                          "description",
                          e.target.value,
                        )
                      }
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
                <Button
                  variant="outline"
                  className="w-full border-dashed border-white/20 hover:border-white/40 bg-transparent"
                  onClick={() =>
                    addItem("experience", {
                      company: "",
                      role: "",
                      dates: "",
                      description: "",
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Work Experience
                </Button>
              </div>
            </FormSection>

            {/* Projects */}
            <FormSection title="Projects">
              <div className="space-y-6">
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 relative group bg-gradient-to-b from-white/[0.02] to-transparent"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input
                        value={proj.title}
                        onChange={(e) =>
                          updateNested(
                            "projects",
                            proj.id,
                            "title",
                            e.target.value,
                          )
                        }
                        placeholder="Project Name"
                        className="bg-black/20 border-white/10 h-9"
                      />
                      <Input
                        value={proj.tech}
                        onChange={(e) =>
                          updateNested(
                            "projects",
                            proj.id,
                            "tech",
                            e.target.value,
                          )
                        }
                        placeholder="Tech Stack"
                        className="bg-black/20 border-white/10 h-9"
                      />
                    </div>
                    <Textarea
                      value={proj.description}
                      onChange={(e) =>
                        updateNested(
                          "projects",
                          proj.id,
                          "description",
                          e.target.value,
                        )
                      }
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
                <Button
                  variant="outline"
                  className="w-full border-dashed border-white/20 hover:border-white/40 bg-transparent"
                  onClick={() =>
                    addItem("projects", {
                      title: "",
                      tech: "",
                      description: "",
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Project
                </Button>
              </div>
            </FormSection>

            {/* Education */}
            <FormSection title="Education">
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 relative group bg-gradient-to-b from-white/[0.02] to-transparent"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={edu.school}
                        onChange={(e) =>
                          updateNested(
                            "education",
                            edu.id,
                            "school",
                            e.target.value,
                          )
                        }
                        placeholder="Institution"
                        className="bg-black/20 border-white/10 h-9"
                      />
                      <Input
                        value={edu.degree}
                        onChange={(e) =>
                          updateNested(
                            "education",
                            edu.id,
                            "degree",
                            e.target.value,
                          )
                        }
                        placeholder="Degree / Major"
                        className="bg-black/20 border-white/10 h-9"
                      />
                      <Input
                        value={edu.dates}
                        onChange={(e) =>
                          updateNested(
                            "education",
                            edu.id,
                            "dates",
                            e.target.value,
                          )
                        }
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
                <Button
                  variant="outline"
                  className="w-full border-dashed border-white/20 hover:border-white/40 bg-transparent"
                  onClick={() =>
                    addItem("education", { school: "", degree: "", dates: "" })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Education
                </Button>
              </div>
            </FormSection>

            {/* Certifications */}
            <FormSection title="Certifications">
              <div className="space-y-6">
                {data.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 relative group bg-gradient-to-b from-white/[0.02] to-transparent"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={cert.name}
                        onChange={(e) =>
                          updateNested(
                            "certifications",
                            cert.id,
                            "name",
                            e.target.value,
                          )
                        }
                        placeholder="Certification Name"
                        className="bg-black/20 border-white/10 h-9"
                      />
                      <Input
                        value={cert.issuer}
                        onChange={(e) =>
                          updateNested(
                            "certifications",
                            cert.id,
                            "issuer",
                            e.target.value,
                          )
                        }
                        placeholder="Issuer"
                        className="bg-black/20 border-white/10 h-9"
                      />
                      <Input
                        value={cert.date}
                        onChange={(e) =>
                          updateNested(
                            "certifications",
                            cert.id,
                            "date",
                            e.target.value,
                          )
                        }
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
                <Button
                  variant="outline"
                  className="w-full border-dashed border-white/20 hover:border-white/40 bg-transparent"
                  onClick={() =>
                    addItem("certifications", {
                      name: "",
                      issuer: "",
                      date: "",
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Certification
                </Button>
              </div>
            </FormSection>

            {/* Languages */}
            <FormSection title="Languages">
              <div className="space-y-6">
                {data.languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 relative group bg-gradient-to-b from-white/[0.02] to-transparent"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={lang.language}
                        onChange={(e) =>
                          updateNested(
                            "languages",
                            lang.id,
                            "language",
                            e.target.value,
                          )
                        }
                        placeholder="Language"
                        className="bg-black/20 border-white/10 h-9"
                      />
                      <Input
                        value={lang.level}
                        onChange={(e) =>
                          updateNested(
                            "languages",
                            lang.id,
                            "level",
                            e.target.value,
                          )
                        }
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
                <Button
                  variant="outline"
                  className="w-full border-dashed border-white/20 hover:border-white/40 bg-transparent"
                  onClick={() =>
                    addItem("languages", { language: "", level: "" })
                  }
                >
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
            isPreviewOpen
              ? "block fixed inset-0 z-[60] pt-20"
              : "hidden lg:flex",
          )}
        >
          {isPreviewOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 h-10 w-10 bg-white/10 hover:bg-white/20 rounded-full"
              onClick={() => setIsPreviewOpen(false)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}

          {/* Scale Container to fit A4 */}
          <div
            id="preview-container"
            className="w-full max-w-[210mm] shadow-[0_20px_50px_rgba(0,0,0,0.5)] origin-top transition-transform duration-300 transform scale-[0.55] sm:scale-[0.65] md:scale-[0.8] lg:scale-[0.85] xl:scale-90 mb-20"
          >
            <Suspense
              fallback={
                <div className="h-[297mm] w-full bg-white flex items-center justify-center">
                  <Loader2 className="animate-spin text-gray-400" />
                </div>
              }
            >
              <ResumePreview data={data} template={template} />
            </Suspense>
          </div>
        </div>

        {/* Mobile Preview Toggle */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            onClick={() => setIsPreviewOpen(!isPreviewOpen)}
            className="rounded-full h-14 w-14 shadow-xl bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isPreviewOpen ? (
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
      <AISummaryModal
        isOpen={summaryModalOpen}
        onClose={() => setSummaryModalOpen(false)}
        onGenerate={(summary) => {
          updateField("summary", summary);
          toast.success("Summary optimized with AI!");
        }}
      />

      <AISkillsModal
        isOpen={skillsModalOpen}
        onClose={() => setSkillsModalOpen(false)}
        onAddSkills={onAddSkills}
        existingSkills={data.skills}
      />

      <PremiumUnlockDialog
        open={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        onUnlock={async () => {
          if (!authUser) return;
          try {
            const response = await apiClient.post('/api/users/upgrade-demo');
            const resData = response.data;
            if (resData.success) {
              await updateUser({
                accountType: "premium",
                coverLetterCredits: 10,
                resumeDownloadCredits: 7,
              });
              setShowUnlockModal(false);
              toast.success("Welcome to Premium! Credits added.");
            }
          } catch (error) {
            console.error("Upgrade error:", error);
          }
        }}
      />

      <ChangeTemplateDialog
        open={changeTemplateOpen}
        onOpenChange={setChangeTemplateOpen}
        currentTemplate={template}
        onSelect={(newTemplate) => {
          setTemplate(newTemplate);
          setSaveStatus("Unsaved");
          toast.success("Template updated!");
        }}
      />
    </div>
  );
}
