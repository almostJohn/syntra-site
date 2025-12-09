"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { createTask } from "@/actions/task-actions";
import type { ActionState } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Form, FormField } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";

type CreateTaskFormProps = {
	projectId: string;
};

export function CreateTaskForm({ projectId }: CreateTaskFormProps) {
	const [interacted, setInteracted] = useState(false);
	const { formAction, isPending } = useServerAction({
		action: async (_: ActionState, form: FormData) => {
			return await createTask(_, form, projectId);
		},
		initialState: {} as ActionState,
	});

	function handleClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button>Create New Task</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full rounded-md border-neutral-300 bg-neutral-100/95 p-0 sm:max-w-xl">
				<VisuallyHidden>
					<AlertDialogTitle className="text-lg font-semibold">
						Hidden Title
					</AlertDialogTitle>
					<AlertDialogDescription className="mt-4 mb-6">
						Hidden Description
					</AlertDialogDescription>
				</VisuallyHidden>
				<div className="p-6">
					<h2 className="mb-4 text-2xl font-bold">Create New Task</h2>
					<Form
						action={(formData) => {
							formAction(formData);
							handleClose();
						}}
					>
						<FormField>
							<Label htmlFor="name">
								Name <span className="text-red-500">*</span>
							</Label>
							<Input
								id="name"
								name="name"
								type="text"
								placeholder="Task Name"
								required
								disabled={isPending}
								minLength={3}
								maxLength={100}
								className="border-neutral-300 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30"
							/>
							<Label htmlFor="description">
								Description <span className="text-red-500">*</span>
							</Label>
							<Textarea
								id="description"
								name="description"
								placeholder="Task Description"
								required
								disabled={isPending}
								minLength={3}
								maxLength={300}
								className="h-60 border-neutral-300 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30"
							/>
						</FormField>
						<div className="flex flex-col-reverse gap-2 md:flex-row md:items-center">
							<div className="flex w-full">
								<Button
									type="button"
									variant="outline"
									onClick={handleClose}
									className="w-full"
								>
									Cancel
								</Button>
							</div>
							<div className="flex w-full">
								<Button type="submit" className="w-full" disabled={isPending}>
									{isPending ? (
										<>
											<Loader className="size-5 shrink-0 animate-spin" />
											Creating...
										</>
									) : (
										"Create"
									)}
								</Button>
							</div>
						</div>
					</Form>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
