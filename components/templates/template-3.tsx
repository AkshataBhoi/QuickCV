
export const ResumeTemplate3 = () => (
    <div className="absolute inset-0 bg-white p-8 text-neutral-800 font-sans text-xs leading-relaxed overflow-hidden">
        {/* Header */}
        <div className="bg-neutral-900 text-white p-6 -mx-8 -mt-8 mb-6">
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-3xl font-bold tracking-tight mb-1">Michael Ross</h3>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Director of Operations</p>
                </div>
                <div className="text-right text-[9px] text-neutral-400">
                    <p>m.ross@exec-mail.com</p>
                    <p>linkedin.com/in/mross-ops</p>
                </div>
            </div>
        </div>

        {/* Summary */}
        <div className="mb-5 border-l-2 border-neutral-900 pl-3">
            <p className="text-[9px] text-neutral-600 italic">
                Strategic Operations Leader with 10+ years of experience scaling logistics and supply chain networks. Proven track record of driving efficiency improvements, reducing costs, and leading high-performance teams in fast-paced environments.
            </p>
        </div>

        {/* Experience */}
        <div className="mb-5">
            <h2 className="text-[10px] font-bold uppercase text-neutral-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-1 bg-neutral-900 rounded-full"></span> Experience
            </h2>

            <div className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[10px]">Uber</h3>
                    <span className="text-[9px] font-bold text-neutral-500">2019 - Present</span>
                </div>
                <p className="text-[9px] text-neutral-700 font-semibold mb-1">Regional Operations Manager</p>
                <ul className="list-disc list-outside ml-3 text-[9px] text-neutral-600 space-y-1">
                    <li>Oversaw operations for the Western Region, managing a P&L of $50M+ and a team of 120+ employees.</li>
                    <li>Implemented a new driver onboarding process that decreased activation time by 25% and improved retention.</li>
                    <li>Negotiated strategic partnerships with vehicle fleet providers, saving the company $2M annually.</li>
                </ul>
            </div>

            <div>
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[10px]">Tesla</h3>
                    <span className="text-[9px] font-bold text-neutral-500">2016 - 2019</span>
                </div>
                <p className="text-[9px] text-neutral-700 font-semibold mb-1">Supply Chain Manager</p>
                <ul className="list-disc list-outside ml-3 text-[9px] text-neutral-600 space-y-1">
                    <li>Managed global component sourcing for the Model 3 production ramp, ensuring 100% parts availability.</li>
                    <li>Optimized warehouse inventory levels, reducing carrying costs by 15% through JIT implementation.</li>
                </ul>
            </div>
        </div>

        {/* Core Competencies */}
        <div className="grid grid-cols-2 gap-4 border-t border-neutral-200 pt-4">
            <div>
                <h2 className="text-[10px] font-bold uppercase text-neutral-900 mb-2">Education</h2>
                <p className="text-[9px] font-bold">Stanford University</p>
                <p className="text-[9px] text-neutral-600">MBA, Business Administration</p>
            </div>
            <div>
                <h2 className="text-[10px] font-bold uppercase text-neutral-900 mb-2">Expertise</h2>
                <p className="text-[9px] text-neutral-600">Strategic Planning, P&L Management, Logistics, Team Leadership, Process Optimization</p>
            </div>
        </div>
    </div>
);
