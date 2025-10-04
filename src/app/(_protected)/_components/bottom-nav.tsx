import { DataQuery } from "@/lib/data";
import { BottomNavItems } from "./bottom-nav-items";

type User = {
	id: string;
	username: string;
	avatar: string;
};

type BottomNavProps = {
	user: User;
};

export async function BottomNav({ user }: BottomNavProps) {
	const notifications = await DataQuery.getAllNotifications(user.id);

	return (
		<div className="fixed bottom-0 z-50 w-full border-t border-neutral-800 bg-neutral-900/95 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-900/60 md:hidden">
			<BottomNavItems
				unreadNotifications={
					notifications.filter(
						(notification) => notification.status === "unread",
					).length
				}
			/>
		</div>
	);
}
