"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { TemplateId } from "@/components/builder/TemplateSelector";

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
    updateUser: (updates: Partial<UserProfile>) => void;
    settingsOpen: boolean;
    setSettingsOpen: (open: boolean) => void;
}

const DEFAULT_USER: UserProfile = {
    id: "65b8f2d5c3167f0012345678", // Example MongoDB ID
    firstName: "Alex",
    lastName: "Rivera",
    email: "arivera@example.com",
    phone: "(555) 019-2834",
    location: "New York, NY",
    preferredTemplate: "clean",
    accountType: "free"
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
    const [settingsOpen, setSettingsOpen] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem("user_profile");
        if (saved) {
            try {
                setUser(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse user profile", e);
            }
        }
    }, []);

    const updateUser = (updates: Partial<UserProfile>) => {
        setUser(prev => {
            const next = { ...prev, ...updates };
            localStorage.setItem("user_profile", JSON.stringify(next));
            return next;
        });
    };

    return (
        <UserContext.Provider value={{ user, updateUser, settingsOpen, setSettingsOpen }}>
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
