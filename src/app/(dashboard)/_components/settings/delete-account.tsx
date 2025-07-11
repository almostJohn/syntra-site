"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { deleteAccount } from "@/app/(dashboard)/actions/delete-account";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function DeleteAccount() {
	const { formAction, isPending } = useServerAction(
		deleteAccount,
		initialState,
	);
	const [messageBeforeDeleting] = useState("Delete My Account");
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
					Delete Account
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full sm:max-w-2xl">
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action is irreversible. This will permanently delete your
						account and remove your data from our servers forever. Please
						proceed with caution.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="flex flex-col space-y-2">
					<Label htmlFor="delete-confirmation">
						<span className="text-sm text-neutral-500">
							Type{" "}
							<strong className="text-neutral-900 dark:text-neutral-100">
								&quot;Delete My Account&quot;
							</strong>{" "}
							to confirm.
						</span>
					</Label>
					<Input
						type="text"
						id="delete-confirmation"
						name="delete-confirmation"
						value={confirmMessage}
						onChange={(e) => setConfirmMessage(e.target.value)}
						placeholder="Delete My Account"
						className="rounded-sm h-9"
						required
					/>
				</div>
				<div className="flex items-center justify-between w-full">
					<Button
						type="button"
						variant="outline"
						className="cursor-pointer h-9"
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
							className="cursor-pointer h-9"
							disabled={isPending || confirmMessage !== messageBeforeDeleting}
						>
							{isPending ? (
								<Icons.loading className="size-4 shrink-0" />
							) : (
								"Delete Account"
							)}
						</Button>
					</form>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
