"use client";

import { useTransition, useState } from "react";
import { NotificationItem } from "./notification-item";
import type { NotificationWithAuthor } from "@/data/get-notification.data";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

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
	const [notifications, setNotifications] = useState(initialData);
	const [page, setPage] = useState(1);
	const [isPending, startTransition] = useTransition();

	async function handleNext() {
		startTransition(async () => {
			const { data } = await action(page + 1, 10);
			setNotifications((prev) => [...prev, ...data]);
			setPage((prev) => prev + 1);
		});
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="rounded-lg border border-neutral-300 bg-neutral-200">
				<div className="flex flex-col">
					{notifications.map((notification) => (
						<NotificationItem
							key={notification.id}
							notificationWithAuthor={notification}
						/>
					))}
				</div>
			</div>
			<div className="flex items-center justify-between">
				<Button
					type="button"
					onClick={handleNext}
					disabled={isPending}
					variant="ghost"
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
		</div>
	);
}
