"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "../ui/next-link";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

const navItems = [
	{
		title: "Projects",
		icon: Icons.apps,
		href: "/app" as const,
	},
	{
		title: "Settings",
		icon: Icons.settings,
		href: "/app/settings" as const,
	},
];

export function SideNav() {
	const pathname = usePathname();

	return (
		<aside className="left-0 z-10 hidden w-60 shrink-0 overflow-y-auto border-r border-neutral-300 py-6 md:flex">
			<div className="flex w-full flex-col gap-2 px-6">
				{navItems.map(({ title, icon: Icon, href }) => (
					<NextLink
						key={title}
						href={href}
						className={cn(
							"inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200",
							pathname === href
								? "bg-neutral-200 text-neutral-900"
								: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900",
						)}
						title={title}
						aria-label={title}
					>
						<Icon className="size-4 shrink-0" />
						{title}
					</NextLink>
				))}
			</div>
		</aside>
	);
}
