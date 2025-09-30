"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { logout } from "../actions/logout";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatNameToInitials } from "@/lib/formatting";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { NextLink } from "@/components/ui/next-link";

type User = {
	id: string;
	username: string;
};

type UserDropdownProps = {
	user: User;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function UserDropdown({ user }: UserDropdownProps) {
	const [interacted, setInteracted] = useState(false);
	const { formAction, isPending } = useServerAction(logout, initialState, {
		redirectTo: "/login",
	});

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<DropdownMenu open={interacted} onOpenChange={setInteracted}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="hidden size-9 cursor-pointer rounded-sm px-2 hover:bg-transparent hover:text-white md:flex"
				>
					<Avatar className="size-9 rounded-sm border border-neutral-700">
						<AvatarFallback className="rounded-sm bg-neutral-800 text-lg">
							{formatNameToInitials(user.username)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="flex w-52 flex-col rounded-sm border border-neutral-700 bg-neutral-800 p-0 text-neutral-100"
			>
				<div className="flex items-center gap-3 border-b border-neutral-700 p-3">
					<Avatar className="size-8 rounded-sm border border-neutral-600">
						<AvatarFallback className="rounded-sm bg-neutral-700">
							{formatNameToInitials(user.username)}
						</AvatarFallback>
					</Avatar>
					<h3 className="font-semibold">@{user.username}</h3>
				</div>
				<div className="flex flex-col">
					<NextLink
						href="/app"
						className={cn(
							"inline-flex w-full items-center px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:bg-neutral-700",
						)}
						onClick={onClose}
					>
						Projects
					</NextLink>
					<NextLink
						href="/app/settings"
						className={cn(
							"inline-flex w-full items-center px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:bg-neutral-700",
						)}
						onClick={onClose}
					>
						Settings
					</NextLink>
				</div>
				<div className="mt-auto border-t border-neutral-700">
					<form
						action={() => {
							formAction(undefined);
							onClose();
						}}
					>
						<button
							type="submit"
							className={cn(
								"group inline-flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:bg-red-500/10 hover:text-red-500 disabled:pointer-events-none disabled:opacity-50",
							)}
							disabled={isPending}
						>
							{isPending ? (
								<>
									<Loader2 className="size-4 shrink-0 animate-spin" />
									Logging out...
								</>
							) : (
								<>Log out</>
							)}
						</button>
					</form>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
