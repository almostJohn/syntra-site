import { getCurrentUser } from "@/lib/auth";
import { Branding } from "@/components/branding";
import { MainNav } from "./main-nav.dashboard";

export async function Navbar() {
	const currentUser = await getCurrentUser();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
				<Branding href="/dashboard" />
				{currentUser && (
					<MainNav
						email={currentUser.email}
						displayName={currentUser.display_name}
					/>
				)}
			</div>
		</header>
	);
}
