"use client";

import { useUser } from "@/components/providers/user-provider";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserProfile() {
    const { user: authUser, logout } = useAuth();
    const { user: profileUser, setSettingsOpen } = useUser();
    const router = useRouter();

    const displayUser = {
        name:
            `${profileUser?.firstName || ""} ${profileUser?.lastName || ""}`.trim() ||
            authUser?.displayName ||
            "User",
        email: profileUser?.email || authUser?.email || "",
        avatar: profileUser?.avatarUrl || authUser?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileUser?.firstName || authUser?.displayName || 'U')}&background=random&color=fff`,
    };

    const initials =
        displayUser.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase() || "U";

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">

                    <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full p-0 overflow-hidden hover:opacity-80 transition-opacity"
                    >
                        <Avatar className="h-10 w-10 border border-white/10">
                            <AvatarImage
                                src={displayUser.avatar || undefined}
                                alt={displayUser.name}
                                className="object-cover"
                            />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                    </Button>

                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {displayUser.name || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {displayUser.email}
                        </p>
                    </div>

                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-56 border border-white/10 text-white z-[60]"
                align="end"
                style={{ backgroundColor: "#0f111a" }}
            >
                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-500 focus:text-red-400 focus:bg-red-500/10"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}