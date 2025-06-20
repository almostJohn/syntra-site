"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader, ListTodo } from "lucide-react";
import { createTask } from "@/actions/tasks/create-task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		title: "",
		content: "",
	},
	values: {
		title: "",
		content: "",
	},
};

export function CreateTaskClient() {
	const [state, formAction, isPending] = useActionState(
		createTask,
		initialState,
	);
	const [interacted, setInteracted] = useState(false);

	useEffect(() => {
		if (state.successMessage) {
			toast.success(state.successMessage);
		} else if (state.errorMessage) {
			toast.error(state.errorMessage);
		}
	}, [state]);

	function onCloseHandler() {
		setInteracted((prev) => !prev);
	}

	return (
		<Dialog open={interacted} onOpenChange={setInteracted}>
			<DialogTrigger className="cursor-pointer rounded-sm h-20 flex flex-col items-center justify-center space-y-2 border border-border transition-all hover:border-blue-600 hover:bg-blue-50 active:scale-95">
				<ListTodo className="size-6 shrink-0 text-blue-600" />
				<span className="font-semibold">Create Task</span>
			</DialogTrigger>
			<DialogContent className="w-full sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>Create a new task</DialogTitle>
					<DialogDescription>
						By creating a new task, you agree to our{" "}
						<NextLink
							href="/terms"
							className="text-blue-600 font-medium transition-colors hover:text-blue-700"
						>
							Terms of Service
						</NextLink>
						, and{" "}
						<NextLink
							href="/privacy"
							className="text-blue-600 font-medium transition-colors hover:text-blue-700"
						>
							Privacy Policy
						</NextLink>
						.
					</DialogDescription>
				</DialogHeader>
				<div>
					<form
						action={(formData) => {
							formAction(formData);
							onCloseHandler();
						}}
						className="flex flex-col space-y-4"
					>
						<div className="flex flex-col space-y-1">
							<Label htmlFor="title">
								Title <span className="text-muted-foreground">(optional)</span>
							</Label>
							<Input
								type="text"
								id="title"
								name="title"
								defaultValue={state.values?.title}
								className={cn(
									"focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
									state.errors?.title && "border-red-600",
								)}
							/>
							{state.errors?.title && (
								<span className="text-red-600 text-sm font-medium">
									{state.errors.title}
								</span>
							)}
						</div>
						<div className="flex flex-col space-y-1">
							<Label htmlFor="content">
								Content <span className="text-red-600">*</span>
							</Label>
							<Textarea
								id="content"
								name="content"
								defaultValue={state.values?.content}
								className={cn(
									"h-45 focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
									state.errors?.content && "border-red-600",
								)}
								required
							/>
							{state.errors?.content && (
								<span className="text-red-600 text-sm font-medium">
									{state.errors.content}
								</span>
							)}
						</div>
						<div className="flex items-center justify-end gap-3">
							<Button
								type="button"
								onClick={onCloseHandler}
								variant="outline"
								className="cursor-pointer transition-all active:scale-95"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isPending}
								className="cursor-pointer"
								variant="primary"
							>
								{isPending ? (
									<Loader className="size-4 animate-spin" />
								) : (
									"Create"
								)}
							</Button>
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
