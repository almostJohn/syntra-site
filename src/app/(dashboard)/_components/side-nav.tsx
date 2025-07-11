"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

const navItems = [
	{
		title: "Projects",
		href: "/dashboard",
		icon: Icons.apps,
	},
	{
		title: "Activity Logs",
		href: "/dashboard/activity-logs",
		icon: Icons.logs,
	},
	{
		title: "Profile",
		href: "/dashboard/profile",
		icon: Icons.user,
	},
	{
		title: "Settings",
		href: "/dashboard/settings",
		icon: Icons.settings,
	},
];

export function SideNav() {
	const pathname = usePathname();

	return (
		<aside className="w-54 hidden pt-8 left-0 shrink-0 bg-transparent flex-col z-10 overflow-y-auto md:flex">
			<nav className="flex flex-col gap-2">
				{navItems.map(({ title, href, icon: Icon }) => (
					<NextLink
						key={href}
						href={href}
						className={cn(
							"inline-flex items-center rounded-sm gap-2 px-4 py-2 h-10 font-medium text-sm transition-colors bg-transparent group",
							pathname === href
								? "bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100"
								: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-100",
						)}
					>
						<Icon
							className={cn(
								"size-4 shrink-0 text-neutral-500 transition-colors group-hover:text-neutral-900 dark:group-hover:text-neutral-100",
								pathname === href
									? "text-neutral-900 dark:text-neutral-100"
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
