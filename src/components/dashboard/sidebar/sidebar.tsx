"use client";

import { useState, type PropsWithChildren } from "react";
import { SidebarTrigger } from "./sidebar-trigger";
import { SidebarNav } from "./sidebar-nav";
import { SidebarDropdown } from "./sidebar-dropdown";
import { cn } from "@/lib/utils";

type SidebarProps = PropsWithChildren & {
	email: string;
	displayName: string;
};

export function Sidebar({ email, displayName, children }: SidebarProps) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	function toggleSidebar() {
		setIsCollapsed((prev) => !prev);
	}

	return (
		<>
			<SidebarTrigger isCollapsed={isCollapsed} clickEvent={toggleSidebar}>
				<SidebarNav isCollapsed={isCollapsed} />
				<SidebarDropdown
					isCollapsed={isCollapsed}
					email={email}
					displayName={displayName}
				/>
			</SidebarTrigger>
			<main
				className={cn(
					"flex-1 duration-300 transition-all",
					isCollapsed ? "ml-18" : "ml-64",
				)}
			>
				{children}
			</main>
		</>
	);
}
