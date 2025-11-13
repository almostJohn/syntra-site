"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { logout } from "@/actions/auth-actions";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatNameToInitials } from "@/lib/formatting";
import { getAvatarURL } from "@/lib/utils";
import type { User, ActionState } from "@/types";
import { Loader } from "lucide-react";

type CurrentUser = Omit<
	User,
	"password" | "avatarSize" | "createdAt" | "updatedAt"
>;

type UserDropdownProps = {
	user: CurrentUser;
};

export function UserDropdown({ user }: UserDropdownProps) {
	const [interacted, setInteracted] = useState(false);
	const { formAction, isPending } = useServerAction({
		action: logout,
		initialState: {} as ActionState,
		options: {
			redirectTo: "/login",
		},
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
					className="size-9 rounded-full hover:bg-transparent"
				>
					<Avatar className="size-9 rounded-full border border-neutral-300">
						<AvatarImage src={getAvatarURL(user.avatar!)} alt={user.username} />
						<AvatarFallback className="size-9 rounded-full bg-neutral-200 text-base">
							{formatNameToInitials(user.displayName!)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="flex w-40 flex-col rounded-md border border-neutral-300 bg-neutral-100/95 p-0 text-neutral-950 shadow-md"
				align="end"
			>
				<div className="pt-4 pb-3">
					<p className="mx-auto max-w-sm text-center text-sm">
						Logged in as <strong>@{user.username}</strong>
					</p>
				</div>
				<div className="mt-auto mb-4">
					<div className="mx-auto flex justify-center">
						<form
							action={() => {
								formAction(undefined);
								onClose();
							}}
						>
							<Button type="submit" variant="destructive" disabled={isPending}>
								{isPending ? (
									<Loader className="size-4 shrink-0 animate-spin" />
								) : (
									"Log out"
								)}
							</Button>
						</form>
					</div>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
