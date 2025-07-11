"use client";

import { useServerAction, toAction } from "@/hooks/use-server-action";
import { useState, useEffect } from "react";
import { updateDisplayName } from "../../actions/update-display-name";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import {
	DISPLAY_NAME_MAX_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
} from "@/lib/constants";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

type User = {
	displayName: string;
};

type DisplayNameSettingsProps = {
	user: User;
};

export function DisplayNameSettings({ user }: DisplayNameSettingsProps) {
	const updateDisplayNameAction = toAction(updateDisplayName);

	const { formAction, isPending } = useServerAction(
		updateDisplayNameAction,
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
			className="flex flex-col rounded-sm border border-neutral-200 dark:border-neutral-700 bg-transparent"
		>
			<div className="flex flex-col gap-4 p-5">
				<div className="font-medium">Display Name</div>
				<div className="flex flex-col gap-2 max-w-xl text-sm">
					<div>
						Please enter your full name, or a display name you are comfortable
						with.
					</div>
					<Input
						type="text"
						id="display_name"
						name="display_name"
						value={displayName}
						minLength={DISPLAY_NAME_MIN_LENGTH}
						maxLength={DISPLAY_NAME_MAX_LENGTH}
						onChange={(e) => setDisplayName(e.target.value)}
						disabled={isPending}
						className="w-full h-10"
					/>
				</div>
			</div>
			<div className="px-5 py-3 mt-auto border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-between">
					<div className="text-sm max-w-sm text-neutral-500">
						Please use {DISPLAY_NAME_MAX_LENGTH} characters at maximum.
					</div>
					<Button type="submit" className="cursor-pointer" disabled={isPending}>
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
