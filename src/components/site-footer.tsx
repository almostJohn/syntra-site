import * as React from "react";
import Link from "next/link";
import { NotepadText } from "lucide-react";

export function SiteFooter() {
	return (
		<footer className="bottom-0 w-full bg-background border-t border-border/40 pt-1 pb-5">
			<div className="container max-w-screen-2xl flex flex-col gap-4 px-8 py-4 md:flex-row md:items-center md:justify-between mt-6 mb:12 md:mt-6 md:mb-4">
				<div className="flex flex-col space-y-2">
					<div className="flex items-center space-x-2">
						<NotepadText className="size-8 shrink-0" />
						<h1 className="text-2xl font-bold tracking-tighter">SimplyNote</h1>
					</div>
					<p className="text-sm">
						&copy; {new Date().getFullYear()}{" "}
						<Link href="/" className="text-teal-500 hover:underline">
							SimplyNote
						</Link>
						. All Rights Reserved.
					</p>
				</div>
				<div className="flex flex-col space-y-0.5">
					<h1 className="text-lg font-bold">Contact</h1>
					<Link
						href="mailto:garcia.johngale@gmail.com"
						className="text-teal-500 text-sm hover:underline"
					>
						garcia.johngale@gmail.com
					</Link>
					<Link
						href="https://almostjohn.vercel.app"
						className="text-teal-500 text-sm hover:underline"
					>
						almostJohn
					</Link>
				</div>
			</div>
		</footer>
	);
}
