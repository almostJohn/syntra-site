"use client";

import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NextLink } from "../../../components/ui/next-link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "./logout-button";
import { Icons } from "../../../components/icons";

type User = {
	userId: string;
	username: string;
	displayName: string;
};

type UserDropdownProps = {
	user: User;
};

export function UserDropdown({ user }: UserDropdownProps) {
	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<DropdownMenu open={interacted} onOpenChange={setInteracted}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="hidden cursor-pointer md:flex hover:bg-transparent dark:hover:bg-transparent"
				>
					<Avatar className="size-9 rounded-sm border border-neutral-300 dark:border-neutral-700">
						<AvatarFallback className="rounded-sm bg-neutral-200 dark:bg-neutral-700">
							{user.displayName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-50" align="end">
				<div className="flex flex-col">
					<div className="flex flex-col space-y-0.5 px-3 py-2 border-b border-neutral-200 dark:border-neutral-700">
						<div className="text-sm font-medium">{user.displayName}</div>
						<div className="text-sm text-neutral-500">@{user.username}</div>
					</div>
					<div className="flex flex-col border-b border-neutral-200 dark:border-neutral-700">
						<NextLink
							href="/dashboard/profile"
							className="px-3 py-1 h-8 inline-flex items-center gap-2 text-sm font-medium transition-colors bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700"
							onClick={onClose}
						>
							<Icons.user className="size-4 shrink-0" /> Profile
						</NextLink>
						<NextLink
							href="/dashboard/settings"
							className="px-3 py-1 h-8 inline-flex items-center gap-2 text-sm font-medium transition-colors bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700"
							onClick={onClose}
						>
							<Icons.settings className="size-4 shrink-0" /> Settings
						</NextLink>
					</div>
					<div className="mt-auto">
						<LogoutButton isDropdownMenu />
					</div>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
