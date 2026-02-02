import { ResumeData } from "@/lib/types";
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon, Github } from "lucide-react";

interface TemplateProps {
    data: ResumeData;
}

export const CreativeDesigner = ({ data }: TemplateProps) => {
    return (
        <div className="grid grid-cols-[35%_65%] h-full font-sans text-slate-800">
            {/* Left Sidebar */}
            <div className="bg-purple-50 p-6 border-r-4 border-purple-200 min-h-[297mm]">
                <div className="space-y-8 mt-[5mm]">
                    {/* Contact Info */}
                    <div className="text-xs space-y-3">
                        <h3 className="text-purple-600 font-bold uppercase tracking-wider border-b border-purple-200 pb-1 mb-2">Contact</h3>
                        {data.email && <div className="flex items-center gap-2 break-all"><Mail className="w-3 h-3 text-purple-500" /> {data.email}</div>}
                        {data.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-purple-500" /> {data.phone}</div>}
                        {data.location && <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-purple-500" /> {data.location}</div>}
                        {data.linkedin && <div className="flex items-center gap-2"><Linkedin className="w-3 h-3 text-purple-500" /> {data.linkedin}</div>}
                        {data.portfolio && <div className="flex items-center gap-2"><LinkIcon className="w-3 h-3 text-purple-500" /> {data.portfolio}</div>}
                    </div>

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <div>
                            <h3 className="text-purple-600 font-bold uppercase tracking-wider border-b border-purple-200 pb-1 mb-3">Education</h3>
                            <div className="space-y-4 text-xs">
                                {data.education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="font-bold">{edu.school}</div>
                                        <div className="text-purple-600">{edu.degree}</div>
                                        <div className="text-slate-500">{edu.dates}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                        <div>
                            <h3 className="text-purple-600 font-bold uppercase tracking-wider border-b border-purple-200 pb-1 mb-3">Languages</h3>
                            <div className="space-y-2 text-xs">
                                {data.languages.map((lang) => (
                                    <div key={lang.id} className="flex justify-between">
                                        <span className="font-medium">{lang.language}</span>
                                        <span className="text-slate-500">{lang.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Content */}
            <div className="p-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2">{data.fullName || "Your Name"}</h1>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-pink-100 text-pink-600 text-[10px] font-bold rounded-full uppercase tracking-wide">
                                {skill}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Summary */}
                {data.summary && (
                    <div className="mb-6">
                        <p className="text-sm leading-relaxed text-slate-600 border-l-4 border-purple-400 pl-4 py-1 bg-purple-50/50 rounded-r">
                            {data.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                            Work Experience
                        </h2>
                        <div className="space-y-6">
                            {data.experience.map((exp) => (
                                <div key={exp.id} className="group">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-purple-600 transition-colors">{exp.role}</h3>
                                        <span className="text-xs font-bold text-slate-400">{exp.dates}</span>
                                    </div>
                                    <div className="text-sm font-medium text-pink-500 mb-2">{exp.company}</div>
                                    <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {data.projects && data.projects.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                            Featured Projects
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                            {data.projects.map((proj) => (
                                <div key={proj.id} className="border border-slate-100 p-3 rounded-lg hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-sm">{proj.title}</h3>
                                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-mono">{proj.tech}</span>
                                    </div>
                                    <p className="text-xs text-slate-600">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
