import { Branding } from "./branding";
import { NextLink } from "./ui/next-link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export async function Navbar() {
	const currentUser = await getCurrentUser();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
				<div className="flex items-center justify-start">
					<Branding href="/" />
				</div>
				<div className="flex items-center justify-end gap-3">
					{!currentUser && (
						<>
							<NextLink
								href="/login"
								className={cn(buttonVariants({ variant: "ghost" }))}
							>
								Login
							</NextLink>
							<NextLink
								href="/register"
								className={cn(buttonVariants({ variant: "primary" }))}
							>
								Register
							</NextLink>
						</>
					)}
					{currentUser && (
						<>
							<MainNav
								email={currentUser.email}
								displayName={currentUser.display_name}
							/>
							<MobileNav
								email={currentUser.email}
								displayName={currentUser.display_name}
							/>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
