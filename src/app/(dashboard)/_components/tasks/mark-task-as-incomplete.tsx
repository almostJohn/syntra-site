"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { markTaskAsIncomplete } from "@/actions/tasks/mark-task";
import { Button } from "@/components/ui/button";
import type { ActionResponse } from "@/lib/server-action";
import { Loader, ArrowLeft } from "lucide-react";

const initialState = {
	success: {
		statusCode: 0,
		message: "",
	},
	error: {
		statusCode: 0,
		message: "",
	},
};

export function MarkTaskAsIncomplete({
	taskId,
	isBackward,
}: {
	taskId: string;
	isBackward?: boolean;
}) {
	const [state, formAction, isPending] = useActionState(
		async (
			_prevState: ActionResponse,
			payload: { taskId: string },
		): Promise<ActionResponse> => {
			return await markTaskAsIncomplete(payload.taskId);
		},
		initialState,
	);

	useEffect(() => {
		if (state.success?.message) {
			toast.success(state.success.message);
		} else if (state.error?.message) {
			toast.error(state.error.message);
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
				variant="ghost:with-active:scale-95"
				size="sm"
				className="h-8 px-2 cursor-pointer group"
			>
				{isPending ? (
					<>
						<Loader className="size-4 shrink-0 animate-spin" />
					</>
				) : (
					<>
						{isBackward && (
							<>
								<ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
								Back
							</>
						)}
					</>
				)}
			</Button>
		</form>
	);
}
