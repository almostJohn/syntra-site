"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";

const navItems = [
	{
		label: "Projects",
		href: "/app" as const,
	},
	{
		label: "Settings",
		href: "/app/settings" as const,
	},
];

export function Sidenav() {
	const pathname = usePathname();

	return (
		<aside className="left-0 z-10 hidden w-60 shrink-0 overflow-y-auto border-r border-neutral-800 py-6 md:flex">
			<div className="flex w-full flex-col gap-2 px-6">
				{navItems.map((item) => (
					<NextLink
						key={item.href}
						href={item.href}
						className={cn(
							"inline-flex h-10 w-full items-center rounded-sm px-6 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200",
							pathname === item.href
								? "border border-neutral-700 bg-neutral-800"
								: "hover:bg-neutral-800",
						)}
						title={item.label}
						aria-label={item.label}
					>
						{item.label}
					</NextLink>
				))}
			</div>
		</aside>
	);
}
