"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

type BottomNavItemsProps = {
	unreadNotifications: number;
};

export function BottomNavItems({ unreadNotifications }: BottomNavItemsProps) {
	const pathname = usePathname();

	return (
		<div className="flex h-18 w-full items-center justify-between px-4">
			<NextLink
				href="/app"
				className={cn(
					"inline-flex size-12 items-center justify-center rounded-sm p-2 whitespace-nowrap transition-colors",
					pathname === "/app"
						? "border border-neutral-700 bg-neutral-800 text-neutral-100"
						: "hover:bg-neutral-800 hover:text-neutral-100",
				)}
				title="Projects"
				aria-label="Projects"
			>
				<Icons.apps className="size-6 shrink-0" />
			</NextLink>
			<NextLink
				href="/app/settings"
				className={cn(
					"inline-flex size-12 items-center justify-center rounded-sm p-2 whitespace-nowrap transition-colors",
					pathname === "/app/settings"
						? "border border-neutral-700 bg-neutral-800 text-neutral-100"
						: "hover:bg-neutral-800 hover:text-neutral-100",
				)}
				title="Account Settings"
				aria-label="Account Settings"
			>
				<Icons.settings className="size-6 shrink-0" />
			</NextLink>
			<NextLink
				href="/app/notifications"
				className={cn(
					"inline-flex size-12 items-center justify-center rounded-sm p-2 whitespace-nowrap transition-colors",
					pathname === "/app/notifications"
						? "border border-neutral-700 bg-neutral-800 text-neutral-100"
						: "hover:bg-neutral-800 hover:text-neutral-100",
				)}
				title="Notifications"
				aria-label="Notifications"
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
