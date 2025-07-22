"use client";

import { useState } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { deleteTask } from "@/app/(private)/actions/delete-task";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
} from "../ui/alert-dialog";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function DeleteTask({
	projectId,
	taskId,
}: {
	projectId: string;
	taskId: string;
}) {
	const { formAction, isPending } = useServerAction(
		toAction(deleteTask),
		initialState,
	);
	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="cursor-pointer size-8 px-2"
				>
					<Icons.trash className="size-5 shrink-0" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full sm:max-w-lg">
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action is irreversible. The selected task will be permanently
						deleted and removed from your project. Proceed with caution.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Button
						type="button"
						variant="outline"
						className="cursor-pointer h-10"
						onClick={onClose}
					>
						Cancel
					</Button>
					<form
						action={() => {
							formAction([projectId, taskId]);
							onClose();
						}}
					>
						<Button
							type="submit"
							variant="destructive"
							className="cursor-pointer h-10 w-full"
							disabled={isPending}
						>
							{isPending ? (
								<Icons.loading className="size-5 shrink-0" />
							) : (
								"Delete Task"
							)}
						</Button>
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
