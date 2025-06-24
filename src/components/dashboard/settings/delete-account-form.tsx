"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { deleteAccount } from "@/actions/settings/delete-account";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogTitle,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
} from "@/components/ui/alert-dialog";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function DeleteAccountForm() {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(
		deleteAccount,
		initialState,
	);
	const [messageBeforeDeleting] = useState("Delete My Account");
	const [confirmMessage, setConfirmMessage] = useState("");
	const [interacted, setInteracted] = useState(false);

	useEffect(() => {
		if (state.successMessage) {
			toast.success(state.successMessage);
			router.push("/login");
			router.refresh();
		} else if (state.errorMessage) {
			toast.error(state.errorMessage);
		}
	}, [state, router]);

	function onCloseHandler() {
		setInteracted((prev) => !prev);
		setConfirmMessage("");
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button
					size="sm"
					className="cursor-pointer rounded-sm bg-red-600 text-white hover:bg-red-700 active:scale-95"
				>
					Delete Personal Account
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action is irreversible. This will permanently delete your
						account and remove your data from our servers forever. Proceed with
						caution.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="flex flex-col space-y-2">
					<Label htmlFor="delete-confirmation">
						<p className="text-sm text-muted-foreground">
							Type{" "}
							<strong className="text-foreground">
								&quot;Delete My Account&quot;
							</strong>{" "}
							to confirm.
						</p>
					</Label>
					<Input
						type="text"
						id="delete-confirmation"
						value={confirmMessage}
						onChange={(e) => setConfirmMessage(e.target.value)}
						className="focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all"
					/>
				</div>
				<div className="flex items-center justify-between w-full">
					<Button
						type="button"
						variant="outline"
						className="cursor-pointer active:scale-95"
						onClick={onCloseHandler}
					>
						Cancel
					</Button>
					<form
						action={() => {
							formAction();
							onCloseHandler();
						}}
					>
						<Button
							type="submit"
							disabled={isPending || confirmMessage !== messageBeforeDeleting}
							className="cursor-pointer bg-red-600 text-white transition-colors hover:bg-red-700"
						>
							{isPending ? (
								<Loader className="size-4 animate-spin" />
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
