"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { updateStatus } from "@/actions/task-actions";
import { Loader } from "lucide-react";
import type { ActionState, TaskStatus } from "@/types";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

type UpdateTaskStatusProps = {
	oldStatus: TaskStatus;
	newStatus: TaskStatus;
	taskId: string;
	projectId: string;
};

export function UpdateTaskStatus({
	oldStatus,
	newStatus,
	taskId,
	projectId,
}: UpdateTaskStatusProps) {
	const { formAction, isPending } = useServerAction({
		action: async () => {
			return await updateStatus(oldStatus, newStatus, taskId, projectId);
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
				variant="ghost"
				className="flex w-full justify-start px-3 py-2"
			>
				{isPending ? (
					<>
						<Loader className="size-4 shrink-0 animate-spin" /> Updating...
					</>
				) : (
					<>Update Status</>
				)}
			</Button>
		</Form>
	);
}
