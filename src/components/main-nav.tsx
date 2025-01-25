import * as React from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "~/util/cn";

export function MainNav() {
	return (
		<nav className="hidden justify-end items-center gap-4 md:flex">
			<Link
				href="/"
				className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
			>
				Home
			</Link>
			<Link
				href="/about"
				className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
			>
				About
			</Link>
			<Link
				href="/contact"
				className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
			>
				Contact
			</Link>
		</nav>
	);
}
