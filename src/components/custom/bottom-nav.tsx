import { BottomNavMenu } from "./bottom-nav-menu";
import { getNotifications } from "@/data/get-notification.data";

export async function BottomNav({ userId }: { userId: string }) {
	const notifications = await getNotifications(userId);

	return (
		<div className="fixed bottom-0 z-50 w-full border-t border-neutral-300 bg-neutral-100/95 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-100/60 md:hidden">
			<BottomNavMenu
				unreadNotifications={
					notifications.filter((n) => n.status === "unread").length
				}
			/>
		</div>
	);
}
