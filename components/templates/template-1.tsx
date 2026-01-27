
export const ResumeTemplate1 = () => (
    <div className="absolute inset-0 bg-white p-8 text-black font-serif leading-relaxed overflow-hidden">
        {/* Resume Header */}
        <div className="text-center mb-5">
            <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide border-b-2 border-black pb-2">James Carter</h3>
            <div className="text-[9px] text-gray-800 flex flex-wrap justify-center gap-x-3 font-medium">
                <span>j.carter@finance-mail.com</span>
                <span>•</span>
                <span>(212) 555-0199</span>
                <span>•</span>
                <span>New York, NY</span>
                <span>•</span>
                <span className="underline">linkedin.com/in/jcarter-fin</span>
            </div>
        </div>

        {/* Experience */}
        <div className="mb-4">
            <h2 className="text-[10px] font-bold mb-1.5 text-black uppercase tracking-wider bg-gray-100 px-1 py-0.5">Professional Experience</h2>

            <div className="mb-3">
                <div className="flex justify-between items-baseline mb-0.5 text-[9px]">
                    <span className="font-bold">Senior Financial Analyst</span>
                    <span className="font-bold">2021 – Present</span>
                </div>
                <div className="flex justify-between items-baseline mb-1 text-[9px]">
                    <span className="italic">Goldman Sachs</span>
                    <span className="italic">New York, NY</span>
                </div>
                <ul className="list-disc list-outside ml-3 text-[8.5px] text-gray-900 leading-[1.35] marker:text-black">
                    <li>Spearheaded a quarterly revenue analysis project that identified $15M in cost-saving opportunities across 3 global divisions.</li>
                    <li>Managed financial modeling for M&A scenarios worth over $500M, providing critical data for executive decision-making.</li>
                    <li>Automated monthly reporting workflows using Python and SQL, reducing manual data entry time by 40%.</li>
                </ul>
            </div>

            <div className="mb-1">
                <div className="flex justify-between items-baseline mb-0.5 text-[9px]">
                    <span className="font-bold">Financial Analyst</span>
                    <span className="font-bold">2018 – 2021</span>
                </div>
                <div className="flex justify-between items-baseline mb-1 text-[9px]">
                    <span className="italic">JP Morgan Chase</span>
                    <span className="italic">New York, NY</span>
                </div>
                <ul className="list-disc list-outside ml-3 text-[8.5px] text-gray-900 leading-[1.35] marker:text-black">
                    <li>Collaborated with cross-functional teams to develop annual budgets and re-forecasts for the Consumer Banking division.</li>
                    <li>Performed variance analysis on monthly P&L statements, ensuring 99% accuracy in financial reporting.</li>
                </ul>
            </div>
        </div>

        {/* Education */}
        <div className="mb-4">
            <h2 className="text-[10px] font-bold mb-1.5 text-black uppercase tracking-wider bg-gray-100 px-1 py-0.5">Education</h2>
            <div className="text-[9px]">
                <div className="flex justify-between font-bold">
                    <span>Columbia University</span>
                    <span>2018</span>
                </div>
                <div className="flex justify-between italic text-gray-800">
                    <span>Bachelor of Science in Economics</span>
                    <span>GPA: 3.9/4.0</span>
                </div>
            </div>
        </div>

        {/* Skills */}
        <div>
            <h2 className="text-[10px] font-bold mb-1.5 text-black uppercase tracking-wider bg-gray-100 px-1 py-0.5">Skills & Certifications</h2>
            <div className="text-[9px] text-gray-900 leading-[1.4]">
                <p><span className="font-bold">Financial:</span> Financial Modeling, Forecasting, GAAP, Risk Analysis, Valuation</p>
                <p><span className="font-bold">Technical:</span> Excel (Advanced Macros), SQL, Python (Pandas), Tableau, Bloomberg Terminal</p>
                <p><span className="font-bold">Certifications:</span> Chartered Financial Analyst (CFA) Level II Candidate</p>
            </div>
        </div>
    </div>
);
