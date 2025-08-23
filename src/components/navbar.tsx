import { NextLink } from "./ui/next-link";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-neutral-100/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-100/60 dark:border-neutral-700 dark:bg-neutral-800/95 dark:supports-[backdrop-filter]:bg-neutral-800/60">
			<div className="mx-auto max-w-7xl px-6 h-18 flex items-center justify-between">
				<div className="flex items-center">
					<Branding />
				</div>
				<MainNav />
				<MobileNav />
			</div>
		</header>
	);
}

function Branding() {
	return (
		<NextLink href="/" className="text-xl font-bold md:text-2xl">
			task<span className="text-blue-500">thing</span>
		</NextLink>
	);
}
