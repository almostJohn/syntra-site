"use client";

import {
	useState,
	type PropsWithChildren,
	type SetStateAction,
	type Dispatch,
} from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { deleteUser } from "@/actions/users/delete-user";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogTitle,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type DeleteAccountDialogProps = PropsWithChildren & {
	interacted: boolean;
	setInteracted: Dispatch<SetStateAction<boolean>>;
};

function DeleteAccountDialog({
	interacted,
	setInteracted,
	children,
}: DeleteAccountDialogProps) {
	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" className="h-10 cursor-pointer">
					Delete Personal Account
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full p-0 sm:max-w-xl">
				<VisuallyHidden>
					<AlertDialogTitle>Delete Account Title</AlertDialogTitle>
					<AlertDialogDescription>
						Delete Account Description
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

export function DeleteAccountSettings({
	user,
}: {
	user: { username: string };
}) {
	const { formAction, isPending } = useServerAction(deleteUser, initialState, {
		redirectTo: "/login",
	});
	const [interacted, setInteracted] = useState(false);
	const [usernameBeforeDeleting] = useState(user.username);
	const [messageBeforeDeleting] = useState("delete my personal account");
	const [confirmUsername, setConfirmUsername] = useState("");
	const [confirmMessage, setConfirmMessage] = useState("");

	function onClose() {
		setInteracted((prev) => !prev);
		setConfirmUsername("");
		setConfirmMessage("");
	}

	return (
		<div className="flex flex-col rounded-md shadow-sm border border-neutral-300 dark:border-neutral-700">
			<div className="flex flex-col gap-4 p-6">
				<div className="text-xl font-semibold">Delete Account</div>
				<div className="text-sm">
					Permanently remove your Personal Account and all of it&apos;s contents
					from the taskthing platform. This action is irreversible, so please
					continue with caution.
				</div>
			</div>
			<div className="mt-auto p-6 md:px-6 md:py-4 border-t border-neutral-300 dark:border-neutral-700">
				<div className="flex items-center justify-center md:justify-end">
					<DeleteAccountDialog
						interacted={interacted}
						setInteracted={setInteracted}
					>
						<div className="flex flex-col gap-4 p-6">
							<div className="text-xl font-semibold">
								Delete Personal Account
							</div>
							<div className="text-sm">
								taskthing will delete all of your projects, along with all of
								your tasks, activity, and all other resources belonging to your
								Personal Account.
							</div>
							<Badge className="text-sm px-3 font-normal justify-start border-red-300 bg-red-100 dark:border-red-700/20 dark:bg-red-600/10 text-red-400">
								This action is irreversible. Please be certain.
							</Badge>
							<div className="flex flex-col gap-1.5">
								<Label htmlFor="confirmUsername">
									<p className="text-sm text-neutral-500">
										Enter your username{" "}
										<strong className="text-neutral-800 dark:text-neutral-100">
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
									className="h-10"
									autoComplete="off"
									disabled={isPending}
									required
								/>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label htmlFor="confirmDelete">
									<p className="text-sm text-neutral-500">
										To verify, type{" "}
										<strong className="text-neutral-800 dark:text-neutral-100">
											delete my personal account
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
									disabled={isPending}
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
										formAction(undefined);
										onClose();
									}}
								>
									<Button
										type="submit"
										variant="destructive"
										className="cursor-pointer h-10"
										disabled={
											isPending ||
											confirmUsername !== usernameBeforeDeleting ||
											confirmMessage !== messageBeforeDeleting
										}
									>
										{isPending ? (
											<Icons.loading className="size-4 shrink-0" />
										) : (
											"Delete Account"
										)}
									</Button>
								</form>
							</div>
						</div>
					</DeleteAccountDialog>
				</div>
			</div>
		</div>
	);
}
