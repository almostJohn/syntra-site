"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader, Trash2 } from "lucide-react";
import { deleteTask } from "@/actions/tasks/delete-task";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import type { ActionResponse } from "@/lib/server-action";

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

type DeleteTaskDialogProps = {
	taskId: string;
};

export function DeleteTaskDialog({ taskId }: DeleteTaskDialogProps) {
	const [state, formAction, isPending] = useActionState(
		async (
			_prevState: ActionResponse,
			payload: { taskId: string },
		): Promise<ActionResponse> => {
			return await deleteTask(payload.taskId);
		},
		initialState,
	);
	const [interacted, setInteracted] = useState(false);

	useEffect(() => {
		if (state.success?.message) {
			toast.success(state.success.message);
		} else if (state.error?.message) {
			toast.error(state.error.message);
		}
	}, [state]);

	function onCloseHandler() {
		setInteracted((prev) => !prev);
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button
					size="icon"
					variant="ghost:with-active:scale-95"
					className="bg-transparent size-8 px-2 cursor-pointer hover:bg-red-100 text-red-600"
				>
					<Trash2 className="size-4 shrink-0 text-red-600" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the
						selected task. Proceed with caution.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Button
						type="button"
						variant="outline"
						className="cursor-pointer h-10 active:scale-95"
						onClick={onCloseHandler}
					>
						Cancel
					</Button>
					<form
						action={() => {
							formAction({ taskId });
							onCloseHandler();
						}}
					>
						<Button
							type="submit"
							disabled={isPending}
							variant="danger"
							className="cursor-pointer h-10"
						>
							{isPending ? (
								<Loader className="size-4 animate-spin" />
							) : (
								"Delete"
							)}
						</Button>
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
