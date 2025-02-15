import * as React from "react";
import Link from "next/link";
import { Icons } from "./icons";

export function SiteFooter() {
	return (
		<footer className="bottom-0 w-full bg-neutral-900 text-neutral-100 pt-1 pb-5">
			<div className="container max-w-screen-2xl flex flex-col gap-4 px-8 py-4 md:flex-row md:items-center md:justify-between mt-6 mb:12 md:mt-6 md:mb-4">
				<div className="flex flex-col space-y-2">
					<div className="flex items-center space-x-2">
						<Icons.logo className="size-8 shrink-0" />
						<h1 className="text-2xl font-bold tracking-tight">SimplyNote</h1>
					</div>
					<p className="text-sm">
						&copy; {new Date().getFullYear()}{" "}
						<Link href="/" className="text-blue-600 hover:underline">
							SimplyNote
						</Link>
						. All Rights Reserved.
					</p>
				</div>
				<div className="flex flex-col space-y-0.5">
					<h1 className="text-lg font-bold">Contact</h1>
					<Link
						href="mailto:garcia.johngale@gmail.com"
						className="text-blue-600 text-sm hover:underline"
					>
						garcia.johngale@gmail.com
					</Link>
					<Link
						href="https://almostjohn.vercel.app"
						className="text-blue-600 text-sm hover:underline"
					>
						almostJohn
					</Link>
				</div>
			</div>
		</footer>
	);
}
