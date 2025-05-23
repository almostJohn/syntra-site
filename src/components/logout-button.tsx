"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import { logoutUser } from "@/actions/logout-user.action";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Loader, LogOut } from "lucide-react";
import { Button } from "./ui/button";

const initialState = {
	success: false,
	message: "",
};

export function LogoutButton({
	isDropdownMenu = false,
}: {
	isDropdownMenu: boolean;
}) {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();

	const [state, formAction] = useActionState(logoutUser, initialState);

	useEffect(() => {
		if (state.success) {
			toast.success("Logout successful.");
			router.push("/login");
			router.refresh();
		} else if (state.message) {
			toast.error(state.message);
		}
	}, [state, router]);

	return (
		<form
			action={() => {
				startTransition(() => {
					formAction();
				});
			}}
		>
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
