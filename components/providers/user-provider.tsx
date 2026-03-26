"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { TemplateId } from "@/components/builder/TemplateSelector";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/lib/api/client";

import { toast } from "sonner";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl?: string;
  preferredTemplate: TemplateId;
  accountType: "free" | "premium";
  coverLetterCredits: number;
  resumeDownloadCredits: number;
}

interface UserContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => Promise<void>;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  isLoading: boolean;
  toast: (message: string, type?: "success" | "error" | "info", className?: string) => void;
}

const DEFAULT_USER: UserProfile = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  preferredTemplate: "clean",
  accountType: "free",
  coverLetterCredits: 0,
  resumeDownloadCredits: 1,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mapProfile = useCallback((profile: any): UserProfile => ({
    id: profile._id || firebaseUser?.uid || "",
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    email: profile.email || firebaseUser?.email || "",
    phone: profile.phone || "",
    location: profile.location || "",
    avatarUrl: profile.avatarUrl || "",
    preferredTemplate: (profile.preferredTemplate as TemplateId) || "clean",
    accountType: profile.plan === "premium" ? "premium" : "free",
    coverLetterCredits: profile.coverLetterCredits || 0,
    resumeDownloadCredits: profile.resumeDownloadCredits || 0,
  }), [firebaseUser]);

  const fetchProfile = useCallback(async () => {
    if (!firebaseUser) return;
    
    try {
      const response = await apiClient.get('/api/users/profile');
      const { data } = response;

      if (data.success && data.data) {
        setUser(mapProfile(data.data));
      }
    } catch (error) {
      console.error("UserProvider: Failed to fetch profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, [firebaseUser, mapProfile]);

  useEffect(() => {
    if (!authLoading) {
      if (firebaseUser) {
        fetchProfile();
      } else {
        // Clear user state on logout
        setUser(DEFAULT_USER);
        setIsLoading(false);
      }
    }
  }, [firebaseUser, authLoading, fetchProfile]);

  const updateUser = async (updates: Partial<UserProfile>) => {
    // Optimistic update
    setUser((prev) => ({ ...prev, ...updates }));

    if (!firebaseUser) return;

    try {
      const response = await apiClient.put('/api/users/profile', {
        firstName: updates.firstName ?? user.firstName,
        lastName: updates.lastName ?? user.lastName,
        avatarUrl: updates.avatarUrl ?? user.avatarUrl,
        location: updates.location ?? user.location,
        phone: updates.phone ?? user.phone,
        email: updates.email ?? user.email,
        preferredTemplate: updates.preferredTemplate ?? user.preferredTemplate,
      });

      const { data } = response;

      if (data.success && data.data) {
        // Use the returned data to update the context state immediately
        setUser(mapProfile(data.data));
        toast.success("Profile updated successfully");
      } else {
        console.error("Failed to update profile on backend");
        fetchProfile(); // Fallback to re-sync
      }
    } catch (error) {
      console.error("UserProvider: Failed to update profile:", error);
      toast.error("Failed to update profile.");
      fetchProfile(); // Fallback to re-sync
    }
  };

  const displayToast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else toast(message);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        settingsOpen,
        setSettingsOpen,
        isLoading: isLoading || authLoading,
        toast: displayToast,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
