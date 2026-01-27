import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export function AtsView() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
                <div className="mb-12 space-y-4 text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                        See Your Resume Through a Recruiter&apos;s Eyes
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm text-gray-600 md:text-base">
                        Most resumes get rejected before a human ever reads them. Your resume is evaluated
                        for clarity, structure, and ATS readability before it reaches the hiring manager.
                    </p>
                </div>
                <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
                    <div className="space-y-4">
                        <Card className="border border-gray-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold text-gray-900">Parsing Analysis</CardTitle>
                                <CardDescription className="text-sm text-gray-500">How systems read your data</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3">
                                    <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-green-50 text-green-600">
                                        <Check size={14} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Standard section headers</p>
                                        <p className="text-xs text-gray-600">
                                            "Experience", "Education", "Skills" are clearly identified and easy to scan.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3">
                                    <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-green-50 text-green-600">
                                        <Check size={14} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Clean date formats</p>
                                        <p className="text-xs text-gray-600">
                                            "Jun 2023 - Present" and similar formats are reliably parsed by ATS tools.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3">
                                    <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-red-600">
                                        <X size={14} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Complex tables and columns</p>
                                        <p className="text-xs text-gray-600">
                                            Multi-column layouts and dense tables often cause important details to be missed.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-indigo-50 via-white to-indigo-100" />
                        <div className="relative rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    ATS-style structured view
                                </p>
                                <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-[10px] font-semibold text-green-700">
                                    Recruiter-friendly
                                </span>
                            </div>
                            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 font-mono text-xs text-gray-800">
                                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                                    JSON output preview
                                </div>
                                <pre className="max-h-64 overflow-x-auto whitespace-pre">
                                    {`{
  "candidate": {
    "name": "Alex Chen",
    "email": "alex@example.com",
    "skills": [
      "React",
      "Node.js",
      "TypeScript",
      "AWS"
    ],
    "experience": [
      {
        "company": "TechCorp",
        "role": "Senior Engineer",
        "duration": "2 years"
      }
    ]
  }
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>
                );
}
