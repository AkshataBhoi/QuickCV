"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SaveFileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (name: string) => void;
    defaultName?: string;
    title?: string;
    description?: string;
    isLoading?: boolean;
}

export function SaveFileDialog({
    open,
    onOpenChange,
    onSave,
    defaultName = "",
    title = "Save File",
    description = "Enter a name for your file.",
    isLoading = false
}: SaveFileDialogProps) {
    const [name, setName] = useState(defaultName);

    const handleSave = () => {
        if (name.trim()) {
            onSave(name);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-[#0f111a] border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="filename" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="filename"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3 bg-white/5 border-white/10 text-white"
                            autoFocus
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="border-white/10 text-white hover:bg-white/5 hover:text-white"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading || !name.trim()}>
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
