"use client";

import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "./user-button";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "./theme-toggle";

export const NavbarRoutes = () => {
    const pathName = usePathname();

    const isTeacherName = pathName?.startsWith("/teacher");
    const isPlayerPage = pathName?.includes("/chapter");
    
    return (
        <div className="flex flex-row gap-x-4 ml-auto items-center">
            {isTeacherName || isPlayerPage ? (
                <Link href="/">
                    <Button variant="ghost">
                        <LogOut className="h-4 w-4 mr-2" />
                        Exit
                    </Button>
                </Link>
            ) : (
                <Link href="/teacher/courses">
                    <Button variant="ghost">
                        Teacher Mode
                    </Button>
                </Link>
            )}
            <DarkModeToggle />
            <UserButton />
        </div>
    )    
}