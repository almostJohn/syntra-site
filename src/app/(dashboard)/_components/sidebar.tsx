"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { NextLink } from "@/components/ui/next-link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
	LayoutGrid,
	Scroll,
	FolderKanban,
	UsersRound,
	User2,
	Settings,
	PanelLeft,
} from "lucide-react";

const navItems = [
	{
		title: "Main",
		href: "/dashboard",
		icon: LayoutGrid,
	},
	{
		title: "Notes",
		href: "/dashboard/notes",
		icon: Scroll,
	},
	{
		title: "Boards",
		href: "/dashboard/boards",
		icon: FolderKanban,
	},
	{
		title: "Profile",
		href: "/dashboard/profile",
		icon: User2,
	},
	{
		title: "Teams",
		href: "/dashboard/teams",
		icon: UsersRound,
	},
	{
		title: "Settings",
		href: "/dashboard/settings",
		icon: Settings,
	},
];

type SidebarProps = {
	email: string;
	displayName: string;
	children: ReactNode;
};

export function Sidebar({ email, displayName, children }: SidebarProps) {
	const pathname = usePathname();

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
							<PanelLeft className="size-4 flex-shrink-0" />
						</Button>
					</div>
				</div>
				<div className="flex-1 flex flex-col p-4 space-y-2">
					{navItems.map(({ title, href, icon: Icon }) => (
						<NextLink
							key={href}
							href={href}
							className={cn(
								"inline-flex items-center px-3 h-10 rounded-md text-base font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
								isCollapsed && "px-0 justify-center",
								pathname === href
									? "bg-blue-600 text-background hover:bg-blue-700 hover:text-background"
									: "",
							)}
						>
							<Icon
								className={cn("size-5 flex-shrink-0", !isCollapsed && "mr-3")}
							/>
							{!isCollapsed && <span>{title}</span>}
						</NextLink>
					))}
				</div>
				<div className="p-4 border-t border-border">
					<div
						className={cn(
							"flex items-center transition-all duration-300",
							isCollapsed ? "justify-center" : "space-x-3",
						)}
					>
						<Avatar className="rounded-sm size-9 border border-blue-200">
							<AvatarFallback className="rounded-sm bg-blue-50 text-blue-600">
								{displayName.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						{!isCollapsed && (
							<div className="flex-1 flex flex-col space-y-0.5">
								<span className="font-semibold leading-snug">
									{displayName}
								</span>
								<span className="text-xs text-muted-foreground">{email}</span>
							</div>
						)}
					</div>
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
