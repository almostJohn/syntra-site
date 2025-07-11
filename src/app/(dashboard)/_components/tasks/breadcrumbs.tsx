"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NextLink } from "@/components/ui/next-link";

type BreadcrumbsProps = {
	projectId: string;
};

export function Breadcrumbs({ projectId }: BreadcrumbsProps) {
	const pathname = usePathname();

	const routes = [
		{ title: "Overview", href: `/dashboard/projects/${projectId}` },
		{ title: "Settings", href: `/dashboard/projects/${projectId}/settings` },
	];

	return (
		<div className="flex flex-col border-b border-neutral-200 dark:border-neutral-700 w-full">
			<nav className="flex items-center gap-2">
				{routes.map((route) => (
					<div key={route.title} className="flex flex-col">
						<NextLink
							href={route.href}
							className={cn(
								"inline-flex items-center justify-center px-3 py-1 rounded-sm bg-transparent text-sm font-medium h-9 transition-colors",
								pathname === route.href
									? "text-neutral-900 dark:text-neutral-100"
									: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-100",
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
			</nav>
		</div>
	);
}
