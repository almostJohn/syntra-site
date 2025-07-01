"use client";

import { useActionState, useEffect, useState } from "react";
import { deleteTask } from "../../../action";
import { useToast } from "@/components/toast-provider";
import { Trash2 } from "lucide-react";
import { Icons } from "@/components/icons";
import {
	AlertDialog,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogHeader,
	AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { ActionResponse } from "@/lib/server-action";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function DeleteTaskDialog({ taskId }: { taskId: string }) {
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
	const { addToast } = useToast();

	useEffect(() => {
		if (state.successMessage) {
			addToast({ description: state.successMessage, type: "success" });
		} else if (state.errorMessage) {
			addToast({ description: state.errorMessage, type: "error" });
		}
	}, [state, addToast]);

	function onCloseHandler() {
		setInteracted((prev) => !prev);
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="cursor-pointer size-8 px-2 hover:bg-red-50 hover:text-red-500 group"
				>
					<Trash2 className="size-4 shrink-0 text-neutral-500 transition-colors group-hover:text-red-500" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full sm:max-w-xl">
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action is irreversible. This will permanently delete the
						selected task. Please proceed with caution.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Button
						type="button"
						variant="outline"
						className="cursor-pointer"
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
							variant="destructive"
							disabled={isPending}
							className="cursor-pointer w-full"
						>
							{isPending ? (
								<Icons.loading className="size-4 shrink-0" />
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
