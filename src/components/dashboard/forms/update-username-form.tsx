"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { updateUsername } from "@/actions/update-username";
import type { ActionState, CurrentUser } from "@/types";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

type UpdateUsernameFormProps = {
	user: CurrentUser;
};

export function UpdateUsernameForm({ user }: UpdateUsernameFormProps) {
	const [username, setUsername] = useState(user.username);
	const { formAction, isPending } = useServerAction({
		action: updateUsername,
		initialState: {} as ActionState,
	});

	return (
		<Form
			action={() => {
				formAction(username);
			}}
			className="gap-0 rounded-md border border-neutral-300 shadow-sm"
		>
			<div className="flex flex-col gap-4 rounded-t-md border-b border-neutral-300 bg-white p-6">
				<h2 className="text-lg font-semibold">Username</h2>
				<p className="text-sm">This is your username within Syntra.</p>
				<FormField className="max-w-md">
					<Label htmlFor="username" className="sr-only">
						Username
					</Label>
					<Input
						id="username"
						name="username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter your username"
						maxLength={32}
						minLength={3}
						className="w-full border-neutral-300 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30"
					/>
				</FormField>
			</div>
			<div className="mt-auto flex flex-col items-center justify-center gap-2 rounded-b-md bg-neutral-100/95 p-6 md:flex-row md:justify-between">
				<p className="text-center text-sm text-neutral-500 md:text-left">
					Please use 32 characters at maximum.
				</p>
				<Button type="submit" disabled={isPending}>
					{isPending ? (
						<>
							<Loader className="size-5 shrink-0 animate-spin" />
							Saving...
						</>
					) : (
						"Save"
					)}
				</Button>
			</div>
		</Form>
	);
}
