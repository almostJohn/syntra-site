"use client";

import { useRouter } from "next/navigation";
import { useControlledForm } from "@/hooks/use-controlled-form";
import { markAsArchived } from "@/server-actions/notifications/mark-as-archived";
import { Button } from "@/components/ui/button";
import { useToast } from "@/context/toast-provider";
import { Icons } from "@/components/icons";

export function MarkAsArchivedBtn({
	notificationId,
}: {
	notificationId: string;
}) {
	const router = useRouter();
	const { addToast } = useToast();
	const { handleSubmit, isPending } = useControlledForm({
		initialValues: {},
		onSubmit: async () => {
			const { successMessage, errorMessage } =
				await markAsArchived(notificationId);

			if (!successMessage) {
				addToast({ type: "error", description: errorMessage });
			}

			router.refresh();

			addToast({ type: "success", description: successMessage });
		},
	});

	return (
		<Button
			variant="ghost"
			size="icon"
			className="size-8 rounded-lg bg-blue-500/10 px-2 shadow-md hover:bg-blue-500/20"
			disabled={isPending}
			onClick={handleSubmit}
			title="Mark As Archived"
		>
			{isPending ? (
				<Icons.loading className="size-6 shrink-0" />
			) : (
				<Icons.archive className="size-6 shrink-0 text-neutral-700" />
			)}
		</Button>
	);
}
