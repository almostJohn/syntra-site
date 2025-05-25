import { Branding } from "@/components/branding";
import { Breadcrumbs } from "./breadcrumbs";
import { UserMenu } from "@/components/user-menu";
import { getCurrentUser } from "@/lib/auth";

export async function MainNav() {
	const currentUser = await getCurrentUser();

	return (
		<>
			<div className="hidden items-center gap-4 justify-start md:flex">
				<Branding href="/dashboard" />
				{currentUser && <Breadcrumbs displayName={currentUser.display_name} />}
			</div>
			<div className="hidden items-center justify-end md:flex">
				{currentUser && (
					<UserMenu
						email={currentUser.email}
						displayName={currentUser.display_name}
					/>
				)}
			</div>
		</>
	);
}
