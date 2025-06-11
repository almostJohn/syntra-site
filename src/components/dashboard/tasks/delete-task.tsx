"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader, Trash2 } from "lucide-react";
import type { ActionResponse } from "@/lib/server-action";
import { deleteTask } from "@/actions/tasks/delete-task";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

type DeleteTaskProps = {
	taskId: string;
};

export function DeleteTask({ taskId }: DeleteTaskProps) {
	const [interacted, setInteracted] = useState(false);
	const [state, formAction, isPending] = useActionState(
		async (_prevState: ActionResponse, payload: { taskId: string }) => {
			return await deleteTask(payload.taskId);
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

	function handleClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<Dialog open={interacted} onOpenChange={setInteracted}>
			<DialogTrigger asChild>
				<Button
					size="icon"
					variant="ghost:with-active:scale-95"
					className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-600"
				>
					<Trash2 className="size-5 shrink-0" />
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full max-w-5xl">
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete the
						selected current task. Proceed with caution.
					</DialogDescription>
				</DialogHeader>
				<form
					action={() => {
						formAction({ taskId: taskId });
						handleClose();
					}}
					className="flex items-center justify-end gap-3"
				>
					<Button
						type="button"
						variant="outline"
						className="cursor-pointer transition-all active:scale-95"
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						variant="danger"
						className="cursor-pointer"
						disabled={isPending}
					>
						{isPending ? (
							<Loader className="size-4 animate-spin" />
						) : (
							"Delete Task"
						)}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
