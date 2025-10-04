import { NextLink } from "@/components/ui/next-link";
import { Icons } from "@/components/icons";
import { DataQuery } from "@/lib/data";
import { NotificationDropdown } from "./notification-dropdown";
import { UserDropdown } from "./user-dropdown";

type User = {
	id: string;
	username: string;
	avatar: string;
};

type NavbarProps = {
	user: User;
};

export async function Navbar({ user }: NavbarProps) {
	const notifications = await DataQuery.getAllNotifications(user.id);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-900/60">
			<div className="flex h-18 w-full items-center justify-between px-4 sm:px-6 md:px-8">
				<NextLink href="/app" className="flex items-center gap-3">
					<Icons.todo className="size-8 shrink-0" />
					<h1 className="text-xl font-bold md:text-2xl">syntra</h1>
				</NextLink>
				<div className="flex items-center justify-end gap-3">
					<NotificationDropdown notifications={notifications} />
					<UserDropdown user={user} />
				</div>
			</div>
		</header>
	);
}
