import * as React from "react";
import Link from "next/link";
import { Icons } from "./icons";
import { MainNav } from "./main-nav";
import { ModeToggle } from "./mode-toggle";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full bg-background/95 border-b border-border-border/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
			<div className="container max-w-screen-2xl h-14 flex items-center justify-between">
				<div className="flex gap-2">
					<MobileNav />
					<div className="flex space-x-8">
						<Link href="/" className="flex items-center space-x-2 group">
							<Icons.logo />
							<h1 className="font-bold">SimplyNote</h1>
						</Link>
						<MainNav />
					</div>
				</div>
				<div className="flex items-center justify-end">
					<ModeToggle align="end" />
				</div>
			</div>
		</header>
	);
}
