"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import {
  FileText,
  LayoutTemplate,
  Settings,
  PieChart,
  FolderOpen,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useUser } from "@/components/providers/user-provider";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DashboardFileProvider } from "@/components/providers/dashboard-file-provider";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutTemplate },
  { name: "My Files", href: "/dashboard/files", icon: FolderOpen },
  { name: "Cover Letter", href: "/dashboard/cover-letter", icon: FileText },
  { name: "ATS Analysis", href: "/dashboard/ats", icon: PieChart },
];

function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setSettingsOpen } = useUser();

  // Get current page title
  const currentPath = sidebarLinks.find((link) => link.href === pathname);
  const pageTitle = currentPath ? currentPath.name : "Dashboard";

  return (
    <div className="flex h-screen flex-col md:flex-row bg-background">
      <SettingsPanel />

      {/* Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Logo />
        </div>

        <div className="flex-1 py-6 px-4 space-y-2 ">
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <Button
                key={link.name}
                asChild
                variant="ghost"
                className={cn(
                  "text-[14px] w-full justify-start text-muted-foreground hover:text-white hover:bg-white/5",
                  pathname === link.href && "text-white bg-white/10"
                )}
              >
                <Link href={link.href} className="flex items-center gap-2">
                  <link.icon className="h-4 w-4 shrink-0" />
                  <span>{link.name}</span>
                </Link>
              </Button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-white hover:bg-white/5"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between px-6 md:px-8 shrink-0 z-50 sticky top-0">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden -ml-2 text-white hover:bg-white/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full h-[45vh] sm:max-w-none border-r border-white/10 p-0 text-white"
                style={{ backgroundColor: "#0f111a" }}
              >
                <div className="h-16 flex items-center px-6 border-b border-white/10">
                  <Logo />
                </div>
                <div className="py-6 px-4 space-y-2">
                  <nav className="space-y-1">
                    {sidebarLinks.map((link) => (
                      <SheetClose asChild key={link.name}>
                        <Button
                          asChild
                          variant="ghost"
                          className={cn(
                            "w-full justify-start text-muted-foreground hover:text-white hover:bg-white/5",
                            pathname === link.href && "text-white bg-white/10"
                          )}
                        >
                          <Link
                            href={link.href}
                            className="flex items-center gap-2"
                          >
                            <link.icon className="h-4 w-4 shrink-0" />
                            <span className="truncate">{link.name}</span>
                          </Link>
                        </Button>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="pt-4 mt-4 border-t border-white/10">
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:text-white hover:bg-white/5"
                        onClick={() => setSettingsOpen(true)}
                      >
                        <Settings className="mr-2 h-4 w-4" /> Settings
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="font-semibold text-lg animate-fade-in-up">
              {pageTitle}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <UserProfile />
          </div>
        </header>
        <div className="flex-1 overflow-auto bg-x/5 relative">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative z-10 p-6 md:p-8">{children}</div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardFileProvider>
      <DashboardContent>{children}</DashboardContent>
    </DashboardFileProvider>
  );
}
