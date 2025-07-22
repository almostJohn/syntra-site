"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { createProject } from "@/app/(private)/actions/create-project";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
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

export function CreateProject() {
	const { formAction, isPending } = useServerAction(
		createProject,
		initialState,
	);
	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button className="h-10 cursor-pointer">Create a new project</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full sm:max-w-2xl">
				<VisuallyHidden>
					<AlertDialogTitle>Create Project</AlertDialogTitle>
					<AlertDialogDescription>Create Project</AlertDialogDescription>
				</VisuallyHidden>
				<form
					action={(formData) => {
						formAction(formData);
						onClose();
					}}
					className="flex flex-col gap-4"
				>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="projectName">
							Project Name <span className="text-red-500">*</span>
						</Label>
						<Input
							type="text"
							id="projectName"
							name="projectName"
							minLength={NAME_MIN_LENGTH}
							maxLength={NAME_MAX_LENGTH}
							placeholder="Cool project name"
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
								"Create Project"
							)}
						</Button>
					</div>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
