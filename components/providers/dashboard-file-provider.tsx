"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { MOCK_FILES, MockFile } from "@/lib/mock-files";

interface DashboardFileContextType {
  files: MockFile[];
  activeFile: MockFile;
  setActiveFile: (id: string) => void;
}

const DashboardFileContext = createContext<
  DashboardFileContextType | undefined
>(undefined); // Fixed: Added 'undefined' to complete the union type

import { useUser } from "./user-provider";

export function DashboardFileProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [files, setFiles] = useState<MockFile[]>(MOCK_FILES);
  const [activeFileId, setActiveFileId] = useState<string>(MOCK_FILES[0].id);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  React.useEffect(() => {
    const fetchAllResumes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/resume`);
        // console.log(`API URL: ${API_URL}`);
        // Check if the response is OK and has JSON content type
        if (
          response.ok &&
          response.headers.get("content-type")?.includes("application/json")
        ) {
          const data = await response.json();
          const resumes: MockFile[] = data.data.map((r: any) => ({
            id: r._id,
            name: r.title,
            type: "Resume",
            updatedAt: new Date(r.updatedAt).toLocaleDateString(),
            template: r.templateId || "modern",
            data: r,
          }));

          // Merge with other mock types (Cover Letter, etc.) or just keep resumes
          const otherFiles = MOCK_FILES.filter((f) => f.type !== "Resume");
          setFiles([...resumes, ...otherFiles]);
          if (resumes.length > 0) {
            setActiveFileId(resumes[0].id);
          }
        } else {
          // Log the unexpected response for debugging
          const text = await response.text();
          console.error(
            "Unexpected response from /api/resume:",
            response.status,
            response.statusText,
            text,
          );
        }
      } catch (error) {
        console.error("Failed to fetch resumes for provider:", error);
      }
    };

    fetchAllResumes();
  }, []);

  const activeFile =
    files.find((f) => f.id === activeFileId) || files[0] || MOCK_FILES[0];

  const setActiveFile = (id: string) => {
    setActiveFileId(id);
  };

  return (
    <DashboardFileContext.Provider value={{ files, activeFile, setActiveFile }}>
      {children}
    </DashboardFileContext.Provider>
  );
}

export function useDashboardFile() {
  const context = useContext(DashboardFileContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardFile must be used within a DashboardFileProvider",
    );
  }
  return context;
}
