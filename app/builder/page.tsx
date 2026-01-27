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

export default function BuilderPage() {
  const { user } = useUser();
  // Ensure template is never undefined
  const [template, setTemplate] = useState<TemplateId>(
    user.preferredTemplate || "clean"
  );
  const [isClient, setIsClient] = useState(false);

  // Merge user data with initial template safely
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

  // Load from LocalStorage on mount, or sync with User Context if no local draft
  useEffect(() => {
    if (!isClient) return;

    const savedData = localStorage.getItem("resume_data");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Merge with defaults to ensure no undefined fields
        setData((prev) => ({
          ...DEFAULT_RESUME_DATA,
          ...parsed,
        }));
      } catch (e) {
        console.error("Failed to parse saved resume data");
      }
    } else {
      // If no saved draft, ensure user context data is synced specific fields
      setData((prev) => ({
        ...prev,
        fullName: user.firstName ? `${user.firstName} ${user.lastName}` : (prev.fullName ?? ""),
        email: user.email ?? prev.email ?? "",
        phone: user.phone ?? prev.phone ?? "",
        location: user.location ?? prev.location ?? "",
      }));
      if (user.preferredTemplate) {
        setTemplate(user.preferredTemplate);
      }
    }
  }, [user, isClient]);

  // Form Handlers
  const updateField = (field: keyof ResumeData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNested = (
    section: "experience" | "education" | "projects",
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
  };

  const handleSaveClick = () => {
    setSaveDialogOpen(true);
  };

  const onSaveFile = (name: string) => {
    localStorage.setItem("resume_data", JSON.stringify(data));

    // Also add to "My Files" (mocked via localStorage for now just to be persistent)
    const myFiles = JSON.parse(localStorage.getItem("my_files") || "[]");
    const existingIndex = myFiles.findIndex(
      (f: any) => f.id === "resume-draft"
    );

    const newFile = {
      id: "resume-draft",
      name: name,
      type: "Resume",
      template: template,
      Date: new Date().toLocaleDateString(),
      data: data,
    };

    if (existingIndex >= 0) {
      myFiles[existingIndex] = newFile;
    } else {
      myFiles.push(newFile);
    }
    localStorage.setItem("my_files", JSON.stringify(myFiles));

    displayToast("Resume saved successfully!", "success");
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in-up flex flex-col h-screen overflow-hidden">
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
          <span className="font-semibold text-sm hidden md:inline-block">
            Resume Builder
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex text-muted-foreground hover:text-white transition-colors"
            onClick={handleSaveClick}
          >
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
          <SaveFileDialog
            open={saveDialogOpen}
            onOpenChange={setSaveDialogOpen}
            onSave={onSaveFile}
            defaultName={`${data.fullName}'s Resume`}
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
          <div className="max-w-xl mx-auto space-y-8">
            {/* Template Selector */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                1. Choose Template
              </h2>
              <TemplateSelector selectedId={template} onSelect={setTemplate} />
            </section>

            {/* Personal Info */}
            <FormSection title="Personal Details" defaultOpen={true}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase">
                    Full Name
                  </label>
                  <Input
                    value={data.fullName ?? ""}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    value={data.email ?? ""}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="Email"
                    className="bg-black/20 border-white/10"
                  />
                  <Input
                    value={data.phone ?? ""}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="Phone"
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <Input
                  value={data.location ?? ""}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Location"
                  className="bg-black/20 border-white/10"
                />
                <Textarea
                  value={data.summary ?? ""}
                  onChange={(e) => updateField("summary", e.target.value)}
                  placeholder="Professional Summary"
                  className="bg-black/20 border-white/10 min-h-[100px]"
                />
              </div>
            </FormSection>

            {/* Experience */}
            <FormSection title="Experience">
              {data.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-lg bg-white/5 border border-white/5 relative group mb-4"
                >
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <Input
                      value={exp.company ?? ""}
                      onChange={(e) =>
                        updateNested(
                          "experience",
                          exp.id,
                          "company",
                          e.target.value
                        )
                      }
                      placeholder="Company"
                      className="bg-black/20 border-white/10 h-8 text-sm"
                    />
                    <Input
                      value={exp.role ?? ""}
                      onChange={(e) =>
                        updateNested(
                          "experience",
                          exp.id,
                          "role",
                          e.target.value
                        )
                      }
                      placeholder="Role"
                      className="bg-black/20 border-white/10 h-8 text-sm"
                    />
                  </div>
                  <Input
                    value={exp.dates ?? ""}
                    onChange={(e) =>
                      updateNested(
                        "experience",
                        exp.id,
                        "dates",
                        e.target.value
                      )
                    }
                    placeholder="Dates"
                    className="bg-black/20 border-white/10 h-8 text-sm mb-3"
                  />
                  <Textarea
                    value={exp.description ?? ""}
                    onChange={(e) =>
                      updateNested(
                        "experience",
                        exp.id,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Description"
                    className="bg-black/20 border-white/10 text-sm min-h-[100px]"
                  />

                  <button
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        experience: prev.experience.filter(
                          (e) => e.id !== exp.id
                        ),
                      }))
                    }
                    className="absolute -right-2 -top-2 bg-red-500/10 text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-dashed border-white/20 hover:text-white"
                onClick={() =>
                  setData((d) => ({
                    ...d,
                    experience: [
                      ...d.experience,
                      {
                        id: Date.now(),
                        company: "",
                        role: "",
                        dates: "",
                        description: "",
                      },
                    ],
                  }))
                }
              >
                <Plus className="h-4 w-4 mr-2" /> Add Position
              </Button>
            </FormSection>

            {/* Skills */}
            <FormSection title="Skills">
              <Textarea
                value={data.skills.join(", ") ?? ""}
                onChange={(e) =>
                  updateField(
                    "skills",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
                placeholder="Comma separated list (e.g. React, Node, SQL)"
                className="bg-black/20 border-white/10 min-h-[80px]"
              />
            </FormSection>
            {/* Projects */}
            <FormSection title="Projects">
              {data.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-lg bg-white/5 border border-white/5 relative group mb-4"
                >
                  <Input
                    value={proj.title ?? ""}
                    onChange={(e) =>
                      updateNested("projects", proj.id, "title", e.target.value)
                    }
                    placeholder="Project Title"
                    className="bg-black/20 border-white/10 h-8 text-sm mb-2"
                  />
                  <Input
                    value={proj.tech ?? ""}
                    onChange={(e) =>
                      updateNested("projects", proj.id, "tech", e.target.value)
                    }
                    placeholder="Tech Stack"
                    className="bg-black/20 border-white/10 h-8 text-sm mb-2"
                  />
                  <Textarea
                    value={proj.description ?? ""}
                    onChange={(e) =>
                      updateNested(
                        "projects",
                        proj.id,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Description"
                    className="bg-black/20 border-white/10 text-sm"
                  />

                  <button
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        projects: prev.projects.filter((p) => p.id !== proj.id),
                      }))
                    }
                    className="absolute -right-2 -top-2 bg-red-500/10 text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-dashed border-white/20 hover:text-white"
                onClick={() =>
                  setData((d) => ({
                    ...d,
                    projects: [
                      ...d.projects,
                      { id: Date.now(), title: "", description: "", tech: "" },
                    ],
                  }))
                }
              >
                <Plus className="h-4 w-4 mr-2" /> Add Project
              </Button>
            </FormSection>

            {/* Education */}
            <FormSection title="Education">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-lg bg-white/5 border border-white/5 relative group mb-4"
                >
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <Input
                      value={edu.school ?? ""}
                      onChange={(e) =>
                        updateNested(
                          "education",
                          edu.id,
                          "school",
                          e.target.value
                        )
                      }
                      placeholder="School"
                      className="bg-black/20 border-white/10 h-8 text-sm"
                    />
                    <Input
                      value={edu.degree ?? ""}
                      onChange={(e) =>
                        updateNested(
                          "education",
                          edu.id,
                          "degree",
                          e.target.value
                        )
                      }
                      placeholder="Degree"
                      className="bg-black/20 border-white/10 h-8 text-sm"
                    />
                  </div>
                  <Input
                    value={edu.dates ?? ""}
                    onChange={(e) =>
                      updateNested("education", edu.id, "dates", e.target.value)
                    }
                    placeholder="Dates"
                    className="bg-black/20 border-white/10 h-8 text-sm"
                  />

                  <button
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        education: prev.education.filter(
                          (e) => e.id !== edu.id
                        ),
                      }))
                    }
                    className="absolute -right-2 -top-2 bg-red-500/10 text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-dashed border-white/20 hover:text-white"
                onClick={() =>
                  setData((d) => ({
                    ...d,
                    education: [
                      ...d.education,
                      { id: Date.now(), school: "", degree: "", dates: "" },
                    ],
                  }))
                }
              >
                <Plus className="h-4 w-4 mr-2" /> Add Education
              </Button>
            </FormSection>
          </div>
        </div>

        {/* === RIGHT: PREVIEW === */}
        <div
          className={cn(
            "w-full lg:w-1/2 bg-[#f8f9fb] p-4 lg:p-8 overflow-y-auto flex justify-center",
            mobilePreviewOpen
              ? "block fixed inset-0 z-40 pt-20"
              : "hidden lg:flex"
          )}
        >
          {/* Scale Container to fit A4 */}
          <div
            id="preview-container"
            className="w-full max-w-[210mm] shadow-2xl origin-top transition-transform duration-300 transform scale-[0.55] sm:scale-[0.65] md:scale-[0.8] lg:scale-100 mb-20"
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
            className="rounded-full h-14 w-14 shadow-xl bg-primary hover:bg-primary/90"
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
          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
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
          /* Reset transforms on parent */
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
