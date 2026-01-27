"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { MOCK_FILES, MockFile } from "@/lib/mock-files";

interface DashboardFileContextType {
    files: MockFile[];
    activeFile: MockFile;
    setActiveFile: (id: string) => void;
}

const DashboardFileContext = createContext<DashboardFileContextType | undefined>(undefined);

export function DashboardFileProvider({ children }: { children: ReactNode }) {
    // Default to the first file
    const [activeFileId, setActiveFileId] = useState<string>(MOCK_FILES[0].id);

    const activeFile = MOCK_FILES.find((f) => f.id === activeFileId) || MOCK_FILES[0];

    const setActiveFile = (id: string) => {
        setActiveFileId(id);
    };

    return (
        <DashboardFileContext.Provider value={{ files: MOCK_FILES, activeFile, setActiveFile }}>
            {children}
        </DashboardFileContext.Provider>
    );
}

export function useDashboardFile() {
    const context = useContext(DashboardFileContext);
    if (context === undefined) {
        throw new Error("useDashboardFile must be used within a DashboardFileProvider");
    }
    return context;
}
