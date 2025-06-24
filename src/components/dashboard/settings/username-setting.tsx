"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { changeUsername } from "@/actions/settings/change-username";
import type { ActionResponse } from "@/lib/server-action";
import { USERNAME_MAX_LENGTH } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";

const initialState = {
	successMessage: "",
	errorMessage: "",
	values: {
		username: "",
	},
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
			return await changeUsername(payload.username);
		},
		initialState,
	);
	const [username, setUsername] = useState(user.username);

	useEffect(() => {
		setUsername(user.username);
	}, [user]);

	useEffect(() => {
		if (state.successMessage) {
			toast.success(state.successMessage);
		} else if (state.errorMessage) {
			toast.error(state.errorMessage);
		}
	}, [state]);

	return (
		<form
			action={() => {
				formAction({ username });
			}}
			className="flex flex-col rounded-xl border border-border bg-background shadow"
		>
			<div className="flex flex-col space-y-4 p-6">
				<h3 className="text-lg font-bold">Username</h3>
				<div className="flex flex-col space-y-2">
					<p className="text-sm">This is your username within Syntra.</p>
					<div className="flex items-center">
						<div className="inline-flex items-center justify-center p-2 h-9 bg-muted border-y border-l border-r-none border-border rounded-l-sm text-sm font-medium text-muted-foreground">
							@
						</div>
						<Input
							type="text"
							id="username"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-60 rounded-l-none rounded-r-sm focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all"
						/>
					</div>
				</div>
			</div>
			<div className="px-6 py-4 mt-auto border-t border-border">
				<div className="flex items-center justify-between w-full">
					<p className="text-sm text-muted-foreground">
						Please use {USERNAME_MAX_LENGTH} characters at maximum.
					</p>
					<Button
						type="submit"
						variant="primary"
						disabled={isPending}
						size="sm"
						className="rounded-sm cursor-pointer"
					>
						{isPending ? <Loader className="size-4 animate-spin" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
