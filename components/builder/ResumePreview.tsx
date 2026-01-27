"use client";

import { cn } from "@/lib/utils";
import { TemplateId } from "./TemplateSelector";
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon } from "lucide-react";
import { ResumeData } from "@/lib/types";

interface ResumePreviewProps {
    data: ResumeData;
    template: TemplateId;
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
    return (
        <div className=" text-black overflow-y-auto print:overflow-visible" id="resume-preview">
            {/* A4 Container Aspect Ratio */}
            <div className={cn(
                "aspect-[210/297] border min-h-[200px] mx-auto bg-transparent p-[10mm] shadow-xl print:shadow-none transition-all duration-300",
                template === "clean" && "font-serif",
                template === "modern" && "font-sans",
                template === "minimal" && "font-mono"
            )}>

                {/* === TEMPLATE: CLEAN PROFESSIONAL === */}
                {template === "clean" && (
                    <div className="space-y-6">
                        <header className="border-b-2 border-slate-800 pb-4 text-center">
                            <h1 className="text-4xl font-bold uppercase tracking-widest text-slate-900">{data.fullName || "Your Name"}</h1>
                            <div className="flex flex-wrap justify-center gap-4 text-sm mt-3 text-slate-600">
                                {data.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {data.email}</span>}
                                {data.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {data.phone}</span>}
                                {data.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {data.location}</span>}
                            </div>
                        </header>

                        {data.summary && (
                            <section>
                                <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-3 pb-1">Professional Summary</h2>
                                <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
                            </section>
                        )}

                        {data.experience.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-3 pb-1">Experience</h2>
                                <div className="space-y-4">
                                    {data.experience.map(exp => (
                                        <div key={exp.id}>
                                            <div className="flex justify-between items-baseline font-bold text-slate-800">
                                                <span>{exp.company}</span>
                                                <span className="text-sm font-medium">{exp.dates}</span>
                                            </div>
                                            <div className="text-sm italic text-slate-600 mb-1">{exp.role}</div>
                                            <p className="text-sm leading-relaxed text-slate-700">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.education.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-3 pb-1">Education</h2>
                                <div className="space-y-2">
                                    {data.education.map(edu => (
                                        <div key={edu.id}>
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

                        {data.skills.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-3 pb-1">Skills</h2>
                                <div className="text-sm leading-relaxed text-slate-700">
                                    {data.skills.join(" • ")}
                                </div>
                            </section>
                        )}
                    </div>
                )}

                {/* === TEMPLATE: MODERN GRADIENT === */}
                {template === "modern" && (
                    <div className="grid grid-cols-[30%_70%] gap-8 h-full">
                        {/* Left Sidebar */}
                        <div className="bg-slate-900 text-white p-6 -m-[10mm] mr-0 h-[calc(100%+20mm)]">
                            <div className="space-y-8 mt-[10mm]">
                                <div>
                                    <h1 className="text-3xl font-bold leading-tight mb-4 text-blue-400">{data.fullName || "Your Name"}</h1>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        {data.email && <div className="flex items-center gap-2 max-w-[150px] truncate"><Mail className="h-3 w-3 shrink-0" /> {data.email}</div>}
                                        {data.phone && <div className="flex items-center gap-2"><Phone className="h-3 w-3 shrink-0" /> {data.phone}</div>}
                                        {data.location && <div className="flex items-center gap-2"><MapPin className="h-3 w-3 shrink-0" /> {data.location}</div>}
                                    </div>
                                </div>

                                {data.skills.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 border-b border-blue-400/30 pb-1">Expertise</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {data.skills.map(skill => (
                                                <span key={skill} className="px-2 py-1 bg-blue-500/20 text-xs rounded text-blue-200">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {data.education.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 border-b border-blue-400/30 pb-1">Education</h3>
                                        <div className="space-y-4">
                                            {data.education.map(edu => (
                                                <div key={edu.id}>
                                                    <div className="font-bold text-sm">{edu.school}</div>
                                                    <div className="text-xs text-slate-400">{edu.degree}</div>
                                                    <div className="text-xs text-slate-500">{edu.dates}</div>
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
                                    <p className="text-sm text-slate-600 leading-relaxed">{data.summary}</p>
                                </div>
                            )}

                            {data.experience.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-slate-800 mb-6 uppercase tracking-tight flex items-center gap-2">
                                        <span className="w-8 h-1 bg-blue-500 block"></span> Experience
                                    </h2>
                                    <div className="space-y-6 border-l-2 border-blue-100 pl-6 ml-1">
                                        {data.experience.map(exp => (
                                            <div key={exp.id} className="relative">
                                                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <h3 className="font-bold text-lg text-slate-800">{exp.role}</h3>
                                                    <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">{exp.dates}</span>
                                                </div>
                                                <div className="text-sm font-semibold text-slate-500 mb-2">{exp.company}</div>
                                                <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {data.projects.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase tracking-tight flex items-center gap-2">
                                        <span className="w-8 h-1 bg-blue-500 block"></span> Projects
                                    </h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        {data.projects.map(proj => (
                                            <div key={proj.id} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                                <h3 className="font-bold text-slate-800">{proj.title}</h3>
                                                <p className="text-sm text-slate-600 mt-1 mb-2">{proj.description}</p>
                                                <div className="text-xs text-blue-500 font-mono">{proj.tech}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* === TEMPLATE: MINIMAL ATS === */}
                {template === "minimal" && (
                    <div className="max-w-[90%] mx-auto font-sans">
                        <header className="mb-6">
                            <h1 className="text-3xl font-light tracking-tight text-emerald-900 mb-2">{data.fullName || "Your Name"}</h1>
                            <div className="text-xs font-medium text-emerald-800 flex flex-wrap gap-x-4 gap-y-1">
                                {data.location && <span>{data.location}</span>}
                                {data.email && <span>{data.email}</span>}
                                {data.phone && <span>{data.phone}</span>}
                            </div>
                        </header>

                        <div className="space-y-6">
                            {data.summary && (
                                <section>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Profile</h3>
                                    <p className="text-xs text-gray-800 leading-relaxed max-w-2xl">{data.summary}</p>
                                </section>
                            )}

                            {data.experience.length > 0 && (
                                <section>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Work Experience</h3>
                                    <div className="space-y-5">
                                        {data.experience.map(exp => (
                                            <div key={exp.id} className="grid grid-cols-[1fr_3fr] gap-4">
                                                <div>
                                                    <div className="font-semibold text-sm text-emerald-900">{exp.company}</div>
                                                    <div className="text-[10px] text-gray-500 mt-1">{exp.dates}</div>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm text-gray-900 mb-1">{exp.role}</div>
                                                    <p className="text-xs text-gray-700 leading-relaxed">{exp.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {data.education.length > 0 && (
                                <section>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Education</h3>
                                    <div className="space-y-3">
                                        {data.education.map(edu => (
                                            <div key={edu.id} className="grid grid-cols-[1fr_3fr] gap-4">
                                                <div className="text-[10px] text-gray-500 pt-0.5">{edu.dates}</div>
                                                <div>
                                                    <div className="font-semibold text-sm text-emerald-900">{edu.school}</div>
                                                    <div className="text-xs text-gray-700">{edu.degree}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {data.skills.length > 0 && (
                                <section>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Technical Skills</h3>
                                    <div className="text-xs text-gray-800 leading-relaxed font-medium">
                                        {data.skills.join(", ")}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
