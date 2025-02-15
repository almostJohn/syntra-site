"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export function MainNav() {
	const pathname = usePathname();

	return (
		<nav className="flex justify-end items-center text-sm gap-3 xl:gap-6">
			<Link
				href="/"
				className={cn(
					"transition-colors hover:text-blue-600",
					pathname === "/" ? "text-blue-500" : "hover:text-blue-600",
				)}
			>
				Home
			</Link>
			<Link
				href="/about"
				className={cn(
					"transition-colors hover:text-blue-600",
					pathname === "/about" ? "text-blue-500" : "hover:text-blue-600",
				)}
			>
				About
			</Link>
			<Link
				href="/notepad"
				className={cn(
					"transition-colors hover:text-blue-600",
					pathname === "/notepad" ? "text-blue-500" : "hover:text-blue-600",
				)}
			>
				Notepad
			</Link>
		</nav>
	);
}
