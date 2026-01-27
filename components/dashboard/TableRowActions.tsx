"use client";

import { Edit, Download, Trash2, MoreVertical, FileDown, Eye } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface TableRowActionsProps {
    onView?: () => void;
    onEdit?: () => void;
    onDownload?: () => void;
    onDelete?: () => void;
}

export function TableRowActions({ onView, onEdit, onDownload, onDelete }: TableRowActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px] bg-[#0f111a] backdrop-blur-xl border-white/10 text-white">
                {onView && (
                    <DropdownMenuItem onClick={onView}>
                        <Eye className="mr-2 h-4 w-4" /> View
                    </DropdownMenuItem>
                )}
                {onEdit && (
                    <DropdownMenuItem onClick={onEdit}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                )}
                {onDownload && (
                    <DropdownMenuItem onClick={onDownload}>
                        <FileDown className="mr-2 h-4 w-4" /> Download
                    </DropdownMenuItem>
                )}
                {onDelete && (
                    <DropdownMenuItem onClick={onDelete} className="text-red-400 focus:text-red-400 focus:bg-red-500/10">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
