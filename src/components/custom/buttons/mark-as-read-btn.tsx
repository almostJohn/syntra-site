"use client";

import { useRouter } from "next/navigation";
import { useControlledForm } from "@/hooks/use-controlled-form";
import { markAsRead } from "@/server-actions/notifications/mark-as-read";
import { useToast } from "@/context/toast-provider";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function MarkAsReadBtn({ notificationId }: { notificationId: string }) {
	const router = useRouter();
	const { addToast } = useToast();
	const { handleSubmit, isPending } = useControlledForm({
		initialValues: {},
		onSubmit: async () => {
			const { successMessage, errorMessage } = await markAsRead(notificationId);

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
			title="Mark As Read"
		>
			{isPending ? (
				<Icons.loading className="size-6 shrink-0" />
			) : (
				<Icons.read className="size-6 shrink-0 text-neutral-700" />
			)}
		</Button>
	);
}
