import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Github, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
    product: [
        { name: "Resume Builder", href: "/builder" },
        { name: "ATS Analysis", href: "/ats-analysis" },
        { name: "Templates", href: "/templates" },
        { name: "Pricing", href: "/#pricing" },
    ],
    resources: [
        { name: "Blog", href: "/blog" },
        { name: "Guides", href: "/guides" },
        { name: "FAQ", href: "/faq" },
        { name: "Support", href: "/support" },
    ],
    company: [
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-sm text-muted-foreground max-w-xs">
                            ResuStack – Built by engineers, for engineers. The free AI resume builder that helps you land top tech jobs.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Github size={20} />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Linkedin size={20} />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter size={20} />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Product</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Resources</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} ResuStack. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
