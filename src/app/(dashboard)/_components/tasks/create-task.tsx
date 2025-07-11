"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { createTask } from "@/app/(dashboard)/actions/create-task";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogDescription,
	AlertDialogContent,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
	TASK_CONTENT_MAX_LENGTH,
	TASK_CONTENT_MIN_LENGTH,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		taskContent: "",
	},
};

export function CreateTask() {
	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button className="cursor-pointer">
					<Icons.plus className="size-4 shrink-0" />
					Create a new task
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full sm:max-w-2xl">
				<VisuallyHidden>
					<AlertDialogTitle>CreateTaskTitle</AlertDialogTitle>
					<AlertDialogDescription>CreateTaskDescription</AlertDialogDescription>
				</VisuallyHidden>
				<CreateTaskForm onClose={onClose} />
			</AlertDialogContent>
		</AlertDialog>
	);
}

function CreateTaskForm({ onClose }: { onClose(): void }) {
	const { state, formAction, isPending } = useServerAction(
		createTask,
		initialState,
	);

	return (
		<form
			action={(formData) => {
				formAction(formData);
				onClose();
			}}
			className="flex flex-col space-y-4"
		>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="task_content">
					Task <span className="text-red-500">*</span>
				</Label>
				<Textarea
					id="task_content"
					name="task_content"
					minLength={TASK_CONTENT_MIN_LENGTH}
					maxLength={TASK_CONTENT_MAX_LENGTH}
					placeholder="A cool task to finish"
					className={cn(
						"h-40 rounded-sm",
						state.errors?.taskContent && "ring-4 ring-red-500/30",
					)}
					required
				/>
				{state.errors?.taskContent && (
					<span className="text-sm font-medium text-red-500">
						{state.errors.taskContent}
					</span>
				)}
			</div>
			<div className="flex items-center justify-between">
				<Button
					type="button"
					variant="outline"
					className="cursor-pointer"
					onClick={onClose}
				>
					Cancel
				</Button>
				<Button type="submit" disabled={isPending} className="cursor-pointer">
					{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Create"}
				</Button>
			</div>
		</form>
	);
}
