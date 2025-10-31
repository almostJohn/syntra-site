"use client";

import { useControlledForm } from "@/hooks/use-controlled-form";
import { markAsUnarchived } from "@/server-actions/notifications/mark-as-unarchived";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useToast } from "@/context/toast-provider";
import { Check } from "lucide-react";

export function MarkAsUnarchivedBtn({
	notificationId,
}: {
	notificationId: string;
}) {
	const { addToast } = useToast();
	const { handleSubmit, isPending } = useControlledForm({
		initialValues: {},
		onSubmit: async () => {
			const { successMessage, errorMessage } =
				await markAsUnarchived(notificationId);

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
			title="Mark As Unarchived"
		>
			{isPending ? (
				<Icons.loading className="size-6 shrink-0" />
			) : (
				<Check className="size-6 shrink-0" />
			)}
		</Button>
	);
}
