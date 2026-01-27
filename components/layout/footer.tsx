// import Link from "next/link";
// import { Logo } from "@/components/ui/logo";
// import { Github, Linkedin, Twitter } from "lucide-react";

// export function Footer() {
//     return (
//         <footer className="border-t border-gray-200 bg-gray-50">
//             <div className="container mx-auto flex flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
//                 <div>
//                     <div className="flex items-center gap-2">
//                         {/* <Logo /> */}
//                         <span className="text-base font-semibold text-gray-900">QuickCV</span>
//                         <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-indigo-700">
//                             AI resume builder
//                         </span>
//                     </div>
//                     <p className="mt-2 max-w-sm text-xs text-gray-500">
//                         Clear, recruiter-friendly resumes powered by AI. Built for professionals who
//                         want more interviews, not more complexity.
//                     </p>
//                 </div>

//                 <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
//                     <Link href="/" className="transition-colors hover:text-gray-700">
//                         Home
//                     </Link>
//                     <Link href="/#pricing" className="transition-colors hover:text-gray-700">
//                         Pricing
//                     </Link>
//                     <Link href="/contact" className="transition-colors hover:text-gray-700">
//                         Contact
//                     </Link>
//                     <Link href="/privacy" className="transition-colors hover:text-gray-700">
//                         Privacy
//                     </Link>
//                 </nav>

//                 <div className="flex items-center gap-4 text-gray-400">
//                     <Link href="#" className="text-gray-400 transition-colors hover:text-gray-600">
//                         <Github size={18} />
//                         <span className="sr-only">GitHub</span>
//                     </Link>
//                     <Link href="#" className="text-gray-400 transition-colors hover:text-gray-600">
//                         <Linkedin size={18} />
//                         <span className="sr-only">LinkedIn</span>
//                     </Link>
//                     <Link href="#" className="text-gray-400 transition-colors hover:text-gray-600">
//                         <Twitter size={18} />
//                         <span className="sr-only">Twitter</span>
//                     </Link>
//                 </div>
//             </div>

//             <div className="border-t border-gray-200">
//                 <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-4 text-[11px] text-gray-400 md:flex-row md:px-6 lg:px-8">
//                     <p>&copy; {new Date().getFullYear()} QuickCV. All rights reserved.</p>
//                     <p className="text-[11px] text-gray-400">
//                         Designed to complement, not replace, a recruiter&apos;s judgment.
//                     </p>
//                 </div>
//             </div>
//         </footer>
//     );
// }
