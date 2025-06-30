"use client";

import { useActionState, useEffect, useState } from "react";
import { createProject } from "../action";
import { useToast } from "@/components/toast-provider";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/lib/constants";
import { cn } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		projectName: "",
	},
	values: {
		project_name: "",
	},
};

export function CreateProjectDialog() {
	const [state, formAction, isPending] = useActionState(
		createProject,
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
					Create a new project
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full sm:max-w-2xl">
				<VisuallyHidden>
					<AlertDialogTitle>CreateProjectTitle</AlertDialogTitle>
					<AlertDialogDescription>
						CreateProjectDescription
					</AlertDialogDescription>
				</VisuallyHidden>
				<form
					action={(formData) => {
						formAction(formData);
						onCloseHandler();
					}}
					className="flex flex-col space-y-4"
				>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="project_name">
							Project Name <span className="text-red-500">*</span>
						</Label>
						<Input
							type="text"
							id="project_name"
							name="project_name"
							defaultValue={state.values?.project_name}
							minLength={NAME_MIN_LENGTH}
							maxLength={NAME_MAX_LENGTH}
							placeholder="Cool project name"
							className={cn(
								"h-10 rounded-sm",
								state.errors?.projectName && "ring-4 ring-red-500/30",
							)}
							required
						/>
						{state.errors?.projectName && (
							<span className="text-sm font-medium text-red-500">
								{state.errors.projectName}
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
