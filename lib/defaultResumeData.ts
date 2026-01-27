import { ResumeData } from "./types";

export const DEFAULT_RESUME_DATA: ResumeData = {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary:
        "Senior Full Stack Engineer with 6+ years of experience architecting scalable cloud-native applications. Expert in React, Node.js, and AWS serverless architectures. Proven track record of improving system performance by 40% and mentoring junior developers.",
    experience: [
        {
            id: 1,
            company: "TechFlow Systems",
            role: "Senior Software Engineer",
            dates: "2021 - Present",
            description:
                "• Architected a microservices-based dashboard serving 50k+ daily users, reducing latency by 35%.\n• Led a team of 4 engineer to migrate legacy monolith to Next.js and TypeScript.\n• Implemented CI/CD pipelines using GitHub Actions, cutting deployment time by 60%.",
        },
        {
            id: 2,
            company: "Innovate Create",
            role: "Full Stack Developer",
            dates: "2018 - 2021",
            description:
                "• Developed interactive e-commerce features using React and Redux, increasing conversion rates by 15%.\n• Optimized database queries in PostgreSQL, reducing average response time from 300ms to 50ms.\n• Collaborated closely with UX designers to implement a new responsive design system.",
        },
    ],
    education: [
        {
            id: 1,
            school: "State University of New York",
            degree: "B.S. Computer Science",
            dates: "2014 - 2018",
        },
    ],
    skills: [
        "React",
        "TypeScript",
        "Next.js",
        "Node.js",
        "AWS (Lambda, S3, DynamoDB)",
        "PostgreSQL",
        "Docker",
        "Kubernetes",
        "GraphQL",
    ],
    projects: [
        {
            id: 1,
            title: "CloudScale Analytics",
            description:
                "Real-time infrastructure monitoring SaaS built with Next.js and Go.",
            tech: "Next.js, Go, WebSocket",
        },
        {
            id: 2,
            title: "DevConnect",
            description:
                "Open-source social platform for developers with over 1k stars on GitHub.",
            tech: "MERN Stack, Redis",
        },
    ],
};
