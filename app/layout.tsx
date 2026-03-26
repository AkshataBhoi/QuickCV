import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { UserProvider } from "@/components/providers/user-provider";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["300", "400", "500", "600", "700", "800"],
    display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "QuickCV",
    template: "%s | QuickCV"
  },
  description:
    "QuickCV is an AI-powered resume builder to create ATS-friendly resumes in minutes. Fast, modern, and developer-focused.",

  metadataBase: new URL("https://quick-cv-xi.vercel.app/"), // update when domain ready

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quick-cv-xi.vercel.app/",
    title: "QuickCV - AI Resume Builder",
    description:
      "Build ATS-optimized resumes instantly with QuickCV. Fast, clean, and professional.",
    siteName: "QuickCV",
  },

  twitter: {
    card: "summary_large_image",
    title: "QuickCV - AI Resume Builder",
    description:
      "Create job-winning resumes with AI in seconds using QuickCV.",
  },

  keywords: [
    "QuickCV",
    "AI resume builder",
    "ATS resume",
    "resume builder India",
    "developer resume",
    "free resume builder",
  ],

  authors: [{ name: "QuickCV" }],
  creator: "QuickCV",

  alternates: {
    canonical: "https://quick-cv-xi.vercel.app/",
  },

  manifest: "/manifest.webmanifest",

  icons: {
  icon: "/favicon.ico",
  shortcut: "/favicon.ico",
  apple: "/logo.png",
},
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
                    <AuthProvider>
                        <UserProvider>
                            <ModalProvider>
                                {children}
                            </ModalProvider>
                            <Toaster />
                        </UserProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
