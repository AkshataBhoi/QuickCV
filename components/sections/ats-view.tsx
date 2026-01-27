import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export function AtsView() {
    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        See Your Resume Through a Recruiter&apos;s Eyes
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Most resumes get rejected before a human ever reads them. ResuStack ensures your resume is perfectly parseable by Applicant Tracking Systems.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:gap-12 items-center">
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Parsing Analysis</CardTitle>
                                <CardDescription>How systems read your data</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                                        <Check size={16} />
                                    </div>
                                    <div>
                                        <p className="font-medium">Standard Section Headers</p>
                                        <p className="text-sm text-muted-foreground">"Experience", "Education", "Skills" are correctly identified.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                                        <Check size={16} />
                                    </div>
                                    <div>
                                        <p className="font-medium">Clean Date Formats</p>
                                        <p className="text-sm text-muted-foreground">"Jun 2023 - Present" is easily parsed.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600">
                                        <X size={16} />
                                    </div>
                                    <div>
                                        <p className="font-medium">Complex Tables & Columns</p>
                                        <p className="text-sm text-muted-foreground">Avoid multi-column layouts that confuse parsers.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="relative rounded-xl border bg-background shadow-lg p-6 font-mono text-sm">
                        <div className="absolute top-0 right-0 p-2 bg-muted text-xs rounded-bl-xl text-muted-foreground">JSON Output Preview</div>
                        <pre className="overflow-x-auto">
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
