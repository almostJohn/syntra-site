"use client";

import { useControlledForm } from "@/hooks/use-controlled-form";
import { markAsRead } from "@/server-actions/notifications/mark-as-read";
import { useToast } from "@/context/toast-provider";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Icons } from "@/components/icons";

export function MarkAsReadBtn({ notificationId }: { notificationId: string }) {
	const { addToast } = useToast();
	const { handleSubmit, isPending } = useControlledForm({
		initialValues: {},
		onSubmit: async () => {
			const { successMessage, errorMessage } = await markAsRead(notificationId);

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
			title="Mark As Read"
		>
			{isPending ? (
				<Icons.loading className="size-6 shrink-0" />
			) : (
				<Check className="size-6 shrink-0" />
			)}
		</Button>
	);
}
