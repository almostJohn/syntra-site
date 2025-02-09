"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export function MainNav() {
	const pathname = usePathname();

	return (
		<nav className="hidden justify-end items-center text-sm gap-4 md:flex xl:gap-6">
			<Link
				href="/"
				className={cn(
					"transition-colors hover:text-foreground/80",
					pathname === "/" ? "text-foreground" : "hover:text-foreground/60",
				)}
			>
				Home
			</Link>
			<Link
				href="/about"
				className={cn(
					"transition-colors hover:text-foreground/80",
					pathname === "/about"
						? "text-foreground"
						: "hover:text-foreground/60",
				)}
			>
				About
			</Link>
			<Link
				href="/notepad"
				className={cn(
					"transition-colors hover:text-foreground/80",
					pathname === "/notepad"
						? "text-foreground"
						: "hover:text-foreground/60",
				)}
			>
				Notepad
			</Link>
		</nav>
	);
}
