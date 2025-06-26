"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import {
	LayoutGrid,
	ListChecks,
	Paperclip,
	Settings,
	User,
} from "lucide-react";

const navItems = [
	{
		title: "Main",
		href: "/dashboard",
		icon: LayoutGrid,
	},
	{
		title: "Tasks",
		href: "/dashboard/tasks",
		icon: ListChecks,
	},
	{
		title: "Notes",
		href: "/dashboard/notes",
		icon: Paperclip,
	},
	{
		title: "Profile",
		href: "/dashboard/profile",
		icon: User,
	},
	{
		title: "Settings",
		href: "/dashboard/settings",
		icon: Settings,
	},
];

export function SideMenu() {
	const pathname = usePathname();

	return (
		<aside className="hidden w-52 pt-8 shrink-0 left-0 bg-transparent flex-col z-10 overflow-y-auto md:flex">
			<nav className="flex flex-col gap-2">
				{navItems.map(({ title, href, icon: Icon }) => (
					<NextLink
						key={title}
						href={href}
						className={cn(
							"inline-flex items-center px-4 py-2 h-10 gap-2 rounded-sm text-sm font-medium transition-colors group",
							pathname === href
								? "bg-accent text-accent-foreground"
								: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
						)}
					>
						<Icon
							className={cn(
								"size-4 text-muted-foreground transition-colors group-hover:text-accent-foreground",
								pathname === href ? "text-accent-foreground" : "",
							)}
						/>
						{title}
					</NextLink>
				))}
			</nav>
		</aside>
	);
}
