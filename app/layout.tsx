import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";


import { UserProvider } from "@/components/providers/user-provider";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["300", "400", "500", "600", "700", "800"],
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: "QuickCV ",
        template: "%s | ResuStack AI"
    },
    description: "The free AI resume builder software engineers actually use to get interviews. ATS-optimized, developer-focused, and completely free.",
    metadataBase: new URL('https://resustack.ai'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://resustack.ai',
        title: "ResuStack AI - Free AI Resume Builder",
        description: "Build a developer-optimized resume in minutes. Free, ATS-friendly, and powered by AI.",
        siteName: 'ResuStack AI',
    },
    twitter: {
        card: 'summary_large_image',
        title: "ResuStack AI - Free AI Resume Builder",
        description: "The free AI resume builder software engineers actually use to get interviews.",
    },

    keywords: ["resume builder", "ai resume", "ats friendly resume", "software engineer resume", "developer resume", "free resume builder"],
    authors: [{ name: "ResuStack AI" }],
    creator: "ResuStack AI",
    alternates: {
        canonical: 'https://resustack.ai',
    },
    manifest: '/manifest.webmanifest',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    // Removed maximumScale and userScalable to allow zooming for accessibility
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    ],
};



// ... existing imports

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
            <body className={cn(poppins.variable, "min-h-screen bg-background font-sans antialiased")} style={poppins.style}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    forcedTheme="dark"
                    disableTransitionOnChange
                >
                    <UserProvider>
                        <ModalProvider>
                            {children}
                        </ModalProvider>
                    </UserProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
