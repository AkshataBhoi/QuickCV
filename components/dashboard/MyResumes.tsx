import { Plus, FileText, Clock, ChevronRight, Layout, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDashboardFile } from "@/components/providers/dashboard-file-provider";
import { FileCard } from "@/components/shared/FileCard";
import { useRouter } from "next/navigation";

export function MyResumes() {
  const { files, isLoading, deleteFile, setActiveFile } = useDashboardFile();
  const router = useRouter();

  // Only show resumes here
  const resumes = files.filter(f => f.type === "Resume");

  const handleEdit = (id: string) => {
    router.push(`/dashboard/resume-builder?id=${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this resume?")) {
      await deleteFile(id);
    }
  };

  const handleDownload = (id: string) => {
    window.open(`/print/resume?id=${id}`, '_blank');
  };

  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white tracking-tight">My Resumes</h2>
          <p className="text-sm text-muted-foreground">
            Quick access to your professional resumes
          </p>
        </div>
        <Link href="/dashboard/files" className="text-xs font-bold text-primary hover:underline flex items-center gap-1 uppercase tracking-widest">
          View All <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Create New Card */}
        <Link href="/dashboard/resume-builder">
          <div className="group relative h-48 rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 group-hover:scale-110 transition-all relative z-10">
              <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-sm font-semibold text-muted-foreground group-hover:text-white transition-colors relative z-10">
              Create New Resume
            </span>
          </div>
        </Link>

        {isLoading && resumes.length === 0 ? (
          <>
            <ResumeSkeleton />
            <ResumeSkeleton />
          </>
        ) : (
          <>
            {/* Resume Cards */}
            {resumes.slice(0, 5).map((resume) => (
              <FileCard
                key={resume.id}
                file={resume}
                onEdit={() => handleEdit(resume.id)}
                onDelete={() => handleDelete(resume.id)}
                onDownload={() => handleDownload(resume.id)}
              />
            ))}

            {resumes.length === 0 && !isLoading && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-center space-y-4 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                <div className="p-4 rounded-full bg-white/5">
                  <FileText className="h-10 w-10 text-muted-foreground opacity-30" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    No resumes yet
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1">
                    Start building your professional profile today.
                  </p>
                </div>
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
