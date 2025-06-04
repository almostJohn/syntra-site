"use client";

import { useState, type PropsWithChildren } from "react";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "./sidebar-trigger";
import { SidebarNav } from "./sidebar-nav";
import { SidebarDropdown } from "./sidebar-dropdown";

type SidebarWrapperProps = PropsWithChildren & {
	email: string;
	name: string;
};

export function SidebarWrapper({ email, name, children }: SidebarWrapperProps) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	function toggleSidebar() {
		setIsCollapsed((prev) => !prev);
	}

	return (
		<>
			<aside
				className={cn(
					"fixed left-0 top-0 h-full bg-background border-r border-border transition-all duration-300 ease-in-out flex flex-col z-10",
					isCollapsed ? "w-20" : "w-65",
				)}
			>
				<div className="p-4 border-b border-border">
					<div className="flex items-center justify-between">
						{!isCollapsed && (
							<NextLink
								href="/dashboard"
								className="text-2xl font-bold leading-tight tracking-tighter"
							>
								Syntra
							</NextLink>
						)}
						<SidebarTrigger onTrigger={toggleSidebar} />
					</div>
				</div>
				<SidebarNav isCollapsed={isCollapsed} />
				<SidebarDropdown email={email} name={name} isCollapsed={isCollapsed} />
			</aside>
			<div
				className={cn(
					"flex-1 transition-all duration-300",
					isCollapsed ? "ml-20" : "ml-65",
				)}
			>
				{children}
			</div>
		</>
	);
}
