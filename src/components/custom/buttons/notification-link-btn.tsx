import { NextLink } from "@/components/ui/next-link";
import type { Notification } from "@/data/get-notification.data";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type NotificationLinkBtnProps = {
	notifications: Notification[];
};

export function NotificationLinkBtn({
	notifications,
}: NotificationLinkBtnProps) {
	const unreadNotifications = notifications.filter(
		(n) => n.status === "unread",
	);

	return (
		<NextLink
			href="/app/notifications"
			className={cn(
				buttonVariants({
					variant: "outline",
					size: "icon",
					className: "relative hidden size-9 rounded-lg md:flex",
				}),
			)}
			title={
				unreadNotifications.length === 0
					? "You have no unread notifications"
					: `You have ${unreadNotifications.length} unread ${unreadNotifications.length === 1 ? "notification" : "notifications"}`
			}
		>
			<Bell className="size-6 shrink-0" />
			{unreadNotifications.length > 0 && (
				<span className="absolute -top-1 -right-1 inline-flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
					{unreadNotifications.length}
				</span>
			)}
		</NextLink>
	);
}
