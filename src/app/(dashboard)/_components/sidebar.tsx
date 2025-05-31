"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { Nav } from "./nav";
import { icons } from "@/components/icons";
import { UserDropdown } from "./user-dropdown";

type SidebarProps = {
	email: string;
	displayName: string;
	children: ReactNode;
};

export function Sidebar({ email, displayName, children }: SidebarProps) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<>
			<aside
				className={cn(
					"fixed left-0 top-0 h-full bg-background border-r border-border transition-all duration-300 ease-in-out flex flex-col z-10",
					isCollapsed ? "w-18" : "w-64",
				)}
			>
				<div className="p-4 border-b border-border">
					<div className="flex items-center justify-between">
						{!isCollapsed && (
							<NextLink
								href="/dashboard"
								className="text-2xl font-bold tracking-tighter"
							>
								Syntra
							</NextLink>
						)}
						<Button
							size="icon"
							variant="ghost"
							className="cursor-pointer"
							onClick={() => setIsCollapsed(!isCollapsed)}
						>
							<icons.PanelLeft className="size-4 flex-shrink-0" />
						</Button>
					</div>
				</div>
				<Nav isCollapsed={isCollapsed} />
				<div className="p-4 border-t border-border">
					<UserDropdown
						email={email}
						displayName={displayName}
						isCollapsed={isCollapsed}
					/>
				</div>
			</aside>
			<div
				className={cn(
					"flex-1 transition-all duration-300",
					isCollapsed ? "ml-16" : "ml-64",
				)}
			>
				{children}
			</div>
		</>
	);
}
