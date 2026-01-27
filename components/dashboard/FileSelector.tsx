"use client";

import { ChevronDown, FileText } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface FileOption {
    id: string;
    name: string;
    date: string;
}

interface FileSelectorProps {
    files: FileOption[];
    selectedFileId: string;
    onSelect: (id: string) => void;
}

export function FileSelector({ files, selectedFileId, onSelect }: FileSelectorProps) {
    const selectedFile = files.find((f) => f.id === selectedFileId) || files[0];

    return (
        <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <FileText className="h-5 w-5" />
            </div>
            <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Analyzing File</p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent font-semibold text-lg flex items-center gap-2 text-foreground">
                            {selectedFile.name}
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 bg-background/95 backdrop-blur-xl border-white/10">
                        {files.map((file) => (
                            <DropdownMenuItem
                                key={file.id}
                                onClick={() => onSelect(file.id)}
                                className="flex flex-col items-start py-2 cursor-pointer"
                            >
                                <span className="font-medium">{file.name}</span>
                                <span className="text-xs text-muted-foreground">Edited {file.date}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
