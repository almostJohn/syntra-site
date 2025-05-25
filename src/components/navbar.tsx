import { Branding } from "./branding";
import { getCurrentUser } from "@/lib/auth";
import { DefaultNav as SignedOutDefaultNav } from "./drawer/signed-out/default-nav";
import { DrawerMenu as SignedOutMobileDrawerMenu } from "./drawer/signed-out/drawer-menu";
import { DefaultNav as SignedInDefaultNav } from "./drawer/signed-in/default-nav";
import { DrawerMenu as SignedInMobileDrawerMenu } from "./drawer/signed-in/drawer-menu";

export async function Navbar() {
	const currentUser = await getCurrentUser();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
				<div className="flex items-center justify-start">
					<Branding href="/" />
				</div>
				<div className="flex items-center justify-end gap-3">
					{currentUser && (
						<>
							<SignedInDefaultNav
								email={currentUser.email}
								displayName={currentUser.display_name}
							/>
							<SignedInMobileDrawerMenu
								email={currentUser.email}
								displayName={currentUser.display_name}
							/>
						</>
					)}
					{!currentUser && (
						<>
							<SignedOutDefaultNav />
							<SignedOutMobileDrawerMenu />
						</>
					)}
				</div>
			</div>
		</header>
	);
}
