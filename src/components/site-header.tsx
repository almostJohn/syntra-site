import * as React from "react";
import Link from "next/link";
import { NotepadText } from "lucide-react";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-xl border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
			<div className="container max-w-screen-2xl h-14 flex items-center justify-between">
				<div className="flex gap-2">
					<div className="flex">
						<Link href="/" className="flex items-center space-x-2">
							<NotepadText />
							<h1 className="font-bold tracking-tighter">SimplyNote</h1>
						</Link>
					</div>
				</div>
				<div className="flex justify-end gap-2">
					<MainNav />
					<MobileNav />
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
