"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { createProject } from "../../actions/create-project";
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
import {
	PROJECT_NAME_MAX_LENGTH,
	PROJECT_NAME_MIN_LENGTH,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		projectName: "",
	},
};

export function CreateProject() {
	const [interacted, setInteracted] = useState(false);

	function onClose() {
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
				<CreateProjectForm onClose={onClose} />
			</AlertDialogContent>
		</AlertDialog>
	);
}

function CreateProjectForm({ onClose }: { onClose(): void }) {
	const { state, formAction, isPending } = useServerAction(
		createProject,
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
				<Label htmlFor="project_name">
					Project Name <span className="text-red-500">*</span>
				</Label>
				<Input
					type="text"
					id="project_name"
					name="project_name"
					defaultValue={state.values?.project_name}
					minLength={PROJECT_NAME_MIN_LENGTH}
					maxLength={PROJECT_NAME_MAX_LENGTH}
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
