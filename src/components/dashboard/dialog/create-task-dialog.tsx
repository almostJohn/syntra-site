"use client";

import { useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { CreateTaskForm } from "../forms/create-task-form";
import { NextLink } from "@/components/ui/next-link";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";

export function CreateTaskDialog() {
	const [interacted, setInteracted] = useState(false);

	function handleClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<Dialog open={interacted} onOpenChange={setInteracted}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="h-20 flex flex-col items-center justify-center cursor-pointer space-y-2"
				>
					<NotebookPen className="size-6 text-blue-600 shrink-0" />
					<span>Create Task</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full max-w-5xl">
				<DialogHeader>
					<DialogTitle>Create a new task</DialogTitle>
					<DialogDescription>
						By creating a new task, you agree to our{" "}
						<NextLink
							href="/terms"
							className="font-medium text-blue-600 transition-colors hover:text-blue-700"
						>
							Terms of Service
						</NextLink>{" "}
						and{" "}
						<NextLink
							href="/privacy"
							className="font-medium text-blue-600 transition-colors hover:text-blue-700"
						>
							Privacy Policy
						</NextLink>
						.
					</DialogDescription>
				</DialogHeader>
				<CreateTaskForm handleClose={handleClose} />
			</DialogContent>
		</Dialog>
	);
}
