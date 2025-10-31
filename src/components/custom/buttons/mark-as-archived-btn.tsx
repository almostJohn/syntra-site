"use client";

import { useControlledForm } from "@/hooks/use-controlled-form";
import { markAsArchived } from "@/server-actions/notifications/mark-as-archived";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useToast } from "@/context/toast-provider";
import { Check } from "lucide-react";

export function MarkAsArchivedBtn({
	notificationId,
}: {
	notificationId: string;
}) {
	const { addToast } = useToast();
	const { handleSubmit, isPending } = useControlledForm({
		initialValues: {},
		onSubmit: async () => {
			const { successMessage, errorMessage } =
				await markAsArchived(notificationId);

			if (!successMessage) {
				addToast({ type: "error", description: errorMessage });
			}

			addToast({ type: "success", description: successMessage });
		},
	});

	return (
		<Button
			variant="ghost"
			size="icon"
			className="size-8 rounded-lg px-2"
			disabled={isPending}
			onClick={handleSubmit}
			title="Mark As Archived"
		>
			{isPending ? (
				<Icons.loading className="size-6 shrink-0" />
			) : (
				<Check className="size-6 shrink-0" />
			)}
		</Button>
	);
}
