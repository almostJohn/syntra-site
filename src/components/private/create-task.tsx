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
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="size-8 px-2 rounded-full cursor-pointer"
				>
					<Icons.plus className="size-4 shrink-0" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full sm:max-w-2xl">
				<VisuallyHidden>
					<AlertDialogTitle>Create Task</AlertDialogTitle>
					<AlertDialogDescription>Create Task</AlertDialogDescription>
				</VisuallyHidden>
				<form
					action={(formData) => {
						formAction([initialState, formData, projectId, status]);
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
							placeholder="A cool task"
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
