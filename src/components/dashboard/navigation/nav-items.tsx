"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Folder, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItemsProps = {
	notificationCount: number;
};

export function NavItems({ notificationCount }: NavItemsProps) {
	const pathname = usePathname();

	return (
		<nav className="flex h-18 items-center justify-between px-6">
			<Link
				href="/dashboard"
				className={cn(
					"flex items-center justify-center rounded-md p-2 transition-colors duration-200",
					pathname === "/dashboard"
						? "border border-teal-500/30 bg-teal-500/10 text-teal-500"
						: "text-neutral-500 hover:border-teal-500/30 hover:bg-teal-500/10 hover:text-teal-500",
				)}
				title="Projects"
				aria-label="Projects"
			>
				<Folder className="size-6 shrink-0" />
			</Link>
			<Link
				href="/dashboard/settings"
				className={cn(
					"flex items-center justify-center rounded-md p-2 transition-colors duration-200",
					pathname === "/dashboard/settings"
						? "border border-teal-500/30 bg-teal-500/10 text-teal-500"
						: "text-neutral-500 hover:border-teal-500/30 hover:bg-teal-500/10 hover:text-teal-500",
				)}
				title="Settings"
				aria-label="Settings"
			>
				<Settings2 className="size-6 shrink-0" />
			</Link>
			<Link
				href="/dashboard/notifications"
				className={cn(
					"flex items-center justify-center rounded-md p-2 transition-colors duration-200",
					pathname === "/dashboard/notifications"
						? "border border-teal-500/30 bg-teal-500/10 text-teal-500"
						: "text-neutral-500 hover:border-teal-500/30 hover:bg-teal-500/10 hover:text-teal-500",
				)}
				title={
					notificationCount && notificationCount === 0
						? "You have no notifications."
						: `You have ${notificationCount} unread ${notificationCount === 1 ? "notification" : "notifications"}.`
				}
				aria-label="Notifications"
			>
				<div className="relative">
					<Bell className="size-6 shrink-0" />
					{notificationCount > 0 && (
						<div className="absolute -top-1 -right-1 inline-flex size-5 items-center justify-center rounded-full bg-teal-500 text-center text-xs font-medium text-white">
							{notificationCount}
						</div>
					)}
				</div>
			</Link>
		</nav>
	);
}
