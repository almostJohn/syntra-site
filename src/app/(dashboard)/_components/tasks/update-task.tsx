"use client";

import { useServerAction, toAction } from "@/hooks/use-server-action";
import { updateTaskStatus } from "@/app/(dashboard)/actions/update-task-status";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Icons } from "@/components/icons";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

type UpdateTaskProps = {
	taskId: string;
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
	isBackward?: boolean;
	isForward?: boolean;
};

export function UpdateTask({
	taskId,
	status,
	isBackward,
	isForward,
}: UpdateTaskProps) {
	const updateTaskStatusAction = toAction(updateTaskStatus);

	const { formAction, isPending } = useServerAction(
		updateTaskStatusAction,
		initialState,
	);

	return (
		<form
			action={() => {
				formAction([taskId, status]);
			}}
		>
			<Button
				type="submit"
				variant="ghost"
				disabled={isPending}
				size="sm"
				className="cursor-pointer h-8 px-2 group"
			>
				{isPending ? (
					<Icons.loading className="size-4 shrink-0" />
				) : (
					<>
						{isBackward && (
							<>
								<ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
								Back
							</>
						)}
						{isForward && (
							<>
								Forward
								<ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
							</>
						)}
					</>
				)}
			</Button>
		</form>
	);
}
