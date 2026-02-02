"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Layout } from "lucide-react";
import { TemplateSelector, TemplateId } from "./TemplateSelector";

interface ChangeTemplateDialogProps {
    currentTemplate: TemplateId;
    onSelect: (id: TemplateId) => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function ChangeTemplateDialog({
    currentTemplate,
    onSelect,
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange
}: ChangeTemplateDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false);

    const width = "90vw";
    const maxWidth = "1000px";

    const isControlled = controlledOpen !== undefined;
    const show = isControlled ? controlledOpen : internalOpen;
    const setShow = isControlled ? controlledOnOpenChange : setInternalOpen;

    const handleSelect = (id: TemplateId) => {
        onSelect(id);
        if (setShow) setShow(false);
    };

    return (
        <Dialog open={show} onOpenChange={setShow}>
            {!isControlled && (
                <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                        <Layout className="w-4 h-4" /> Change Template
                    </Button>
                </DialogTrigger>
            )}

            <DialogContent
                className="max-h-[85vh] flex flex-col p-6 bg-slate-950 text-white border-slate-800"
                style={{ width, maxWidth }}
            >
                <DialogHeader className="mb-4 flex-shrink-0">
                    <DialogTitle className="text-2xl font-bold">Select a Template</DialogTitle>
                    <p className="text-slate-400">
                        Choose a new look for your resume. Your content will be preserved.
                    </p>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                    <TemplateSelector
                        selectedId={currentTemplate}
                        onSelect={handleSelect}
                    // We want to show all templates here, assuming TemplateSelector fetches all
                    // if we don't pass specific ones.
                    />
                </div>

                <div className="mt-6 flex justify-end gap-2 flex-shrink-0 pt-4 border-t border-slate-800">
                    <Button variant="ghost" onClick={() => setShow && setShow(false)}>Cancel</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
