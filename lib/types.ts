export interface ResumeData {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    experience: { id: number; company: string; role: string; dates: string; description: string }[];
    education: { id: number; school: string; degree: string; dates: string }[];
    skills: string[];
    projects: { id: number; title: string; description: string; tech: string }[];
}
