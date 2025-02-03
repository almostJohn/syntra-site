import * as React from "react";
import Link from "next/link";
import { NotepadText } from "lucide-react";

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
		<header className="sticky top-0 z-50 w-full bg-neutral-900 text-white">
			<div className="container flex items-center h-14 max-w-screen-2xl">
				<Link href="/" className="flex items-center space-x-2">
					<NotepadText className="size-7 shrink-0" />
					<h1 className="font-bold tracking-tight">simplynote</h1>
				</Link>
			</div>
		</header>
	);
}
