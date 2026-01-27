export interface MockFile {
    id: string;
    name: string;
    type: "Resume" | "Cover Letter" | "ATS Report";
    updatedAt: string;
    template?: "clean" | "modern" | "minimal";
    data: any;
}

export const MOCK_FILES: MockFile[] = [
    {
        id: "file-1",
        name: "Software Engineer Resume",
        type: "Resume",
        updatedAt: "2h ago",
        template: "modern",
        data: {
            fullName: "Alex Rivera",
            email: "arivera@example.com",
            phone: "+1 (555) 123-4567",
            location: "San Francisco, CA",
            summary: "Creative Full Stack Engineer with 5 years of experience building scalable web applications. Passionate about UI/UX and performance optimization.",
            experience: [
                {
                    id: 1,
                    company: "TechNova Inc.",
                    role: "Senior Frontend Developer",
                    dates: "2021 - Present",
                    description: "Led the migration of the core product dashboard to Next.js, improving load times by 40%. Mentored 3 junior developers."
                },
                {
                    id: 2,
                    company: "Creative Studio",
                    role: "Web Developer",
                    dates: "2018 - 2021",
                    description: "Developed interactive marketing sites for Fortune 500 clients using React and GSAP."
                }
            ],
            education: [
                { id: 1, school: "University of California, Berkeley", degree: "B.S. Computer Science", dates: "2014 - 2018" }
            ],
            skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "GraphQL"],
            projects: [
                { id: 1, title: "E-Commerce Platform", description: "Headless Shopify storefront with Next.js.", tech: "Next.js, Shopify API" }
            ]
        }
    },
    {
        id: "file-2",
        name: "Spotify Cover Letter",
        type: "Cover Letter",
        updatedAt: "1d ago",
        template: "minimal",
        data: {
            fullName: "Alex Rivera",
            email: "arivera@example.com",
            phone: "+1 (555) 123-4567",
            city: "San Francisco, CA",
            role: "Frontend Engineer",
            company: "Spotify",
            hiringManager: "Hiring Team",
            body: "I am writing to express my strong interest in the Frontend Engineer position at Spotify. As a music enthusiast and a developer who admires Spotify's engineering culture, I would be thrilled to contribute to your team..."
        }
    },
    {
        id: "file-3",
        name: "Backend Resume Draft",
        type: "Resume",
        updatedAt: "3d ago",
        template: "clean",
        data: {
            fullName: "Alex Rivera",
            email: "arivera@example.com",
            summary: "Backend-focused role seeking...",
            experience: [],
            education: [],
            skills: ["Go", "Rust", "Kubernetes"],
            projects: []
        }
    },
    {
        id: "file-4",
        name: "Q4 ATS Analysis",
        type: "ATS Report",
        updatedAt: "5d ago",
        data: {
            score: 72,
            missingKeywords: ["Docker", "Kubernetes", "AWS"],
            grammarIssues: 3
        }
    }
];
