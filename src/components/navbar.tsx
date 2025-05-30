import { NextLink } from "./ui/next-link";
import { getCurrentUser } from "@/lib/auth";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export async function Navbar() {
	const currentUser = await getCurrentUser();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto max-w-7xl px-6 md:px-12 h-16 flex items-center justify-between">
				<NextLink href="/" className="flex items-center">
					<div className="text-xl font-bold tracking-tighter md:text-2xl">
						Syntra
					</div>
				</NextLink>
				{!currentUser && (
					<>
						<MainNav isSignedIn={false} />
						<MobileNav isSignedIn={false} />
					</>
				)}
				{currentUser && (
					<>
						<MainNav
							email={currentUser.email}
							displayName={currentUser.display_name}
							isSignedIn={true}
						/>
						<MobileNav
							email={currentUser.email}
							displayName={currentUser.display_name}
							isSignedIn={true}
						/>
					</>
				)}
			</div>
		</header>
	);
}
