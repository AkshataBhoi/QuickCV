import { ResumeData } from "@/lib/types";

interface TemplateProps {
    data: ResumeData;
}

export const SimpleMinimal = ({ data }: TemplateProps) => {
    return (
        <div className="max-w-[90%] mx-auto font-sans text-black">
            <header className="mb-6">
                <h1 className="text-3xl font-light tracking-tight text-emerald-900 mb-2">
                    {data.fullName || "Your Name"}
                </h1>
                <div className="text-[10px] font-medium text-emerald-800 flex flex-wrap gap-x-4 gap-y-1">
                    {data.location && <span>{data.location}</span>}
                    {data.email && <span>{data.email}</span>}
                    {data.phone && <span>{data.phone}</span>}
                    {data.linkedin && <span>LinkedIn: {data.linkedin}</span>}
                    {data.github && <span>GitHub: {data.github}</span>}
                </div>
            </header>

            <div className="space-y-6">
                {data.summary && (
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                            Profile
                        </h3>
                        <p className="text-xs text-gray-800 leading-relaxed max-w-2xl">
                            {data.summary}
                        </p>
                    </section>
                )}

                {data.experience && data.experience.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                            Work Experience
                        </h3>
                        <div className="space-y-5">
                            {data.experience.map((exp) => (
                                <div key={exp.id} className="grid grid-cols-[1fr_3fr] gap-4">
                                    <div>
                                        <div className="font-semibold text-sm text-emerald-900">
                                            {exp.company}
                                        </div>
                                        <div className="text-[10px] text-gray-500 mt-1">
                                            {exp.dates}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm text-gray-900 mb-1">
                                            {exp.role}
                                        </div>
                                        <p className="text-xs text-gray-700 leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.education && data.education.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                            Education
                        </h3>
                        <div className="space-y-3">
                            {data.education.map((edu) => (
                                <div key={edu.id} className="grid grid-cols-[1fr_3fr] gap-4">
                                    <div className="text-[10px] text-gray-500 pt-0.5">
                                        {edu.dates}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm text-emerald-900">
                                            {edu.school}
                                        </div>
                                        <div className="text-xs text-gray-700">
                                            {edu.degree}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.skills && data.skills.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                            Technical Skills
                        </h3>
                        <div className="text-[10px] text-gray-800 leading-relaxed font-medium">
                            {data.skills.join(", ")}
                        </div>
                    </section>
                )}

                {data.certifications && data.certifications.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                            Certifications
                        </h3>
                        <div className="space-y-2">
                            {data.certifications.map((cert) => (
                                <div key={cert.id} className="grid grid-cols-[1fr_3fr] gap-4">
                                    <div className="text-[10px] text-gray-500">
                                        {cert.date}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-xs text-emerald-900">
                                            {cert.name}
                                        </div>
                                        <div className="text-[10px] text-gray-700">
                                            {cert.issuer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.languages && data.languages.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                            Languages
                        </h3>
                        <div className="text-[10px] text-gray-800 leading-relaxed font-medium">
                            {data.languages
                                .map((lang) => `${lang.language} (${lang.level})`)
                                .join(", ")}
                        </div>
                    </section>
                )}

                {data.projects && data.projects.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                            Projects
                        </h3>
                        <div className="space-y-4">
                            {data.projects.map((proj) => (
                                <div key={proj.id}>
                                    <div className="flex justify-between items-baseline">
                                        <div className="font-semibold text-sm text-emerald-900">
                                            {proj.title}
                                        </div>
                                        <div className="text-[10px] text-emerald-600 font-mono">
                                            {proj.tech}
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-700 leading-relaxed mt-1">
                                        {proj.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
