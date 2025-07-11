"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { logoutUser } from "@/app/(dashboard)/actions/logout-user";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function LogoutButton({ isDropdownMenu }: { isDropdownMenu?: boolean }) {
	const { formAction, isPending } = useServerAction(logoutUser, initialState, {
		redirectTo: "/login",
	});

	if (isDropdownMenu) {
		return (
			<form action={formAction}>
				<button
					type="submit"
					disabled={isPending}
					className="px-3 py-1 h-8 rounded-b-sm w-full inline-flex items-center gap-2 text-sm font-medium transition-colors bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700"
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
		);
	}

	return (
		<form action={formAction}>
			<Button
				type="submit"
				disabled={isPending}
				variant="destructive"
				className="cursor-pointer w-full h-10"
			>
				{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Logout"}
			</Button>
		</form>
	);
}
