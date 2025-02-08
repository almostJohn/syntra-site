import * as React from "react";
import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { MainNav } from "./main-nav";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full bg-background/95 border-b border-border-border/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
			<div className="container max-w-screen-2xl h-14 flex items-center justify-between">
				<Link href="/" className="flex items-center space-x-2 group">
					<NotebookPen className="size-7 shrink-0 text-blue-500 transition group-hover:text-blue-700" />
					<h1 className="font-bold text-lg tracking-tight">SimplyNote</h1>
				</Link>
				<MainNav />
			</div>
		</header>
	);
}
