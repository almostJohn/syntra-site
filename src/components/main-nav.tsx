"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export function MainNav() {
	const pathname = usePathname();

	return (
		<nav className="flex justify-end items-center gap-5">
			<Link
				href="/"
				className={cn(
					"text-sm font-medium transition-colors hover:text-blue-700",
					pathname === "/" ? "text-blue-500" : "hover:text-blue-500",
				)}
			>
				Home
			</Link>
			<Link
				href="/about"
				className={cn(
					"text-sm font-medium transition-colors hover:text-blue-700",
					pathname === "/about" ? "text-blue-500" : "hover:text-blue-500",
				)}
			>
				About
			</Link>
			<Link
				href="/notepad"
				className={cn(
					"text-sm font-medium transition-colors hover:text-blue-700",
					pathname === "/notepad" ? "text-blue-500" : "hover:text-blue-500",
				)}
			>
				Notepad
			</Link>
		</nav>
	);
}
