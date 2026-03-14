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
}

interface UserContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => Promise<void>;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  isLoading: boolean;
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
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
  }), [firebaseUser]);

  const fetchProfile = useCallback(async () => {
    if (!firebaseUser) return;
    console.log("UserProvider: Fetching profile for", firebaseUser.email || firebaseUser.uid);

    try {
      const token = await firebaseUser.getIdToken(true);
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "x-user-id": firebaseUser.uid,
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      console.log("UserProvider: GET Profile Response:", data);

      if (response.ok && data.success && data.data) {
        setUser(mapProfile(data.data));
      }
    } catch (error) {
      console.error("UserProvider: Failed to fetch profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, [firebaseUser, API_URL, mapProfile]);

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
      const token = await firebaseUser.getIdToken(true);
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-user-id": firebaseUser.uid,
        },
        body: JSON.stringify({
          firstName: updates.firstName ?? user.firstName,
          lastName: updates.lastName ?? user.lastName,
          avatarUrl: updates.avatarUrl ?? user.avatarUrl,
          location: updates.location ?? user.location,
          phone: updates.phone ?? user.phone,
          email: updates.email ?? user.email,
        }),
      });

      const data = await response.json();
      console.log("UserProvider: PUT Profile Response:", data);

      if (!response.ok) {
        console.error("Failed to update profile on backend");
        fetchProfile(); // Fallback to re-sync
      } else if (data.success && data.data) {
        // Use the returned data to update the context state immediately
        setUser(mapProfile(data.data));
      }
    } catch (error) {
      console.error("UserProvider: Failed to update profile:", error);
      fetchProfile(); // Fallback to re-sync
    }
  };

  return (
    <UserContext.Provider
      value={{ user, updateUser, settingsOpen, setSettingsOpen, isLoading }}
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
