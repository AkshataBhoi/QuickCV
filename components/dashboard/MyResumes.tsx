"use client";

import { useState, useEffect } from "react";
import { Plus, FileText, Clock, ChevronRight, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ResumeRecord } from "@/lib/types";

const MOCK_RESUMES: ResumeRecord[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    template: "Modern",
    updatedAt: "2 hours ago",
    status: "Completed",
  },
  {
    id: "2",
    title: "Full Stack Developer",
    template: "Clean",
    updatedAt: "1 day ago",
    status: "Draft",
  },
  {
    id: "3",
    title: "UI/UX Designer",
    template: "Minimal",
    updatedAt: "3 days ago",
    status: "Completed",
  },
  {
    id: "4",
    title: "Backend Architect",
    template: "Modern",
    updatedAt: "1 week ago",
    status: "Completed",
  },
  {
    id: "5",
    title: "Product Manager",
    template: "Clean",
    updatedAt: "2 weeks ago",
    status: "Draft",
  },
  {
    id: "6",
    title: "Data Scientist",
    template: "Minimal",
    updatedAt: "1 month ago",
    status: "Completed",
  },
  {
    id: "7",
    title: "Marketing Lead",
    template: "Clean",
    updatedAt: "2 months ago",
    status: "Draft",
  },
];

import { useUser } from "@/components/providers/user-provider";

export function MyResumes() {
  const { user } = useUser();
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/resume`);
        const result = await response.json();

        if (response.ok) {
          const resumesArray = Array.isArray(result.data) ? result.data : [];

          const mapped: ResumeRecord[] = resumesArray.map((r: any) => ({
            id: r._id,
            title: r.title,
            template: r.templateId || "Modern",
            updatedAt: new Date(r.updatedAt).toLocaleDateString(),
            status: r.isDraft ? "Draft" : "Completed",
          }));

          setResumes(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-col mb-2">
        <h2 className="text-xl font-bold text-white">My Resumes</h2>
        <p className="text-sm text-muted-foreground">
          Your saved resumes for different job roles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
        {/* Create New Card */}
        <Link href="/dashboard/resume-builder">
          <div className="group relative h-48 rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer">
            <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
              <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors">
              Create New Resume
            </span>
          </div>
        </Link>

        {isLoading ? (
          <>
            <ResumeSkeleton />
            <ResumeSkeleton />
            <ResumeSkeleton />
          </>
        ) : (
          <>
            {/* Resume Cards */}
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}

            {resumes.length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 rounded-full bg-white/5">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    You haven't created any resumes yet
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1">
                    Start building your professional profile to land your dream
                    job.
                  </p>
                </div>
                <Link href="/dashboard/resume-builder">
                  <Button className="mt-4 bg-primary text-white hover:bg-primary/90">
                    Create My First Resume
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ResumeSkeleton() {
  return (
    <div className="h-48 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between animate-pulse">
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="w-10 h-10 rounded-lg bg-white/5" />
          <div className="w-16 h-6 rounded-md bg-white/5" />
        </div>
        <div className="space-y-2">
          <div className="w-3/4 h-5 rounded bg-white/5" />
          <div className="w-1/2 h-3 rounded bg-white/5" />
        </div>
      </div>
      <div className="w-full h-8 border-t border-white/5 mt-4 pt-4">
        <div className="w-1/3 h-3 rounded bg-white/5" />
      </div>
    </div>
  );
}

function ResumeCard({ resume }: { resume: ResumeRecord }) {
  return (
    <Link href={`/dashboard/resume-builder?id=${resume.id}`}>
      <div className="group relative h-48 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 flex flex-col justify-between hover:border-white/20 hover:bg-black/60 transition-all shadow-xl hover:shadow-primary/5 cursor-pointer overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <span
              className={cn(
                "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                resume.status === "Completed"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20",
              )}
            >
              {resume.status}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1 truncate">
              {resume.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Layout className="h-3 w-3" />
              <span>{resume.template} Template</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Updated {resume.updatedAt}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
