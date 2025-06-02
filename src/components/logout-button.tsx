"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth/action";
import { LogOutIcon, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

type LogoutButtonProps = {
	isDropdownMenu: boolean;
	className?: string;
};

export function LogoutButton({ isDropdownMenu, className }: LogoutButtonProps) {
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
					className="group focus:bg-red-100 focus:text-red-600"
					disabled={isPending}
					asChild
				>
					<button type="submit" className="flex items-center gap-2 w-full">
						{isPending ? (
							<>
								<Loader className="size-4 animate-spin" /> Logging out...
							</>
						) : (
							<>
								<LogOutIcon className="size-4 text-muted-foreground group-focus:text-red-600" />{" "}
								Logout
							</>
						)}
					</button>
				</DropdownMenuItem>
			)}
			{!isDropdownMenu && (
				<Button
					type="submit"
					variant="danger"
					className={cn("w-full cursor-pointer", className)}
					disabled={isPending}
				>
					{isPending ? (
						<>
							<Loader className="size-4 animate-spin" /> Logging out...
						</>
					) : (
						<>Logout</>
					)}
				</Button>
			)}
		</form>
	);
}
