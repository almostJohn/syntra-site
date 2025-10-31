"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "../ui/next-link";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

export function BottomNavMenu({
	unreadNotifications,
}: {
	unreadNotifications: number;
}) {
	const pathname = usePathname();

	return (
		<div className="flex h-18 w-full items-center justify-between px-4">
			<NextLink
				href="/app"
				className={cn(
					"inline-flex size-12 items-center justify-center rounded-lg p-2 whitespace-nowrap transition-colors",
					pathname === "/app"
						? "bg-neutral-200 text-neutral-900"
						: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900",
				)}
				title="Projects"
				aria-label="Projects"
			>
				<Icons.apps className="size-6 shrink-0" />
			</NextLink>
			<NextLink
				href="/app/settings"
				className={cn(
					"inline-flex size-12 items-center justify-center rounded-lg p-2 whitespace-nowrap transition-colors",
					pathname === "/app/settings"
						? "bg-neutral-200 text-neutral-900"
						: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900",
				)}
				title="Settings"
				aria-label="Settings"
			>
				<Icons.settings className="size-6 shrink-0" />
			</NextLink>
			<NextLink
				href="/app/notifications"
				className={cn(
					"inline-flex size-12 items-center justify-center rounded-lg p-2 whitespace-nowrap transition-colors",
					pathname === "/app/notifications"
						? "bg-neutral-200 text-neutral-900"
						: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900",
				)}
				title={
					unreadNotifications === 0
						? "You have no unread notifications"
						: `You have ${unreadNotifications} unread ${unreadNotifications === 1 ? "notification" : "notifications"}`
				}
				aria-label={
					unreadNotifications === 0
						? "You have no unread notifications"
						: `You have ${unreadNotifications} unread ${unreadNotifications === 1 ? "notification" : "notifications"}`
				}
			>
				<div className="relative">
					<Icons.bell className="size-6 shrink-0" />
					{unreadNotifications > 0 && (
						<span className="absolute -top-1 -right-1 inline-flex size-5 items-center justify-center rounded-full bg-red-500 text-center text-xs font-medium text-white">
							{unreadNotifications}
						</span>
					)}
				</div>
			</NextLink>
		</div>
	);
}
