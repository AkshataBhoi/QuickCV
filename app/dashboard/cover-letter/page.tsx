"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Save, Layout, ChevronLeft, Check, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TemplateSelector,
  TemplateId,
} from "@/components/builder/TemplateSelector";
import {
  CoverLetterPreview,
  CoverLetterData,
} from "@/components/builder/CoverLetterPreview";
import { ChangeTemplateDialog } from "@/components/builder/ChangeTemplateDialog";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/components/providers/user-provider";
import { useDashboardFile } from "@/components/providers/dashboard-file-provider";
import { SaveFileDialog } from "@/components/shared/SaveFileDialog";
import { FilePreviewDialog } from "@/components/shared/FilePreviewDialog";
import apiClient from "@/lib/api/client";

export default function CoverLetterPage() {
  const { user: authUser } = useAuth();
  const { user: profileUser, updateUser } = useUser();
  const [template, setTemplate] = useState<TemplateId>(
    profileUser.preferredTemplate || "modern-01"
  );
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [changeTemplateOpen, setChangeTemplateOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isPremium = profileUser.accountType === "premium";

  // Mock Data - Initialize with user data
  const [data, setData] = useState<CoverLetterData>({
    fullName: `${profileUser.firstName} ${profileUser.lastName}`,
    email: profileUser.email,
    phone: profileUser.phone,
    city: profileUser.location,
    role: "Senior Product Engineer",
    company: "TechFlow Systems",
    hiringManager: "Sarah Connor",
    body: "I am writing to express my strong interest in the Senior Product Engineer role at TechFlow Systems...",
  });

  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!isPremium) return;
    
    if (profileUser.coverLetterCredits <= 0) {
        toast.error("You have run out of Cover Letter credits. Upgrade for more!");
        return;
    }

    setGenerating(true);
    // Simulate API call for generation and credit deduction
    setTimeout(async () => {
      setData((prev) => ({
        ...prev,
        body: `Dear ${prev.hiringManager || "Hiring Manager"
          },\n\nI am writing to express my strong interest in the ${prev.role
          } position at ${prev.company}. Having followed ${prev.company
          }'s work for years, I was excited to see an opening that perfectly aligns with my background in scalable cloud architecture and user-centric design.\n\nIn my previous role at Innovate Create, I led the redesign of our core mobile app, resulting in a 20% increase in user retention. I am confident I can bring this same level of strategic thinking and execution to your team.\n\nThank you for considering my application. I look forward to the possibility of discussing how my skills could contribute to ${prev.company
          }'s continued success.\n\nSincerely,\n${prev.fullName}`,
      }));
      setGenerating(false);
      
      // Update local state credits (in real app, this comes from backend response)
      await updateUser({ coverLetterCredits: profileUser.coverLetterCredits - 1 });
      toast.success("Cover letter generated! 1 credit used.");
    }, 1500);
  };

  const handleUnlock = async () => {
    toast.info("Feature under development", {
      description: "Actual payment integration is coming soon! Unlocking demo for now.",
      icon: <Sparkles className="h-4 w-4 text-indigo-400" />
    });

    if (!authUser) return;
    try {
      const response = await apiClient.post('/api/users/upgrade-demo', {
        userId: authUser.uid
      });

      const resData = response.data;
      if (resData.success) {
        await updateUser({
          accountType: "premium",
          coverLetterCredits: 10,
          resumeDownloadCredits: 7
        });
        toast.success("Welcome to Premium! Credits added.");
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      toast.error("Upgrade failed. Please try again later.");
    }
  };

  const handleSaveClick = () => {
    if (!isPremium) return;
    setSaveDialogOpen(true);
  };

  const { addFile } = useDashboardFile();

  const onSaveFile = async (name: string) => {
    setIsSaving(true);
    try {
      const response = await apiClient.post('/api/resume', {
        title: name,
        content: data,
        templateId: template,
        type: "cover-letter"
      });

      const result = response.data;

      if (result.data) {
        addFile(result.data);
        setSaveDialogOpen(false);
        toast.success("File saved successfully ✓");
      } else {
        throw new Error(result.message || "Failed to save");
      }
    } catch (error: any) {
      console.error("Save Error:", error);
      const data = error.response?.data;
      toast.error(data?.message || "Failed to save cover letter");
    } finally {
      setIsSaving(false);
    }
  };

  //   const handlePrint = () => {
  //   const element = document.getElementById("resume-export");
  //   if (!element) {
  //     console.error("Export element not found");
  //     return;
  //   }

  //   html2pdf()
  //     .set({
  //       margin: 0,
  //       filename: `Cover-Letter-${data.company || "Draft"}.pdf`,
  //       image: { type: "jpeg", quality: 0.98 },
  //       html2canvas: {
  //         scale: 2,
  //         useCORS: true,
  //       },
  //       jsPDF: {
  //         unit: "mm",
  //         format: "a4",
  //         orientation: "portrait",
  //       },
  //     })
  //     .from(element)
  //     .save();
  // };


  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col h-screen overflow-hidden">
      <FilePreviewDialog
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        file={{
          name: `${data.company || "Draft"} - Cover Letter`,
          type: "Cover Letter",
          data: { content: data },
          template: template
        }}
      />

      {/* Toolbar / Header */}
      <div className="h-14 sm:h-16 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between px-3 sm:px-6 shrink-0 z-50">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">
              {data.company || "New Cover Letter"}
            </span>
            {isPremium && (
              <span className="text-[8px] sm:text-[10px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/20 uppercase font-bold shrink-0">
                Pro
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
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

          {isPremium && (
            <>
              <Button
                onClick={() => setChangeTemplateOpen(true)}
                size="sm"
                variant="ghost"
                className="h-8 sm:h-9 text-muted-foreground hover:text-white px-2 sm:px-3"
                title="Change Template"
              >
                <Layout className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Template</span>
              </Button>
              <ChangeTemplateDialog
                currentTemplate={template}
                onSelect={(id) => setTemplate(id)}
                open={changeTemplateOpen}
                onOpenChange={setChangeTemplateOpen}
              />
              <Button
                onClick={handleSaveClick}
                size="sm"
                className="h-8 sm:h-9 hover:bg-primary/90 text-primary bg-transparent px-2 sm:px-4"
                disabled={isSaving}
                title="Save"
              >
                <Save className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">{isSaving ? "Saving..." : "Save"}</span>
              </Button>
              <SaveFileDialog
                open={saveDialogOpen}
                onOpenChange={setSaveDialogOpen}
                onSave={onSaveFile}
                defaultName={`Cover Letter - ${data.company || "Draft"}`}
                title="Save Cover Letter"
                isLoading={isSaving}
              />
            </>
          )}
        </div>
      </div>

      {!isPremium && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-background/60 backdrop-blur-md">
          <div className="max-w-md w-full bg-[#0f111a] border border-indigo-500/20 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 text-center shadow-2xl">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-indigo-500/30 transform rotate-3">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">AI Cover Letter Generator</h2>
            <p className="text-xs sm:text-sm text-indigo-200/70 mb-6 sm:mb-8 leading-relaxed">
              Generate personalized cover letters for any job in seconds.
            </p>
            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-left max-w-[250px] mx-auto">
              {[
                "10 AI cover letters",
                "Download as PDF",
                "Tailored for job descriptions"
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-sm text-gray-300">
                  <div className="p-0.5 sm:p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check className="h-2 w-2 sm:h-3 sm:w-3" />
                  </div>
                  {f}
                </div>
              ))}
            </div>
            <div className="space-y-2 sm:space-y-3">
              <Button onClick={handleUnlock} className="w-full h-10 sm:h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base">
                Unlock Premium
              </Button>
              <Button onClick={() => {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://quickcv.app`, '_blank');
                handleUnlock();
              }} variant="outline" className="w-full h-10 sm:h-12 border-white/10 text-white font-bold text-sm sm:text-base">
                Share to Unlock
              </Button>
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "flex-1 flex overflow-hidden relative",
          !isPremium && "blur-sm pointer-events-none select-none"
        )}
      >
        {/* LEFT: EDITOR */}
        <div className="w-full lg:w-1/2 overflow-y-auto p-4 sm:p-6 pb-32 custom-scrollbar">
          <div className="max-w-xl mx-auto space-y-6 sm:space-y-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  1. The Details
                </h2>
                <div className="lg:hidden">
                   {/* Mobile preview toggle or status could go here */}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase">
                    Target Role
                  </label>
                  <Input
                    value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                    className="bg-black/20 border-white/10 h-9 sm:h-10 text-sm"
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase">
                    Company
                  </label>
                  <Input
                    value={data.company}
                    onChange={(e) =>
                      setData({ ...data, company: e.target.value })
                    }
                    className="bg-black/20 border-white/10 h-9 sm:h-10 text-sm"
                    placeholder="e.g. Google"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase">
                  Why this role? (for AI)
                </label>
                <Textarea
                  placeholder="Mention your key experience or skills relevant to this job..."
                  className="bg-black/20 border-white/10 min-h-[80px] sm:min-h-[100px] text-sm resize-none"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full h-10 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 border-0 text-sm sm:text-base"
              >
                <Sparkles className={cn("h-4 w-4 sm:h-5 sm:w-5 mr-2", generating && "animate-spin")} />
                {generating ? "AI is Writing..." : "Generate Magic Draft"}
              </Button>
            </section>

            <section className="space-y-4">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground">
                2. Refine
              </h2>
              <Textarea
                value={data.body}
                onChange={(e) => setData({ ...data, body: e.target.value })}
                className="min-h-[400px] sm:min-h-[500px] font-sans text-sm sm:text-base leading-relaxed bg-black/20 border-white/10 p-4 sm:p-6 rounded-xl sm:rounded-2xl resize-none"
              />
            </section>
          </div>
        </div>

        {/* RIGHT: PREVIEW */}
        <div
          id="cl-preview-container"
          className="w-full lg:w-1/2 bg-[#525659] p-4 sm:p-8 overflow-y-auto hidden lg:flex justify-center custom-scrollbar"
        >
          <div className="origin-top scale-[0.65] xl:scale-[0.85] mb-20">
            {/* EXPORT TARGET */}
            <div
              id="resume-export"
              className="w-[210mm] min-h-[297mm] bg-white shadow-2xl relative"
            >
              {/* WATERMARK FOR FREE USERS */}
              {!isPremium && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="text-[64px] font-bold text-black/10 rotate-[-30deg]">
                    ResuStack.ai
                  </span>
                </div>
              )}

              <CoverLetterPreview data={data} template={template} />
            </div>
          </div>
        </div>

        {/* Mobile Preview Toggle */}
        {/* <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            onClick={() => setIsPreviewOpen(true)}
            className="rounded-full h-14 w-14 shadow-xl bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Eye className="h-6 w-6" />
          </Button>
        </div> */}
      </div>
    </div>
  );
}
