"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useToast } from "@/components/toast-provider";
import { logoutUser } from "../actions/logout-user";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

type LogoutButtonProps = {
	isDropdownMenu?: boolean;
};

export function LogoutButton({ isDropdownMenu }: LogoutButtonProps) {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(
		logoutUser,
		initialState,
	);
	const { addToast } = useToast();

	useEffect(() => {
		if (state.successMessage) {
			addToast({ description: state.successMessage, type: "success" });
			router.push("/login");
			router.refresh();
		} else if (state.errorMessage) {
			addToast({ description: state.errorMessage, type: "error" });
		}
	}, [state, router, addToast]);

	return (
		<>
			{!isDropdownMenu ? (
				<form action={formAction}>
					<Button
						type="submit"
						variant="destructive"
						disabled={isPending}
						className="cursor-pointer w-full"
					>
						{isPending ? (
							<Icons.loading className="size-4 shrink-0" />
						) : (
							"Logout"
						)}
					</Button>
				</form>
			) : (
				<form action={formAction}>
					<DropdownMenuItem disabled={isPending}>
						<button type="submit" className="w-full flex items-center gap-2">
							<Icons.logout className="size-4 text-red-500" />
							<span className="text-red-500">Logout</span>
						</button>
					</DropdownMenuItem>
				</form>
			)}
		</>
	);
}
