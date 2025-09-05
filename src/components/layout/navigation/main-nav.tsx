"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib";

const navItems = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Roadmap",
		href: "/roadmap",
	},
];

export function MainNav() {
	const pathname = usePathname();

	return (
		<div className="hidden items-center gap-6 md:flex">
			{navItems.map((item, index) => (
				<NextLink
					key={index}
					href={item.href}
					className={cn(
						"text-sm font-medium transition-colors duration-200",
						pathname === item.href
							? "text-scheme-primary font-semibold"
							: "hover:text-scheme-primary",
					)}
				>
					{item.label}
				</NextLink>
			))}
		</div>
	);
}
