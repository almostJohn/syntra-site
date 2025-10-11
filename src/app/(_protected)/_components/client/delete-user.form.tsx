"use client";

import { useState, type PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useServerAction } from "@/hooks/use-server-action";
import { deleteUser } from "../../actions/users/delete-user";
import { Loader2, TriangleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type User = {
	username: string;
};

type DeleteUserModalProps = PropsWithChildren & {
	interacted: boolean;
	setInteracted(value: boolean): void;
};

type DeleteUserFormProps = {
	user: User;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

const DeleteUserModal = ({
	interacted,
	setInteracted,
	children,
}: DeleteUserModalProps) => {
	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button
					variant="destructive"
					className="bg-red-500 px-4 text-white hover:bg-red-400"
				>
					Delete Personal Account
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

export function DeleteUserForm({ user }: DeleteUserFormProps) {
	const [interacted, setInteracted] = useState(false);
	const [usernameBeforeDeleting] = useState(user.username);
	const [messageBeforeDeleting] = useState("Delete My Personal Account");
	const [confirmUsername, setConfirmUsername] = useState("");
	const [confirmMessage, setConfirmMessage] = useState("");
	const { formAction, isPending } = useServerAction(deleteUser, initialState, {
		redirectTo: "/login",
	});

	function onClose() {
		setInteracted((prev) => !prev);
		setConfirmUsername("");
		setConfirmMessage("");
	}

	return (
		<DeleteUserModal interacted={interacted} setInteracted={setInteracted}>
			<div className="flex flex-col">
				<div className="flex flex-col gap-4 p-6">
					<div className="grid gap-2">
						<h2 className="text-lg font-semibold uppercase">
							delete personal account
						</h2>
						<p className="text-sm">
							Syntra will delete all of your projects, along with all of your
							tasks, activity, and all other resources belonging to your
							Personal Account.
						</p>
						<div className="mt-2 inline-flex items-center gap-3 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500">
							<div className="flex size-8 items-center justify-center rounded-full bg-red-500 text-white">
								<TriangleAlert className="size-5 shrink-0" />
							</div>
							<p>This action is irreversible. Please be certain.</p>
						</div>
					</div>
					<div className="mt-3 flex flex-col gap-4">
						<div className="grid gap-2">
							<Label htmlFor="confirmUsername">
								<p className="text-sm text-neutral-500">
									Enter your username{" "}
									<strong className="text-neutral-100">
										{usernameBeforeDeleting}
									</strong>{" "}
									to continue:
								</p>
							</Label>
							<Input
								type="text"
								id="confirmUsername"
								name="confirmUsername"
								value={confirmUsername}
								onChange={(e) => setConfirmUsername(e.target.value)}
								className="input-default-class"
								autoComplete="off"
								disabled={isPending}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="confirmMessage">
								<p className="text-sm text-neutral-500">
									To verify, type{" "}
									<strong className="text-neutral-100">
										{messageBeforeDeleting}
									</strong>{" "}
									below:
								</p>
							</Label>
							<Input
								type="text"
								id="confirmMessage"
								name="confirmMessage"
								value={confirmMessage}
								onChange={(e) => setConfirmMessage(e.target.value)}
								className="input-default-class"
								disabled={isPending}
								autoComplete="off"
								required
							/>
						</div>
					</div>
				</div>
				<div className="mt-auto p-6 pt-0">
					<div className="flex flex-col-reverse gap-2 md:flex-row md:items-center">
						<div className="flex w-full items-center">
							<Button
								type="button"
								variant="outline"
								className="w-full"
								onClick={onClose}
							>
								Cancel
							</Button>
						</div>
						<form
							action={() => {
								formAction(undefined);
								onClose();
							}}
							className="flex w-full items-center"
						>
							<Button
								type="submit"
								variant="destructive"
								className="w-full"
								disabled={
									isPending ||
									confirmUsername !== usernameBeforeDeleting ||
									confirmMessage !== messageBeforeDeleting
								}
							>
								{isPending ? (
									<>
										<Loader2 className="size-5 shrink-0 animate-spin" />
										Deleting...
									</>
								) : (
									<>Delete</>
								)}
							</Button>
						</form>
					</div>
				</div>
			</div>
		</DeleteUserModal>
	);
}
