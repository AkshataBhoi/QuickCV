import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";

export function JdTargeting() {
    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <Badge variant="outline" className="w-fit">
                        <Target className="mr-1 h-3 w-3" /> Job Targeting
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                        Align your resume to any job description.
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                        Paste the job description and we'll highlight missing keywords and skills to increase your match score.
                    </p>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border bg-background p-6 shadow-sm">
                        <h3 className="font-semibold mb-4 text-sm uppercase text-muted-foreground">Job Description</h3>
                        <div className="space-y-2 text-sm">
                            <p>We are looking for a <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded font-medium">Senior Backend Engineer</span> with experience in <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded font-medium">Python</span> and <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded font-medium">Django</span>.</p>
                            <p>You should have strong knowledge of <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded font-medium">AWS</span> services like EC2 and Lambda.</p>
                            <p>Experience with <span className="bg-red-100 dark:bg-red-900/30 px-1 rounded font-medium border border-red-200 dark:border-red-800">Kubernetes</span> is a plus.</p>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-background p-6 shadow-sm">
                        <h3 className="font-semibold mb-4 text-sm uppercase text-muted-foreground">Your Resume Analysis</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Match Score</span>
                                <span className="text-xl font-bold text-yellow-600">75%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                                <div className="h-2 w-[75%] rounded-full bg-yellow-500" />
                            </div>
                            <div className="space-y-2 pt-4">
                                <p className="text-sm font-medium">Missing Keywords:</p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="destructive">Kubernetes</Badge>
                                    <Badge variant="secondary">Microservices</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
