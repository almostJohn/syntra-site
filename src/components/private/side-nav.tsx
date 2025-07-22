"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "../ui/next-link";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

const navItems = [
	{
		title: "Projects",
		href: "/app",
		icon: Icons.gridPlus,
	},
	{
		title: "Audit Logs",
		href: "/app/audit-logs",
		icon: Icons.auditLogs,
	},
	{
		title: "Profile",
		href: "/app/profile",
		icon: Icons.user,
	},
	{
		title: "Settings",
		href: "/app/settings",
		icon: Icons.settings,
	},
];

export function SideNav() {
	const pathname = usePathname();

	return (
		<aside className="w-55 left-0 hidden pt-8 shrink-0 flex-col z-10 overflow-y-auto md:flex">
			<nav className="flex flex-col gap-3">
				{navItems.map(({ title, href, icon: Icon }) => (
					<NextLink
						key={title}
						href={href}
						className={cn(
							"group flex items-center gap-2 rounded-sm px-4 py-2 h-10 text-sm font-medium transition-colors duration-200 ease-in-out",
							pathname === href
								? "bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100"
								: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-100",
						)}
					>
						<Icon
							className={cn(
								"size-5 shrink-0 text-neutral-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-100",
								pathname === href
									? "text-neutral-800 dark:text-neutral-100"
									: "",
							)}
						/>
						{title}
					</NextLink>
				))}
			</nav>
		</aside>
	);
}
