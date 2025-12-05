"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { markNotificationAsRead } from "@/actions/mark-notification-as-read";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import type { ActionState } from "@/types";
import { Check, Loader } from "lucide-react";

type MarkNotificationAsReadProps = {
	notificationId: string;
};

export function MarkNotificationAsRead({
	notificationId,
}: MarkNotificationAsReadProps) {
	const { formAction, isPending } = useServerAction({
		action: async () => {
			return await markNotificationAsRead(notificationId);
		},
		initialState: {} as ActionState,
	});

	return (
		<Form
			action={() => {
				formAction(undefined);
			}}
			className="gap-0"
		>
			<Button
				type="submit"
				disabled={isPending}
				variant="outline"
				size="icon"
				className="size-8 rounded-full px-2"
				title="Mark as read"
			>
				{isPending ? (
					<Loader className="size-4 shrink-0 animate-spin" />
				) : (
					<Check className="size-4 shrink-0" />
				)}
			</Button>
		</Form>
	);
}
