"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { create as createTask } from "@/actions/tasks/create.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		title: "",
		subtitle: "",
		content: "",
	},
	values: {
		title: "",
		subtitle: "",
		content: "",
	},
};

type CreateTaskFormProps = {
	handleClose(): void;
};

export function CreateTaskForm({ handleClose }: CreateTaskFormProps) {
	const [state, formAction, isPending] = useActionState(
		createTask,
		initialState,
	);
	const [content, setContent] = useState(state.values?.content || "");

	useEffect(() => {
		if (state.successMessage) {
			toast.success(state.successMessage);
		} else if (state.errorMessage) {
			toast.error(state.errorMessage);
		}
	}, [state]);

	return (
		<form
			action={(formData) => {
				formAction(formData);
				handleClose();
			}}
			className="flex flex-col space-y-6 w-full"
		>
			<div className="flex flex-col gap-y-1">
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
					<span className="text-red-600 text-sm font-medium">
						{state.errors.title}
					</span>
				)}
			</div>
			<div className="flex flex-col gap-y-1">
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
					<span className="text-red-600 text-sm font-medium">
						{state.errors.subtitle}
					</span>
				)}
			</div>
			<div className="flex flex-col gap-y-1">
				<Label htmlFor="content">
					Content <span className="text-red-600">*</span>
				</Label>
				<Textarea
					id="content"
					name="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className={cn(
						"h-50 focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
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
			<div className="flex items-center justify-end space-x-3">
				<Button
					type="button"
					variant="outline"
					className="cursor-pointer transition-all active:scale-95"
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button
					type="submit"
					variant="primary"
					className="cursor-pointer"
					disabled={isPending || !content.trim()}
				>
					{isPending ? (
						<Loader className="size-4 animate-spin" />
					) : (
						"Create task"
					)}
				</Button>
			</div>
		</form>
	);
}
