"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Folder, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SideNav() {
	const pathname = usePathname();

	return (
		<aside className="left-0 z-10 hidden w-60 shrink-0 border-r border-neutral-300 py-6 md:flex">
			<div className="flex w-full flex-col gap-2 px-6">
				<Link
					href="/dashboard"
					className={cn(
						"inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300 ease-in-out",
						pathname === "/dashboard"
							? "bg-neutral-200 text-neutral-950"
							: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-950",
					)}
				>
					<Folder className="size-4 shrink-0" /> Projects
				</Link>
				<Link
					href="/dashboard/settings"
					className={cn(
						"inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300 ease-in-out",
						pathname === "/dashboard/settings"
							? "bg-neutral-200 text-neutral-950"
							: "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-950",
					)}
				>
					<Settings2 className="size-4 shrink-0" /> Settings
				</Link>
			</div>
		</aside>
	);
}
