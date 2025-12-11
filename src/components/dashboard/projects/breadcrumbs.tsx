"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BreadcrumbsProps = {
	projectId: string;
};

export function Breadcrumbs({ projectId }: BreadcrumbsProps) {
	const pathname = usePathname();

	return (
		<div className="flex w-full items-center border-b border-neutral-300">
			<div className="flex items-center gap-6">
				<div className="flex flex-col">
					<Link
						href={`/dashboard/projects/${projectId}`}
						className={cn(
							"cursor-pointer text-sm font-medium text-neutral-500 transition-colors duration-200 hover:text-neutral-950",
							pathname === `/dashboard/projects/${projectId}` &&
								"text-neutral-950",
						)}
					>
						Overview
					</Link>
					<div
						className={cn(
							"mt-2 h-[2px] w-full bg-transparent",
							pathname === `/dashboard/projects/${projectId}` &&
								"border-b-2 border-neutral-950",
						)}
					/>
				</div>
				<div className="flex flex-col">
					<Link
						href={`/dashboard/projects/${projectId}/settings`}
						className={cn(
							"cursor-pointer text-sm font-medium text-neutral-500 transition-colors duration-200 hover:text-neutral-950",
							pathname === `/dashboard/projects/${projectId}/settings` &&
								"text-neutral-950",
						)}
					>
						Settings
					</Link>
					<div
						className={cn(
							"mt-2 h-[2px] w-full bg-transparent",
							pathname === `/dashboard/projects/${projectId}/settings` &&
								"border-b-2 border-neutral-950",
						)}
					/>
				</div>
			</div>
		</div>
	);
}
