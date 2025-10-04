"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

const navItems = [
	{
		label: "Projects",
		href: "/app" as const,
		icon: Icons.apps,
	},
	{
		label: "Settings",
		href: "/app/settings" as const,
		icon: Icons.settings,
	},
];

export function SideNav() {
	const pathname = usePathname();

	return (
		<aside className="left-0 z-10 hidden w-60 shrink-0 overflow-y-auto border-r border-neutral-800 py-6 md:flex">
			<div className="flex w-full flex-col gap-2 px-6">
				{navItems.map(({ label, href, icon: Icon }) => (
					<NextLink
						key={label}
						href={href}
						className={cn(
							"inline-flex h-10 w-full items-center gap-2 rounded-sm px-6 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200",
							pathname === href
								? "border border-neutral-700 bg-neutral-800"
								: "text-neutral-500 hover:bg-neutral-800 hover:text-neutral-100",
						)}
						title={label}
						aria-label={label}
					>
						<Icon className="size-4 shrink-0" />
						{label}
					</NextLink>
				))}
			</div>
		</aside>
	);
}
