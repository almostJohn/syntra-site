import { DataQuery } from "@/lib/data";
import { BottomNavItems } from "./bottom-nav-items.app";

export async function BottomNav({ userId }: { userId: string }) {
	const notifications = await DataQuery.getAllNotifications(userId);

	const unreadNotifications = notifications.filter(
		(notification) => notification.status === "unread",
	);

	return (
		<div className="fixed bottom-0 z-50 w-full border-t border-neutral-800 bg-neutral-900/95 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-900/60 md:hidden">
			<BottomNavItems notificationsCount={unreadNotifications.length} />
		</div>
	);
}
