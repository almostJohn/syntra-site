"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import {
	LayoutDashboard,
	ListTodo,
	ScrollText,
	User,
	Settings,
} from "lucide-react";

const navItems = [
	{
		title: "Main",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Tasks",
		href: "/dashboard/tasks",
		icon: ListTodo,
	},
	{
		title: "Notes",
		href: "/dashboard/notes",
		icon: ScrollText,
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

type SidebarNavProps = {
	isCollapsed: boolean;
};

export function SidebarNav({ isCollapsed }: SidebarNavProps) {
	const pathname = usePathname();

	return (
		<nav className="flex flex-1 flex-col space-y-3 p-4">
			{navItems.map(({ title, href, icon: Icon }) => (
				<NextLink
					key={href}
					href={href}
					title={title}
					className={cn(
						"inline-flex items-center w-full rounded-md h-11 justify-start px-3 transition-all duration-200",
						isCollapsed && "px-0 justify-center",
						pathname === href
							? "bg-blue-50 border border-blue-200 text-blue-600 hover:text-blue-600"
							: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
					)}
				>
					<Icon className={cn("size-5 shrink-0", !isCollapsed && "mr-3")} />
					{!isCollapsed && <span className="font-semibold">{title}</span>}
				</NextLink>
			))}
		</nav>
	);
}
