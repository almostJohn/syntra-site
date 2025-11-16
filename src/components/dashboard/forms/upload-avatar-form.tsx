"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { uploadAvatar } from "@/actions/upload-avatar";
import { type ActionState, type CurrentUser } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogTitle,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getAvatarURL } from "@/lib/utils";
import { Loader } from "lucide-react";
import { formatNameToInitials } from "@/lib/formatting";
import { Form, FormField } from "@/components/ui/form";

type UploadAvatarFormProps = {
	user: CurrentUser;
};

export function UploadAvatarForm({ user }: UploadAvatarFormProps) {
	const [interacted, setInteracted] = useState(false);
	const { formAction, isPending } = useServerAction({
		action: uploadAvatar,
		initialState: {} as ActionState,
	});

	function handleClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger className="group cursor-pointer">
				<Avatar className="size-16 rounded-full border border-neutral-300">
					<AvatarImage
						src={getAvatarURL(user.avatar ?? "", "image/png")}
						alt={user.username ?? "User Avatar"}
						className="rounded-full"
					/>
					<AvatarFallback className="rounded-full bg-neutral-200 text-2xl font-semibold text-neutral-500 group-hover:bg-neutral-300">
						{formatNameToInitials(user.displayName ?? "?")}
					</AvatarFallback>
				</Avatar>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full rounded-md border-neutral-300 bg-neutral-100/95 p-0 sm:max-w-xl">
				<VisuallyHidden>
					<AlertDialogTitle className="text-lg font-semibold">
						Hidden Title
					</AlertDialogTitle>
					<AlertDialogDescription className="mt-4 mb-6">
						Hidden Description
					</AlertDialogDescription>
				</VisuallyHidden>
				<Form
					action={(formData) => {
						formAction(formData);
						handleClose();
					}}
					className="p-6"
				>
					<h2 className="mb-4 text-2xl font-bold">Upload New Avatar</h2>
					<div className="mx-auto mb-3 flex justify-center">
						<Avatar className="size-26 rounded-full border border-neutral-300">
							<AvatarImage
								src={getAvatarURL(user.avatar ?? "", "image/png")}
								alt={user.username ?? "User Avatar"}
								className="rounded-full"
							/>
							<AvatarFallback className="rounded-full bg-neutral-200 text-4xl font-semibold text-neutral-500">
								{isPending ? (
									<div className="flex h-full w-full items-center justify-center">
										<Loader className="animate-spin text-neutral-500" />
									</div>
								) : (
									formatNameToInitials(user.displayName ?? "?")
								)}
							</AvatarFallback>
						</Avatar>
					</div>
					<FormField>
						<Label htmlFor="avatar" className="sr-only">
							Avatar
						</Label>
						<Input
							id="avatar"
							name="avatar"
							type="file"
							accept="image/jpeg, image/png, image/gif, image/webp"
							disabled={isPending}
							required
							className="cursor-pointer border-neutral-300 file:px-2 file:text-neutral-500 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30"
						/>
					</FormField>
					<div className="flex flex-col-reverse gap-2 md:flex-row md:items-center">
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
						<div className="flex w-full">
							<Button type="submit" className="w-full" disabled={isPending}>
								{isPending ? (
									<>
										<Loader className="size-5 shrink-0 animate-spin" />
										Uploading...
									</>
								) : (
									"Upload"
								)}
							</Button>
						</div>
					</div>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
