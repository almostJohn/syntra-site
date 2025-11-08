"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { NotificationItem } from "./notification-item";
import type { NotificationWithAuthor } from "@/data/get-notification.data";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	Empty,
	EmptyContent,
	EmptyHeader,
	EmptyHeading,
} from "@/components/ui/empty";

type Tabs = "unread" | "read" | "archived";

export function NotificationList({
	initialData,
	action,
}: {
	initialData: NotificationWithAuthor[];
	action: (
		page: number,
		limit: number,
	) => Promise<{ data: NotificationWithAuthor[] }>;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentTab = (searchParams.get("tab") as Tabs) || "unread";
	const [tab, setTab] = useState<Tabs>(currentTab);
	const [notifications, setNotifications] = useState(initialData);
	const [page, setPage] = useState(1);
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		setNotifications(initialData);
	}, [initialData]);

	async function handleNext() {
		startTransition(async () => {
			const { data } = await action(page + 1, 10);
			setNotifications((prev) => [...prev, ...data]);
			setPage((prev) => prev + 1);
		});
	}

	function handleTabChange(next: Tabs) {
		setTab(next);
		const params = new URLSearchParams(searchParams);
		params.set("tab", next);
		router.replace(`?${params.toString()}`, {
			scroll: false,
		});
	}

	useEffect(() => {
		const urlTab = (searchParams.get("tab") as Tabs) || "unread";
		if (urlTab !== tab) setTab(urlTab);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	const unreadNotifications = notifications.filter(
		(n) => n.status === "unread",
	);
	const readNotifications = notifications.filter((n) => n.status === "read");
	const archivedNotifications = notifications.filter(
		(n) => n.status === "archived",
	);

	const displayedNotifications =
		tab === "unread"
			? unreadNotifications
			: tab === "read"
				? readNotifications
				: archivedNotifications;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex w-full items-center border-b border-neutral-200">
				<div className="flex items-center gap-6">
					<div className="flex flex-col">
						<button
							className={cn(
								"cursor-pointer text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900",
								tab === "unread" && "text-neutral-900",
							)}
							onClick={() => handleTabChange("unread")}
						>
							Unread
						</button>
						<div
							className={cn(
								"mt-3 h-[2px] w-full bg-transparent",
								tab === "unread" && "border-b-2 border-neutral-900",
							)}
						/>
					</div>
					<div className="flex flex-col">
						<button
							className={cn(
								"cursor-pointer text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900",
								tab === "read" && "text-neutral-900",
							)}
							onClick={() => handleTabChange("read")}
						>
							Read
						</button>
						<div
							className={cn(
								"mt-3 h-[2px] w-full bg-transparent",
								tab === "read" && "border-b-2 border-neutral-900",
							)}
						/>
					</div>
					<div className="flex flex-col">
						<button
							className={cn(
								"cursor-pointer text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900",
								tab === "archived" && "text-neutral-900",
							)}
							onClick={() => handleTabChange("archived")}
						>
							Archived
						</button>
						<div
							className={cn(
								"mt-3 h-[2px] w-full bg-transparent",
								tab === "archived" && "border-b-2 border-neutral-900",
							)}
						/>
					</div>
				</div>
			</div>
			<div className="rounded-lg border border-neutral-200">
				<div className="rounded-t-lg border-b border-neutral-200 bg-neutral-100/95 p-4">
					<div className="flex flex-wrap items-center gap-4">
						<p className="text-sm font-medium">
							<span className="text-green-500">
								({unreadNotifications.length})
							</span>{" "}
							Unread
						</p>
						<p className="text-sm font-medium">
							<span className="text-purple-500">
								({readNotifications.length})
							</span>{" "}
							Read
						</p>
						<p className="text-sm font-medium">
							<span className="text-orange-500">
								({archivedNotifications.length})
							</span>{" "}
							Archived
						</p>
					</div>
				</div>
				{displayedNotifications.length === 0 ? (
					<Empty>
						<EmptyHeader>
							<Icons.sparkles className="size-14 shrink-0" />
						</EmptyHeader>
						<div className="grid gap-1">
							<EmptyHeading>
								{tab === "unread"
									? "All Caught Up!"
									: tab === "read"
										? "No Read Notifications."
										: "No Archived Notifications"}
							</EmptyHeading>
							<EmptyContent>
								{tab === "unread"
									? "Take a break, write some code, do what you do best."
									: "You have no notifications in the category."}
							</EmptyContent>
						</div>
					</Empty>
				) : (
					<div className="flex flex-col divide-y">
						{displayedNotifications.map((notification) => (
							<NotificationItem
								key={notification.id}
								notificationWithAuthor={notification}
							/>
						))}
					</div>
				)}
			</div>
			{displayedNotifications.length > 0 && (
				<div className="flex w-full items-center justify-center">
					<Button
						type="button"
						onClick={handleNext}
						disabled={isPending}
						variant="outline"
						className="w-full"
					>
						{isPending ? (
							<>
								<Icons.loading className="size-5 shrink-0" /> Loading...
							</>
						) : (
							<>Load More</>
						)}
					</Button>
				</div>
			)}
		</div>
	);
}
