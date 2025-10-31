import { NextLink } from "../ui/next-link";
import { Icons } from "../icons";
import { getNotifications } from "@/data/get-notification.data";
import { UserDropdown } from "./dropdowns/user-dropdown";
import { NotificationLinkBtn } from "./buttons/notification-link-btn";

type User = {
	id: string;
	username: string;
	avatar: string | null;
};

type NavbarProps = {
	user: User;
};

export async function Navbar({ user }: NavbarProps) {
	const notifications = await getNotifications(user.id);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-neutral-300 bg-neutral-100/95 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-100/60">
			<div className="flex h-18 items-center justify-between px-4 sm:px-6 md:px-8">
				<NextLink href="/app" className="flex items-center gap-2">
					<Icons.todo className="size-8 shrink-0" />
					<h1 className="text-xl font-bold md:text-2xl">Syntra</h1>
				</NextLink>
				<div className="flex items-center justify-end gap-3">
					<NotificationLinkBtn notifications={notifications} />
					<UserDropdown user={user} />
				</div>
			</div>
		</header>
	);
}
