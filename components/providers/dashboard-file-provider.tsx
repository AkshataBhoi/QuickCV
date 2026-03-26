"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/lib/api/client";

export interface DashboardFile {
  id: string;
  name: string;
  type: "Resume" | "Cover Letter" | "ATS Report" | "ATS Scan";
  updatedAt: string;
  template?: string;
  status?: string;
  source?: "generated" | "uploaded";
  url?: string;
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

  const loadFiles = useCallback(async () => {
    if (!user) return;

    setIsDataFetching(true);
    try {
      const response = await apiClient.get('/api/files');
      const { data } = response;

      // Map backend _id to id for internal compatibility
      const apiFiles: DashboardFile[] = (data.data || []).map((r: any) => ({
        id: r._id,
        name: r.title,
        type: r.type === "resume" ? "Resume" : (r.type === "cover-letter" ? "Cover Letter" : "Resume"),
        updatedAt: new Date(r.updatedAt).toLocaleDateString(),
        template: r.templateId || "modern",
        status: r.status || "DRAFT",
        source: r.source || "generated",
        url: r.url,
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
    } catch (error) {
      console.error("DashboardFileProvider: Failed to load files:", error);
    } finally {
      setIsDataFetching(false);
    }
  }, [user, activeFileId]);

  useEffect(() => {
    // Only fetch when auth has finished initializing and a user is present
    if (!authLoading && user) {
      loadFiles();
    }
  }, [user, authLoading]);

  const createFile = async (fileData: any) => {
    try {
      const response = await apiClient.post('/api/files', fileData);

      if (response.status === 200 || response.status === 201) {
        await loadFiles();
      }
    } catch (error) {
      console.error("DashboardFileProvider: Failed to create file:", error);
    }
  };

  const deleteFile = async (id: string) => {
    try {
      const response = await apiClient.delete(`/api/files/${id}`);

      if (response.status === 200) {
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
      type: file.type === "resume" ? "Resume" : (file.type === "cover-letter" ? "Cover Letter" : "Resume"),
      updatedAt: new Date(file.updatedAt || Date.now()).toLocaleDateString(),
      template: file.templateId || file.template || "modern",
      status: file.status || "DRAFT",
      source: file.source || "generated",
      url: file.url,
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
