"use client";

import {
	useState,
	type PropsWithChildren,
	type SetStateAction,
	type Dispatch,
} from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { deleteProject } from "@/actions/projects/delete-project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type DeleteProjectDialogProps = PropsWithChildren & {
	interacted: boolean;
	setInteracted: Dispatch<SetStateAction<boolean>>;
};

function DeleteProjectDialog({
	interacted,
	setInteracted,
	children,
}: DeleteProjectDialogProps) {
	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button
					type="button"
					variant="destructive"
					className="h-10 cursor-pointer"
				>
					Delete Project
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full p-0 sm:max-w-xl">
				<VisuallyHidden>
					<AlertDialogTitle>Delete Project Title</AlertDialogTitle>
					<AlertDialogDescription>
						Delete Project Description
					</AlertDialogDescription>
				</VisuallyHidden>
				{children}
			</AlertDialogContent>
		</AlertDialog>
	);
}

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function DeleteProject({
	project,
}: {
	project: { id: string; name: string };
}) {
	const { formAction, isPending } = useServerAction(
		toAction(deleteProject),
		initialState,
		{ redirectTo: "/app" },
	);
	const [projectNameBeforeDeleting] = useState(project.name);
	const [messageBeforeDeleting] = useState("delete my project");
	const [confirmProjectName, setConfirmProjectName] = useState("");
	const [confirmMessage, setConfirmMessage] = useState("");
	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
		setConfirmProjectName("");
		setConfirmMessage("");
	}

	return (
		<div className="flex flex-col rounded-sm border border-neutral-300 dark:border-neutral-700">
			<div className="flex flex-col gap-4 p-6">
				<div className="font-semibold text-lg">Delete Project</div>
				<div className="text-sm">
					Permanently remove this project and all of it&apos;s contents from the
					taskthing platform. This action is irreversible, so please continue
					with caution.
				</div>
			</div>
			<div className="mt-auto p-6 md:px-6 md:py-4 border-t border-neutral-300 dark:border-neutral-700">
				<div className="flex items-center justify-center md:justify-end">
					<DeleteProjectDialog
						interacted={interacted}
						setInteracted={setInteracted}
					>
						<div className="flex flex-col gap-4 p-6">
							<div className="text-xl font-semibold">Delete this project</div>
							<div className="text-sm">
								Deleting this project will permanently remove the project and
								all it&apos;s associated tasks. Audit logs will be retained for
								reference.
							</div>
							<Badge className="text-sm px-3 font-normal justify-start border-red-300 bg-red-100 dark:border-red-700/20 dark:bg-red-600/10 text-red-400">
								This action is irreversible. Please be certain.
							</Badge>
							<div className="flex flex-col gap-1.5">
								<Label htmlFor="confirmProjectName">
									<p className="text-sm text-neutral-500">
										Enter your project name{" "}
										<strong className="text-neutral-800 dark:text-neutral-100">
											{project.name}
										</strong>{" "}
										to continue:
									</p>
								</Label>
								<Input
									type="text"
									id="confirmProjectName"
									name="confirmProjectName"
									value={confirmProjectName}
									onChange={(e) => setConfirmProjectName(e.target.value)}
									className="h-10"
									autoComplete="off"
									required
								/>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label htmlFor="confirmDelete">
									<p className="text-sm text-neutral-500">
										To verify, type{" "}
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
									className="h-10"
									autoComplete="off"
									required
								/>
							</div>
							<div className="flex items-center justify-between">
								<Button
									type="button"
									variant="outline"
									className="h-10 cursor-pointer"
									onClick={onClose}
								>
									Cancel
								</Button>
								<form
									action={() => {
										formAction([project.id]);
										onClose();
									}}
								>
									<Button
										type="submit"
										variant="destructive"
										className="h-10 cursor-pointer"
										disabled={
											isPending ||
											confirmProjectName !== projectNameBeforeDeleting ||
											confirmMessage !== messageBeforeDeleting
										}
									>
										{isPending ? (
											<Icons.loading className="size-4 shrink-0" />
										) : (
											"Delete Project"
										)}
									</Button>
								</form>
							</div>
						</div>
					</DeleteProjectDialog>
				</div>
			</div>
		</div>
	);
}
