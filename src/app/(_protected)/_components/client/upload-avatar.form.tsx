"use client";

import { useState, type PropsWithChildren } from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogTitle,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn, getAvatarURL } from "@/lib/utils";
import { formatNameToInitials } from "@/lib/formatting";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useServerAction } from "@/hooks/use-server-action";
import { uploadAvatar } from "../../actions/users/upload-avatar";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type User = {
	id: string;
	username: string;
	avatar: string | null;
};

type UploadAvatarModalProps = PropsWithChildren & {
	user: User;
	interacted: boolean;
	setInteracted(value: boolean): void;
};

type UploadAvatarFormProps = {
	user: User;
};

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

const UploadAvatarModal = ({
	user,
	interacted,
	setInteracted,
	children,
}: UploadAvatarModalProps) => {
	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger className="group cursor-pointer">
				<Avatar className="size-18 rounded-full border border-neutral-700">
					<AvatarImage
						src={getAvatarURL(user.avatar ?? "")}
						alt={user.username}
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
				{children}
			</AlertDialogContent>
		</AlertDialog>
	);
};

export function UploadAvatarForm({ user }: UploadAvatarFormProps) {
	const [interacted, setInteracted] = useState(false);
	const { state, formAction, isPending } = useServerAction(
		uploadAvatar,
		initialState,
	);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<UploadAvatarModal
			user={user}
			interacted={interacted}
			setInteracted={setInteracted}
		>
			<Form
				action={(formData) => {
					formAction(formData);
					onClose();
				}}
				className="p-6"
			>
				<h2 className="text-lg font-semibold uppercase">upload avatar</h2>
				<div className="mx-auto mb-3 flex justify-center">
					<Avatar className="size-26 rounded-full border border-neutral-700">
						<AvatarImage
							src={`data:image/png;base64,${user.avatar}`}
							alt={user.username}
							className="rounded-full"
						/>
						<AvatarFallback className="bg-neutral-800 text-3xl font-semibold text-neutral-100">
							{formatNameToInitials(user.username)}
						</AvatarFallback>
					</Avatar>
				</div>
				<FormControl>
					<Label htmlFor="avatar" className="sr-only">
						Avatar
					</Label>
					<Input
						type="file"
						id="avatar"
						name="avatar"
						accept="image/png, image/jpeg"
						className={cn(
							"input-default-class",
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
				</FormControl>
				<div className="mt-2 flex flex-col-reverse gap-2 md:flex-row md:items-center">
					<div className="w-full">
						<Button
							type="button"
							variant="secondary"
							className="w-full"
							onClick={onClose}
						>
							Cancel
						</Button>
					</div>
					<div className="w-full">
						<Button type="submit" disabled={isPending} className="w-full">
							{isPending ? (
								<>
									<Loader2 className="size-4 shrink-0 animate-spin" />
									Uploading...
								</>
							) : (
								<>Upload</>
							)}
						</Button>
					</div>
				</div>
			</Form>
		</UploadAvatarModal>
	);
}
