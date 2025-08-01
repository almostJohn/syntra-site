"use client";

import {
	useState,
	type PropsWithChildren,
	type SetStateAction,
	type Dispatch,
} from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { deleteTask } from "@/actions/tasks/delete-task";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type DeleteTaskDialogProps = PropsWithChildren & {
	interacted: boolean;
	setInteracted: Dispatch<SetStateAction<boolean>>;
};

function DeleteTaskDialog({
	interacted,
	setInteracted,
	children,
}: DeleteTaskDialogProps) {
	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<button
					type="button"
					className="inline-flex items-center gap-2 text-xs font-medium h-8 px-3 py-0.5 w-full transition-colors cursor-pointer duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
				>
					Delete task
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full p-0 sm:max-w-xl">
				<VisuallyHidden>
					<AlertDialogTitle>Delete Task Title</AlertDialogTitle>
					<AlertDialogDescription>
						Delete Task Description
					</AlertDialogDescription>
				</VisuallyHidden>
				{children}
			</AlertDialogContent>
		</AlertDialog>
	);
}

type DeleteTaskProps = {
	projectId: string;
	taskId: string;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function DeleteTask({ projectId, taskId }: DeleteTaskProps) {
	const { formAction, isPending } = useServerAction(
		toAction(deleteTask),
		initialState,
	);
	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<DeleteTaskDialog interacted={interacted} setInteracted={setInteracted}>
			<div className="flex flex-col gap-4 p-6">
				<div className="text-xl font-semibold">Delete selected task</div>
				<div className="text-sm">
					This action will permanently delete the selected task from your
					project. This cannot be undone, and the task will be removed from your
					project view.
				</div>
				<div className="flex items-center justify-end gap-3">
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
							className="cursor-pointer h-10"
							disabled={isPending}
						>
							{isPending ? (
								<Icons.loading className="size-4 shrink-0" />
							) : (
								"Delete"
							)}
						</Button>
					</form>
				</div>
			</div>
		</DeleteTaskDialog>
	);
}
