import { ResumeData } from "@/lib/types";
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon, Github } from "lucide-react";

interface TemplateProps {
    data: ResumeData;
}

export const ClassicCorporate = ({ data }: TemplateProps) => {
    return (
        <div className="space-y-6 font-serif text-black">
            <header className="border-b-2 border-slate-800 pb-4 text-center">
                <h1 className="text-4xl font-bold uppercase tracking-widest text-slate-900">
                    {data.fullName || "Your Name"}
                </h1>
                <div className="flex flex-wrap justify-center gap-4 text-[10px] mt-3 text-slate-600">
                    {data.email && (
                        <span className="flex items-center gap-1">
                            <Mail className="h-2.5 w-2.5" /> {data.email}
                        </span>
                    )}
                    {data.phone && (
                        <span className="flex items-center gap-1">
                            <Phone className="h-2.5 w-2.5" /> {data.phone}
                        </span>
                    )}
                    {data.location && (
                        <span className="flex items-center gap-1">
                            <MapPin className="h-2.5 w-2.5" /> {data.location}
                        </span>
                    )}
                    {data.linkedin && (
                        <span className="flex items-center gap-1">
                            <Linkedin className="h-2.5 w-2.5" /> {data.linkedin}
                        </span>
                    )}
                    {data.github && (
                        <span className="flex items-center gap-1">
                            <Github className="h-2.5 w-2.5" /> {data.github}
                        </span>
                    )}
                    {data.portfolio && (
                        <span className="flex items-center gap-1">
                            <LinkIcon className="h-2.5 w-2.5" /> {data.portfolio}
                        </span>
                    )}
                </div>
            </header>

            {data.summary && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-3 pb-1">
                        Professional Summary
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-700">
                        {data.summary}
                    </p>
                </section>
            )}

            {data.experience && data.experience.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-3 pb-1">
                        Experience
                    </h2>
                    <div className="space-y-4">
                        {data.experience.map((exp: any) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline font-bold text-slate-800">
                                    <span>{exp.company}</span>
                                    <span className="text-sm font-medium">{exp.dates}</span>
                                </div>
                                <div className="text-sm italic text-slate-600 mb-1">
                                    {exp.role}
                                </div>
                                <p className="text-sm leading-relaxed text-slate-700">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.education && data.education.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-3 pb-1">
                        Education
                    </h2>
                    <div className="space-y-2">
                        {data.education.map((edu: any) => (
                            <div key={edu.id ?? edu._id}>
                                <div className="flex justify-between font-bold text-slate-800">
                                    <span>{edu.school}</span>
                                    <span className="text-sm font-medium">{edu.dates}</span>
                                </div>
                                <div className="text-sm text-slate-600">{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.skills && data.skills.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-3 pb-1">
                        Skills
                    </h2>
                    <div className="text-sm leading-relaxed text-slate-700">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}

            {data.certifications && data.certifications.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-3 pb-1">
                        Certifications
                    </h2>
                    <div className="space-y-2">
                        {data.certifications.map((cert: any) => (
                            <div key={cert.id ?? cert._id}>
                                <div className="flex justify-between font-bold text-slate-800 text-sm">
                                    <span>{cert.name}</span>
                                    <span className="text-xs font-medium">{cert.date}</span>
                                </div>
                                <div className="text-xs text-slate-600">{cert.issuer}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.languages && data.languages.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-3 pb-1">
                        Languages
                    </h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {data.languages.map((lang: any) => (
                            <div key={lang.id ?? lang._id} className="text-sm">
                                <span className="font-bold text-slate-800">
                                    {lang.language}:
                                </span>{" "}
                                <span className="text-slate-600">{lang.level}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.projects && data.projects.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-3 pb-1">
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {data.projects.map((proj: any) => (
                            <div key={proj.id ?? proj._id}>
                                <div className="flex justify-between items-baseline font-bold text-slate-800">
                                    <span>{proj.title}</span>
                                    <span className="text-xs font-mono text-slate-500">
                                        {proj.tech}
                                    </span>
                                </div>
                                <p className="text-sm leading-relaxed text-slate-700">
                                    {proj.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
