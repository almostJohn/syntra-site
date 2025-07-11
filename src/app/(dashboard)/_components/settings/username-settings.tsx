"use client";

import { useServerAction, toAction } from "@/hooks/use-server-action";
import { useState, useEffect } from "react";
import { updateUsername } from "../../actions/update-username";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

type User = {
	username: string;
};

type UsernameSettingsProps = {
	user: User;
};

export function UsernameSettings({ user }: UsernameSettingsProps) {
	const updateUsernameAction = toAction(updateUsername);

	const { formAction, isPending } = useServerAction(
		updateUsernameAction,
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
			className="flex flex-col rounded-sm border border-neutral-200 dark:border-neutral-700 bg-transparent"
		>
			<div className="flex flex-col gap-4 p-5">
				<div className="font-medium">Username</div>
				<div className="flex flex-col gap-2 max-w-xl text-sm">
					<div>This is your username within Syntra.</div>
					<div className="flex items-center w-full">
						<div className="inline-flex items-center justify-center p-2 h-10 border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700 text-neutral-500 text-sm font-medium rounded-l-sm rounded-r-none">
							@
						</div>
						<Input
							type="text"
							id="username"
							name="username"
							value={username}
							minLength={USERNAME_MIN_LENGTH}
							maxLength={USERNAME_MAX_LENGTH}
							onChange={(e) => setUsername(e.target.value)}
							disabled={isPending}
							className="w-full h-10 rounded-l-none rounded-r-sm"
						/>
					</div>
				</div>
			</div>
			<div className="px-5 py-3 mt-auto border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-between">
					<div className="text-sm max-w-sm text-neutral-500">
						Please use {USERNAME_MAX_LENGTH} characters at maximum.
					</div>
					<Button type="submit" className="cursor-pointer" disabled={isPending}>
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
