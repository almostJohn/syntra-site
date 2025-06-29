"use client";

import { useState } from "react";
import { NextLink } from "@/components/ui/next-link";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { LogoutButton } from "./logout-button";

type UserDropdownProps = {
	username: string;
	displayName: string;
};

export function UserDropdown({ username, displayName }: UserDropdownProps) {
	const [interacted, setInteracted] = useState(false);

	function onCloseHandler() {
		setInteracted((prev) => !prev);
	}

	return (
		<DropdownMenu open={interacted} onOpenChange={setInteracted}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="hidden cursor-pointer rounded-sm md:flex hover:bg-transparent dark:hover:bg-transparent"
				>
					<Avatar className="size-9 rounded-sm border-none">
						<AvatarFallback className="rounded-sm bg-neutral-200 dark:bg-neutral-700">
							{displayName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-52" align="end">
				<div className="flex flex-col space-y-0.5 px-2 py-0.5">
					<span className="font-medium text-sm capitalize">{displayName}</span>
					<span className="text-sm text-neutral-500">@{username}</span>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<NextLink
						href="/dashboard/profile"
						className="flex items-center"
						onClick={onCloseHandler}
					>
						<Icons.user className="size-4 shrink-0" />
						<span>Profile</span>
					</NextLink>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<NextLink
						href="/dashboard/settings"
						className="flex items-center"
						onClick={onCloseHandler}
					>
						<Icons.settings className="size-4 shrink-0" />
						<span>Settings</span>
					</NextLink>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<LogoutButton isDropdownMenu />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
