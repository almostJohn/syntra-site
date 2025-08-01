"use client";

import {
	useState,
	type PropsWithChildren,
	type SetStateAction,
	type Dispatch,
} from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { createTask } from "@/actions/tasks/create-task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/lib/constants";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type CreateTaskDialogProps = PropsWithChildren & {
	interacted: boolean;
	setInteracted: Dispatch<SetStateAction<boolean>>;
};

function CreateTaskDialog({
	interacted,
	setInteracted,
	children,
}: CreateTaskDialogProps) {
	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="size-8 px-2 cursor-pointer rounded-full"
				>
					<Icons.plus className="size-4 shrink-0" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full p-0 sm:max-w-xl">
				<VisuallyHidden>
					<AlertDialogTitle>Create Task Title</AlertDialogTitle>
					<AlertDialogDescription>
						Create Task Description
					</AlertDialogDescription>
				</VisuallyHidden>
				{children}
			</AlertDialogContent>
		</AlertDialog>
	);
}

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function CreateTask({
	projectId,
	status,
}: {
	projectId: string;
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
}) {
	const { formAction, isPending } = useServerAction(
		toAction(createTask),
		initialState,
	);
	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<CreateTaskDialog interacted={interacted} setInteracted={setInteracted}>
			<form
				action={(formData) => {
					formAction([initialState, formData, projectId, status]);
					onClose();
				}}
				className="flex flex-col gap-4 p-6"
			>
				<div className="text-xl font-semibold">Create a new task</div>
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="taskName">
						Name <span className="text-red-500">*</span>
					</Label>
					<Input
						type="text"
						id="taskName"
						name="taskName"
						minLength={NAME_MIN_LENGTH}
						maxLength={NAME_MAX_LENGTH}
						placeholder="A cool task"
						className="h-10"
						disabled={isPending}
						autoComplete="off"
						required
					/>
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
					<Button
						type="submit"
						className="h-10 cursor-pointer"
						disabled={isPending}
					>
						{isPending ? (
							<Icons.loading className="size-4 shrink-0" />
						) : (
							"Create"
						)}
					</Button>
				</div>
			</form>
		</CreateTaskDialog>
	);
}
