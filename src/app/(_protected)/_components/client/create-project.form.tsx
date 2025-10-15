"use client";

import { useState, type PropsWithChildren } from "react";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { useServerAction } from "@/hooks/use-server-action";
import { createProject } from "../../actions/projects/create-project";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type CreateProjectModalProps = PropsWithChildren & {
	interacted: boolean;
	setInteracted(value: boolean): void;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		name: "",
	},
	values: {
		name: "",
	},
};

const CreateProjectModal = ({
	interacted,
	setInteracted,
	children,
}: CreateProjectModalProps) => {
	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button className="px-4">New Project</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full rounded-sm border border-neutral-800 bg-neutral-900 p-0 text-neutral-100 shadow-xl sm:max-w-xl">
				<VisuallyHidden>
					<AlertDialogTitle>Hidden Title</AlertDialogTitle>
					<AlertDialogDescription>Hidden Description</AlertDialogDescription>
				</VisuallyHidden>
				{children}
			</AlertDialogContent>
		</AlertDialog>
	);
};

export function CreateProjectForm() {
	const [interacted, setInteracted] = useState(false);
	const { state, formAction, isPending } = useServerAction(
		createProject,
		initialState,
	);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<CreateProjectModal interacted={interacted} setInteracted={setInteracted}>
			<Form
				action={(formData) => {
					formAction(formData);
					onClose();
				}}
				className="p-6"
			>
				<h2 className="text-lg font-semibold uppercase">create a project</h2>
				<FormControl>
					<Label htmlFor="name">
						Name <span className="text-red-500">*</span>
					</Label>
					<Input
						type="text"
						id="name"
						name="name"
						defaultValue={state.values?.name}
						minLength={NAME_MIN_LENGTH}
						maxLength={NAME_MAX_LENGTH}
						autoComplete="off"
						placeholder="Project name (eg:, chat ai app)"
						required
						className={cn(
							"input-default-class",
							state.errors?.name &&
								"border-red-500/80 ring-[3px] ring-red-500/30",
						)}
					/>
					{state.errors?.name && (
						<span className="text-sm font-medium text-red-500">
							{state.errors.name}
						</span>
					)}
				</FormControl>
				<div className="flex flex-col-reverse gap-2 md:flex-row md:items-center">
					<div className="w-full">
						<Button
							type="button"
							variant="secondary"
							className="w-full"
							onClick={onClose}
						>
							Cancel
						</Button>
					</div>
					<div className="w-full">
						<Button type="submit" disabled={isPending} className="w-full">
							{isPending ? (
								<>
									<Loader2 className="size-4 shrink-0 animate-spin" />{" "}
									Creating...
								</>
							) : (
								<>Create</>
							)}
						</Button>
					</div>
				</div>
			</Form>
		</CreateProjectModal>
	);
}
