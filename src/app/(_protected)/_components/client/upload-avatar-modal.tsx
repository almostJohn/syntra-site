"use client";

import { uploadAvatar } from "../../actions/users/upload-avatar";
import { useServerAction } from "@/hooks/use-server-action";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatNameToInitials } from "@/lib/formatting";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { cn, getAvatarURL } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		file: "",
	},
	values: {
		file: null,
	},
};

type User = {
	id: string;
	username: string;
	avatar: string | null;
};

type UploadAvatarModalProps = {
	user: User;
};

export function UploadAvatarModal({ user }: UploadAvatarModalProps) {
	const [interacted, setInteracted] = useState(false);
	const { state, formAction, isPending } = useServerAction(
		uploadAvatar,
		initialState,
	);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger className="group cursor-pointer">
				<Avatar className="size-14 rounded-full border border-neutral-700">
					<AvatarImage
						src={getAvatarURL(user.avatar ?? "")}
						alt="avatar-image"
						className="rounded-full"
					/>
					<AvatarFallback className="bg-neutral-800 text-2xl font-semibold text-neutral-100">
						{formatNameToInitials(user.username)}
					</AvatarFallback>
				</Avatar>
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
							<h2 className="text-lg font-semibold uppercase">upload avatar</h2>
							<div className="mx-auto mt-3 mb-2 flex justify-center">
								<Avatar className="size-26 rounded-full border border-neutral-700">
									<AvatarImage
										src={`data:image/png;base64,${user.avatar}`}
										alt="avatar-image"
										className="rounded-full"
									/>
									<AvatarFallback className="bg-neutral-800 text-3xl font-semibold text-neutral-100">
										{formatNameToInitials(user.username)}
									</AvatarFallback>
								</Avatar>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="avatar" className="sr-only">
									Avatar <span className="text-red-500">*</span>
								</Label>
								<Input
									type="file"
									id="avatar"
									name="avatar"
									accept="image/png, image/jpeg"
									className={cn(
										"rounded-sm border border-neutral-700 bg-transparent focus-visible:border-neutral-600 focus-visible:ring-[3px] focus-visible:ring-neutral-700",
										"cursor-pointer file:px-2 file:text-neutral-500",
										state.errors?.file &&
											"border-red-500/80 ring-[3px] ring-red-500/30",
									)}
									required
								/>
								{state.errors?.file && (
									<span className="text-sm font-medium text-red-500">
										{state.errors.file}
									</span>
								)}
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
												Uploading...
											</>
										) : (
											<>Upload</>
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
