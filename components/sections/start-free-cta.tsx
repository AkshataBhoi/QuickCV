import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function StartFreeCta() {
    return (
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-8 text-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Start free in under 2 minutes.
                        </h2>
                        <p className="max-w-[600px] mx-auto text-primary-foreground/80 md:text-xl">
                            Upload your existing resume to get an instant score, or start from scratch with our engineering templates.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                        <Button size="lg" variant="secondary" className="w-full sm:w-auto font-semibold">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload PDF / DOCX
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                            Create New Resume
                        </Button>
                    </div>
                    <p className="text-sm text-primary-foreground/60">
                        No credit card required. Free forever for individuals.
                    </p>
                </div>
            </div>
        </section>
    );
}
