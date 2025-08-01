"use client";

import {
	useState,
	type PropsWithChildren,
	type SetStateAction,
	type Dispatch,
} from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { createProject } from "@/actions/projects/create-project";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

type CreateProjectDialogProps = PropsWithChildren & {
	interacted: boolean;
	setInteracted: Dispatch<SetStateAction<boolean>>;
};

function CreateProjectDialog({
	interacted,
	setInteracted,
	children,
}: CreateProjectDialogProps) {
	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button type="button" className="h-10 cursor-pointer">
					Create a new project
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full p-0 sm:max-w-xl">
				<VisuallyHidden>
					<AlertDialogTitle>Create Project Title</AlertDialogTitle>
					<AlertDialogDescription>
						Create Project Description
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
		<CreateProjectDialog interacted={interacted} setInteracted={setInteracted}>
			<form
				action={(formData) => {
					formAction(formData);
					onClose();
				}}
				className="flex flex-col gap-4 p-6"
			>
				<div className="text-xl font-semibold">Create a new project</div>
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="projectName">
						Name <span className="text-red-500">*</span>
					</Label>
					<Input
						type="text"
						id="projectName"
						name="projectName"
						minLength={NAME_MIN_LENGTH}
						maxLength={NAME_MAX_LENGTH}
						placeholder="Cool project"
						autoComplete="off"
						disabled={isPending}
						className="h-10"
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
						disabled={isPending}
						className="cursor-pointer h-10"
					>
						{isPending ? (
							<Icons.loading className="size-4 shrink-0" />
						) : (
							"Create"
						)}
					</Button>
				</div>
			</form>
		</CreateProjectDialog>
	);
}
