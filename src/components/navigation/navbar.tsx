import { NextLink } from "../ui/next-link";
import { getCurrentUser } from "@/lib/auth";
import { MainNav as SignedOutMainNav } from "./signed-out/main-nav";
import { MobileNav as SignedOutMobileNav } from "./signed-out/mobile-nav";
import { MainNav as SignedInMainNav } from "./signed-in/main-nav";
import { MobileNav as SignedInMobileNav } from "./signed-in/mobile-nav";

export async function Navbar({
	href,
	isDashboard,
}: {
	href?: string;
	isDashboard?: boolean;
}) {
	const currentUser = await getCurrentUser();

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto max-w-7xl px-8 md:px-12 flex h-16 items-center justify-between">
				<NextLink href={href ?? "/"} className="flex items-center">
					<div className="text-xl font-bold leading-none tracking-tighter md:text-2xl">
						Syntra
					</div>
				</NextLink>
				{!currentUser && (
					<>
						<SignedOutMainNav />
						<SignedOutMobileNav />
					</>
				)}
				{currentUser && (
					<>
						<SignedInMainNav
							email={currentUser.email}
							displayName={currentUser.display_name}
							isDashboard={isDashboard}
						/>
						<SignedInMobileNav
							email={currentUser.email}
							displayName={currentUser.display_name}
							isDashboard={isDashboard}
						/>
					</>
				)}
			</div>
		</header>
	);
}
