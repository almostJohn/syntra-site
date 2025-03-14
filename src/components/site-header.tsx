import * as React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { MainNav } from "./main-nav";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-dashed supports-[backdrop-filter]:bg-background/60">
			<div className="container max-w-screen-2xl h-16 flex items-center justify-between">
				<div className="flex flex-1">
					<Link href="/" className="flex items-center space-x-2">
						<FileText className="size-6" />
						<h1 className="text-lg font-bold">SimplyNote</h1>
					</Link>
				</div>
				<MainNav />
				<div className="flex flex-1 justify-end gap-2">
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
