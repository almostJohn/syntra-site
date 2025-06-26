"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader, Paperclip } from "lucide-react";
import { createNote } from "@/actions/notes/create-note";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogTrigger,
	DialogHeader,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";

const initialState = {
	success: {
		statusCode: 0,
		message: "",
	},
	error: {
		statusCode: 0,
		message: "",
	},
	errors: {
		title: "",
		description: "",
	},
	values: {
		title: "",
		description: "",
	},
};

export function CreateNoteDialog() {
	const [state, formAction, isPending] = useActionState(
		createNote,
		initialState,
	);
	const [interacted, setInteracted] = useState(false);

	useEffect(() => {
		if (state.success?.message) {
			toast.success(state.success.message);
		} else if (state.error?.message) {
			toast.error(state.error.message);
		}
	}, [state]);

	function onCloseHandler() {
		setInteracted((prev) => !prev);
	}

	return (
		<Dialog open={interacted} onOpenChange={setInteracted}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="lg"
					className="cursor-pointer border-border bg-transparent h-20 flex flex-col items-center justify-center space-y-2 transition-all hover:border-purple-500 hover:bg-purple-500/10 active:scale-95"
				>
					<Paperclip className="size-6 shrink-0 text-purple-500" />
					<span className="font-semibold">Create note</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>Create a new note</DialogTitle>
					<DialogDescription>
						By creating a new note, you agree to our{" "}
						<NextLink
							href="/terms"
							className="text-[#5865f2] font-medium transition-colors hover:text-[#5865f2]/80 hover:underline"
						>
							Terms of Service
						</NextLink>
						, and{" "}
						<NextLink
							href="/privacy"
							className="text-[#5865f2] font-medium transition-colors hover:text-[#5865f2]/80 hover:underline"
						>
							Privacy Policy
						</NextLink>
						.
					</DialogDescription>
				</DialogHeader>
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
								"h-10 rounded-sm focus-visible:border-[#5865f2]/60 focus-visible:ring-[#5865f2]/40 transition-all",
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
						<Label htmlFor="description">
							Description <span className="text-red-600">*</span>
						</Label>
						<Textarea
							id="description"
							name="description"
							defaultValue={state.values?.description}
							className={cn(
								"h-50 rounded-sm focus-visible:border-[#5865f2]/60 focus-visible:ring-[#5865f2]/40 transition-all",
								state.errors?.description && "border-red-600",
							)}
							required
						/>
						{state.errors?.description && (
							<span className="text-red-600 text-sm font-medium">
								{state.errors.description}
							</span>
						)}
					</div>
					<div className="flex items-center justify-between w-full">
						<Button
							type="button"
							variant="outline"
							className="h-10 cursor-pointer active:scale-95"
							onClick={onCloseHandler}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isPending}
							variant="primary"
							className="h-10 cursor-pointer"
						>
							{isPending ? (
								<Loader className="size-4 animate-spin" />
							) : (
								"Create"
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
