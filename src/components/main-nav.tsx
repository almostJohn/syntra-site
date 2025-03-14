import * as React from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { buttonVariants } from "./ui/button";

export function MainNav() {
	return (
		<nav className="hidden flex-1 justify-center items-center gap-2 md:flex">
			<Link href="/" className={cn(buttonVariants({ variant: "link" }))}>
				Home
			</Link>
			<Link
				href="/#features"
				className={cn(buttonVariants({ variant: "link" }))}
			>
				Features
			</Link>
			<Link href="/about" className={cn(buttonVariants({ variant: "link" }))}>
				About
			</Link>
			<Link href="/notes" className={cn(buttonVariants({ variant: "link" }))}>
				Notes
			</Link>
		</nav>
	);
}
