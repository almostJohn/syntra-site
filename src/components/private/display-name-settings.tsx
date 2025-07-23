"use client";

import { useState, useEffect } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { updateDisplayName } from "@/app/(private)/actions/update-display-name";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Icons } from "../icons";
import {
	DISPLAY_NAME_MAX_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
} from "@/lib/constants";

type User = {
	displayName: string;
};

type DisplayNameSettingsProps = {
	user: User;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function DisplayNameSettings({ user }: DisplayNameSettingsProps) {
	const { formAction, isPending } = useServerAction(
		toAction(updateDisplayName),
		initialState,
	);
	const [displayName, setDisplayName] = useState(user.displayName);

	useEffect(() => {
		setDisplayName(user.displayName);
	}, [user]);

	return (
		<form
			action={() => {
				formAction([displayName]);
			}}
			className="flex flex-col rounded-sm border border-neutral-200 dark:border-neutral-700"
		>
			<div className="flex flex-col gap-4 p-5">
				<div className="font-semibold">Display Name</div>
				<div className="text-sm">
					Please enter your full name, or a display name you are comfortable
					with.
				</div>
				<div className="max-w-md">
					<Input
						type="text"
						id="displayName"
						name="displayName"
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
						minLength={DISPLAY_NAME_MIN_LENGTH}
						maxLength={DISPLAY_NAME_MAX_LENGTH}
						className="h-9"
						disabled={isPending}
						autoComplete="off"
					/>
				</div>
			</div>
			<div className="px-5 py-3 mt-auto border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-between">
					<div className="max-w-sm w-full text-sm text-neutral-500">
						Please use {DISPLAY_NAME_MAX_LENGTH} characters at maximum.
					</div>
					<Button
						type="submit"
						disabled={isPending}
						size="sm"
						className="h-8 cursor-pointer px-3"
					>
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
