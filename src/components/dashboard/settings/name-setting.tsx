"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { changeName } from "@/actions/settings/change-name";
import type { ActionResponse } from "@/lib/server-action";
import { Input } from "@/components/ui/input";
import { NAME_MAX_LENGTH } from "@/lib/constants";
import { Loader } from "lucide-react";

const intialState = {
	successMessage: "",
	errorMessage: "",
	values: {
		name: "",
	},
};

type NameSettingProps = {
	id: string;
	name: string;
};

export function NameSetting({ user }: { user: NameSettingProps }) {
	const [state, formAction, isPending] = useActionState(
		async (
			_prevState: ActionResponse,
			payload: { name: string },
		): Promise<ActionResponse> => {
			return await changeName(payload.name);
		},
		intialState,
	);
	const [name, setName] = useState(user.name);

	useEffect(() => {
		setName(user.name);
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
				formAction({ name });
			}}
			className="flex flex-col rounded-xl border border-border bg-background shadow"
		>
			<div className="flex flex-col space-y-4 p-6">
				<h3 className="text-lg font-bold">Name</h3>
				<div className="flex flex-col space-y-2">
					<p className="text-sm">
						Please enter your full name, or a display name you are comfortable
						with.
					</p>
					<Input
						type="text"
						id="name"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-70 focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all"
					/>
				</div>
			</div>
			<div className="px-6 py-4 mt-auto border-t border-border">
				<div className="flex items-center justify-between w-full">
					<p className="text-sm text-muted-foreground">
						Please use {NAME_MAX_LENGTH} characters at maximum.
					</p>
					<Button
						type="submit"
						variant="primary"
						disabled={isPending}
						size="sm"
						className="cursor-pointer rounded-sm"
					>
						{isPending ? <Loader className="size-4 animate-spin" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
