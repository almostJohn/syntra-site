import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ModeToggle } from "~/components/mode-toggle";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
	title: "Notes",
};

export default function NotesLayout({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	return (
		<>
			<SiteHeader />
			{children}
		</>
	);
}

function SiteHeader() {
	return (
		<header className="sticky top-0 w-full z-50 border-b border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container max-w-screen-2xl h-16 flex items-center justify-between">
				<Link href="/notes" className="flex items-center space-x-2">
					<FileText />
					<h1 className="text-lg font-bold">SimplyNote</h1>
				</Link>
				<ModeToggle />
			</div>
		</header>
	);
}
