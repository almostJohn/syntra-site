"use client";

import { useState, useEffect } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { updateDisplayName } from "@/actions/users/update-display-name";
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

export function DisplayNameSettings({
	user,
}: {
	user: { displayName: string };
}) {
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
			className="rounded-md shadow-sm flex flex-col border border-neutral-300 dark:border-neutral-700"
		>
			<div className="flex flex-col p-6 gap-4">
				<div className="text-xl font-semibold">Display Name</div>
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
						className="h-10"
						autoComplete="off"
						disabled={isPending}
					/>
				</div>
			</div>
			<div className="mt-auto p-6 md:px-6 md:py-4 border-t border-neutral-300 dark:border-neutral-700">
				<div className="flex flex-col gap-4 items-center justify-center md:flex-row md:justify-between">
					<div className="text-sm text-center md:text-left text-neutral-500">
						Please use {DISPLAY_NAME_MAX_LENGTH} characters at maximum.
					</div>
					<Button
						type="submit"
						disabled={isPending}
						className="cursor-pointer h-10"
					>
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
