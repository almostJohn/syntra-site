"use client";

import { useState, type PropsWithChildren } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { createTask } from "../../actions/tasks/create-task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	TITLE_MAX_LENGTH,
	TITLE_MIN_LENGTH,
	CONTENT_MAX_LENGTH,
	CONTENT_MIN_LENGTH,
	SUBTITLE_MAX_LENGTH,
	SUBTITLE_MIN_LENGTH,
} from "@/lib/constants";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogTitle,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Form, FormControl } from "@/components/ui/form";
import { Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type CreateTaskModalProps = PropsWithChildren & {
	interacted: boolean;
	setInteracted(value: boolean): void;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		title: "",
		subtitle: "",
		content: "",
		priority: "",
		category: "",
	},
	values: {
		title: "",
	},
};

const CreateTaskModal = ({
	interacted,
	setInteracted,
	children,
}: CreateTaskModalProps) => {
	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button className="group w-full rounded-full">
					<Plus className="size-6 shrink-0 transition-transform group-hover:rotate-180" />{" "}
					Add New Task
				</Button>
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

type CreateTaskFormProps = {
	projectId: string;
	status: "backlog" | "todo" | "in_progress" | "complete";
};

export function CreateTaskForm({ projectId, status }: CreateTaskFormProps) {
	const [interacted, setInteracted] = useState(false);
	const { state, formAction, isPending } = useServerAction(
		toAction(createTask),
		initialState,
	);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<CreateTaskModal interacted={interacted} setInteracted={setInteracted}>
			<Form
				action={(formData) => {
					formAction([initialState, formData, projectId, status]);
					onClose();
				}}
				className="p-6"
			>
				<h2 className="text-lg font-semibold uppercase">create a task</h2>
				<FormControl>
					<Label htmlFor="title">
						Title <span className="text-red-500">*</span>
					</Label>
					<Input
						type="text"
						id="title"
						name="title"
						defaultValue={state.values?.title}
						minLength={TITLE_MIN_LENGTH}
						maxLength={TITLE_MAX_LENGTH}
						autoComplete="off"
						placeholder="Title (eg:, chat area ui)"
						required
						className={cn(
							"input-default-class",
							state.errors?.title &&
								"border-red-500/80 ring-[3px] ring-red-500/30",
						)}
					/>
					{state.errors?.title && (
						<span className="text-sm font-medium text-red-500">
							{state.errors.title}
						</span>
					)}
				</FormControl>
				<FormControl>
					<Label htmlFor="subtitle">Subtitle (optional)</Label>
					<Input
						type="text"
						id="subtitle"
						name="subtitle"
						minLength={SUBTITLE_MIN_LENGTH}
						maxLength={SUBTITLE_MAX_LENGTH}
						autoComplete="off"
						placeholder="Subtitle (eg:, chat area bubbles ui)"
						className={cn(
							"input-default-class",
							state.errors?.subtitle &&
								"border-red-500/80 ring-[3px] ring-red-500/30",
						)}
					/>
					{state.errors?.subtitle && (
						<span className="text-sm font-medium text-red-500">
							{state.errors.subtitle}
						</span>
					)}
				</FormControl>
				<FormControl>
					<Label htmlFor="content">Content (optional)</Label>
					<Textarea
						id="content"
						name="content"
						minLength={CONTENT_MIN_LENGTH}
						maxLength={CONTENT_MAX_LENGTH}
						autoComplete="off"
						placeholder="Content (eg:, fixing chat area ui)"
						className={cn(
							"input-default-class",
							state.errors?.content &&
								"border-red-500/80 ring-[3px] ring-red-500/30",
						)}
					/>
					{state.errors?.content && (
						<span className="text-sm font-medium text-red-500">
							{state.errors.content}
						</span>
					)}
				</FormControl>
				<FormControl>
					<h3 className="text-sm font-medium">
						Priority <span className="text-red-500">*</span>
					</h3>
					<Select
						onValueChange={(value) => {
							const input = document.getElementById(
								"priority-hidden",
							) as HTMLInputElement;
							if (input) input.value = value;
						}}
					>
						<SelectTrigger className="input-default-class w-full">
							<SelectValue id="priority" placeholder="Priority" />
						</SelectTrigger>
						<SelectContent className="rounded-sm border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-xl">
							<SelectItem value="critical">Critical</SelectItem>
							<SelectItem value="high">High</SelectItem>
							<SelectItem value="medium">Medium</SelectItem>
							<SelectItem value="low">Low</SelectItem>
						</SelectContent>
					</Select>
					<input type="hidden" id="priority-hidden" name="priority" required />
					{state.errors?.priority && (
						<span className="text-sm font-medium text-red-500">
							{state.errors.priority}
						</span>
					)}
				</FormControl>
				<FormControl>
					<h3 className="text-sm font-medium">
						Category <span className="text-red-500">*</span>
					</h3>
					<Select
						onValueChange={(value) => {
							const input = document.getElementById(
								"category-hidden",
							) as HTMLInputElement;
							if (input) input.value = value;
						}}
					>
						<SelectTrigger className="input-default-class w-full">
							<SelectValue id="category" placeholder="Category" />
						</SelectTrigger>
						<SelectContent className="rounded-sm border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-xl">
							<SelectItem value="feature">Feature</SelectItem>
							<SelectItem value="bug">Bug</SelectItem>
							<SelectItem value="docs">Docs</SelectItem>
							<SelectItem value="refactor">Refactor</SelectItem>
						</SelectContent>
					</Select>
					<input type="hidden" id="category-hidden" name="category" required />
					{state.errors?.category && (
						<span className="text-sm font-medium text-red-500">
							{state.errors.category}
						</span>
					)}
				</FormControl>
				<div className="mt-2 flex flex-col-reverse gap-2 md:flex-row md:items-center">
					<div className="w-full">
						<Button
							type="button"
							variant="secondary"
							onClick={onClose}
							className="w-full"
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
		</CreateTaskModal>
	);
}
