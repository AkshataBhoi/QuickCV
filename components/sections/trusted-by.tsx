"use client";

import SlidingLogoMarquee from "@/components/ui/sliding-logo-marquee";
import { CheckCircle2 } from "lucide-react";

const companies = [
    {
        name: "Google",
        color: "#4285F4",
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-auto">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
            </svg>
        ),
    },
    {
        name: "Meta",
        color: "#0668E1",
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-auto">
                <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12z" fill="none" />
                <path d="M16.671 7.614c-1.351 0-2.529.61-3.34 1.587-.698.84-1.12 1.968-1.33 3.127-.21-1.16-.632-2.287-1.33-3.127-.811-.977-1.989-1.587-3.34-1.587C4.69 7.614 2.5 9.804 2.5 12.5c0 2.696 2.19 4.886 4.831 4.886 1.351 0 2.529-.61 3.34-1.587.698-.84 1.12-1.968 1.33-3.127.21 1.16.632 2.287 1.33 3.127.811.977 1.989 1.587 3.34 1.587 2.641 0 4.831-2.19 4.831-4.886 0-2.696-2.19-4.886-4.831-4.886zm-1.5 7.5c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-9 0c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z" />
            </svg>
        ),
    },
    {
        name: "Apple",
        color: "#FFFFFF",
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-auto">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.37-1.62 1.03.06 2.59.81 3.5 1.96-3.1 1.68-2.2 6.15.86 7.64-.58 1.52-1.89 3.42-3.81 4.25zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
        ),
    },
    {
        name: "Amazon",
        color: "#FF9900",
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-auto">
                <path d="M13.6 15.6c-.9.5-2.5.8-3.9.8-3.8 0-5.7-2.6-5.7-5.5 0-2.8 1.8-5.3 5.4-5.3 2.1 0 3.5.9 4.2 1.4l-1 1.5c-.6-.5-1.8-1.1-3.1-1.1-2.2 0-3.3 1.6-3.3 3.5 0 2 1.2 3.5 3.5 3.5.9 0 1.9-.3 2.6-.7l1.3 1.9zm5.5-5.9c0 2.2 0 4.3.1 6.4h-1.9l-.2-1.2c-.8.9-2 1.4-3.3 1.4-2 0-3.4-1.4-3.4-3.5 0-2.2 1.7-3.6 4.6-3.6.7 0 1.6.1 2.1.2v-.4c0-1.1-.8-1.8-2.3-1.8-1.1 0-2.2.4-2.9.9l-.8-1.5c1.1-.8 2.6-1.3 4.2-1.3 2.5 0 3.8 1.5 3.8 4.4zm-2.1 1.4c-.4-.1-1-.2-1.6-.2-1.6 0-2.5.7-2.5 1.9 0 1.1.7 1.8 1.8 1.8.9 0 1.8-.5 2.2-1.3.1-.2.1-.5.1-.8v-1.4z" />
            </svg>
        ),
    },
    {
        name: "Netflix",
        color: "#E50914",
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-auto">
                <path d="M16.6 24h-2.8V10.9L9.3 24H6.5V0h2.6l4.6 13.3V0h2.9v24z" />
            </svg>
        ),
    },
    {
        name: "Microsoft",
        color: "#00A4EF",
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-auto">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
            </svg>
        ),
    },
    {
        name: "Uber",
        color: "#FFFFFF",
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-auto">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.2c-3.977 0-7.2-3.223-7.2-7.2s3.223-7.2 7.2-7.2 7.2 3.223 7.2 7.2-3.223 7.2-7.2 7.2zm3.6-7.2c0 1.988-1.612 3.6-3.6 3.6s-3.6-1.612-3.6-3.6 1.612-3.6 3.6-3.6 3.6 1.612 3.6 3.6z" />
            </svg>
        ),
    },
    {
        name: "Airbnb",
        color: "#FF5A5F",
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-auto">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4s9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6zm0-16.8c-1.325 0-2.4 1.075-2.4 2.4s1.075 2.4 2.4 2.4 2.4-1.075 2.4-2.4-1.075-2.4-2.4-2.4z" />
            </svg>
        ),
    },
    {
        name: "Spotify",
        color: "#1DB954",
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-auto">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.32-1.32 9.779-.6 13.5 1.56.42.24.6.84.241 1.261zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
        ),
    },
    {
        name: "NVIDIA",
        color: "#76B900",
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-auto">
                <path d="M21.6 10.6c-1.3 0-2.4.9-2.7 2.1-.1.5-.1 1-.1 1.5 0 2.3 1.9 4.2 4.2 4.2.4 0 .8-.1 1.2-.2l.6 1.9c-.6.3-1.2.4-1.8.4-3.4 0-6.2-2.8-6.2-6.2 0-.8.1-1.5.4-2.2l-1.9-.6c-.6 1.6-.9 3.3-.9 5.1 0 5.4 3.1 10.1 7.6 12.4l.9-2.1c-3.6-1.9-6.1-5.6-6.1-9.9 0-1.4.2-2.8.7-4.1l2.1.7c-.3.8-.4 1.7-.4 2.6 0 3.2 2.1 6 5.1 7l.8-2c-2-.7-3.5-2.6-3.5-4.8 0-.6.1-1.1.3-1.6l2.1.7c-.1.3-.2.6-.2.9 0 1.3.9 2.4 2.1 2.7l.7-1.9c-.4-.1-.8-.2-1.2-.2-1 0-1.8-.8-1.8-1.8 0-.2 0-.4.1-.6l2.1.7c0 .1.1.3.1.5 0 .6-.5 1.1-1.1 1.1-.1 0-.3 0-.4-.1l-.6 1.9c.3.1.7.2 1 .2 1.7 0 3.1-1.4 3.1-3.1 0-1.7-1.4-3.1-3.1-3.1z" />
            </svg>
        ),
    },
    {
        name: "Stripe",
        color: "#635BFF",
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-auto">
                <path d="M13.9 11.9c0-1.3-1.1-2-2.8-2-1 0-1.9.3-2.6.8l-.7-1.7c.9-.6 2.1-1 3.4-1 3.1 0 5 1.6 5 4.7v5.8h-2.6v-1.1c-.8.9-2 1.4-3.3 1.4-2.4 0-4.2-1.7-4.2-4.1 0-2.4 1.8-4.2 4.4-4.2 1.1 0 2.1.4 2.7 1.1.1-.2.2-.4.2-.6.1-.5.5-1.1.5-1.1zm-2.8 5.7c1.3 0 2.3-.9 2.6-2.1-.4-.2-.9-.3-1.4-.3-1.2 0-2 .8-2 1.8 0 .8.5 1.3 1.3 1.3z" />
            </svg>
        ),
    },
    {
        name: "Databricks",
        color: "#FF3621",
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-auto">
                <path d="M1.5 12L12 1.5 22.5 12 12 22.5 1.5 12zm2.8 0l7.7 7.7 7.7-7.7-7.7-7.7-7.7 7.7z" />
            </svg>
        ),
    },
    {
        name: "Datadog",
        color: "#632CA6",
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-auto">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S16.6 0 12 0zm0 21.8c-5.4 0-9.8-4.4-9.8-9.8S6.6 2.2 12 2.2s9.8 4.4 9.8 9.8-4.4 9.8-9.8 9.8z" />
            </svg>
        ),
    },
];

export function TrustedBy() {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#020817] to-[#0f172a] py-24">
            {/* Background Fade */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-40" />

            <div className="container relative z-10 px-4 md:px-6">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Build Resumes That Land Interviews At
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Create resumes optimized for roles at leading organizations
                    </p>
                </div>

                <div className="relative mx-auto max-w-full overflow-hidden">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-[#020817] to-transparent" />
                    <div className="absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-[#020817] to-transparent" />

                    <SlidingLogoMarquee
                        items={companies.map((company) => ({
                            id: company.name,
                            content: (
                                <div
                                    className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                                    style={{ color: company.color }}
                                >
                                    {company.logo}
                                </div>
                            ),
                        }))}
                        speed={30}
                        pauseOnHover={true}
                        blurEdges={true}
                        blurWidth="96px"
                        className="py-4"
                    />
                </div>

                <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>ATS-optimized formats</span>
                    </div>
                    <div className="hidden h-1 w-1 rounded-full bg-muted-foreground/30 sm:block" />
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>Industry-specific templates</span>
                    </div>
                    <div className="hidden h-1 w-1 rounded-full bg-muted-foreground/30 sm:block" />
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>AI-powered optimization</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
