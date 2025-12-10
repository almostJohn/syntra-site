"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { deleteTask } from "@/actions/task-actions";
import { Loader } from "lucide-react";
import type { ActionState } from "@/types";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

type DeleteTaskProps = {
	taskId: string;
	projectId: string;
};

export function DeleteTask({ taskId, projectId }: DeleteTaskProps) {
	const { formAction, isPending } = useServerAction({
		action: async () => {
			return await deleteTask(taskId, projectId);
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
						<Loader className="size-4 shrink-0 animate-spin" /> Deleting...
					</>
				) : (
					<>Delete Task</>
				)}
			</Button>
		</Form>
	);
}
