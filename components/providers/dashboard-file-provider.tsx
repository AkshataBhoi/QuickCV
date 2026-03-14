"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export interface DashboardFile {
  id: string;
  name: string;
  type: "Resume" | "Cover Letter" | "ATS Report";
  updatedAt: string;
  template?: string;
  status?: string;
  data: any;
}

interface DashboardFileContextType {
  files: DashboardFile[];
  activeFile: DashboardFile | null;
  setActiveFile: (id: string) => void;
  loadFiles: () => Promise<void>;
  createFile: (fileData: any) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  addFile: (file: any) => void;
  refreshFiles: () => Promise<void>;
  isLoading: boolean;
}

const DashboardFileContext = createContext<DashboardFileContextType | undefined>(undefined);

export function DashboardFileProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [files, setFiles] = useState<DashboardFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [isDataFetching, setIsDataFetching] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const loadFiles = useCallback(async () => {
    if (!user) return;

    setIsDataFetching(true);
    try {
      const token = await user.getIdToken();
      const headers: Record<string, string> = {
        "Authorization": `Bearer ${token}`,
        "x-user-id": user.uid
      };

      const response = await fetch(`${API_URL}/api/files`, { headers });
      if (response.ok) {
        const data = await response.json();

        // Map backend _id to id for internal compatibility
        const apiFiles: DashboardFile[] = (data.data || []).map((r: any) => ({
          id: r._id,
          name: r.title,
          type: r.type ? (r.type === "resume" ? "Resume" : "Cover Letter") : "Resume",
          updatedAt: new Date(r.updatedAt).toLocaleDateString(),
          template: r.templateId || "modern",
          status: r.status || "DRAFT",
          data: r,
        }));

        setFiles(apiFiles);

        // Auto-set the first resume as active if none is currently active or if current active is missing
        if (apiFiles.length > 0) {
          if (!activeFileId || !apiFiles.find(f => f.id === activeFileId)) {
            setActiveFileId(apiFiles[0].id);
          }
        } else {
          setActiveFileId(null);
        }
      }
    } catch (error) {
      console.error("DashboardFileProvider: Failed to load files:", error);
    } finally {
      setIsDataFetching(false);
    }
  }, [user, API_URL, activeFileId]);

  useEffect(() => {
    // Only fetch when auth has finished initializing and a user is present
    if (!authLoading && user) {
      loadFiles();
    }
  }, [user, authLoading]);

  const createFile = async (fileData: any) => {
    try {
      const token = await user?.getIdToken();
      const response = await fetch(`${API_URL}/api/files`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "x-user-id": user?.uid || ""
        },
        body: JSON.stringify(fileData)
      });

      if (response.ok) {
        await loadFiles();
      }
    } catch (error) {
      console.error("DashboardFileProvider: Failed to create file:", error);
    }
  };

  const deleteFile = async (id: string) => {
    try {
      const token = await user?.getIdToken();
      const response = await fetch(`${API_URL}/api/files/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "x-user-id": user?.uid || ""
        }
      });

      if (response.ok) {
        setFiles(prev => prev.filter(f => f.id !== id));
        if (activeFileId === id) {
          setActiveFileId(files.find(f => f.id !== id)?.id || null);
        }
      }
    } catch (error) {
      console.error("DashboardFileProvider: Failed to delete file:", error);
    }
  };

  const addFile = useCallback((file: any) => {
    const newFile: DashboardFile = {
      id: file._id || file.id,
      name: file.title || file.name,
      type: file.type ? (file.type === "resume" ? "Resume" : "Cover Letter") : "Resume",
      updatedAt: new Date(file.updatedAt || Date.now()).toLocaleDateString(),
      template: file.templateId || file.template || "modern",
      status: file.status || "DRAFT",
      data: file,
    };
    setFiles(prev => [newFile, ...prev]);
    setActiveFileId(newFile.id);
  }, []);

  const refreshFiles = async () => {
    await loadFiles();
  };

  const activeFile = files.find((f) => f.id === activeFileId) || (files.length > 0 ? files[0] : null);

  // loading is true if auth is initializing OR if we are doing our initial data fetch
  const isLoading = authLoading || (isDataFetching && files.length === 0);

  return (
    <DashboardFileContext.Provider
      value={{
        files,
        activeFile,
        setActiveFile: (id) => setActiveFileId(id),
        loadFiles,
        createFile,
        deleteFile,
        addFile,
        refreshFiles,
        isLoading
      }}
    >
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
