"use client";

import { useServerAction, toAction } from "@/hooks/use-server-action";
import { updateTaskStatus } from "@/app/(private)/actions/update-task-status";
import { Button } from "../ui/button";
import { Icons } from "../icons";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

type UpdateTaskStatusProps = {
	projectId: string;
	taskId: string;
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
	isBackward?: boolean;
	isForward?: boolean;
};

export function UpdateTaskStatus({
	projectId,
	taskId,
	status,
	isBackward,
	isForward,
}: UpdateTaskStatusProps) {
	const { formAction, isPending } = useServerAction(
		toAction(updateTaskStatus),
		initialState,
	);

	return (
		<form
			action={() => {
				formAction([projectId, taskId, status]);
			}}
		>
			<Button
				type="submit"
				variant="ghost"
				size="icon"
				className="cursor-pointer size-8 px-2"
				disabled={isPending}
			>
				{isPending ? (
					<Icons.loading className="size-4 shrink-0" />
				) : (
					<>
						{isBackward && (
							<>
								<Icons.arrowLeft className="size-5 shrink-0" />
							</>
						)}
						{isForward && (
							<>
								<Icons.arrowRight className="size-5 shrink-0" />
							</>
						)}
					</>
				)}
			</Button>
		</form>
	);
}
