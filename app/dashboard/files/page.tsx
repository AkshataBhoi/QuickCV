"use client";

import { TableRowActions } from "@/components/dashboard/TableRowActions";
import { Button } from "@/components/ui/button";
import { FileText, Search, Layout } from "lucide-react";
import { useState } from "react";
import { FilePreviewDialog } from "@/components/shared/FilePreviewDialog";
import { useRouter } from "next/navigation";
import { useDashboardFile } from "@/components/providers/dashboard-file-provider";
import Link from "next/link";

export default function MyFilesPage() {
    const { files: globalFiles, setActiveFile, deleteFile, isLoading } = useDashboardFile();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const filteredFiles = globalFiles.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleView = (file: any) => {
        setSelectedFile(file);
        setActiveFile(file.id);
        setPreviewOpen(true);
    };

    const handleEdit = (file: any) => {
        if (file.type === "Resume") {
            router.push(`/dashboard/resume-builder?id=${file.id}`);
        } else if (file.type === "Cover Letter") {
            router.push("/dashboard/cover-letter");
        } else if (file.type === "ATS Report") {
            handleView(file);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this file?")) {
            await deleteFile(id);
        }
    };

    const handleDownload = (file: any) => {
        window.open(`/print/resume?id=${file.id}`, '_blank');
    };

    return (
        <div className="space-y-6 animate-fade-in-up pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">My Library</h1>
                    <p className="text-sm text-muted-foreground">Manage your generated documents.</p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            className="h-10 pl-9 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm w-full md:w-64 focus:bg-white/10 transition-all outline-none focus:border-primary/50"
                            placeholder="Search files..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Link href="/dashboard/resume-builder">
                        <Button size="sm">Create New</Button>
                    </Link>
                </div>
            </div>

            <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/20 backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-muted-foreground font-medium text-xs uppercase tracking-wider border-b border-white/5">
                            <tr>
                                <th className="p-4 pl-6">File Name</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Template</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading && filteredFiles.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                            <p className="text-muted-foreground">Loading files...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {filteredFiles.map((file) => (
                                        <tr key={file.id} className="group hover:bg-white/5 transition-colors">
                                            <td className="p-4 pl-6 font-medium flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                {file.name}
                                            </td>
                                            <td className="p-4 text-muted-foreground">{file.type}</td>
                                            <td className="p-4 text-muted-foreground flex items-center gap-2">
                                                {file.template && file.template !== "-" && <Layout className="h-3 w-3 opacity-50" />}
                                                {file.template || "-"}
                                            </td>
                                            <td className="p-4 text-muted-foreground">{file.updatedAt}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${file.status === "COMPLETED" || file.data?.isDraft === false
                                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                    }`}>
                                                    {file.status || (file.data?.isDraft ? "Draft" : "Ready")}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <TableRowActions
                                                    onView={() => handleView(file)}
                                                    onEdit={() => handleEdit(file)}
                                                    onDownload={() => handleDownload(file)}
                                                    onDelete={() => handleDelete(file.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredFiles.length === 0 && !isLoading && (
                                        <tr>
                                            <td colSpan={6} className="p-12 text-center text-muted-foreground">
                                                <div className="flex flex-col items-center gap-3">
                                                    <FileText className="h-10 w-10 opacity-20" />
                                                    <p>No files found. Create your first resume to get started!</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <FilePreviewDialog
                open={previewOpen}
                onOpenChange={setPreviewOpen}
                file={selectedFile}
            />
        </div>
    );
}
