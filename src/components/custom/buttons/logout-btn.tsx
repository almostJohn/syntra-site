"use client";

import { useControlledForm } from "@/hooks/use-controlled-form";
import { logout } from "@/server-actions/auth/logout";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useToast } from "@/context/toast-provider";

export function LogoutBtn() {
	const { addToast } = useToast();
	const { handleSubmit, isPending } = useControlledForm({
		initialValues: {},
		onSubmit: async () => {
			const { successMessage, errorMessage } = await logout();

			if (!successMessage) {
				addToast({ type: "error", description: errorMessage });
			}

			addToast({ type: "success", description: successMessage });
		},
	});

	return (
		<Button
			disabled={isPending}
			variant="destructive"
			onClick={handleSubmit}
			className="rounded-lg"
		>
			{isPending ? (
				<>
					<Icons.loading className="size-6 shrink-0" /> Loading...
				</>
			) : (
				<>
					<Icons.logout className="size-4 shrink-0" /> Log out
				</>
			)}
		</Button>
	);
}
