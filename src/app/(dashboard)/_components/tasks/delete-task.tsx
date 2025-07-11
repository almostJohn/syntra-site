"use client";

import { useState } from "react";
import { toAction, useServerAction } from "@/hooks/use-server-action";
import { deleteTask } from "@/app/(dashboard)/actions/delete-task";
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

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function DeleteTask({ taskId }: { taskId: string }) {
	const [interacted, setInteracted] = useState(false);

	function onClose() {
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
						onClick={onClose}
					>
						Cancel
					</Button>
					<DeleteTaskButton taskId={taskId} onClose={onClose} />
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

function DeleteTaskButton({
	taskId,
	onClose,
}: {
	taskId: string;
	onClose(): void;
}) {
	const deleteTaskAction = toAction(deleteTask);

	const { formAction, isPending } = useServerAction(
		deleteTaskAction,
		initialState,
	);

	return (
		<form
			action={() => {
				formAction([taskId]);
				onClose();
			}}
		>
			<Button
				type="submit"
				variant="destructive"
				disabled={isPending}
				className="cursor-pointer w-full"
			>
				{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Delete"}
			</Button>
		</form>
	);
}
