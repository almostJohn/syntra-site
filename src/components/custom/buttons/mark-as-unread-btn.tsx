"use client";

import { useRouter } from "next/navigation";
import { useControlledForm } from "@/hooks/use-controlled-form";
import { markAsUnread } from "@/server-actions/notifications/mark-as-unread";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useToast } from "@/context/toast-provider";

export function MarkAsUnreadBtn({
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
				await markAsUnread(notificationId);

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
			title="Mark As Unread"
		>
			{isPending ? (
				<Icons.loading className="size-6 shrink-0" />
			) : (
				<Icons.unread className="size-6 shrink-0 text-neutral-700" />
			)}
		</Button>
	);
}
