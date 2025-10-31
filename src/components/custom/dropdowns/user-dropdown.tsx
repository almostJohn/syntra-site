"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatNameToInitials } from "@/lib/formatting";
import { getAvatarURL } from "@/lib/utils";
import { LogoutBtn } from "../buttons/logout-btn";

type User = {
	id: string;
	username: string;
	avatar: string | null;
};

type UserDropdownProps = {
	user: User;
};

export function UserDropdown({ user }: UserDropdownProps) {
	const [interacted, setInteracted] = useState(false);

	return (
		<DropdownMenu open={interacted} onOpenChange={setInteracted}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="size-9 rounded-full hover:bg-transparent"
				>
					<Avatar className="size-9 rounded-full border border-neutral-300">
						<AvatarImage
							src={getAvatarURL(user.avatar!)}
							alt={user.username}
							className="rounded-full"
						/>
						<AvatarFallback className="size-9 rounded-full bg-neutral-200 text-neutral-900">
							{formatNameToInitials(user.username)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="flex w-40 flex-col rounded-lg border border-neutral-300 bg-neutral-100/95 p-0 text-neutral-900 shadow-xl"
			>
				<div className="pt-4 pb-3">
					<p className="mx-auto max-w-sm text-center text-sm">
						Logged in as <strong>@{user.username}</strong>
					</p>
				</div>
				<div className="mt-auto mb-4">
					<div className="mx-auto flex justify-center">
						<LogoutBtn />
					</div>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
