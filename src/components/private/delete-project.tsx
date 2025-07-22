"use client";

import { useState } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { deleteProject } from "@/app/(private)/actions/delete-project";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
	AlertDialogTrigger,
	AlertDialog,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Icons } from "@/components/icons";

type DeleteProjectProps = {
	projectId: string;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function DeleteProject({ projectId }: DeleteProjectProps) {
	const { formAction, isPending } = useServerAction(
		toAction(deleteProject),
		initialState,
		{ redirectTo: "/app" },
	);
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
				<Button variant="destructive" className="h-10 cursor-pointer">
					Delete Project
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full sm:max-w-lg">
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action is irreversible. This will permanently delete your
						project. Please proceed with caution.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="flex flex-col gap-2">
					<Label htmlFor="confirmDelete">
						<p className="text-sm text-neutral-500">
							Type{" "}
							<span className="text-neutral-800 dark:text-neutral-100">
								&quot;Delete My Project&quot;
							</span>{" "}
							to confirm
						</p>
					</Label>
					<Input
						type="text"
						id="confirmDelete"
						name="confirmDelete"
						value={confirmMessage}
						onChange={(e) => setConfirmMessage(e.target.value)}
						placeholder="Delete My Project"
						className="h-10"
						autoComplete="off"
						required
					/>
				</div>
				<div className="flex items-center justify-between">
					<Button
						type="button"
						variant="outline"
						className="cursor-pointer h-10"
						onClick={onClose}
					>
						Cancel
					</Button>
					<form
						action={() => {
							formAction([projectId]);
							onClose();
						}}
					>
						<Button
							type="submit"
							variant="destructive"
							disabled={isPending || confirmMessage !== messageBeforeDeleting}
							className="cursor-pointer h-10"
						>
							{isPending ? (
								<Icons.loading className="size-4 shrink-0" />
							) : (
								"Delete"
							)}
						</Button>
					</form>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
