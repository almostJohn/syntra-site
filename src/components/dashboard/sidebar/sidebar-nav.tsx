"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import {
	LayoutDashboard,
	Scroll,
	FolderKanban,
	User,
	Users,
	Settings,
} from "lucide-react";

const navItems = [
	{
		title: "Main",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Notes",
		href: "/dashboard/notes",
		icon: Scroll,
	},
	{
		title: "Boards",
		href: "/dashboard/boards",
		icon: FolderKanban,
	},
	{
		title: "Profile",
		href: "/dashboard/profile",
		icon: User,
	},
	{
		title: "Teams",
		href: "/dashboard/teams",
		icon: Users,
	},
	{
		title: "Settings",
		href: "/dashboard/settings",
		icon: Settings,
	},
];

type SidebarNavProps = {
	isCollapsed: boolean;
};

export function SidebarNav({ isCollapsed }: SidebarNavProps) {
	const pathname = usePathname();

	return (
		<nav className="flex-1 flex flex-col space-y-2.5 p-4">
			{navItems.map(({ title, href, icon: Icon }) => (
				<NextLink
					key={href}
					href={href}
					className={cn(
						"inline-flex items-center px-4 h-10 rounded-md text-base font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
						isCollapsed && "px-0 justify-center",
						pathname === href
							? "bg-blue-600 text-white transition-colors hover:bg-blue-700 hover:text-white"
							: "",
					)}
					title={title}
				>
					<Icon className={cn("size-5 shrink-0", !isCollapsed && "mr-3")} />
					{!isCollapsed && <span>{title}</span>}
				</NextLink>
			))}
		</nav>
	);
}
