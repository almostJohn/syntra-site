"use client";

import { useActionState, useEffect } from "react";
import { updateTaskStatus } from "@/app/(dashboard)/actions/update-task-status";
import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Icons } from "@/components/icons";
import type { ActionResponse } from "@/lib/server-action";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

type UpdateTaskStatusProps = {
	taskId: string;
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
	isBackward?: boolean;
	isForward?: boolean;
};

export function UpdateTaskStatus({
	taskId,
	status,
	isBackward,
	isForward,
}: UpdateTaskStatusProps) {
	const [state, formAction, isPending] = useActionState(
		async (
			_prevState: ActionResponse,
			payload: {
				taskId: string;
				status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
			},
		): Promise<ActionResponse> => {
			return await updateTaskStatus(payload.taskId, payload.status);
		},
		initialState,
	);
	const { addToast } = useToast();

	useEffect(() => {
		if (state.successMessage) {
			addToast({ description: state.successMessage, type: "success" });
		} else if (state.errorMessage) {
			addToast({ description: state.errorMessage, type: "error" });
		}
	}, [state, addToast]);

	return (
		<form
			action={() => {
				formAction({ taskId, status });
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
