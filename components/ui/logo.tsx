import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

export function Logo({ className }: LogoProps) {
    return (
        <Link href="/" className={cn("flex items-center font-bold text-2xl tracking-tight", className)}>
            <span className="text-indigo-500">QuickCV</span>
        </Link>
    );
}
