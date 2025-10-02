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
import { Icons } from "@/components/icons";

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
					className="size-9 cursor-pointer rounded-full px-2 hover:bg-transparent hover:text-white"
				>
					<Avatar className="size-9 border border-neutral-700">
						<AvatarFallback className="bg-neutral-800 text-neutral-100">
							{formatNameToInitials(user.username)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="flex w-44 flex-col rounded-sm border border-neutral-800 bg-neutral-900 p-0 text-neutral-100 shadow-lg"
			>
				<div className="pt-2 pb-4">
					<p className="mx-auto max-w-xs text-center text-sm">
						Logged in as <strong>{user.username}</strong>
					</p>
				</div>
				<div className="mt-auto pb-3">
					<div className="mx-auto flex justify-center">
						<form
							action={() => {
								formAction(undefined);
								onClose();
							}}
						>
							<button
								type="submit"
								className={cn(
									"group inline-flex cursor-pointer items-center gap-2 rounded-sm bg-red-500/10 px-3 py-2 text-sm font-medium whitespace-nowrap text-red-500 transition-colors duration-200 hover:bg-red-600/10 disabled:pointer-events-none disabled:opacity-50",
								)}
								disabled={isPending}
							>
								{isPending ? (
									<>
										<Loader2 className="size-4 shrink-0 animate-spin" />
									</>
								) : (
									<>
										<Icons.logout className="size-4 shrink-0" />
										Log out
									</>
								)}
							</button>
						</form>
					</div>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
