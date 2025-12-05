"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { Notification } from "@/types";
import { NotificationItem } from "./notification-item";
import { cn } from "@/lib/utils";
import { Empty, EmptyHeading, EmptyText } from "@/components/ui/empty";

type Tabs = "all" | "unread";

type NotificationListProps = {
	notifications: Notification[];
};

export function NotificationList({ notifications }: NotificationListProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [activeTab, setActiveTab] = useState<Tabs>("all");

	function handleTabChange(next: Tabs) {
		setActiveTab(next);
		const params = new URLSearchParams(searchParams.toString());
		params.set("tab", next);
		router.replace(`/dashboard/notifications?${params.toString()}`);
	}

	useEffect(() => {
		const urlTab = searchParams.get("tab") as Tabs;
		if (urlTab && (urlTab === "all" || urlTab === "unread")) {
			setActiveTab(urlTab);
		} else {
			setActiveTab("all");
			const params = new URLSearchParams(searchParams.toString());
			params.set("tab", "all");
			router.replace(`/dashboard/notifications?${params.toString()}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	const unreadNotifications = notifications.filter((n) => !n.isRead);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex w-full items-center border-b border-neutral-300">
				<div className="flex items-center gap-6">
					<div className="flex flex-col">
						<button
							type="button"
							className={cn(
								"cursor-pointer text-sm font-medium text-neutral-500 transition-colors duration-200 hover:text-neutral-950",
								activeTab === "all" && "text-neutral-950",
							)}
							onClick={() => handleTabChange("all")}
						>
							All
						</button>
						<div
							className={cn(
								"mt-2 h-[2px] w-full bg-transparent",
								activeTab === "all" && "border-b-2 border-neutral-950",
							)}
						/>
					</div>
					<div className="flex flex-col">
						<button
							type="button"
							className={cn(
								"cursor-pointer text-sm font-medium text-neutral-500 transition-colors duration-200 hover:text-neutral-950",
								activeTab === "unread" && "text-neutral-950",
							)}
							onClick={() => handleTabChange("unread")}
						>
							Unread
						</button>
						<div
							className={cn(
								"mt-2 h-[2px] w-full bg-transparent",
								activeTab === "unread" && "border-b-2 border-neutral-950",
							)}
						/>
					</div>
				</div>
			</div>

			{notifications.length === 0 ? (
				<Empty>
					<EmptyHeading>You&apos;re all caught up!</EmptyHeading>
					<EmptyText>
						Take a break, write some code, do what you do best.
					</EmptyText>
				</Empty>
			) : activeTab === "all" ? (
				notifications.map((notification) => (
					<NotificationItem key={notification.id} notification={notification} />
				))
			) : unreadNotifications.length === 0 ? (
				<Empty>
					<EmptyHeading>No unread notifications!</EmptyHeading>
					<EmptyText>You have viewed everything.</EmptyText>
				</Empty>
			) : (
				unreadNotifications.map((notification) => (
					<NotificationItem key={notification.id} notification={notification} />
				))
			)}
		</div>
	);
}
