import { ResumeData } from "@/lib/types";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface TemplateProps {
    data: ResumeData;
}

export const ExecutiveLeadership = ({ data }: TemplateProps) => {
    return (
        <div className="p-10 font-serif text-slate-900 max-w-[95%] mx-auto bg-white">
            {/* Header - Centered & Authoritative */}
            <header className="text-center border-b-4 border-slate-900 pb-6 mb-8">
                <h1 className="text-5xl font-bold uppercase tracking-tight text-slate-900 mb-4">{data.fullName || "Your Name"}</h1>
                <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-600">
                    {data.email && <span>{data.email}</span>}
                    {data.phone && <span>{data.phone}</span>}
                    {data.location && <span>{data.location}</span>}
                    {data.linkedin && <span>{data.linkedin}</span>}
                </div>
            </header>

            {/* Summary */}
            {data.summary && (
                <section className="mb-8 text-center max-w-3xl mx-auto">
                    <h2 className="sr-only">Executive Summary</h2>
                    <p className="text-base leading-relaxed italic text-slate-700">"{data.summary}"</p>
                </section>
            )}

            {/* Core Competencies (Skills) */}
            {data.skills.length > 0 && (
                <section className="mb-8 border-y-2 border-slate-100 py-4">
                    <h3 className="text-center text-xs font-bold uppercase tracking-[0.2em] mb-3 text-slate-500">Core Competencies</h3>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                        {data.skills.map(skill => (
                            <span key={skill} className="text-sm font-semibold text-slate-800">{skill}</span>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase border-b border-slate-300 mb-6 pb-2">Professional Experience</h2>
                    <div className="space-y-8">
                        {data.experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                                    <span className="text-sm font-bold text-slate-600">{exp.dates}</span>
                                </div>
                                <div className="text-lg font-medium text-slate-700 mb-3">{exp.company}</div>
                                <p className="text-sm leading-relaxed text-slate-700 text-justify">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-2 gap-10">
                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-2">Education</h2>
                        <div className="space-y-4">
                            {data.education.map(edu => (
                                <div key={edu.id}>
                                    <div className="font-bold text-base">{edu.school}</div>
                                    <div className="text-sm text-slate-600">{edu.degree}</div>
                                    <div className="text-sm text-slate-500 italic">{edu.dates}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications or Projects */}
                {(data.certifications?.length > 0 || data.projects?.length > 0) && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-2">Additional Credentials</h2>
                        <div className="space-y-3">
                            {data.certifications?.map(cert => (
                                <div key={cert.id} className="text-sm">
                                    <div className="font-bold">{cert.name}</div>
                                    <div className="text-slate-600">{cert.issuer}, {cert.date}</div>
                                </div>
                            ))}
                            {data.projects?.map(proj => (
                                <div key={proj.id} className="text-sm mt-2">
                                    <div className="font-bold">{proj.title} <span className="text-slate-400 font-normal text-xs">- {proj.tech}</span></div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
