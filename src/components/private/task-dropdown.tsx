"use client";

import { useState } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { updateTaskStatus } from "@/app/(private)/actions/update-task-status";
import { deleteTask } from "@/app/(private)/actions/delete-task";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogTitle,
	AlertDialogDescription,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Icons } from "../icons";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

type Task = {
	id: string;
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
};

type TaskDropdownProps = {
	task: Task;
	projectId: string;
};

export function TaskDropdown({ task, projectId }: TaskDropdownProps) {
	const [interacted, setInteracted] = useState(false);
	const [isBackward] = useState(true);
	const [isForward] = useState(true);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<DropdownMenu open={interacted} onOpenChange={setInteracted}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="size-8 cursor-pointer hover:bg-transparent dark:hover:bg-transparent"
				>
					<Icons.dotsVertical className="size-3 shrink-0" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-full p-0 sm:max-w-sm" align="end">
				<div className="flex flex-col">
					{isForward && task.status === "INCOMPLETE" && (
						<UpdateTaskStatus
							projectId={projectId}
							taskId={task.id}
							status="IN_PROGRESS"
							label="Move right"
							onClose={onClose}
						/>
					)}
					{isForward && isBackward && task.status === "IN_PROGRESS" && (
						<>
							<UpdateTaskStatus
								projectId={projectId}
								taskId={task.id}
								status="COMPLETE"
								label="Move right"
								onClose={onClose}
							/>
							<UpdateTaskStatus
								projectId={projectId}
								taskId={task.id}
								status="INCOMPLETE"
								label="Move left"
								onClose={onClose}
							/>
						</>
					)}
					{isBackward && task.status === "COMPLETE" && (
						<UpdateTaskStatus
							projectId={projectId}
							taskId={task.id}
							status="IN_PROGRESS"
							label="Move left"
							onClose={onClose}
						/>
					)}
					<DeleteTask projectId={projectId} taskId={task.id} />
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function UpdateTaskStatus({
	projectId,
	taskId,
	status,
	label,
	onClose,
}: {
	projectId: string;
	taskId: string;
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
	label: string;
	onClose(): void;
}) {
	const { formAction, isPending } = useServerAction(
		toAction(updateTaskStatus),
		initialState,
	);

	return (
		<form
			action={() => {
				formAction([projectId, taskId, status]);
				onClose();
			}}
		>
			<button
				type="submit"
				disabled={isPending}
				className="inline-flex items-center cursor-pointer px-3 py-1 gap-2 w-full text-sm font-medium transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none"
			>
				{isPending ? (
					<>
						<Icons.loading className="size-3 shrink-0" /> moving...
					</>
				) : (
					<>{label}</>
				)}
			</button>
		</form>
	);
}

function DeleteTask({
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
				<button className="inline-flex items-center cursor-pointer px-3 py-1 w-full gap-2 text-sm font-medium transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700">
					Delete task
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full sm:max-w-xl">
				<VisuallyHidden>
					<AlertDialogTitle>Delete Task</AlertDialogTitle>
					<AlertDialogDescription>Delete Task</AlertDialogDescription>
				</VisuallyHidden>
				<div className="flex flex-col gap-4">
					<div className="text-xl font-semibold">Delete Task</div>
					<div className="text-sm">
						This action will permanently delete the selected task from your
						project. This cannot be undone, and the task will be removed from
						your project view.
					</div>
					<div className="inline-flex px-3 py-2 text-sm items-center rounded-sm text-red-400 bg-red-200/40 dark:bg-red-600/10">
						This action is irreversible. Please be certain.
					</div>
					<div className="flex items-center justify-between">
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
									"Delete Task"
								)}
							</Button>
						</form>
					</div>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
