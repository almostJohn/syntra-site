"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { deleteAccount } from "@/app/(private)/actions/delete-account";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogTitle,
	AlertDialogDescription,
} from "../ui/alert-dialog";
import { Icons } from "../icons";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function UserDangerZoneSettings() {
	const { formAction, isPending } = useServerAction(
		deleteAccount,
		initialState,
		{ redirectTo: "/login" },
	);
	const [interacted, setInteracted] = useState(false);
	const [messageBeforeDeleting] = useState("delete my personal account");
	const [confirmMessage, setConfirmMessage] = useState("");

	function onClose() {
		setInteracted((prev) => !prev);
		setConfirmMessage("");
	}

	return (
		<div className="flex flex-col rounded-sm border border-neutral-200 dark:border-neutral-700">
			<div className="flex flex-col gap-4 p-5">
				<div className="font-semibold text-red-500">Danger Zone</div>
				<div className="text-sm">
					Permanently remove your Personal Account and all of it&apos;s contents
					from the Syntra platform. This action is irreversible, so please
					continue with caution.
				</div>
			</div>
			<div className="px-5 py-3 mt-auto rounded-b-sm border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-end">
					<AlertDialog open={interacted} onOpenChange={setInteracted}>
						<AlertDialogTrigger asChild>
							<Button
								type="button"
								variant="destructive"
								size="sm"
								className="cursor-pointer h-8 px-3"
							>
								Delete Personal Account
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="w-full sm:max-w-xl">
							<VisuallyHidden>
								<AlertDialogTitle>Delete Account</AlertDialogTitle>
								<AlertDialogDescription>Delete Account</AlertDialogDescription>
							</VisuallyHidden>
							<div className="flex flex-col gap-4">
								<div className="text-xl font-semibold">
									Delete Personal Account
								</div>
								<div className="text-sm">
									Syntra will delete all of your projects, along with all of
									your tasks, activity, and all other resources belonging to
									your Personal Account.
								</div>
								<div className="inline-flex px-3 py-2 text-sm items-center rounded-sm text-red-400 bg-red-200/40 dark:bg-red-600/10">
									This action is irreversible. Please be certain.
								</div>
								<div className="flex flex-col gap-1.5">
									<Label htmlFor="confirmDelete">
										<p className="text-sm text-neutral-500">
											To confirm, type{" "}
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
										placeholder="delete my personal account"
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
											formAction(undefined);
											onClose();
										}}
									>
										<Button
											type="submit"
											variant="destructive"
											className="cursor-pointer h-10"
											disabled={
												isPending || messageBeforeDeleting !== confirmMessage
											}
										>
											{isPending ? (
												<Icons.loading className="size-4 shrink-0" />
											) : (
												"Delete"
											)}
										</Button>
									</form>
								</div>
							</div>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
		</div>
	);
}
