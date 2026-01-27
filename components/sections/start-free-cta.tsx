import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function StartFreeCta() {
    return (
        <section className="bg-gradient-to-b from-indigo-50 via-white to-indigo-50 py-16 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-8 text-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                            Upload your resume to start for free
                        </h2>
                        <p className="mx-auto max-w-[600px] text-sm text-gray-600 md:text-base">
                            Get an instant, recruiter-style review of your existing resume, or start from
                            scratch with professionally designed templates.
                        </p>
                    </div>
                    <div className="flex w-full max-w-md flex-col justify-center gap-4 sm:flex-row">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="w-full rounded-full bg-indigo-600 text-white hover:bg-indigo-700 sm:w-auto"
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload PDF / DOCX
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full rounded-full border-gray-300 bg-white text-gray-900 hover:bg-gray-50 sm:w-auto"
                        >
                            Create New Resume
                        </Button>
                    </div>
                    <p className="text-xs text-gray-500 md:text-sm">
                        No credit card required. Free forever for individuals.
                    </p>
                </div>
            </div>
        </section>
    );
}
