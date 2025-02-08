import * as React from "react";
import Link from "next/link";
import { NotebookPen } from "lucide-react";

export default function NotepadLayout({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	return (
		<>
			<NotepadHeader />
			{children}
		</>
	);
}

function NotepadHeader() {
	return (
		<header className="sticky top-0 z-50 w-full bg-background/95 border-b border-border/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
			<div className="container flex items-center justify-between max-w-screen-2xl h-14">
				<Link href="/" className="flex items-center space-x-2 group">
					<NotebookPen className="size-7 shrink-0 text-blue-500 transition group-hover:text-blue-700" />
					<h1 className="font-bold text-lg tracking-tight">SimplyNote</h1>
				</Link>
				<div className="flex items-center justify-end">
					<div className="inline-flex items-center justify-center px-3 py-0.5 text-xs font-bold rounded-full bg-muted border cursor-pointer">
						Public Beta
					</div>
				</div>
			</div>
		</header>
	);
}
