import * as React from "react";
import Link from "next/link";
import { NotepadText } from "lucide-react";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { Changelog } from "./changelog";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container max-w-screen-2xl h-14 flex items-center justify-between">
				<Link href="/" className="flex items-center space-x-2">
					<NotepadText className="size-7 shrink-0" />
					<h1 className="font-bold">simplynote</h1>
					<Changelog />
				</Link>
				<MainNav />
				<MobileNav />
			</div>
		</header>
	);
}
