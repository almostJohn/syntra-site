"use client";

import { useState } from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CreateProjectForm } from "../forms/create-project-form";
import { Button } from "@/components/ui/button";

export function CreateProjectModal() {
	const [interacted, setInteracted] = useState(false);

	function handleClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button>New Project</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full rounded-lg border border-neutral-300 bg-neutral-100/95 shadow-xl sm:max-w-2xl">
				<VisuallyHidden>
					<AlertDialogTitle>Hidden Title</AlertDialogTitle>
					<AlertDialogDescription>Hidden Description</AlertDialogDescription>
				</VisuallyHidden>
				<CreateProjectForm handleClose={handleClose} />
			</AlertDialogContent>
		</AlertDialog>
	);
}
