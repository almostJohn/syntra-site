"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NextLink } from "@/components/ui/next-link";

export function Breadcrumbs({ projectId }: { projectId: string }) {
	const pathname = usePathname();

	const routes = [
		{ title: "Overview", href: `/app/projects/${projectId}` },
		{ title: "Settings", href: `/app/projects/${projectId}/settings` },
	];

	return (
		<div className="flex flex-col border-b border-neutral-200 dark:border-neutral-700 w-full mb-2">
			<div className="flex items-center gap-2">
				{routes.map((route) => (
					<div key={route.title} className="flex flex-col">
						<NextLink
							href={route.href}
							className={cn(
								"flex items-center justify-center px-2 py-1 rounded-sm bg-transparent h-9 text-sm font-medium transition-colors duration-100",
								pathname === route.href
									? "text-neutral-800 dark:text-neutral-100"
									: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-100",
							)}
						>
							{route.title}
						</NextLink>
						<div
							className={cn(
								"h-[2px] w-full",
								pathname === route.href
									? "border-b-2 border-neutral-900 dark:border-neutral-100 -mb-[2px]"
									: "bg-transparent",
							)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
