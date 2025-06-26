"use client";

import { usePathname } from "next/navigation";
import { NextLink } from "@/components/ui/next-link";
import {
	LayoutGrid,
	ListChecks,
	Paperclip,
	User,
	Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
	const pathname = usePathname();

	return (
		<footer className="fixed bottom-0 z-50 w-full border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
			<div className="mx-auto max-w-7xl h-20 px-6 flex items-center justify-between">
				<NextLink
					href="/dashboard"
					className={cn(
						"group rounded-sm inline-flex items-center justify-center size-10 px-4 py-2 transition-colors",
						pathname === "/dashboard"
							? "bg-accent text-accent-foreground"
							: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
					)}
				>
					<LayoutGrid
						className={cn(
							"size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-foreground",
							pathname === "/dashboard" ? "text-accent-foreground" : "",
						)}
					/>
				</NextLink>
				<NextLink
					href="/dashboard/tasks"
					className={cn(
						"group rounded-sm inline-flex items-center justify-center size-10 px-4 py-2 transition-colors",
						pathname === "/dashboard/tasks"
							? "bg-accent text-accent-foreground"
							: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
					)}
				>
					<ListChecks
						className={cn(
							"size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-foreground",
							pathname === "/dashboard/tasks" ? "text-accent-foreground" : "",
						)}
					/>
				</NextLink>
				<NextLink
					href="/dashboard/notes"
					className={cn(
						"group rounded-sm inline-flex items-center justify-center size-10 px-4 py-2 transition-colors",
						pathname === "/dashboard/notes"
							? "bg-accent text-accent-foreground"
							: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
					)}
				>
					<Paperclip
						className={cn(
							"size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-foreground",
							pathname === "/dashboard/notes" ? "text-accent-foreground" : "",
						)}
					/>
				</NextLink>
				<NextLink
					href="/dashboard/profile"
					className={cn(
						"group rounded-sm inline-flex items-center justify-center size-10 px-4 py-2 transition-colors",
						pathname === "/dashboard/profile"
							? "bg-accent text-accent-foreground"
							: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
					)}
				>
					<User
						className={cn(
							"size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-foreground",
							pathname === "/dashboard/profile" ? "text-accent-foreground" : "",
						)}
					/>
				</NextLink>
				<NextLink
					href="/dashboard/settings"
					className={cn(
						"group rounded-sm inline-flex items-center justify-center size-10 px-4 py-2 transition-colors",
						pathname === "/dashboard/settings"
							? "bg-accent text-accent-foreground"
							: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
					)}
				>
					<Settings
						className={cn(
							"size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-foreground",
							pathname === "/dashboard/settings"
								? "text-accent-foreground"
								: "",
						)}
					/>
				</NextLink>
			</div>
		</footer>
	);
}
