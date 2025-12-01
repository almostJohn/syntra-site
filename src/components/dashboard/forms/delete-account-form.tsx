"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { deleteAccount } from "@/actions/delete-account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	AlertDialog,
	AlertDialogDescription,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type { ActionState, CurrentUser } from "@/types";
import { Form } from "@/components/ui/form";
import { Loader } from "lucide-react";

type DeleteAccountFormProps = {
	user: CurrentUser;
};

export function DeleteAccountForm({ user }: DeleteAccountFormProps) {
	const { formAction, isPending } = useServerAction({
		action: deleteAccount,
		initialState: {} as ActionState,
		options: {
			redirectTo: "/login",
		},
	});
	const [interacted, setInteracted] = useState(false);
	const [usernameBeforeDeleting] = useState(user.username);
	const [messageBeforeDeleting] = useState("Delete My Personal Account");
	const [confirmUsername, setConfirmUsername] = useState("");
	const [confirmMessage, setConfirmMessage] = useState("");

	function handleClose() {
		setInteracted((prev) => !prev);
		setConfirmUsername("");
		setConfirmMessage("");
	}

	return (
		<div className="flex flex-col rounded-md border border-red-200 shadow-sm">
			<div className="flex flex-col gap-4 rounded-t-md border-b border-red-200 bg-white p-6">
				<h2 className="text-lg font-semibold">Delete Account</h2>
				<p className="text-sm">
					Permanently remove your Personal Account and all of its contents from
					the Syntra platform. This action is not reversible, so please proceed
					with caution.
				</p>
			</div>
			<div className="mt-auto flex flex-col items-center justify-center gap-2 rounded-b-md bg-red-100 p-6 md:flex-row md:justify-between">
				<p className="text-center text-sm text-red-700 md:text-left">
					Be cautious when making changes here.
				</p>
				<AlertDialog open={interacted} onOpenChange={setInteracted}>
					<AlertDialogTrigger asChild>
						<Button variant="destructive">Delete Personal Account</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="w-full rounded-md border-neutral-300 bg-neutral-100/95 p-6 sm:max-w-xl">
						<VisuallyHidden>
							<AlertDialogTitle>Hidden Title</AlertDialogTitle>
							<AlertDialogDescription>
								Hidden Description
							</AlertDialogDescription>
						</VisuallyHidden>
						<div className="flex flex-col gap-4">
							<h2 className="text-2xl font-bold">Delete Personal Account</h2>
							<p className="text-sm">
								Syntra will delete all of your projects, along with all of your
								tasks, activity, and all other resources belonging to your
								Personal Account.
							</p>
							<div className="pointer-events-none inline-flex items-center rounded-sm border border-red-200 bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
								This action is irreversible. Please be certain.
							</div>
							<div className="flex flex-col gap-3">
								<div className="grid gap-1">
									<Label htmlFor="confirmUsername">
										<p className="text-sm text-neutral-500">
											Enter your username{" "}
											<strong className="text-neutral-950">
												{usernameBeforeDeleting}
											</strong>{" "}
											to continue:
										</p>
									</Label>
									<Input
										type="text"
										id="confirmUsername"
										value={confirmUsername}
										onChange={(e) => setConfirmUsername(e.target.value)}
										disabled={isPending}
										required
										autoComplete="off"
										className="w-full border-neutral-300 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30"
									/>
								</div>
								<div className="grid gap-1">
									<Label htmlFor="confirmMessage">
										<p className="text-sm text-neutral-500">
											Type{" "}
											<strong className="text-neutral-950">
												{messageBeforeDeleting}
											</strong>{" "}
											to confirm:
										</p>
									</Label>
									<Input
										type="text"
										id="confirmMessage"
										value={confirmMessage}
										onChange={(e) => setConfirmMessage(e.target.value)}
										disabled={isPending}
										required
										autoComplete="off"
										className="w-full border-neutral-300 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30"
									/>
								</div>
								<div className="mt-4 flex flex-col-reverse gap-2 md:flex-row md:items-center md:justify-between">
									<div className="flex w-full">
										<Button
											type="button"
											variant="outline"
											onClick={handleClose}
											className="w-full"
										>
											Cancel
										</Button>
									</div>
									<Form
										action={() => {
											formAction(undefined);
											handleClose();
										}}
										className="flex w-full"
									>
										<Button
											type="submit"
											disabled={
												isPending ||
												confirmUsername !== usernameBeforeDeleting ||
												confirmMessage !== messageBeforeDeleting
											}
											className="w-full"
										>
											{isPending ? (
												<>
													<Loader className="size-5 shrink-0 animate-spin" />{" "}
													Deleting...
												</>
											) : (
												"Delete"
											)}
										</Button>
									</Form>
								</div>
							</div>
						</div>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}
