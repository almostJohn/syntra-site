"use client";

import { useState, useEffect } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { updateUsername } from "../../actions/users/update-username";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Label } from "@/components/ui/label";

type User = {
	username: string;
};

type UpdateUsernameModalProps = {
	user: User;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function UpdateUsernameModal({ user }: UpdateUsernameModalProps) {
	const [interacted, setInteracted] = useState(false);
	const [username, setUsername] = useState(user.username);
	const { formAction, isPending } = useServerAction(
		toAction(updateUsername),
		initialState,
	);

	useEffect(() => {
		setUsername(user.username);
	}, [user]);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button variant="outline" size="sm">
					Change Username
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full rounded-sm border border-neutral-800 bg-neutral-900 p-0 text-neutral-100 shadow-xl sm:max-w-xl">
				<VisuallyHidden>
					<AlertDialogTitle>Hidden Title</AlertDialogTitle>
					<AlertDialogDescription>Hidden Description</AlertDialogDescription>
				</VisuallyHidden>
				<form
					action={() => {
						formAction([username]);
						onClose();
					}}
				>
					<div className="flex flex-col">
						<div className="flex flex-col gap-2 p-6">
							<h2 className="text-lg font-semibold uppercase">
								update username
							</h2>
							<div className="mt-3 grid gap-2">
								<Label htmlFor="username" className="sr-only">
									Username
								</Label>
								<Input
									type="text"
									id="username"
									name="username"
									minLength={USERNAME_MIN_LENGTH}
									maxLength={USERNAME_MAX_LENGTH}
									placeholder="Set a unique username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									autoComplete="off"
									disabled={isPending}
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
									<Button type="submit" disabled={isPending} className="w-full">
										{isPending ? (
											<>
												<Loader2 className="size-4 shrink-0 animate-spin" />{" "}
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
