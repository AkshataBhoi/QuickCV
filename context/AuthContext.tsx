"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
    User,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";
import { getAuthInstance } from "@/lib/firebase";

const auth = getAuthInstance();

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    signup: (name: string, email: string, pass: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set persistence to local (survives tab closing)
        const initAuth = async () => {
            try {
                await setPersistence(auth, browserLocalPersistence);
            } catch (err) {
                console.error("Auth persistence error:", err);
            }
        };
        initAuth();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = async (email: string, pass: string) => {
        try {
            const trimmedEmail = email.trim();
            // Ensure any existing session is cleared before new login
            if (auth.currentUser) {
                await signOut(auth);
            }
            // Note: 400 (Bad Request) is the standard response for invalid sign-ins.
            await signInWithEmailAndPassword(auth, trimmedEmail, pass);
        } catch (error: any) {
            console.error("Login Error Code:", error.code);
            console.error("Login Error Message:", error.message);

            switch (error.code) {
                case 'auth/invalid-credential':
                    console.error("Invalid credentials. Please verify your email and password.");
                    break;
                case 'auth/user-not-found':
                    console.error("Account not found. Please sign up.");
                    break;
                case 'auth/wrong-password':
                    console.error("Incorrect password.");
                    break;
                case 'auth/invalid-email':
                    console.error("Malformed email address.");
                    break;
                default:
                    console.error("Login failed:", error.message);
            }
            throw error; // Rethrow so the UI can display the error
        }
    };

    const signup = async (name: string, email: string, pass: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            await updateProfile(userCredential.user, { displayName: name });
        } catch (error: any) {
            console.error("Signup Error:", error.code, error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error: any) {
            console.error("Logout Error:", error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
