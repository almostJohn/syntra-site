"use client";

import { useState } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { updateNotificationStatus } from "../actions/update-notification-status";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Loader2 } from "lucide-react";
import type { Notification } from "@/lib/data.types";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type NotificationsDropdownProps = {
	notifications: Notification[];
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function NotificationsDropdown({
	notifications,
}: NotificationsDropdownProps) {
	const [interacted, setInteracted] = useState(false);
	const { formAction, isPending } = useServerAction(
		toAction(updateNotificationStatus),
		initialState,
	);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	const unreadNotifications = notifications.filter(
		(notification) => notification.status === "unread",
	);

	const readNotifications = notifications.filter(
		(notification) => notification.status === "read",
	);

	return (
		<DropdownMenu open={interacted} onOpenChange={setInteracted}>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="relative hidden size-9 cursor-pointer rounded-full border border-neutral-700 px-2 hover:bg-neutral-800 hover:text-neutral-100 md:flex"
				>
					<Icons.bell className="size-5 shrink-0" />
					{unreadNotifications.length > 0 && (
						<span className="absolute -top-1 -right-1 inline-flex size-5 items-center justify-center rounded-full bg-red-500 text-center text-xs font-medium text-white">
							{unreadNotifications.length}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="flex h-full w-96 flex-col overflow-hidden rounded-sm border border-neutral-800 bg-neutral-900 p-0 text-neutral-100 shadow-lg"
				align="end"
			>
				<div className="flex shrink-0 items-center justify-between border-b border-neutral-800 p-4">
					<h3 className="text-sm font-medium">Notifications</h3>
					{unreadNotifications.length > 0 && (
						<form
							action={() => {
								formAction(["read"]);
								onClose();
							}}
						>
							<Button
								size="sm"
								variant="ghost"
								className="h-8 cursor-pointer rounded-sm px-2 hover:bg-neutral-800 hover:text-neutral-100"
								disabled={isPending}
							>
								{isPending ? (
									<Loader2 className="size-4 shrink-0 animate-spin" />
								) : (
									"Mark all as read"
								)}
							</Button>
						</form>
					)}
				</div>
				<ScrollArea className="h-[400px]">
					{notifications.length === 0 && (
						<div className="mx-auto flex items-center justify-center py-24 text-center">
							<p className="text-muted-foreground text-sm">
								No new notifications.
							</p>
						</div>
					)}
					{unreadNotifications.length > 0 && (
						<div className="flex flex-col">
							<div className="text-muted-foreground flex items-center gap-2 bg-neutral-800 px-4 py-2">
								<p className="text-sm font-medium">Unread</p>
								<em className="text-sm">({unreadNotifications.length})</em>
							</div>
							<div className="flex flex-col">
								{unreadNotifications.map((notification) => (
									<NotificationItem
										key={notification.id}
										notification={notification}
										onClose={onClose}
									/>
								))}
							</div>
						</div>
					)}
					{readNotifications.length > 0 && (
						<div className="flex flex-col">
							<div className="text-muted-foreground flex items-center gap-2 bg-neutral-800 px-4 py-2">
								<p className="text-sm font-medium">Read</p>
								<em className="text-sm">({readNotifications.length})</em>
							</div>
							<div className="flex flex-col">
								{readNotifications.map((notification) => (
									<NotificationItem
										key={notification.id}
										notification={notification}
										onClose={onClose}
									/>
								))}
							</div>
						</div>
					)}
				</ScrollArea>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function NotificationItem({
	notification,
	onClose,
}: {
	notification: Notification;
	onClose: () => void;
}) {
	return (
		<NextLink
			href="/app/notifications"
			className={cn(
				"inline-flex items-center gap-4 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:bg-neutral-800",
			)}
			onClick={onClose}
		>
			{notification.status === "unread" && (
				<div className="size-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
			)}
			<p className="text-muted-foreground text-sm whitespace-pre-wrap">
				{notification.content}{" "}
				{notification.status === "read" && (
					<em className="text-neutral-100">(read)</em>
				)}
			</p>
		</NextLink>
	);
}
