export interface ResumeData {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    experience: { id: number; company: string; role: string; dates: string; description: string }[];
    education: { id: number; school: string; degree: string; dates: string }[];
    skills: string[];
    linkedin?: string;
    github?: string;
    portfolio?: string;
    projects: { id: number; title: string; description: string; tech: string }[];
    certifications: { id: number; name: string; issuer: string; date: string }[];
    languages: { id: number; language: string; level: string }[];
}
export interface ResumeRecord {
    id: string;
    title: string;
    template: string;
    updatedAt: string;
    status: "Draft" | "Completed";
    data?: ResumeData;
}
