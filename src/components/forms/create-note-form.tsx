"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createNote } from "@/actions/notes/action";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const initialState = {
	errorMesseage: "",
	errors: {
		content: "",
		title: "",
		subtitle: "",
		tags: "",
	},
	values: {
		content: "",
		title: "",
		subtitle: "",
		tags: "",
	},
};

export function CreateNoteForm() {
	const [state, formAction, isPending] = useActionState(
		createNote,
		initialState,
	);

	useEffect(() => {
		if (state.successMessage) {
			toast.success(state.successMessage);
		} else if (state.errorMessage) {
			toast.error(state.errorMessage);
		}
	}, [state]);

	return (
		<form
			action={formAction}
			className="block p-6 rounded-md bg-background border border-border shadow"
		>
			<div className="flex flex-col space-y-6">
				<h1 className="text-3xl font-extrabold">Create a new note</h1>
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col space-y-2">
						<Label htmlFor="title">
							Title <span className="text-muted-foreground">(Optional)</span>
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
							<span className="font-medium text-red-600 text-xs">
								{state.errors.title}
							</span>
						)}
					</div>
					<div className="flex flex-col space-y-2">
						<Label htmlFor="subtitle">
							Subtitle <span className="text-muted-foreground">(Optional)</span>
						</Label>
						<Input
							type="text"
							id="subtitle"
							name="subtitle"
							defaultValue={state.values?.subtitle}
							className={cn(
								"focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
								state.errors?.subtitle && "border-red-600",
							)}
						/>
						{state.errors?.subtitle && (
							<span className="font-medium text-red-600 text-xs">
								{state.errors.subtitle}
							</span>
						)}
					</div>
					<div className="flex flex-col space-y-2">
						<Label htmlFor="tags">
							Tag <span className="text-red-600">*</span>
						</Label>
						<Input
							type="text"
							id="tags"
							name="tags"
							defaultValue={state.values?.tags}
							className={cn(
								"focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
								state.errors?.tags && "border-red-600",
							)}
							required
						/>
						{state.errors?.tags && (
							<span className="font-medium text-red-600 text-xs">
								{state.errors.tags}
							</span>
						)}
					</div>
					<div className="flex flex-col space-y-2">
						<Label htmlFor="content">
							Content <span className="text-red-600">*</span>
						</Label>
						<Textarea
							id="content"
							name="content"
							defaultValue={state.values?.content}
							className={cn(
								"focus-visible:border-blue-300 focus-visible:ring-blue-600/40 h-32 transition-all",
								state.errors?.content && "border-red-600",
							)}
							required
						/>
						{state.errors?.content && (
							<span className="font-medium text-red-600 text-xs">
								{state.errors.content}
							</span>
						)}
					</div>
				</div>
				<div className="flex items-center justify-end">
					<Button
						type="submit"
						disabled={isPending}
						variant="primary"
						className="cursor-pointer"
					>
						{isPending ? (
							<>
								<Loader className="size-4 animate-spin" />
								Creating note...
							</>
						) : (
							<>Create note</>
						)}
					</Button>
				</div>
			</div>
		</form>
	);
}
