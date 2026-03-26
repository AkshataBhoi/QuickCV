"use client";

import React from "react";
import { FileText, Clock, ChevronRight, Layout, MoreVertical, FileCode, CheckCircle2, Eye, Edit, Trash2, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TableRowActions } from "@/components/dashboard/TableRowActions";
import { Button } from "@/components/ui/button";

interface FileCardProps {
    file: {
        id: string;
        name: string;
        type: string;
        template?: string;
        updatedAt: string;
        status?: string;
        source?: "generated" | "uploaded";
        url?: string;
        data?: any;
    };
    onView?: () => void;
    onEdit?: () => void;
    onDownload?: () => void;
    onDelete?: () => void;
}

export function FileCard({ file, onView, onEdit, onDownload, onDelete }: FileCardProps) {
    const isATS = file.type === "ATS Report" || file.type === "ATS Scan" || file.status === "ATS_SCAN";
    const isDraft = file.status === "DRAFT" || file.status === "Draft" || file.data?.isDraft === true;
    const isCompleted = file.status === "COMPLETED" || file.data?.isDraft === false;

    // View: Enabled for generated, drafts, or if it has a URL
    const isViewEnabled = !isATS && (file.source === "generated" || isDraft || !!file.url);
    // Edit: Enabled for drafts or generated resumes/cover-letters
    const isEditEnabled = !isATS && (isDraft || file.type === "Resume" || file.type === "Cover Letter");

    return (
        <>
            {/* Desktop Card View */}
            <div className="hidden md:flex group relative h-48 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 flex-col justify-between hover:border-white/20 hover:bg-black/60 transition-all shadow-xl hover:shadow-primary/5 cursor-pointer overflow-hidden transform hover:-translate-y-1 duration-300">
                {/* Background Glow */}
                <div className={cn(
                    "absolute -right-4 -top-4 w-24 h-24 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
                    (file.type === "Resume") ? "bg-primary/10" : "bg-purple-500/10"
                )} />

                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <div className={cn(
                            "p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors",
                            (file.type === "Resume") ? "text-primary" : "text-purple-400"
                        )}>
                            {(file.type === "Resume") ? <FileText className="h-5 w-5" /> : <FileCode className="h-5 w-5" />}
                        </div>

                        <div className="flex items-center gap-2">
                            <span
                                className={cn(
                                    "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                                    isCompleted
                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                                )}
                            >
                                {file.status || (isCompleted ? "Completed" : "Draft")}
                            </span>

                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <TableRowActions
                                    onView={isViewEnabled ? onView : undefined}
                                    onEdit={isEditEnabled ? onEdit : undefined}
                                    onDownload={onDownload}
                                    onDelete={onDelete}
                                    isViewDisabled={!isViewEnabled}
                                    isEditDisabled={!isEditEnabled}
                                />
                            </div>
                        </div>
                    </div>

                    <div onClick={() => isViewEnabled && onView ? onView() : onEdit?.()} className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1 truncate pr-4">
                            {file.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 font-medium bg-white/5 px-2 py-0.5 rounded-full">
                                {file.type}
                            </span>
                            {file.template && file.template !== "-" && (
                                <span className="flex items-center gap-1">
                                    <Layout className="h-3 w-3 opacity-50" />
                                    <span className="capitalize">{file.template}</span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5" onClick={() => isViewEnabled && onView ? onView() : onEdit?.()}>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                        <Clock className="h-3 w-3" />
                        <span>Updated {file.updatedAt}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
            </div>

            {/* Mobile Row View */}
            <div className="md:hidden flex flex-col p-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md gap-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={cn(
                            "p-2 rounded-lg bg-white/5 flex-shrink-0",
                            (file.type === "Resume") ? "text-primary" : "text-purple-400"
                        )}>
                            {(file.type === "Resume") ? <FileText className="h-5 w-5" /> : <FileCode className="h-5 w-5" />}
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-base font-bold text-white truncate pr-2">
                                {file.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                <span className="text-[10px] font-medium bg-white/5 px-2 py-0.5 rounded-full text-muted-foreground">
                                    {file.type}
                                </span>
                                {file.template && file.template !== "-" && (
                                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                        <Layout className="h-2.5 w-2.5 opacity-50" />
                                        <span className="capitalize">{file.template}</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <span
                        className={cn(
                            "px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider flex-shrink-0",
                            isCompleted
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                        )}
                    >
                        {file.status || (isCompleted ? "Completed" : "Draft")}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                    <Clock className="h-3 w-3" />
                    <span>Updated {file.updatedAt}</span>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/5">
                    <Button 
                        onClick={onView} 
                        variant="ghost" 
                        size="sm" 
                        disabled={!isViewEnabled}
                        title={!isViewEnabled ? (isATS ? "ATS Reports cannot be previewed" : "Preview is not available for this file") : ""}
                        className={cn(
                            "h-10 bg-white/5 hover:bg-white/10 text-white rounded-xl flex flex-col gap-1 items-center justify-center p-0",
                            !isViewEnabled && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <Eye className="h-4 w-4" />
                        <span className="text-[9px] uppercase tracking-tighter">View</span>
                    </Button>
                    <Button 
                        onClick={onEdit} 
                        variant="ghost" 
                        size="sm" 
                        disabled={!isEditEnabled}
                        title={!isEditEnabled ? "ATS Reports cannot be edited" : ""}
                        className={cn(
                            "h-10 bg-white/5 hover:bg-white/10 text-white rounded-xl flex flex-col gap-1 items-center justify-center p-0",
                            !isEditEnabled && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <Edit className="h-4 w-4" />
                        <span className="text-[9px] uppercase tracking-tighter">Edit</span>
                    </Button>
                    <Button onClick={onDownload} variant="ghost" size="sm" className="h-10 bg-white/5 hover:bg-white/10 text-white rounded-xl flex flex-col gap-1 items-center justify-center p-0">
                        <FileDown className="h-4 w-4" />
                        <span className="text-[9px] uppercase tracking-tighter">Save</span>
                    </Button>
                    <Button onClick={onDelete} variant="ghost" size="sm" className="h-10 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-xl flex flex-col gap-1 items-center justify-center p-0">
                        <Trash2 className="h-4 w-4" />
                        <span className="text-[9px] uppercase tracking-tighter">Delete</span>
                    </Button>
                </div>
            </div>
        </>
    );
}
