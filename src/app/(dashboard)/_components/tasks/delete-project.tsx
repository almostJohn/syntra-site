"use client";

import { useState } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { deleteProject } from "@/app/(dashboard)/actions/delete-project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	AlertDialogTrigger,
	AlertDialog,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Icons } from "@/components/icons";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

type DeleteProjectProps = {
	projectId: string;
};

export function DeleteProject({ projectId }: DeleteProjectProps) {
	const [messageBeforeDeleting] = useState("Delete My Project");
	const [confirmMessage, setConfirmMessage] = useState("");
	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
		setConfirmMessage("");
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" className="cursor-pointer">
					Delete Project
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full sm:max-w-2xl">
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action is irreversible. This will permanently delete your
						project. Please proceed with caution.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="flex flex-col space-y-2">
					<Label htmlFor="delete-confirmation">
						<span className="text-sm text-neutral-500">
							Type{" "}
							<span className="text-neutral-900 dark:text-neutral-100">
								&quot;Delete My Project&quot;
							</span>{" "}
							to confirm.
						</span>
					</Label>
					<Input
						type="text"
						id="delete-confirmation"
						name="delete-confirmation"
						value={confirmMessage}
						onChange={(e) => setConfirmMessage(e.target.value)}
						placeholder="Delete My Project"
						className="h-10"
						required
					/>
				</div>
				<div className="flex items-center justify-between w-full">
					<Button
						type="button"
						variant="outline"
						className="cursor-pointer"
						onClick={onClose}
					>
						Cancel
					</Button>
					<DeleteProjectButton
						projectId={projectId}
						confirmMessage={confirmMessage}
						messageBeforeDeleting={messageBeforeDeleting}
						onClose={onClose}
					/>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}

function DeleteProjectButton({
	projectId,
	confirmMessage,
	messageBeforeDeleting,
	onClose,
}: {
	projectId: string;
	confirmMessage: string;
	messageBeforeDeleting: string;
	onClose(): void;
}) {
	const deleteProjectAction = toAction(deleteProject);

	const { formAction, isPending } = useServerAction(
		deleteProjectAction,
		initialState,
		{ redirectTo: "/dashboard" },
	);

	return (
		<form
			action={() => {
				formAction([projectId]);
				onClose();
			}}
		>
			<Button
				type="submit"
				disabled={isPending || confirmMessage !== messageBeforeDeleting}
				variant="destructive"
				className="cursor-pointer"
			>
				{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Delete"}
			</Button>
		</form>
	);
}
