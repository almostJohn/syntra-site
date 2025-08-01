"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import {
	DropdownMenuContent,
	DropdownMenu,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logout } from "@/actions/auth/logout";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { NextLink } from "../ui/next-link";
import { Icons } from "../icons";

type User = {
	id: string;
	username: string;
	tag: string;
	displayName: string;
};

type UserDropdownProps = {
	user: User;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function UserDropdown({ user }: UserDropdownProps) {
	const { formAction, isPending } = useServerAction(logout, initialState, {
		redirectTo: "/login",
	});
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
					className="hidden h-9 cursor-pointer hover:bg-transparent dark:hover:bg-transparent md:flex"
				>
					<Avatar className="size-9 rounded-sm border-none">
						<AvatarFallback className="rounded-sm bg-neutral-200 dark:bg-neutral-700">
							{user.displayName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-50 p-0" align="end">
				<div className="flex flex-col gap-1 px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
					<div className="text-sm font-medium">{user.displayName}</div>
					<div className="text-sm text-neutral-500">
						{user.username}#{user.tag}
					</div>
				</div>
				<div className="flex flex-col border-b border-neutral-200 dark:border-neutral-700">
					<NextLink
						href="/app/profile"
						className="px-4 py-2 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
						onClick={onClose}
					>
						<Icons.user className="size-4 shrink-0" /> Profile
					</NextLink>
					<NextLink
						href="/app/settings"
						className="px-4 py-2 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
						onClick={onClose}
					>
						<Icons.settings className="size-4 shrink-0" /> Settings
					</NextLink>
				</div>
				<div className="mt-auto">
					<form
						action={() => {
							formAction(undefined);
							onClose();
						}}
					>
						<button
							type="submit"
							disabled={isPending}
							className="inline-flex items-center w-full cursor-pointer gap-2 px-4 py-2 bg-transparent rounded-b-sm text-sm font-medium transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none"
						>
							{isPending ? (
								<Icons.loading className="size-4 shrink-0" />
							) : (
								<>
									<Icons.logout className="size-4 shrink-0" /> Logout
								</>
							)}
						</button>
					</form>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
