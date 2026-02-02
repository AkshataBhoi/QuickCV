import { ResumeData } from "@/lib/types";
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon, Github, Award } from "lucide-react";

interface TemplateProps {
    data: ResumeData;
}

export const FreshGraduate = ({ data }: TemplateProps) => {
    return (
        <div className="font-sans text-slate-800 p-8 min-h-[297mm]">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">{data.fullName || "Your Name"}</h1>
                <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-600 font-medium bg-slate-50 py-2 rounded-full px-6 inline-block mx-auto">
                    {data.email && <div className="flex items-center gap-1"><Mail className="w-3 h-3" /> {data.email}</div>}
                    {data.phone && <div className="flex items-center gap-1"><Phone className="w-3 h-3" /> {data.phone}</div>}
                    {data.location && <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {data.location}</div>}
                    {data.linkedin && <div className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> LinkedIn</div>}
                    {data.github && <div className="flex items-center gap-1"><Github className="w-3 h-3" /> GitHub</div>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Education - Top Priority for Grads */}
                {data.education && data.education.length > 0 && (
                    <section className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                        <h2 className="text-lg font-bold uppercase text-indigo-600 mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5" /> Education
                        </h2>
                        <div className="space-y-4">
                            {data.education.map(edu => (
                                <div key={edu.id} className="flex justify-between items-start border-b last:border-0 border-slate-200 pb-3 last:pb-0">
                                    <div>
                                        <div className="font-bold text-base text-slate-900">{edu.school}</div>
                                        <div className="text-indigo-600 font-medium">{edu.degree}</div>
                                    </div>
                                    <div className="text-right text-sm font-bold bg-white px-3 py-1 rounded shadow-sm">
                                        {edu.dates}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills - High Visibility */}
                {data.skills.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase text-slate-900 mb-3 border-l-4 border-indigo-500 pl-3">Technical Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded-md font-medium text-sm text-slate-700 shadow-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects - Vital for Grads */}
                {data.projects && data.projects.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase text-slate-900 mb-4 border-l-4 border-indigo-500 pl-3">Academic Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.projects.map(proj => (
                                <div key={proj.id} className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-slate-900">{proj.title}</h3>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-3 line-clamp-3">{proj.description}</p>
                                    <div className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded inline-block">
                                        {proj.tech}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience (Internships) */}
                {data.experience && data.experience.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase text-slate-900 mb-4 border-l-4 border-indigo-500 pl-3">Internship Experience</h2>
                        <div className="space-y-4 text-sm">
                            {data.experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between font-bold">
                                        <span>{exp.role}</span>
                                        <span className="text-slate-500">{exp.dates}</span>
                                    </div>
                                    <div className="text-indigo-600 font-medium mb-1">{exp.company}</div>
                                    <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
