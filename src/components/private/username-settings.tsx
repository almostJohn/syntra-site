"use client";

import { useState, useEffect } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { updateUsername } from "@/app/(private)/actions/update-username";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Icons } from "../icons";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";

type User = {
	username: string;
};

type UsernameSettingsProps = {
	user: User;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function UsernameSettings({ user }: UsernameSettingsProps) {
	const { formAction, isPending } = useServerAction(
		toAction(updateUsername),
		initialState,
	);
	const [username, setUsername] = useState(user.username);

	useEffect(() => {
		setUsername(user.username);
	}, [user]);

	return (
		<form
			action={() => {
				formAction([username]);
			}}
			className="flex flex-col rounded-sm border border-neutral-200 dark:border-neutral-700"
		>
			<div className="flex flex-col gap-4 p-5">
				<div className="font-semibold">Username</div>
				<div className="text-sm">This is your username within Syntra.</div>
				<div className="max-w-md">
					<div className="flex">
						<div className="inline-flex items-center justify-center p-2 rounded-l-sm h-9 border border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-700 text-neutral-500 text-sm font-medium">
							@
						</div>
						<Input
							type="text"
							id="username"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							minLength={USERNAME_MIN_LENGTH}
							maxLength={USERNAME_MAX_LENGTH}
							className="h-9 rounded-l-none rounded-r-sm"
							disabled={isPending}
							autoComplete="off"
						/>
					</div>
				</div>
			</div>
			<div className="px-5 py-3 mt-auto border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-between">
					<div className="max-w-sm text-sm text-neutral-500">
						Please use {USERNAME_MAX_LENGTH} characters at maximum.
					</div>
					<Button
						type="submit"
						disabled={isPending}
						size="sm"
						className="h-8 px-3 cursor-pointer"
					>
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
