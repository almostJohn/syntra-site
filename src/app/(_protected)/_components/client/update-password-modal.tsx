"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { updatePassword } from "../../actions/users/update-password";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Loader2 } from "lucide-react";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function UpdatePasswordModal() {
	const [interacted, setInteracted] = useState(false);
	const { formAction, isPending } = useServerAction(
		updatePassword,
		initialState,
	);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button variant="outline" size="sm">
					Change Password
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full rounded-sm border border-neutral-800 bg-neutral-900 p-0 text-neutral-100 shadow-xl sm:max-w-xl">
				<VisuallyHidden>
					<AlertDialogTitle>Hidden Title</AlertDialogTitle>
					<AlertDialogDescription>Hidden Description</AlertDialogDescription>
				</VisuallyHidden>
				<form
					action={(formData) => {
						formAction(formData);
						onClose();
					}}
				>
					<div className="flex flex-col">
						<div className="flex flex-col gap-2 p-6">
							<h2 className="text-lg font-semibold uppercase">
								update password
							</h2>
							<div className="mt-3 grid gap-2">
								<Label htmlFor="old-password" className="sr-only">
									Old Password
								</Label>
								<Input
									type="password"
									id="old-password"
									name="old-password"
									placeholder="Old Password"
									minLength={PASSWORD_MIN_LENGTH}
									maxLength={PASSWORD_MAX_LENGTH}
									autoComplete="off"
									disabled={isPending}
									required
									className="rounded-sm border border-neutral-700 bg-transparent focus-visible:border-neutral-600 focus-visible:ring-[3px] focus-visible:ring-neutral-700"
								/>
								<Label htmlFor="new-password" className="sr-only">
									New Password
								</Label>
								<Input
									type="password"
									id="new-password"
									name="new-password"
									placeholder="New Password"
									minLength={PASSWORD_MIN_LENGTH}
									maxLength={PASSWORD_MAX_LENGTH}
									autoComplete="off"
									disabled={isPending}
									required
									className="rounded-sm border border-neutral-700 bg-transparent focus-visible:border-neutral-600 focus-visible:ring-[3px] focus-visible:ring-neutral-700"
								/>
								<Label htmlFor="confirm-new-password" className="sr-only">
									Confirm New Password
								</Label>
								<Input
									type="password"
									id="confirm-new-password"
									name="confirm-new-password"
									placeholder="Confirm New Password"
									minLength={PASSWORD_MIN_LENGTH}
									maxLength={PASSWORD_MAX_LENGTH}
									autoComplete="off"
									disabled={isPending}
									required
									className="rounded-sm border border-neutral-700 bg-transparent focus-visible:border-neutral-600 focus-visible:ring-[3px] focus-visible:ring-neutral-700"
								/>
							</div>
						</div>
						<div className="mt-auto p-6 pt-0">
							<div className="flex flex-col-reverse gap-2 md:flex-row md:items-center">
								<div className="flex w-full items-center">
									<Button
										type="button"
										variant="secondary"
										className="w-full"
										onClick={onClose}
									>
										Cancel
									</Button>
								</div>
								<div className="flex w-full items-center">
									<Button type="submit" className="w-full" disabled={isPending}>
										{isPending ? (
											<>
												<Loader2 className="size-4 shrink-0 animate-spin" />
												Saving...
											</>
										) : (
											<>Save</>
										)}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
