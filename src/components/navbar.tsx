import { NextLink } from "./ui/next-link";
import { getCurrentUser } from "@/lib/auth/sessions";
import { SignedOutMainNav } from "./signed-out-main-nav";
import { SignedOutMobileNav } from "./signed-out-mobile-nav";

export async function Navbar() {
	const user = await getCurrentUser();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-neutral-100/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-100/60 dark:border-neutral-700 dark:bg-neutral-800/95 dark:supports-[backdrop-filter]:bg-neutral-800/60">
			<div className="mx-auto max-w-7xl px-6 h-18 flex items-center justify-between">
				<NextLink href="/" className="flex items-center space-x-3">
					<div className="text-xl font-bold leading-tight tracking-tighter md:text-2xl">
						Syntra
					</div>
					<div className="inline-flex items-center justify-center px-2 py-0.5 rounded-sm bg-neutral-200 border border-neutral-300 dark:border-neutral-800 dark:bg-neutral-700 shadow-sm text-xs font-bold">
						BETA
					</div>
				</NextLink>
				{!user && (
					<>
						<SignedOutMainNav />
						<SignedOutMobileNav />
					</>
				)}
			</div>
		</header>
	);
}
