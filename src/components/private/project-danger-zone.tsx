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
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Icons } from "@/components/icons";

type ProjectDangerZoneProps = {
	projectId: string;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function ProjectDangerZone({ projectId }: ProjectDangerZoneProps) {
	const { formAction, isPending } = useServerAction(
		toAction(deleteProject),
		initialState,
		{ redirectTo: "/app" },
	);
	const [messageBeforeDeleting] = useState("delete my project");
	const [confirmMessage, setConfirmMessage] = useState("");
	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
		setConfirmMessage("");
	}

	return (
		<div className="flex flex-col rounded-sm border border-neutral-200 dark:border-neutral-700">
			<div className="flex flex-col gap-4 p-5">
				<div className="font-semibold text-red-500">Danger Zone</div>
				<div className="text-sm">
					Permanently remove this project and all of it&apos;s contents from the
					Syntra platform. This action is irreversible, so please continue with
					caution.
				</div>
			</div>
			<div className="mt-auto px-5 py-3 border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-end">
					<AlertDialog open={interacted} onOpenChange={setInteracted}>
						<AlertDialogTrigger asChild>
							<Button
								variant="destructive"
								size="sm"
								className="h-8 px-3 cursor-pointer"
							>
								Delete Project
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="w-full sm:max-w-xl">
							<VisuallyHidden>
								<AlertDialogTitle>Delete Project</AlertDialogTitle>
								<AlertDialogDescription>Delete Project</AlertDialogDescription>
							</VisuallyHidden>
							<div className="flex flex-col gap-4">
								<div className="text-xl font-semibold">Delete Project</div>
								<div className="text-sm">
									Deleting this project will permanently remove the project and
									all it&apos;s associated tasks. Audit logs will be retained
									for reference.
								</div>
								<div className="inline-flex px-3 py-2 text-sm items-center rounded-sm text-red-400 bg-red-200/40 dark:bg-red-600/10">
									This action is irreversible. Please be certain.
								</div>
								<div className="flex flex-col gap-1.5">
									<Label htmlFor="confirmDelete">
										<p className="text-sm text-neutral-500">
											To confirm, type{" "}
											<strong className="text-neutral-800 dark:text-neutral-100">
												delete my project
											</strong>{" "}
											below:
										</p>
									</Label>
									<Input
										type="text"
										id="confirmDelete"
										name="confirmDelete"
										value={confirmMessage}
										onChange={(e) => setConfirmMessage(e.target.value)}
										placeholder="delete my project"
										className="h-10"
										autoComplete="off"
										required
									/>
								</div>
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
										disabled={
											isPending || confirmMessage !== messageBeforeDeleting
										}
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
				</div>
			</div>
		</div>
	);
}
