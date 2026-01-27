import { Button } from "@/components/ui/button";
import { ArrowRight, Wand2 } from "lucide-react";
import { DotBackground } from "@/components/ui/dot-background";

export function AiBullets() {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            <DotBackground />
            <div className="container px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="order-2 lg:order-1 relative">
                        <div className="rounded-xl border bg-background shadow-xl overflow-hidden">
                            <div className="bg-muted/50 p-4 border-b flex items-center justify-between">
                                <span className="text-sm font-medium">Bullet Point Improver</span>
                                <Wand2 className="h-4 w-4 text-primary" />
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase">Original Input</label>
                                    <div className="p-3 rounded-md bg-muted/30 text-sm border border-dashed">
                                        "Worked on the backend API for the user dashboard."
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <ArrowRight className="text-muted-foreground rotate-90 lg:rotate-0" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-primary uppercase">ResuStack AI Output</label>
                                    <div className="p-3 rounded-md bg-primary/5 border border-primary/20 text-sm">
                                        "Engineered scalable RESTful APIs for the user dashboard, reducing load times by <span className='font-bold text-primary'>35%</span> and supporting <span className='font-bold text-primary'>50k+</span> daily active users."
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 flex flex-col justify-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                            Turn basic tasks into quantified impact.
                        </h2>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                            Engineers often struggle to sell themselves. Our AI takes your basic descriptions and transforms them into strong, metric-driven bullet points that hiring managers love.
                        </p>
                        <ul className="grid gap-2 py-4">
                            <li className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                                <span className="text-sm">Auto-generates metrics placeholders</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                                <span className="text-sm">Focuses on action verbs and results</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                                <span className="text-sm">Removes passive voice and fluff</span>
                            </li>
                        </ul>
                        <Button className="w-fit">Try Bullet Generator</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
