import { ResumeData } from "@/lib/types";
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon, Github } from "lucide-react";

interface TemplateProps {
    data: ResumeData;
}

export const ModernProfessional = ({ data }: TemplateProps) => {
    return (
        <div className="grid grid-cols-[30%_70%] gap-8 h-full font-sans text-sm">
            {/* Left Sidebar */}
            <div className="bg-slate-900 text-white p-6 -m-[10mm] mr-0 min-h-[297mm]">
                <div className="space-y-8 mt-[10mm]">
                    <div>
                        <h1 className="text-3xl font-bold leading-tight mb-4 text-blue-400">
                            {data.fullName || "Your Name"}
                        </h1>
                        <div className="space-y-2 text-[10px] text-slate-300">
                            {data.email && (
                                <div className="flex items-center gap-2 max-w-[150px] truncate">
                                    <Mail className="h-3 w-3 shrink-0" /> {data.email}
                                </div>
                            )}
                            {data.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone className="h-3 w-3 shrink-0" /> {data.phone}
                                </div>
                            )}
                            {data.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-3 w-3 shrink-0" /> {data.location}
                                </div>
                            )}
                            {data.linkedin && (
                                <div className="flex items-center gap-2">
                                    <Linkedin className="h-3 w-3 shrink-0" /> {data.linkedin}
                                </div>
                            )}
                            {data.github && (
                                <div className="flex items-center gap-2">
                                    <Github className="h-3 w-3 shrink-0" /> {data.github}
                                </div>
                            )}
                            {data.portfolio && (
                                <div className="flex items-center gap-2">
                                    <LinkIcon className="h-3 w-3 shrink-0" /> {data.portfolio}
                                </div>
                            )}
                        </div>
                    </div>

                    {data.skills.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 border-b border-blue-400/30 pb-1">
                                Expertise
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-2 py-1 bg-blue-500/20 text-xs rounded text-blue-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.education && data.education.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 border-b border-blue-400/30 pb-1">
                                Education
                            </h3>
                            <div className="space-y-4">
                                {data.education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="font-bold text-sm">{edu.school}</div>
                                        <div className="text-xs text-slate-400">{edu.degree}</div>
                                        <div className="text-xs text-slate-500">{edu.dates}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.languages && data.languages.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 border-b border-blue-400/30 pb-1">
                                Languages
                            </h3>
                            <div className="space-y-2">
                                {data.languages.map((lang) => (
                                    <div key={lang.id} className="text-xs">
                                        <div className="font-bold">{lang.language}</div>
                                        <div className="text-slate-400">{lang.level}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Content */}
            <div className="pt-2">
                {data.summary && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-800 mb-3 uppercase tracking-tight flex items-center gap-2">
                            <span className="w-8 h-1 bg-blue-500 block"></span> About
                        </h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {data.summary}
                        </p>
                    </div>
                )}

                {data.experience && data.experience.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 uppercase tracking-tight flex items-center gap-2">
                            <span className="w-8 h-1 bg-blue-500 block"></span> Experience
                        </h2>
                        <div className="space-y-6 border-l-2 border-blue-100 pl-6 ml-1">
                            {data.experience.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-slate-800">{exp.role}</h3>
                                        <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">
                                            {exp.dates}
                                        </span>
                                    </div>
                                    <div className="text-sm font-semibold text-slate-500 mb-2">
                                        {exp.company}
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {data.certifications && data.certifications.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-6 uppercase tracking-tight flex items-center gap-2">
                            <span className="w-8 h-1 bg-blue-500 block"></span> Certifications
                        </h2>
                        <div className="space-y-4">
                            {data.certifications.map((cert) => (
                                <div key={cert.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-slate-800">{cert.name}</h3>
                                        <span className="text-xs font-bold text-blue-500">
                                            {cert.date}
                                        </span>
                                    </div>
                                    <div className="text-xs font-semibold text-slate-500">
                                        {cert.issuer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {data.projects && data.projects.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase tracking-tight flex items-center gap-2">
                            <span className="w-8 h-1 bg-blue-500 block"></span> Projects
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            {data.projects.map((proj) => (
                                <div
                                    key={proj.id}
                                    className="bg-slate-50 p-4 rounded-lg border border-slate-100"
                                >
                                    <h3 className="font-bold text-slate-800">{proj.title}</h3>
                                    <p className="text-sm text-slate-600 mt-1 mb-2">
                                        {proj.description}
                                    </p>
                                    <div className="text-xs text-blue-500 font-mono">
                                        {proj.tech}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
