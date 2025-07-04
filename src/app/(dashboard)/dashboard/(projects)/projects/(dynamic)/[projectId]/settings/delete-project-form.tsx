"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useToast } from "@/components/toast-provider";
import { deleteProject } from "../../../../action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionResponse } from "@/lib/server-action";
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

type DeleteProjectFormProps = {
	projectId: string;
};

export function DeleteProjectForm({ projectId }: DeleteProjectFormProps) {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(
		async (
			_prevState: ActionResponse,
			payload: { projectId: string },
		): Promise<ActionResponse> => {
			return await deleteProject(payload.projectId);
		},
		initialState,
	);
	const [messageBeforeDeleting] = useState("Delete My Project");
	const [confirmMessage, setConfirmMessage] = useState("");
	const [interacted, setInteracted] = useState(false);
	const { addToast } = useToast();

	useEffect(() => {
		if (state.successMessage) {
			addToast({ description: state.successMessage, type: "success" });
			router.push("/dashboard");
			router.refresh();
		} else if (state.errorMessage) {
			addToast({ description: state.errorMessage, type: "error" });
		}
	}, [state, router, addToast]);

	function onCloseHandler() {
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
						className="h-10 rounded-sm"
						required
					/>
				</div>
				<div className="flex items-center justify-between w-full">
					<Button
						type="button"
						variant="outline"
						className="cursor-pointer"
						onClick={onCloseHandler}
					>
						Cancel
					</Button>
					<form
						action={() => {
							formAction({ projectId });
							onCloseHandler();
						}}
					>
						<Button
							type="submit"
							disabled={isPending || confirmMessage !== messageBeforeDeleting}
							variant="destructive"
							className="cursor-pointer"
						>
							{isPending ? (
								<Icons.loading className="size-4 shrink-0" />
							) : (
								"Delete Project"
							)}
						</Button>
					</form>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
