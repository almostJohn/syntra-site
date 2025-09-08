import { NextLink } from "./ui/next-link";
import { MobileNav } from "./mobile-nav";
import { MainNav } from "./main-nav";

export function Navbar() {
	return (
		<header className="border-scheme-foreground/10 bg-scheme-background/95 supports-[backdrop-filter]:bg-scheme-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
			<div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 sm:px-4">
				<div className="flex items-center gap-3">
					{/* Branding Logo */}
					<NextLink
						href="/"
						className="text-2xl leading-tight font-bold tracking-tighter"
					>
						Syntra
					</NextLink>
					{/* BETA Badge */}
					<div className="bg-scheme-primary inline-flex cursor-pointer items-center justify-center rounded-sm px-2 py-0.5 text-xs font-semibold text-white">
						Beta
					</div>
				</div>

				{/* Navbar Actions (CTA) */}
				<MainNav />

				{/* Mobile Navigation */}
				<MobileNav />
			</div>
		</header>
	);
}
