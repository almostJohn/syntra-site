import type { Notification } from "@/types";
import { formatDate } from "@/lib/formatting";
import { CheckCheck, Clock } from "lucide-react";
import { MarkNotificationAsRead } from "../forms/mark-notification-as-read";

type NotificationItemProps = {
	notification: Notification;
};

function NotificationBadge({ isRead }: { isRead: boolean }) {
	return isRead ? (
		<div className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-neutral-200 px-2 py-0.5 text-xs font-semibold whitespace-nowrap shadow-sm">
			Done
		</div>
	) : (
		<div className="inline-flex items-center justify-center rounded-md border border-teal-500 bg-teal-500/30 px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-teal-500 shadow-sm">
			New
		</div>
	);
}

export function NotificationItem({ notification }: NotificationItemProps) {
	return (
		<div className="rounded-md border border-neutral-200 bg-white px-6 py-4 shadow-sm">
			<div className="flex flex-col gap-4 md:flex-row md:justify-between">
				<div className="flex items-center gap-6">
					{notification.isRead ? (
						<CheckCheck className="mt-1 size-5 shrink-0 text-emerald-500" />
					) : (
						<div className="mt-1 size-2 shrink-0 animate-pulse rounded-full bg-teal-500" />
					)}
					<div className="grid gap-2">
						<div className="max-w-sm">
							<NotificationBadge isRead={notification.isRead} />
						</div>
						<p className="whitespace-pre-wrap">{notification.description}</p>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					{!notification.isRead && (
						<div className="flex items-center justify-end">
							<MarkNotificationAsRead notificationId={notification.id} />
						</div>
					)}
					<div className="max-w-md">
						<div className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-neutral-300 bg-neutral-200 px-2 py-1 text-xs font-medium whitespace-nowrap text-neutral-500">
							<Clock className="size-4 shrink-0" />
							<span>
								{formatDate(new Date(notification.createdAt), "relative")}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
