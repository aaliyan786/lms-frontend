"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
icon: LucideIcon;
label: string;
href: string;
};

export const SidebarItem = ({
    icon: Icon,
    label,
    href
}: SidebarItemProps) => {
    const pathName = usePathname();
    const router = useRouter();

    const isActive = 
        (pathName === "/" && href === "/") ||
        (pathName === href ) ||
        (pathName?.startsWith(`${href}/`));

    const onClick = () => {
        router.push(href);
    }

    return (
        <button
            onClick = {onClick}
            type = "button"
            className = {cn(
                "flex items-center  gap-x-2 text-blue-800 dark:text-white text-sm font-[500] pl-6 transition-all hover:text-white hover:bg-blue-400",
                isActive && "text-white bg-blue-600 hover:bg-blue-400 hover:text-white"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                />
                {label}
            </div>
            <div 
                className={cn(
                    "ml-auto opacity-0 border-2 border-blue-900 h-full transition-all",
                    isActive && "opacity-100"
                )}
            />
        </button>
    )
}