import { NextLink } from "./ui/next-link";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { Icons } from "./icons";

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-neutral-100/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-100/60 dark:border-neutral-700 dark:bg-neutral-800/95 dark:supports-[backdrop-filter]:bg-neutral-800/60">
			<div className="mx-auto max-w-7xl px-6 h-18 flex items-center justify-between">
				<NextLink href="/" className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<Icons.syntra className="size-6 shrink-0" />
						<div className="font-medium">syntra.</div>
					</div>
					<div className="flex items-center justify-center rounded-sm px-2 py-0.5 text-xs font-medium border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700">
						Beta
					</div>
				</NextLink>
				<MainNav />
				<MobileNav />
			</div>
		</header>
	);
}
