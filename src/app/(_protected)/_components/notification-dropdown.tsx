"use client";

import { useState } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { updateNotificationStatusById } from "../actions/notifications/update-notification-status-by-id";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import type { Notification } from "@/lib/data.types";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Empty,
	EmptyContent,
	EmptyHeader,
	EmptyHeaderIconPlaceholder,
} from "@/components/ui/empty";
import { Check, Inbox, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/formatting";
import { NextLink } from "@/components/ui/next-link";

type NotificationDropdownProps = {
	notifications: Notification[];
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function NotificationDropdown({
	notifications,
}: NotificationDropdownProps) {
	const [interacted, setInteracted] = useState(false);
	const [activeFilter, setActiveFilter] = useState<"read" | "unread">("unread");
	const { formAction, isPending } = useServerAction(
		toAction(updateNotificationStatusById),
		initialState,
	);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	function setFilter(filter: "read" | "unread") {
		setActiveFilter(filter);
	}

	const unreadNotifications = notifications.filter(
		(n) => n.status === "unread",
	);
	const readNotificaitons = notifications.filter((n) => n.status === "read");

	return (
		<DropdownMenu open={interacted} onOpenChange={setInteracted}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="relative hidden size-9 rounded-full md:flex"
				>
					<Icons.bell className="size-6 shrink-0" />
					{unreadNotifications.length > 0 && (
						<span className="absolute -top-1 -right-1 inline-flex size-5 items-center justify-center rounded-full bg-red-500 text-center text-xs font-medium text-white">
							{unreadNotifications.length}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="flex h-full w-98 flex-col overflow-hidden rounded-sm border border-neutral-800 bg-neutral-900 p-0 shadow-xl"
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
				<ScrollArea className="h-[500px]">
					{/* Unread Tab */}
					{activeFilter === "unread" &&
						(unreadNotifications.length === 0 ? (
							<Empty>
								<EmptyHeader>
									<EmptyHeaderIconPlaceholder>
										<Inbox className="size-8 shrink-0 text-neutral-100" />
									</EmptyHeaderIconPlaceholder>
								</EmptyHeader>
								<EmptyContent>No new notifications.</EmptyContent>
							</Empty>
						) : (
							<div className="flex flex-col">
								{unreadNotifications.map((notification) => (
									<div
										key={`unread-${notification.id}`}
										className="inline-flex items-center gap-4 p-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:bg-neutral-800"
									>
										<div className="size-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
										<div className="grid gap-2">
											<p className="whitespace-pre-wrap text-neutral-100/80">
												{notification.content}
											</p>
											<span className="text-xs text-neutral-500">
												{formatDate(new Date(notification.createdAt), "short")}
											</span>
										</div>
										<form
											action={() => {
												formAction([notification.id, "read"]); // always mark as read here
												onClose();
											}}
										>
											<Button
												type="submit"
												variant="ghost"
												size="icon"
												className="size-8 rounded-full px-2 text-neutral-100 hover:bg-neutral-700"
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
								))}
							</div>
						))}
					{/* Read Tab */}
					{activeFilter === "read" &&
						(readNotificaitons.length === 0 ? (
							<Empty>
								<EmptyHeader>
									<EmptyHeaderIconPlaceholder>
										<Inbox className="size-8 shrink-0 text-neutral-100" />
									</EmptyHeaderIconPlaceholder>
								</EmptyHeader>
								<EmptyContent>No new notifications.</EmptyContent>
							</Empty>
						) : (
							<div className="flex flex-col">
								{readNotificaitons.map((notification) => (
									<NextLink
										key={`read-${notification.id}`}
										href="/app/notifications"
										className="inline-flex items-center gap-4 p-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:bg-neutral-800"
									>
										<div className="size-1.5 shrink-0 animate-pulse rounded-full bg-sky-500" />
										<div className="grid gap-2">
											<p className="whitespace-pre-wrap text-neutral-100/80">
												{notification.content}{" "}
												<em className="text-neutral-500">(read)</em>
											</p>
											<span className="text-xs text-neutral-500">
												{formatDate(new Date(notification.createdAt), "short")}
											</span>
										</div>
									</NextLink>
								))}
							</div>
						))}
				</ScrollArea>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
