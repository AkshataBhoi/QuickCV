import { ResumeData } from "@/lib/types";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface TemplateProps {
    data: ResumeData;
}

export const AcademicResearch = ({ data }: TemplateProps) => {
    return (
        <div className="font-serif text-black p-8 max-w-full mx-auto leading-relaxed">
            {/* Header - Simple & Formal */}
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">{data.fullName || "Your Name"}</h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                    {data.location && <span>{data.location}</span>}
                    {data.email && <span>{data.email}</span>}
                    {data.phone && <span>{data.phone}</span>}
                    {data.linkedin && <span>{data.linkedin}</span>}
                </div>
            </header>

            {/* Education First for Academic */}
            {data.education && data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Education</h2>
                    <div className="space-y-3">
                        {data.education.map(edu => (
                            <div key={edu.id} className="grid grid-cols-[1fr_auto] gap-4">
                                <div>
                                    <div className="font-bold">{edu.school}</div>
                                    <div className="italic">{edu.degree}</div>
                                </div>
                                <div className="text-right">{edu.dates}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Research / Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Professional & Research Experience</h2>
                    <div className="space-y-4">
                        {data.experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between font-bold">
                                    <span>{exp.company}</span>
                                    <span>{exp.dates}</span>
                                </div>
                                <div className="italic mb-1">{exp.role}</div>
                                <p className="text-sm text-justify">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects as Publications/Research */}
            {data.projects && data.projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Key Projects</h2>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                        {data.projects.map(proj => (
                            <li key={proj.id}>
                                <span className="font-bold">{proj.title}</span>: <span>{proj.description}</span> <span className="italic">({proj.tech})</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Skills</h2>
                    <p className="text-sm">{data.skills.join(", ")}</p>
                </section>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Languages</h2>
                    <p className="text-sm">{data.languages.map(l => `${l.language} (${l.level})`).join("; ")}</p>
                </section>
            )}
        </div>
    );
};
