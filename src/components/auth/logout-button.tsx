"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Loader, LogOut } from "lucide-react";
import { logout } from "@/actions/auth/logout.action";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

type LogoutButtonProps = {
	isDropdownMenu?: boolean;
};

export function LogoutButton({ isDropdownMenu }: LogoutButtonProps) {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(logout, initialState);

	useEffect(() => {
		if (state.successMessage) {
			toast.success(state.successMessage);
			router.push("/login");
			router.refresh();
		} else if (state.errorMessage) {
			toast.error(state.errorMessage);
		}
	}, [state, router]);

	return (
		<>
			{!isDropdownMenu ? (
				<form action={formAction}>
					<Button
						type="submit"
						variant="danger"
						disabled={isPending}
						className="h-10 text-lg font-semibold w-full cursor-pointer"
					>
						{isPending ? <Loader className="size-5 animate-spin" /> : "Logout"}
					</Button>
				</form>
			) : (
				<form action={formAction}>
					<DropdownMenuItem
						disabled={isPending}
						className="group focus:bg-red-50 focus:text-red-600"
					>
						<button type="submit" className="flex items-center gap-2">
							<LogOut className="size-4 text-red-600" />
							<span className="text-red-600">Logout</span>
						</button>
					</DropdownMenuItem>
				</form>
			)}
		</>
	);
}
