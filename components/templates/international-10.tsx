import { ResumeData } from "@/lib/types";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
}

export const InternationalFormat = ({ data }: TemplateProps) => {
  return (
    <div className="font-sans text-slate-900 max-w-[90%] mx-auto py-8">
       {/* EU/International Standard Header */}
       <header className="flex gap-6 items-start border-b-2 border-slate-800 pb-6 mb-8">
           {/* Photo Placeholder */}
           <div className="w-32 h-40 bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-400 text-xs text-center border border-slate-300">
               Passport<br/>Photo
           </div>
           
           <div className="flex-grow">
               <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">{data.fullName || "Your Name"}</h1>
               <div className="grid grid-cols-2 gap-y-1 text-sm text-slate-600">
                   {data.location && <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {data.location}</div>}
                   {data.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {data.email}</div>}
                   {data.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {data.phone}</div>}
                   {data.linkedin && <div className="flex items-center gap-2"><Globe className="w-3 h-3" /> {data.linkedin}</div>}
               </div>
           </div>
       </header>

       <div className="grid grid-cols-[2fr_1fr] gap-8">
           {/* Main Column */}
           <div className="space-y-6">
               {data.summary && (
                   <section>
                       <h2 className="text-sm font-bold uppercase bg-slate-100 px-2 py-1 mb-2">Profile</h2>
                       <p className="text-sm text-justify leading-relaxed">{data.summary}</p>
                   </section>
               )}

               {data.experience && data.experience.length > 0 && (
                   <section>
                       <h2 className="text-sm font-bold uppercase bg-slate-100 px-2 py-1 mb-4">Work Experience</h2>
                       <div className="space-y-5">
                           {data.experience.map(exp => (
                               <div key={exp.id}>
                                   <div className="flex justify-between font-bold text-sm mb-1">
                                       <span>{exp.role}</span>
                                       <span>{exp.dates}</span>
                                   </div>
                                   <div className="text-sm font-semibold text-slate-700 italic mb-1">{exp.company}</div>
                                   <ul className="list-disc ml-4 text-sm space-y-1">
                                       <li>{exp.description}</li>
                                   </ul>
                               </div>
                           ))}
                       </div>
                   </section>
               )}

               {data.projects && data.projects.length > 0 && (
                   <section>
                       <h2 className="text-sm font-bold uppercase bg-slate-100 px-2 py-1 mb-4">Projects</h2>
                       <div className="space-y-3">
                           {data.projects.map(proj => (
                               <div key={proj.id}>
                                   <div className="font-bold text-sm">{proj.title}</div>
                                   <p className="text-sm">{proj.description}</p>
                                   <div className="text-xs text-slate-500 mt-1">Stack: {proj.tech}</div>
                               </div>
                           ))}
                       </div>
                   </section>
               )}
           </div>

           {/* Side Column */}
           <div className="space-y-6">
                {data.education && data.education.length > 0 && (
                   <section>
                       <h2 className="text-sm font-bold uppercase bg-slate-100 px-2 py-1 mb-3">Education</h2>
                       <div className="space-y-3">
                           {data.education.map(edu => (
                               <div key={edu.id} className="text-sm">
                                   <div className="font-bold text-slate-700">{edu.dates}</div>
                                   <div className="font-bold">{edu.degree}</div>
                                   <div>{edu.school}</div>
                               </div>
                           ))}
                       </div>
                   </section>
               )}

               {data.skills.length > 0 && (
                   <section>
                       <h2 className="text-sm font-bold uppercase bg-slate-100 px-2 py-1 mb-3">Skills</h2>
                       <ul className="space-y-1 text-sm">
                           {data.skills.map(skill => (
                               <li key={skill} className="border-b border-slate-100 pb-1 last:border-0">{skill}</li>
                           ))}
                       </ul>
                   </section>
               )}

               {data.languages && data.languages.length > 0 && (
                   <section>
                       <h2 className="text-sm font-bold uppercase bg-slate-100 px-2 py-1 mb-3">Languages</h2>
                       <div className="space-y-2 text-sm">
                           {data.languages.map(lang => (
                               <div key={lang.id} className="flex justify-between">
                                   <span className="font-semibold">{lang.language}</span>
                                   <span className="text-slate-500">{lang.level}</span>
                               </div>
                           ))}
                       </div>
                   </section>
               )}

                {data.certifications && data.certifications.length > 0 && (
                   <section>
                       <h2 className="text-sm font-bold uppercase bg-slate-100 px-2 py-1 mb-3">Certificates</h2>
                       <div className="space-y-2 text-sm">
                           {data.certifications.map(cert => (
                               <div key={cert.id}>
                                   <div className="font-bold">{cert.name}</div>
                                   <div className="text-xs">{cert.issuer}, {cert.date}</div>
                               </div>
                           ))}
                       </div>
                   </section>
               )}
           </div>
       </div>
    </div>
  );
};
