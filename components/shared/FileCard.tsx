"use client";

import React from "react";
import { FileText, Clock, ChevronRight, Layout, MoreVertical, FileCode, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TableRowActions } from "@/components/dashboard/TableRowActions";

interface FileCardProps {
    file: {
        id: string;
        name: string;
        type: string;
        template?: string;
        updatedAt: string;
        status?: string;
        data?: any;
    };
    onView?: () => void;
    onEdit?: () => void;
    onDownload?: () => void;
    onDelete?: () => void;
}

export function FileCard({ file, onView, onEdit, onDownload, onDelete }: FileCardProps) {
    const isResume = file.type === "Resume";
    const isCoverLetter = file.type === "Cover Letter";
    const isCompleted = file.status === "COMPLETED" || file.data?.isDraft === false;

    return (
        <div className="group relative h-48 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 flex flex-col justify-between hover:border-white/20 hover:bg-black/60 transition-all shadow-xl hover:shadow-primary/5 cursor-pointer overflow-hidden transform hover:-translate-y-1 duration-300">
            {/* Background Glow */}
            <div className={cn(
                "absolute -right-4 -top-4 w-24 h-24 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
                isResume ? "bg-primary/10" : "bg-purple-500/10"
            )} />

            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <div className={cn(
                        "p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors",
                        isResume ? "text-primary" : "text-purple-400"
                    )}>
                        {isResume ? <FileText className="h-5 w-5" /> : <FileCode className="h-5 w-5" />}
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
                                onView={onView}
                                onEdit={onEdit}
                                onDownload={onDownload}
                                onDelete={onDelete}
                            />
                        </div>
                    </div>
                </div>

                <div onClick={onEdit} className="flex-1">
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

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5" onClick={onEdit}>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                    <Clock className="h-3 w-3" />
                    <span>Updated {file.updatedAt}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
        </div>
    );
}
