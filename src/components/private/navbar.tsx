import { NextLink } from "../ui/next-link";
import { ModeToggle } from "./mode-toggle";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { MobileNav } from "./mobile-nav";
import { getNotifications } from "@/data/queries/get-notifications";

type User = {
	id: string;
	username: string;
	tag: string;
	displayName: string;
};

type NavbarProps = {
	user: User;
};

export async function Navbar({ user }: NavbarProps) {
	const notifications = await getNotifications(user.id);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-neutral-100/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-100/60 dark:border-neutral-700 dark:bg-neutral-800/95 dark:supports-[backdrop-filter]:bg-neutral-800/60">
			<div className="mx-auto max-w-7xl flex items-center justify-between h-18 md:h-20 px-6 md:px-0">
				<NextLink
					href="/app"
					className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl"
				>
					Syntra
				</NextLink>
				<div className="flex items-center justify-end gap-3">
					<ModeToggle className="hidden md:flex" />
					<NotificationsDropdown notifications={notifications} />
					<UserDropdown user={user} />
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
