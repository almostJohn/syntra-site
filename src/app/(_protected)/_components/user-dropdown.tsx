"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { useState } from "react";
import { logout } from "../actions/logout";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { Icons } from "@/components/icons";
import { formatNameToInitials } from "@/lib/formatting";
import { getAvatarURL } from "@/lib/utils";

type User = {
	id: string;
	username: string;
	avatar: string;
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
	const { formAction, isPending } = useServerAction(logout, initialState);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<DropdownMenu open={interacted} onOpenChange={setInteracted}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="rounded-full hover:bg-transparent"
				>
					<Avatar className="size-10 rounded-full border border-neutral-700">
						<AvatarImage
							src={getAvatarURL(user.avatar)}
							alt={`avatar-${user.username}`}
							className="rounded-full"
						/>
						<AvatarFallback className="size-10 bg-neutral-800 text-neutral-100">
							{formatNameToInitials(user.username)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="flex w-40 flex-col rounded-sm border border-neutral-800 bg-neutral-900 p-0 text-neutral-100 shadow-xl"
			>
				<div className="pt-4 pb-3">
					<p className="mx-auto max-w-sm text-center text-sm">
						Logged in as <strong>@{user.username}</strong>
					</p>
				</div>
				<div className="mt-auto pb-4">
					<form
						action={() => {
							formAction(undefined);
							onClose();
						}}
						className="mx-auto flex justify-center"
					>
						<Button type="submit" variant="destructive" disabled={isPending}>
							{isPending ? (
								<>
									<Loader2 className="size-4 shrink-0 animate-spin" />
									Logging out...
								</>
							) : (
								<>
									<Icons.logout className="size-4 shrink-0" />
									Log out
								</>
							)}
						</Button>
					</form>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
