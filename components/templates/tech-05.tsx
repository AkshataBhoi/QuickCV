import { ResumeData } from "@/lib/types";
import { Mail, Phone, MapPin, Linkedin, Github, Code } from "lucide-react";

interface TemplateProps {
    data: ResumeData;
}

export const TechFaang = ({ data }: TemplateProps) => {
    return (
        <div className="grid grid-cols-[28%_72%] h-full font-mono text-sm bg-slate-50">
            {/* Dark Sidebar */}
            <div className="bg-slate-800 text-slate-300 p-5 min-h-[297mm] text-xs">
                <div className="mb-8 text-center">
                    {/* Initials Avatar Placeholder */}
                    <div className="w-16 h-16 mx-auto bg-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                        {data.fullName ? data.fullName.split(' ').map(n => n[0]).join('').substring(0, 2) : "ME"}
                    </div>
                    <h2 className="text-white font-bold text-sm tracking-widest uppercase mb-1">Contact</h2>
                    <div className="w-8 h-0.5 bg-cyan-500 mx-auto mb-4"></div>

                    <div className="space-y-3 text-left">
                        {data.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-cyan-400" /> {data.email}</div>}
                        {data.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-cyan-400" /> {data.phone}</div>}
                        {data.github && <div className="flex items-center gap-2"><Github className="w-3 h-3 text-cyan-400" /> {data.github}</div>}
                        {data.linkedin && <div className="flex items-center gap-2"><Linkedin className="w-3 h-3 text-cyan-400" /> {data.linkedin}</div>}
                        {data.location && <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-cyan-400" /> {data.location}</div>}
                    </div>
                </div>

                {data.skills.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-white font-bold tracking-widest uppercase mb-2">Skills</h2>
                        <div className="w-8 h-0.5 bg-cyan-500 mb-4"></div>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map(s => (
                                <span key={s} className="bg-slate-700 text-cyan-300 px-2 py-1 rounded text-[10px] border border-slate-600">
                                    {`<${s} />`}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {data.education && data.education.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-white font-bold tracking-widest uppercase mb-2">Education</h2>
                        <div className="w-8 h-0.5 bg-cyan-500 mb-4"></div>
                        <div className="space-y-4">
                            {data.education.map(edu => (
                                <div key={edu.id}>
                                    <div className="text-white font-bold">{edu.school}</div>
                                    <div className="text-cyan-400">{edu.degree}</div>
                                    <div className="italic opacity-70">{edu.dates}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="p-8 bg-white">
                <header className="mb-8 border-b-2 border-slate-200 pb-4">
                    <h1 className="text-4xl font-bold text-slate-800 tracking-tighter mb-2">{data.fullName || "Your Name"}</h1>
                    <p className="text-slate-500 max-w-xl leading-relaxed">{data.summary}</p>
                </header>

                {data.experience && data.experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Code className="w-5 h-5 text-cyan-600" /> Experience
                        </h2>
                        <div className="space-y-6">
                            {data.experience.map(exp => (
                                <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-cyan-500"></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-slate-900">{exp.role}</h3>
                                        <span className="text-xs font-bold text-slate-400 font-sans bg-slate-100 px-2 py-0.5 rounded">{exp.dates}</span>
                                    </div>
                                    <div className="text-cyan-700 font-semibold mb-2">{exp.company}</div>
                                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.projects && data.projects.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Github className="w-5 h-5 text-cyan-600" /> Projects
                        </h2>
                        <div className="space-y-4">
                            {data.projects.map(proj => (
                                <div key={proj.id} className="bg-slate-50 p-4 rounded border border-slate-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold text-slate-800">{proj.title}</h3>
                                        <span className="text-[10px] text-cyan-600 font-bold border border-cyan-200 px-2 py-0.5 rounded bg-cyan-50">{proj.tech}</span>
                                    </div>
                                    <p className="text-xs text-slate-600 font-sans">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
