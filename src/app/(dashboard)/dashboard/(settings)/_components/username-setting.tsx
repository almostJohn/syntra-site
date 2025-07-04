"use client";

import { useActionState, useEffect, useState } from "react";
import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { updateUsername } from "@/app/(dashboard)/actions/update-username";
import type { ActionResponse } from "@/lib/server-action";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

type User = {
	username: string;
};

type UsernameSettingProps = {
	user: User;
};

export function UsernameSetting({ user }: UsernameSettingProps) {
	const [state, formAction, isPending] = useActionState(
		async (
			_prevState: ActionResponse,
			payload: { username: string },
		): Promise<ActionResponse> => {
			return await updateUsername(payload.username);
		},
		initialState,
	);
	const [username, setUsername] = useState(user.username);
	const { addToast } = useToast();

	useEffect(() => {
		if (state.successMessage) {
			addToast({ description: state.successMessage, type: "success" });
		} else if (state.errorMessage) {
			addToast({ description: state.errorMessage, type: "error" });
		}
	}, [state, addToast]);

	useEffect(() => {
		setUsername(user.username);
	}, [user]);

	return (
		<form
			action={() => {
				formAction({ username });
			}}
			className="flex flex-col rounded-sm bg-transparent border border-neutral-200 dark:border-neutral-700 shadow"
		>
			<div className="p-6 flex flex-col space-y-4">
				<h3 className="text-lg font-bold">Username</h3>
				<div className="flex flex-col space-y-2">
					<span className="text-sm">This is your username within Syntra.</span>
					<div className="max-w-md w-full flex items-center">
						<div className="inline-flex items-center justify-center p-2 h-10 border border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-700 text-sm font-medium rounded-l-sm rounded-r-none text-neutral-500">
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
							className="w-full h-10 rounded-l-none rounded-r-sm"
						/>
					</div>
				</div>
			</div>
			<div className="mt-auto px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-between">
					<span className="text-sm text-neutral-500">
						Please use {USERNAME_MAX_LENGTH} characters at maximum.
					</span>
					<Button type="submit" disabled={isPending} className="cursor-pointer">
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
