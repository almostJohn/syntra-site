import * as React from "react";
import Link from "next/link";
import { Icons } from "./icons";
import { MainNav } from "./main-nav";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full bg-neutral-900 text-neutral-100">
			<div className="container max-w-screen-2xl h-14 flex items-center justify-between">
				<div className="flex gap-2">
					<div className="flex">
						<Link href="/" className="flex items-center space-x-2">
							<Icons.logo />
							<h1 className="font-bold">SimplyNote</h1>
						</Link>
					</div>
				</div>
				<MainNav />
			</div>
		</header>
	);
}
