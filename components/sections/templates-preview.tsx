import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const templates = [
    { name: "Backend Engineer", role: "Senior Level", color: "bg-blue-500" },
    { name: "SDE 1 (FAANG)", role: "Entry Level", color: "bg-green-500" },
    { name: "DevOps & Cloud", role: "Mid Level", color: "bg-purple-500" },
    { name: "Data Scientist", role: "Specialist", color: "bg-orange-500" },
];

export function TemplatesPreview() {
    return (
        <section className="py-16 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                        Templates tuned for engineering roles.
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                        Clean, single-column, ATS-safe templates designed to highlight technical skills and projects.
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {templates.map((template) => (
                        <div key={template.name} className="group relative overflow-hidden rounded-xl border bg-background shadow-sm transition-all hover:shadow-md">
                            <div className="aspect-[3/4] w-full bg-muted/30 p-4">
                                <div className="h-full w-full bg-background shadow-sm rounded-sm p-2 space-y-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <div className="h-2 w-1/3 bg-foreground/10 rounded" />
                                    <div className="h-1 w-full bg-foreground/5 rounded" />
                                    <div className="h-1 w-2/3 bg-foreground/5 rounded" />
                                    <div className="pt-2 space-y-1">
                                        <div className="h-1.5 w-full bg-foreground/5 rounded" />
                                        <div className="h-1.5 w-full bg-foreground/5 rounded" />
                                        <div className="h-1.5 w-full bg-foreground/5 rounded" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold">{template.name}</h3>
                                <p className="text-sm text-muted-foreground">{template.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-12">
                    <Button variant="outline" size="lg">View All Templates</Button>
                </div>
            </div>
        </section>
    );
}
