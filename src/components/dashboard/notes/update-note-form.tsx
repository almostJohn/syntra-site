"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { updateNote } from "@/actions/notes/update-note";
import type { ActionResponse } from "@/lib/server-action";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
	successMessage: "",
	errorMessage: "",
	values: {
		title: "",
		content: "",
	},
};

type Note = {
	id: string;
	title: string | null;
	content: string;
};

export function UpdateNoteForm({ note }: { note: Note }) {
	const [state, formAction, isPending] = useActionState(
		async (
			_prevState: ActionResponse,
			payload: { noteId: string; title: string | null; content: string },
		): Promise<ActionResponse> => {
			return await updateNote(payload.noteId, payload.title, payload.content);
		},
		initialState,
	);
	const [title, setTitle] = useState(note.title ?? "");
	const [content, setContent] = useState(note.content);
	const [interacted, setInteracted] = useState(false);

	useEffect(() => {
		if (interacted) {
			setTitle(note.title ?? "");
			setContent(note.content);
		}
	}, [interacted, note]);

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
			<DialogTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="size-8 px-2 cursor-pointer text-muted-foreground hover:bg-blue-50 hover:text-blue-600"
				>
					<Edit className="size-4 shrink-0" />
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>Update your note</DialogTitle>
					<DialogDescription>
						Your current note content displayed below. Make your desired
						changes.
					</DialogDescription>
				</DialogHeader>
				<div>
					<form
						action={() => {
							formAction({ noteId: note.id, title, content });
							onCloseHandler();
						}}
						className="flex flex-col space-y-4"
					>
						<div className="flex flex-col space-y-1">
							<Label htmlFor="title">Title</Label>
							<Input
								type="text"
								id="title"
								name="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all"
							/>
						</div>
						<div className="flex flex-col space-y-1">
							<Label htmlFor="content">Content</Label>
							<Textarea
								id="content"
								name="content"
								value={content}
								onChange={(e) => setContent(e.target.value)}
								className="h-45 focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all"
							/>
						</div>
						<div className="flex items-center gap-3 justify-end">
							<Button
								type="button"
								variant="outline"
								className="cursor-pointer transition-all active:scale-95"
								onClick={onCloseHandler}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isPending}
								variant="primary"
								className="cursor-pointer"
							>
								{isPending ? (
									<Loader className="size-4 animate-spin" />
								) : (
									"Update"
								)}
							</Button>
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
