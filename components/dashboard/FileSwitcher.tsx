"use client";

import { ChevronDown, FileText } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDashboardFile } from "@/components/providers/dashboard-file-provider";

export function FileSwitcher() {
    const { files, activeFile, setActiveFile } = useDashboardFile();

    // Group files by type
    const resumes = files.filter(f => f.type === "Resume");
    const coverLetters = files.filter(f => f.type === "Cover Letter");
    const reports = files.filter(f => f.type === "ATS Report");

    return (
        <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <FileText className="h-5 w-5" />
            </div>
            <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Active File
                </p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-auto p-0 hover:bg-transparent font-semibold text-lg flex items-center gap-2 text-foreground"
                        >
                            {activeFile.name}
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        className="w-64 bg-background/95 backdrop-blur-xl border-white/10 max-h-[400px] overflow-y-auto"
                    >
                        {resumes.length > 0 && (
                            <>
                                <DropdownMenuLabel className="text-xs text-muted-foreground">Resumes</DropdownMenuLabel>
                                {resumes.map((file) => (
                                    <DropdownMenuItem
                                        key={file.id}
                                        onClick={() => setActiveFile(file.id)}
                                        className="flex flex-col items-start py-2 cursor-pointer"
                                    >
                                        <span className="font-medium">{file.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {file.updatedAt}
                                        </span>
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator />
                            </>
                        )}

                        {coverLetters.length > 0 && (
                            <>
                                <DropdownMenuLabel className="text-xs text-muted-foreground">Cover Letters</DropdownMenuLabel>
                                {coverLetters.map((file) => (
                                    <DropdownMenuItem
                                        key={file.id}
                                        onClick={() => setActiveFile(file.id)}
                                        className="flex flex-col items-start py-2 cursor-pointer"
                                    >
                                        <span className="font-medium">{file.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {file.updatedAt}
                                        </span>
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator />
                            </>
                        )}

                        {reports.length > 0 && (
                            <>
                                <DropdownMenuLabel className="text-xs text-muted-foreground">Reports</DropdownMenuLabel>
                                {reports.map((file) => (
                                    <DropdownMenuItem
                                        key={file.id}
                                        onClick={() => setActiveFile(file.id)}
                                        className="flex flex-col items-start py-2 cursor-pointer"
                                    >
                                        <span className="font-medium">{file.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {file.updatedAt}
                                        </span>
                                    </DropdownMenuItem>
                                ))}
                            </>
                        )}

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
