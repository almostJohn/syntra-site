"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { icons } from "@/components/icons";

const navItems = [
	{
		title: "Main",
		href: "/dashboard",
		icon: icons.Dashboard,
	},
	{
		title: "Notes",
		href: "/dashboard/notes",
		icon: icons.Scroll,
	},
	{
		title: "Boards",
		href: "/dashboard/boards",
		icon: icons.Kanban,
	},
	{
		title: "Profile",
		href: "/dashboard/profile",
		icon: icons.User,
	},
	{
		title: "Teams",
		href: "/dashboard/teams",
		icon: icons.Users,
	},
	{
		title: "Settings",
		href: "/dashboard/settings",
		icon: icons.Settings,
	},
];

type NavProps = {
	isCollapsed: boolean;
};

export function Nav({ isCollapsed }: NavProps) {
	const pathname = usePathname();

	return (
		<nav className="flex-1 flex-col flex space-y-2 p-4">
			{navItems.map(({ title, href, icon: Icon }) => (
				<NextLink
					key={href}
					href={href}
					className={cn(
						"inline-flex items-center px-3 h-10 rounded-md text-base font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
						isCollapsed && "px-0 justify-center",
						pathname === href
							? "bg-blue-600 text-background hover:bg-blue-700 hover:text-background"
							: "",
					)}
				>
					<Icon
						className={cn("size-5 flex-shrink-0", !isCollapsed && "mr-3")}
					/>
					{!isCollapsed && <span>{title}</span>}
				</NextLink>
			))}
		</nav>
	);
}
