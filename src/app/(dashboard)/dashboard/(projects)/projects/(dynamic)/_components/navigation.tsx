"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NextLink } from "@/components/ui/next-link";
import { Separator } from "@/components/ui/separator";

type NavigationProps = {
	projectId: string;
};

export function Navigation({ projectId }: NavigationProps) {
	const pathname = usePathname();

	return (
		<div className="flex flex-col">
			<nav className="flex items-center gap-2">
				<NextLink
					href={`/dashboard/projects/${projectId}`}
					className={cn(
						"inline-flex items-center justify-center px-3 py-1 h-9 text-sm font-medium rounded-sm bg-transparent transition-colors",
						pathname === `/dashboard/projects/${projectId}`
							? "bg-neutral-200 dark:bg-neutral-700"
							: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-100",
					)}
				>
					Overview
				</NextLink>
				<NextLink
					href={`/dashboard/projects/${projectId}/settings`}
					className={cn(
						"inline-flex items-center justify-center px-3 py-1 h-9 text-sm font-medium rounded-sm bg-transparent transition-colors",
						pathname === `/dashboard/projects/${projectId}/settings`
							? "bg-neutral-200 dark:bg-neutral-700"
							: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-100",
					)}
				>
					Settings
				</NextLink>
			</nav>
			<Separator className="mt-2" />
		</div>
	);
}
