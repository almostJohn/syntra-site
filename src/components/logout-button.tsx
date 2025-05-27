"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { logout } from "@/actions/logout.auth";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Loader, LogOut } from "lucide-react";
import { Button } from "./ui/button";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function LogoutButton({
	isDropdownMenu = false,
}: {
	isDropdownMenu: boolean;
}) {
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
		<form action={formAction}>
			{isDropdownMenu && (
				<DropdownMenuItem
					className="group focus:bg-red-600/10 focus:text-red-600"
					disabled={isPending}
					asChild
				>
					<button type="submit" className="flex items-center gap-2 w-full">
						{isPending ? (
							<>
								<Loader className="size-4 text-muted-foreground animate-spin" />{" "}
								Logging out...
							</>
						) : (
							<>
								<LogOut className="size-4 text-muted-foreground group-hover:text-red-600" />{" "}
								Logout
							</>
						)}
					</button>
				</DropdownMenuItem>
			)}
			{!isDropdownMenu && (
				<Button
					type="submit"
					variant="destructive"
					className="w-full cursor-pointer"
				>
					{isPending ? (
						<>
							<Loader className="size-4 animate-spin" /> Logging out...
						</>
					) : (
						<>Log Out</>
					)}
				</Button>
			)}
		</form>
	);
}
