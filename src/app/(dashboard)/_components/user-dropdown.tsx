"use client";

import { useState } from "react";
import { NextLink } from "@/components/ui/next-link";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, User } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";

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
					className="hidden cursor-pointer md:flex hover:bg-transparent"
				>
					<Avatar className="size-9 rounded-sm border border-[#5865f2]">
						<AvatarFallback className="bg-[#5865f2]/10 text-[#5865f2] rounded-sm">
							<span className="font-medium">
								{displayName.charAt(0).toUpperCase()}
							</span>
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-64" align="end">
				<DropdownMenuLabel className="flex items-center space-x-2">
					<Avatar className="size-8 rounded-sm border border-[#5865f2]">
						<AvatarFallback className="bg-[#5865f2]/10 text-[#5865f2] rounded-sm">
							{displayName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col space-y-0.5">
						<h3 className="text-sm font-medium capitalize">{displayName}</h3>
						<span className="text-xs text-muted-foreground truncate">
							@{username}
						</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<NextLink
						href="/dashboard/profile"
						className="flex items-center"
						onClick={onCloseHandler}
					>
						<User className="size-4" />
						<span>Profile</span>
					</NextLink>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<NextLink
						href="/dashboard/settings"
						className="flex items-center"
						onClick={onCloseHandler}
					>
						<Settings className="size-4" />
						<span>Settings</span>
					</NextLink>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<LogoutButton isDropdownMenu={true} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
