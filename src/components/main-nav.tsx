"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export function MainNav() {
	const pathname = usePathname();

	return (
		<nav className="hidden justify-end items-center gap-2 md:flex">
			<Link
				href="/"
				className={cn(
					"inline-flex items-center justify-center px-3 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-lg",
					pathname === "/" ? "bg-accent text-accent-foreground" : "",
				)}
			>
				Home
			</Link>
			<Link
				href="/about"
				className={cn(
					"inline-flex items-center justify-center px-3 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-lg",
					pathname === "/about" ? "bg-accent text-accent-foreground" : "",
				)}
			>
				About
			</Link>
			<Link
				href="/notepad"
				className={cn(
					"inline-flex items-center justify-center px-3 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-lg",
					pathname === "/notepad" ? "bg-accent text-accent-foreground" : "",
				)}
			>
				Notepad
			</Link>
		</nav>
	);
}
