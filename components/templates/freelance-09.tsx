import { ResumeData } from "@/lib/types";
import { Mail, Phone, Link as LinkIcon, Globe, ArrowUpRight } from "lucide-react";

interface TemplateProps {
    data: ResumeData;
}

export const FreelancerPortfolio = ({ data }: TemplateProps) => {
    return (
        <div className="grid grid-cols-[1fr_2fr] h-full font-sans">
            {/* Left - Info & Skills */}
            <div className="bg-stone-100 p-6 min-h-[297mm] border-r border-stone-200">
                <div className="mb-8">
                    <div className="w-20 h-20 bg-stone-800 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
                        {data.fullName?.substring(0, 1) || "Fl"}
                    </div>
                    <h1 className="text-2xl font-bold text-stone-900 leading-tight mb-2">{data.fullName || "Your Name"}</h1>
                    <p className="text-sm text-stone-500 font-medium italic">Freelance Specialist</p>
                </div>

                <div className="space-y-3 text-xs mb-8">
                    {data.email && <div className="flex items-center gap-2 font-medium text-stone-700"><Mail className="w-3 h-3" /> {data.email}</div>}
                    {data.portfolio && <div className="flex items-center gap-2 font-medium text-stone-700 underline"><LinkIcon className="w-3 h-3" /> {data.portfolio}</div>}
                    {data.location && <div className="flex items-center gap-2 font-medium text-stone-700"><Globe className="w-3 h-3" /> {data.location}</div>}
                </div>

                {data.skills.length > 0 && (
                    <div className="mb-8">
                        <h3 className="font-bold uppercase tracking-widest text-stone-400 text-xs mb-3 border-b border-stone-300 pb-1">Services / Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map(skill => (
                                <span key={skill} className="px-2 py-1 bg-white border border-stone-300 text-stone-600 text-xs font-semibold rounded shadow-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {data.education && data.education.length > 0 && (
                    <div>
                        <h3 className="font-bold uppercase tracking-widest text-stone-400 text-xs mb-3 border-b border-stone-300 pb-1">Education</h3>
                        <div className="space-y-3 text-xs">
                            {data.education.map(edu => (
                                <div key={edu.id}>
                                    <div className="font-bold text-stone-800">{edu.school}</div>
                                    <div className="text-stone-500">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right - Portfolio & Work */}
            <div className="p-8">
                {data.summary && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-stone-800 mb-3 flex items-center gap-2">About Me</h2>
                        <p className="text-sm text-stone-600 leading-relaxed font-medium">{data.summary}</p>
                    </div>
                )}

                {/* Projects Highlight (Portfolio) */}
                {data.projects && data.projects.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center justify-between">
                            <span>Portfolio Highlights</span>
                            <span className="text-xs font-normal bg-stone-800 text-white px-2 py-1 rounded">Selected Works</span>
                        </h2>
                        <div className="space-y-4">
                            {data.projects.map(proj => (
                                <div key={proj.id} className="relative group p-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-stone-900">{proj.title}</h3>
                                        <ArrowUpRight className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <p className="text-sm text-stone-600 mb-3">{proj.description}</p>
                                    <div className="text-xs font-mono text-orange-600 font-bold">{proj.tech}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Client History (Experience) */}
                {data.experience && data.experience.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold text-stone-800 mb-4">Client History</h2>
                        <div className="space-y-4 border-l-2 border-stone-200 pl-4">
                            {data.experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div className="font-bold text-stone-900">{exp.role}</div>
                                        <div className="text-xs font-medium text-stone-500">{exp.dates}</div>
                                    </div>
                                    <div className="text-sm text-orange-600 font-medium mb-1">{exp.company}</div>
                                    <p className="text-xs text-stone-600">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
