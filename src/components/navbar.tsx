import { NextLink } from "./ui/next-link";
import { getCurrentUser } from "@/lib/auth";
import { SignedOutMainNav } from "./signed-out-main-nav";
import { SignedOutMobileNav } from "./signed-out-mobile-nav";
import { SignedInMainNav } from "./signed-in-main-nav";
import { SignedInMobileNav } from "./signed-in-mobile-nav";

export async function Navbar() {
	const currentUser = await getCurrentUser();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/40">
			<div className="mx-auto max-w-7xl px-6 h-18 flex items-center justify-between">
				<NextLink href="/" className="flex items-center space-x-3.5">
					<div className="text-xl font-bold leading-tight tracking-tighter md:text-2xl">
						Syntra
					</div>
					<div className="inline-flex items-center justify-center px-2 py-0.5 rounded-sm bg-blue-50 border border-blue-600 text-blue-600 text-xs font-bold">
						BETA
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
							name={currentUser.name}
						/>
						<SignedInMobileNav
							email={currentUser.email}
							name={currentUser.name}
						/>
					</>
				)}
			</div>
		</header>
	);
}
