
export const ResumeTemplate2 = () => (
    <div className="absolute inset-0 bg-white p-6 text-slate-800 font-sans text-xs leading-relaxed overflow-hidden grid grid-cols-[1fr_2fr] gap-6">

        {/* Left Column */}
        <div className="border-r border-slate-200 pr-4">
            <h3 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tighter mb-1">Priya<br />Patel</h3>
            <p className="text-[10px] font-bold text-primary mb-4 uppercase tracking-widest">UX Engineer</p>

            <div className="space-y-4">
                <div>
                    <h3 className="text-[9px] font-bold uppercase text-slate-400 mb-2 tracking-wider">Contact</h3>
                    <div className="text-[9px] space-y-1 text-slate-600 font-medium">
                        <p>priya.p@design.io</p>
                        <p>+1 (415) 555-0922</p>
                        <p>San Francisco, CA</p>
                        <p>priyapatel.design</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-[9px] font-bold uppercase text-slate-400 mb-2 tracking-wider">Skills</h3>
                    <div className="flex flex-wrap gap-1">
                        {["Figma", "React", "TypeScript", "Tailwind", "Motion Design", "Storybook", "User Research"].map(skill => (
                            <span key={skill} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[8px] rounded-sm font-medium">{skill}</span>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-[9px] font-bold uppercase text-slate-400 mb-2 tracking-wider">Education</h3>
                    <div className="text-[9px] text-slate-600">
                        <p className="font-bold text-slate-800">UC Berkeley</p>
                        <p>B.A. CogSci, 2020</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column */}
        <div>
            {/* Profile */}
            <div className="mb-5">
                <p className="text-[9px] text-slate-600 leading-relaxed">
                    Creative Technologist with a passion for bridging the gap between design and engineering. Expert in building design systems and performant, accessible web interfaces.
                </p>
            </div>

            {/* Experience */}
            <div>
                <h2 className="text-[10px] font-bold text-slate-900 uppercase border-b border-slate-200 pb-1 mb-3">Work Experience</h2>

                <div className="mb-4">
                    <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-[10px]">Stripe</span>
                        <span className="text-[9px] text-slate-500 font-medium">2022 - Present</span>
                    </div>
                    <p className="text-[9px] text-primary font-medium mb-1.5">Design Technologist</p>
                    <ul className="list-disc list-inside text-[9px] text-slate-600 space-y-1">
                        <li>Built and maintained "Sail", Stripe's internal design system, used by 400+ engineers daily.</li>
                        <li>Reduced UI bug reports by 35% by implementing automated visual regression testing with Percy.</li>
                    </ul>
                </div>

                <div className="mb-1">
                    <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-[10px]">Pinterest</span>
                        <span className="text-[9px] text-slate-500 font-medium">2020 - 2022</span>
                    </div>
                    <p className="text-[9px] text-primary font-medium mb-1.5">Frontend Engineer</p>
                    <ul className="list-disc list-inside text-[9px] text-slate-600 space-y-1">
                        <li>Optimized the mobile web onboarding flow, resulting in a 12% increase in new user sign-ups.</li>
                        <li>Collaborated with designers to prototype high-fidelity interactions in code.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);
