"use client";

import { useServerAction, toAction } from "@/hooks/use-server-action";
import { updateTaskStatus } from "@/actions/tasks/update-task-status";
import { Icons } from "@/components/icons";

type UpdateTaskStatusProps = {
	projectId: string;
	taskId: string;
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
	label: string;
	onClose(): void;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function UpdateTaskStatus({
	projectId,
	taskId,
	status,
	label,
	onClose,
}: UpdateTaskStatusProps) {
	const { formAction, isPending } = useServerAction(
		toAction(updateTaskStatus),
		initialState,
	);

	return (
		<form
			action={() => {
				formAction([projectId, taskId, status]);
				onClose();
			}}
		>
			<button
				type="submit"
				className="inline-flex items-center gap-2 h-8 px-3 py-0.5 w-full cursor-pointer transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-medium disabled:pointer-events-none disabled:opacity-50"
				disabled={isPending}
			>
				{isPending ? (
					<>
						<Icons.loading className="size-3 shrink-0" /> moving...
					</>
				) : (
					<>{label}</>
				)}
			</button>
		</form>
	);
}
