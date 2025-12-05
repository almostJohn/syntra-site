"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { createProject } from "@/actions/project-actions";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogTitle,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type { ActionState } from "@/types";

export function CreateProjectForm() {
	const [interacted, setInteracted] = useState(false);
	const { formAction, isPending } = useServerAction({
		action: createProject,
		initialState: {} as ActionState,
	});

	function handleClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button>Create New Project</Button>
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
					<h2 className="mb-4 text-2xl font-bold">Create New Project</h2>
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
								placeholder="Project Name"
								required
								disabled={isPending}
								minLength={3}
								maxLength={64}
								className="border-neutral-300 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30"
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
