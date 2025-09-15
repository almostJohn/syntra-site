import { cn } from "@/lib/utils";
import { NextLink } from "./ui/next-link";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
	return (
		<header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-4">
				<div className="flex items-center gap-3">
					{/* Branding Logo */}
					<NextLink
						href="/"
						className="text-xl leading-tight font-bold tracking-tighter"
					>
						Syntra
					</NextLink>
					{/* BETA Badge */}
					<div
						className={cn(
							"inline-flex cursor-pointer items-center justify-center rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white uppercase transition-all duration-300 hover:bg-blue-700",
						)}
					>
						beta
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
