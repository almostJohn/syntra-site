"use client";

import { useActionState, useEffect, useState } from "react";
import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { changeDisplayName } from "../action";
import type { ActionResponse } from "@/lib/server-action";
import {
	DISPLAY_NAME_MAX_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
} from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

const initialState = {
	successMessage: "",
	errorMessage: "",
	values: {
		displayName: "",
	},
};

type User = {
	displayName: string;
};

type DisplayNameSettingProps = {
	user: User;
};

export function DisplayNameSetting({ user }: DisplayNameSettingProps) {
	const [state, formAction, isPending] = useActionState(
		async (
			_prevState: ActionResponse,
			payload: { displayName: string },
		): Promise<ActionResponse> => {
			return await changeDisplayName(payload.displayName);
		},
		initialState,
	);
	const [displayName, setDisplayName] = useState(user.displayName);
	const { addToast } = useToast();

	useEffect(() => {
		if (state.successMessage) {
			addToast({ description: state.successMessage, type: "success" });
		} else if (state.errorMessage) {
			addToast({ description: state.errorMessage, type: "error" });
		}
	}, [state, addToast]);

	useEffect(() => {
		setDisplayName(user.displayName);
	}, [user]);

	return (
		<form
			action={() => {
				formAction({ displayName });
			}}
			className="flex flex-col rounded-sm bg-transparent border border-neutral-200 dark:border-neutral-700 shadow"
		>
			<div className="p-6 flex flex-col space-y-4">
				<h3 className="text-lg font-bold">Display Name</h3>
				<div className="flex flex-col space-y-2">
					<span className="text-sm">
						Please enter your full name, or a display name you are comfortable
						with.
					</span>
					<div className="max-w-md w-full">
						<Input
							type="text"
							id="display_name"
							name="display_name"
							value={displayName}
							minLength={DISPLAY_NAME_MIN_LENGTH}
							maxLength={DISPLAY_NAME_MAX_LENGTH}
							onChange={(e) => setDisplayName(e.target.value)}
							className="w-full h-10"
						/>
					</div>
				</div>
			</div>
			<div className="mt-auto px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-between">
					<span className="text-sm text-neutral-500">
						Please use {DISPLAY_NAME_MAX_LENGTH} characters at maximum.
					</span>
					<Button type="submit" disabled={isPending} className="cursor-pointer">
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
