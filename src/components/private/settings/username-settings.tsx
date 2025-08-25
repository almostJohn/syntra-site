"use client";

import { useState, useEffect } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { updateUsername } from "@/actions/users/update-username";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function UsernameSettings({ user }: { user: { username: string } }) {
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
			className="flex flex-col rounded-md shadow-sm border border-neutral-300 dark:border-neutral-700"
		>
			<div className="flex flex-col gap-4 p-6">
				<div className="text-xl font-semibold">Username</div>
				<div className="text-sm">This is your username within Syntra.</div>
				<div className="max-w-md flex">
					<div className="inline-flex items-center justify-center p-2 rounded-l-sm border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700 text-sm font-medium text-neutral-500">
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
						className="h-10 rounded-l-none rounded-r-sm"
						autoComplete="off"
						disabled={isPending}
					/>
				</div>
			</div>
			<div className="mt-auto p-6 md:px-6 md:py-4 border-t border-neutral-300 dark:border-neutral-700">
				<div className="flex flex-col gap-4 items-center justify-center md:flex-row md:justify-between">
					<div className="text-center text-sm md:text-left text-neutral-500">
						Please use {USERNAME_MAX_LENGTH} characters at maximum.
					</div>
					<Button
						type="submit"
						disabled={isPending}
						className="h-10 cursor-pointer"
					>
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
