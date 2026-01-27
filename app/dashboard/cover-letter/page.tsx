"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TemplateSelector,
  TemplateId,
} from "@/components/builder/TemplateSelector";
import {
  CoverLetterPreview,
  CoverLetterData,
} from "@/components/builder/CoverLetterPreview";
import { PremiumUnlockDialog } from "@/components/shared/PremiumUnlockDialog";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Toast, useToast } from "@/components/ui/toast";
import { useUser } from "@/components/providers/user-provider";
import { SaveFileDialog } from "@/components/shared/SaveFileDialog";

export default function CoverLetterPage() {
  const { user } = useUser();
  const [isPremium, setIsPremium] = useState(false);
  const [showUnlock, setShowUnlock] = useState(true); // Show dialog on load
  const [template, setTemplate] = useState<TemplateId>(
    user.preferredTemplate || "clean"
  );
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const { showToast, toastMessage, toastType, displayToast, hideToast } =
    useToast();

  // Mock Data - Initialize with user data
  const [data, setData] = useState<CoverLetterData>({
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone,
    city: user.location,
    role: "Senior Product Engineer",
    company: "TechFlow Systems",
    hiringManager: "Sarah Connor",
    body: "I am writing to express my strong interest in the Senior Product Engineer role at TechFlow Systems...",
  });

  // Update data when user context or template changes (if needed, but mainly for initial load)
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      city: user.location,
    }));
    // Only update template if it hasn't been manually changed?
    // For now, let's respect the user's manual choice if they change it, but sync on mount.
    // Actually, syncing blindly might overwrite manual changes if user updates settings while on this page.
    // Let's just use the initial state sync which is already done above for 'data' in useState,
    // BUT useState initializer only runs once. So we DO need useEffect to sync updates from settings panel.
  }, [user]);

  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setData((prev) => ({
        ...prev,
        body: `Dear ${
          prev.hiringManager || "Hiring Manager"
        },\n\nI am writing to express my strong interest in the ${
          prev.role
        } position at ${prev.company}. Having followed ${
          prev.company
        }'s work for years, I was excited to see an opening that perfectly aligns with my background in scalable cloud architecture and user-centric design.\n\nIn my previous role at Innovate Create, I led the redesign of our core mobile app, resulting in a 20% increase in user retention. I am confident I can bring this same level of strategic thinking and execution to your team.\n\nThank you for considering my application. I look forward to the possibility of discussing how my skills could contribute to ${
          prev.company
        }'s continued success.\n\nSincerely,\n${prev.fullName}`,
      }));
      setGenerating(false);
    }, 1500);
  };

  const handleUnlock = () => {
    setIsPremium(true);
    setShowUnlock(false);
  };

  const handleSaveClick = () => {
    if (!isPremium) return;
    setSaveDialogOpen(true);
  };

  const onSaveFile = (name: string) => {
    // Save to local files (mock)
    const myFiles = JSON.parse(localStorage.getItem("my_files") || "[]");
    const existingIndex = myFiles.findIndex((f: any) => f.id === "cl-draft");

    const newFile = {
      id: "cl-draft",
      name: name,
      type: "Cover Letter",
      template: template,
      date: new Date().toLocaleDateString(),
      data: data,
    };

    if (existingIndex >= 0) {
      myFiles[existingIndex] = newFile;
    } else {
      myFiles.push(newFile);
    }
    localStorage.setItem("my_files", JSON.stringify(myFiles));

    displayToast("Cover letter saved to My Files!", "success");
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
    <div className="min-h-screen flex flex-col h-screen overflow-hidden bg-background">
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={hideToast}
        type={toastType}
      />

      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between px-6 shrink-0 z-50">
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
            Cover Letter Generator
          </span>
          {isPremium && (
            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 uppercase font-bold">
              Pro
            </span>
          )}
        </div>
        {isPremium && (
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSaveClick}
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-white"
            >
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
            <SaveFileDialog
              open={saveDialogOpen}
              onOpenChange={setSaveDialogOpen}
              onSave={onSaveFile}
              defaultName={`Cover Letter - ${data.company || "Draft"}`}
              title="Save Cover Letter"
            />
           
            {/* <Button
              onClick={handlePrint}
              size="sm"
              className="bg-white/10 text-white hover:bg-white/20"
            >
              <Printer className="h-4 w-4 mr-2" /> PDF
            </Button> */}
          </div>
        )}
      </header>

      <PremiumUnlockDialog
        open={showUnlock && !isPremium}
        onClose={() => {}}
        onUnlock={handleUnlock}
      />

      <div
        className={cn(
          "flex-1 flex overflow-hidden relative",
          !isPremium && "blur-sm pointer-events-none select-none"
        )}
      >
        {/* LEFT: EDITOR */}
        <div className="w-full lg:w-1/2 overflow-y-auto p-6 pb-32 scrollbar-thin scrollbar-thumb-white/10">
          <div className="max-w-xl mx-auto space-y-8">
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                1. Visual Style
              </h2>
              <TemplateSelector selectedId={template} onSelect={setTemplate} />
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                2. The Details
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">
                    Target Role
                  </label>
                  <Input
                    value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">
                    Company
                  </label>
                  <Input
                    value={data.company}
                    onChange={(e) =>
                      setData({ ...data, company: e.target.value })
                    }
                    className="bg-black/20 border-white/10"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">
                  Why this role? (for AI generation)
                </label>
                <Textarea
                  placeholder="I have 5 years experience in..."
                  className="bg-black/20 border-white/10"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 border-0"
              >
                {generating ? (
                  <Sparkles className="animate-spin h-5 w-5 mr-2" />
                ) : (
                  <Sparkles className="h-5 w-5 mr-2" />
                )}
                {generating ? "AI is Writing..." : "Generate Magic Draft"}
              </Button>
            </section>

            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                3. Refine
              </h2>
              <Textarea
                value={data.body}
                onChange={(e) => setData({ ...data, body: e.target.value })}
                className="min-h-[300px] font-sans text-base leading-relaxed bg-black/20 border-white/10 p-4"
              />
            </section>
          </div>
        </div>

        {/* RIGHT: PREVIEW */}
        <div
          id="cl-preview-container"
          className="w-full lg:w-1/2 bg-[#525659] p-8 overflow-y-auto hidden lg:flex justify-center"
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
      </div>     
    </div>
  );
}
