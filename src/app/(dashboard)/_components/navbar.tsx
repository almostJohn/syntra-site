import { NextLink } from "../../../components/ui/next-link";
import { ModeToggle } from "./mode-toggle";
import { getUserNotifications } from "@/data/queries/get-user-notifications";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { MobileNav } from "./mobile-nav";

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
		<header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-neutral-100/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-100/60 dark:border-neutral-700 dark:bg-neutral-800/95 dark:supports-[backdrop-filter]:bg-neutral-800/60">
			<div className="max-w-7xl mx-auto flex items-center justify-between h-18 md:h-20 px-6 md:px-0">
				<NextLink href="/dashboard" className="flex items-center space-x-3">
					<div className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl">
						Syntra
					</div>
					<div className="inline-flex items-center justify-center px-2 py-0.5 rounded-sm bg-neutral-200 border border-neutral-300 dark:border-neutral-800 dark:bg-neutral-700 shadow-sm text-xs font-bold">
						BETA
					</div>
				</NextLink>
				<div className="flex items-center justify-end gap-2">
					<ModeToggle className="hidden md:flex" />
					<NotificationsDropdown notifications={notifications} />
					<UserDropdown user={user} />
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
