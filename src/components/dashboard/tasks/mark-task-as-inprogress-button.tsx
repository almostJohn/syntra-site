"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { markTaskAsInProgress } from "@/actions/tasks/mark-task";
import { Button } from "@/components/ui/button";
import type { ActionResponse } from "@/lib/server-action";
import { Loader, ArrowLeft, ArrowRight } from "lucide-react";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function MarkTaskAsInProgressButton({
	taskId,
	isBackward,
	isForward,
}: {
	taskId: string;
	isBackward?: boolean;
	isForward?: boolean;
}) {
	const [state, formAction, isPending] = useActionState(
		async (
			_prevState: ActionResponse,
			payload: { taskId: string },
		): Promise<ActionResponse> => {
			return await markTaskAsInProgress(payload.taskId);
		},
		initialState,
	);

	useEffect(() => {
		if (state.successMessage) {
			toast.success(state.successMessage);
		} else if (state.errorMessage) {
			toast.error(state.errorMessage);
		}
	}, [state]);

	return (
		<form
			action={() => {
				formAction({ taskId });
			}}
		>
			<Button
				type="submit"
				disabled={isPending}
				size="sm"
				variant="ghost:with-active:scale-95"
				className="h-8 px-2 cursor-pointer group"
			>
				{isPending ? (
					<>
						<Loader className="size-4 animate-spin" />
					</>
				) : (
					<>
						{isBackward && (
							<>
								<ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
								Back
							</>
						)}
						{isForward && (
							<>
								Forward
								<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
							</>
						)}
					</>
				)}
			</Button>
		</form>
	);
}
