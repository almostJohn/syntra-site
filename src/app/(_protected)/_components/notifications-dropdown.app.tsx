"use client";

import { useState } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { updateNotificationStatusById } from "../actions/notifications/update-notification-status-by-id";
import { DropdownMenu as DropdownMenuWrapper } from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import type { Notification } from "@/lib/data.types";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownButton, Dropdown } from "./shared/dropdown";
import { Check, Inbox, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatting";

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
	const [activeFilter, setActiveFilter] = useState<"read" | "unread">("unread");

	function onClose() {
		setInteracted((prev) => !prev);
	}

	function setFilter(filter: "read" | "unread") {
		setActiveFilter(filter);
	}

	const unreadNotifications = notifications.filter(
		(notification) => notification.status === "unread",
	);

	const readNotifications = notifications.filter(
		(notification) => notification.status === "read",
	);

	return (
		<DropdownMenuWrapper open={interacted} onOpenChange={setInteracted}>
			<DropdownButton
				buttonSize="icon"
				buttonType="ghost"
				className="relative hidden rounded-full md:flex"
			>
				<Icons.bell className="size-5 shrink-0" />
				{unreadNotifications.length > 0 && (
					<span className="absolute -top-1 -right-1 inline-flex size-5 items-center justify-center rounded-full bg-red-500 text-center text-xs font-medium text-white">
						{unreadNotifications.length}
					</span>
				)}
			</DropdownButton>
			<Dropdown
				className="flex h-full w-98 flex-col overflow-hidden rounded-sm border border-neutral-800 bg-neutral-900 p-0 text-neutral-100 shadow-lg"
				align="end"
			>
				<div
					className={cn(
						"flex w-full flex-col border-b border-neutral-800 p-4 pb-0",
					)}
				>
					<div className="flex items-center gap-6">
						<div className="flex flex-col">
							<button
								className={cn(
									"text-muted-foreground cursor-pointer text-sm font-medium hover:text-neutral-100",
									activeFilter === "unread" && "text-neutral-100",
								)}
								onClick={() => setFilter("unread")}
							>
								Unread
							</button>
							<div
								className={cn(
									"mt-3 h-[2px] w-full bg-transparent",
									activeFilter === "unread" && "border-b-2 border-neutral-100",
								)}
							/>
						</div>
						<div className="flex flex-col">
							<button
								className={cn(
									"text-muted-foreground cursor-pointer text-sm font-medium hover:text-neutral-100",
									activeFilter === "read" && "text-neutral-100",
								)}
								onClick={() => setFilter("read")}
							>
								Read
							</button>
							<div
								className={cn(
									"mt-3 h-[2px] w-full bg-transparent",
									activeFilter === "read" && "border-b-2 border-neutral-100",
								)}
							/>
						</div>
					</div>
				</div>
				<ScrollArea className="h-[400px]">
					{activeFilter === "unread" &&
						(unreadNotifications.length === 0 ? (
							<div className="mx-auto flex flex-col items-center justify-center gap-2 py-24 text-center">
								<div className="mx-auto flex justify-center">
									<div className="text-muted-foreground flex size-12 items-center justify-center rounded-full bg-neutral-800">
										<Inbox className="size-6 shrink-0 text-neutral-100" />
									</div>
								</div>
								<p className="text-muted-foreground text-center text-sm">
									No new notifications.
								</p>
							</div>
						) : (
							<div className="flex flex-col">
								{unreadNotifications.map((notification) => (
									<NotificationItem
										key={notification.id}
										notification={notification}
										onClose={onClose}
									/>
								))}
							</div>
						))}
					{activeFilter === "read" &&
						(readNotifications.length === 0 ? (
							<div className="mx-auto flex flex-col items-center justify-center gap-2 py-24 text-center">
								<div className="mx-auto flex justify-center">
									<div className="text-muted-foreground flex size-12 items-center justify-center rounded-full bg-neutral-800">
										<Inbox className="size-6 shrink-0 text-neutral-100" />
									</div>
								</div>
								<p className="text-muted-foreground text-center text-sm">
									No new notifications.
								</p>
							</div>
						) : (
							<div className="flex flex-col">
								{readNotifications.map((notification) => (
									<NotificationItem
										key={notification.id}
										notification={notification}
										onClose={onClose}
									/>
								))}
							</div>
						))}
				</ScrollArea>
			</Dropdown>
		</DropdownMenuWrapper>
	);
}

function NotificationItem({
	notification,
	onClose,
}: {
	notification: Notification;
	onClose: () => void;
}) {
	const { formAction, isPending } = useServerAction(
		toAction(updateNotificationStatusById),
		initialState,
	);

	return (
		<>
			{notification.status === "unread" && (
				<div className="inline-flex items-center gap-4 p-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:bg-neutral-800">
					<div className="size-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
					<div className="flex flex-col gap-2">
						<p className="text-sm whitespace-pre-wrap text-neutral-100/80">
							{notification.content}
						</p>
						<span className="text-muted-foreground text-xs">
							{formatDate(new Date(notification.createdAt), "short")}
						</span>
					</div>
					<form
						action={() => {
							formAction([notification.id, "read"]);
						}}
					>
						<Button
							size="icon"
							variant="ghost"
							className="size-8 cursor-pointer rounded-full px-2 hover:bg-neutral-700 hover:text-neutral-100"
							disabled={isPending}
						>
							{isPending ? (
								<Loader2 className="size-6 shrink-0 animate-spin" />
							) : (
								<Check className="size-6 shrink-0" />
							)}
						</Button>
					</form>
				</div>
			)}
			{notification.status === "read" && (
				<NextLink
					href="/app/notifications"
					className={cn(
						"inline-flex items-center gap-4 p-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:bg-neutral-800",
					)}
					onClick={onClose}
				>
					<div className="size-1.5 shrink-0 animate-pulse rounded-full bg-neutral-600" />
					<div className="flex flex-col gap-2">
						<p className="text-sm whitespace-pre-wrap text-neutral-100/80">
							{notification.content}
						</p>
						<span className="text-muted-foreground text-xs">
							{formatDate(new Date(notification.createdAt), "short")}
						</span>
					</div>
				</NextLink>
			)}
		</>
	);
}
