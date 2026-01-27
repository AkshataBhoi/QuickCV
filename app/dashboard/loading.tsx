import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-gray-400 animate-pulse">Loading Dashboard...</p>
        </div>
    );
}
