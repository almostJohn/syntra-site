"use client";

import { useActionState, useEffect, useState } from "react";
import { createTask } from "../../../action";
import { useToast } from "@/components/toast-provider";
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
import { CONTENT_MAX_LENGTH, CONTENT_MIN_LENGTH } from "@/lib/constants";
import { cn } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		taskContent: "",
	},
	values: {
		task_content: "",
	},
};

export function CreateTaskDialog() {
	const [state, formAction, isPending] = useActionState(
		createTask,
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
				<form
					action={(formData) => {
						formAction(formData);
						onCloseHandler();
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
							defaultValue={state.values?.task_content}
							minLength={CONTENT_MIN_LENGTH}
							maxLength={CONTENT_MAX_LENGTH}
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
							onClick={onCloseHandler}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isPending}
							className="cursor-pointer"
						>
							{isPending ? (
								<Icons.loading className="size-4 shrink-0" />
							) : (
								"Create"
							)}
						</Button>
					</div>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
