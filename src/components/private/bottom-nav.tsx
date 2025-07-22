"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "../ui/next-link";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

const navItems = [
	{
		href: "/app",
		icon: Icons.gridPlus,
	},
	{
		href: "/app/audit-logs",
		icon: Icons.auditLogs,
	},
	{
		href: "/app/profile",
		icon: Icons.user,
	},
	{
		href: "/app/settings",
		icon: Icons.settings,
	},
];

export function BottomNav() {
	const pathname = usePathname();

	return (
		<div className="fixed bottom-0 z-50 w-full border-t border-neutral-200 dark:border-neutral-700 bg-neutral-100/95 backdrop-blur-2xl supports-[backdrop-filter]:bg-neutral-100/60 dark:bg-neutral-800/95 dark:supports-[backdrop-filter]:bg-neutral-800/60 md:hidden">
			<div className="mx-auto max-w-7xl flex items-center justify-between h-18 px-6">
				{navItems.map(({ href, icon: Icon }) => (
					<NextLink
						key={href}
						href={href}
						className={cn(
							"rounded-sm flex items-center justify-center size-10 px-4 py-2 transition-colors duration-200",
							pathname === href
								? "bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100"
								: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-100",
						)}
					>
						<Icon className="size-5 shrink-0" />
					</NextLink>
				))}
			</div>
		</div>
	);
}
