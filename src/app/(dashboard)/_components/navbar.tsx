import { NextLink } from "@/components/ui/next-link";
import { UserDropdown } from "./user-dropdown";
import { UserNotifications } from "./user-notifications";
import { getUserNotifications } from "@/data/queries/get-user-notifications";

type User = {
	userId: string;
	username: string;
	displayName: string;
};

type NavbarProps = {
	user: User;
};

export async function Navbar({ user }: NavbarProps) {
	const notifications = await getUserNotifications(user.userId);

	return (
		<header className="sticky w-full top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20 px-6 md:px-0">
				<NextLink
					href="/dashboard"
					className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl"
				>
					Syntra
				</NextLink>
				<div className="flex items-center justify-end gap-4">
					<UserNotifications notifications={notifications} />
					<UserDropdown
						username={user.username}
						displayName={user.displayName}
					/>
				</div>
			</div>
		</header>
	);
}
