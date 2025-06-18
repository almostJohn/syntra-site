"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader, Trash2 } from "lucide-react";
import { deleteTask } from "@/actions/tasks/delete-task";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import type { ActionResponse } from "@/lib/server-action";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function DeleteTaskButton({ taskId }: { taskId: string }) {
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
		if (state.successMessage) {
			toast.success(state.successMessage);
		} else if (state.errorMessage) {
			toast.error(state.errorMessage);
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
					variant="ghost"
					className="bg-transparent size-8 px-2 cursor-pointer text-red-600 hover:bg-red-50 active:scale-95"
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
						className="cursor-pointer active:scale-95"
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
							className="bg-red-600 text-white cursor-pointer hover:bg-red-700 active:scale-95"
							disabled={isPending}
						>
							{isPending ? (
								<Loader className="size-4 animate-spin" />
							) : (
								"Delete task"
							)}
						</Button>
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
