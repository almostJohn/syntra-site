"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export function BottomNav() {
	const pathname = usePathname();

	return (
		<div className="fixed bottom-0 z-50 w-full border-t border-neutral-200 dark:border-neutral-700 bg-neutral-100/95 backdrop-blur-2xl supports-[backdrop-filter]:bg-neutral-100/60 dark:bg-neutral-800/95 dark:supports-[backdrop-filter]:bg-neutral-800/60 md:hidden">
			<div className="mx-auto max-w-7xl flex items-center justify-between h-18 px-6">
				<NextLink
					href="/dashboard"
					className={cn(
						"rounded-sm inline-flex items-center justify-center size-11 px-4 py-2 transition-colors",
						pathname === "/dashboard"
							? "bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100"
							: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-100",
					)}
				>
					<Icons.apps className="size-5 shrink-0" />
				</NextLink>
				<NextLink
					href="/dashboard/activity-logs"
					className={cn(
						"rounded-sm inline-flex items-center justify-center size-11 px-4 py-2 transition-colors",
						pathname === "/dashboard/activity-logs"
							? "bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100"
							: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-100",
					)}
				>
					<Icons.logs className="size-5 shrink-0" />
				</NextLink>
				<NextLink
					href="/dashboard/profile"
					className={cn(
						"rounded-sm inline-flex items-center justify-center size-11 px-4 py-2 transition-colors",
						pathname === "/dashboard/profile"
							? "bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100"
							: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-100",
					)}
				>
					<Icons.user className="size-5 shrink-0" />
				</NextLink>
				<NextLink
					href="/dashboard/settings"
					className={cn(
						"rounded-sm inline-flex items-center justify-center size-11 px-4 py-2 transition-colors",
						pathname === "/dashboard/settings"
							? "bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100"
							: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-100",
					)}
				>
					<Icons.settings className="size-5 shrink-0" />
				</NextLink>
			</div>
		</div>
	);
}
