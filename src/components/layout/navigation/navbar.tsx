import { NextLink } from "@/components/ui/next-link";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib";

export function Navbar() {
	return (
		<header className="bg-scheme-background/95 supports-[backdrop-filter]:bg-scheme-background/60 sticky top-0 z-50 w-full backdrop-blur-lg">
			<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-0">
				<div className="flex items-center gap-8">
					<Branding />
					<MainNav />
				</div>
				<NavActions />
				<MobileNav />
			</div>
		</header>
	);
}

function Branding() {
	return (
		<NextLink
			href="/"
			className="text-2xl font-bold tracking-tight sm:text-3xl"
		>
			Syntra
		</NextLink>
	);
}

function NavActions() {
	return (
		<div className="hidden items-center gap-4 md:flex">
			<NextLink
				href="/login"
				className={cn(
					buttonVariants({
						variant: "ghost",
						className: "hover:bg-scheme-primary/30",
					}),
				)}
			>
				Login
			</NextLink>
			<NextLink
				href="/register"
				className={cn(
					buttonVariants({
						className:
							"bg-scheme-primary hover:bg-scheme-primary/90 hover:shadow-scheme-primary/60 transition-shadow hover:shadow-xl",
					}),
				)}
			>
				Register
			</NextLink>
		</div>
	);
}
