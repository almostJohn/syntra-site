"use client";

import { useState } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { createTask } from "@/app/(private)/actions/create-task";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
} from "../ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/lib/constants";
import { Icons } from "../icons";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function CreateTask({ projectId }: { projectId: string }) {
	const { formAction, isPending } = useServerAction(
		toAction(createTask),
		initialState,
	);
	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button className="h-10 cursor-pointer">Create a new task</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full sm:max-w-2xl">
				<VisuallyHidden>
					<AlertDialogTitle>Create Project</AlertDialogTitle>
					<AlertDialogDescription>Create Project</AlertDialogDescription>
				</VisuallyHidden>
				<form
					action={(formData) => {
						formAction([initialState, formData, projectId]);
						onClose();
					}}
					className="flex flex-col gap-4"
				>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="taskName">
							Task Name <span className="text-red-500">*</span>
						</Label>
						<Input
							type="text"
							id="taskName"
							name="taskName"
							minLength={NAME_MIN_LENGTH}
							maxLength={NAME_MAX_LENGTH}
							placeholder="What's your next task going to be?"
							className="h-10"
							disabled={isPending}
							autoComplete="off"
							required
						/>
					</div>
					<div className="flex items-center justify-between">
						<Button
							type="button"
							variant="outline"
							className="h-10 cursor-pointer"
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isPending}
							className="h-10 cursor-pointer"
						>
							{isPending ? (
								<Icons.loading className="size-4 shrink-0" />
							) : (
								"Create Task"
							)}
						</Button>
					</div>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
