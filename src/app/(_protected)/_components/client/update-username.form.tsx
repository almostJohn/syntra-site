"use client";

import { useEffect, useState } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { updateUsername } from "../../actions/users/update-username";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type User = {
	username: string;
};

type UpdateUsernameProps = {
	user: User;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function UpdateUsernameForm({ user }: UpdateUsernameProps) {
	const [username, setUsername] = useState(user.username);
	const { formAction, isPending } = useServerAction(
		toAction(updateUsername),
		initialState,
	);

	useEffect(() => {
		setUsername(user.username);
	}, [user]);

	return (
		<section className="flex flex-col rounded-md border border-neutral-700">
			<Form
				action={() => {
					formAction([username]);
				}}
				className="gap-0"
			>
				<div className="flex flex-col gap-4 rounded-t-md border-b border-neutral-700 bg-neutral-800 p-6">
					<h2 className="text-lg font-semibold">Username</h2>
					<p className="text-sm">This is your username within Syntra.</p>
					<FormControl className="max-w-md">
						<Label htmlFor="username" className="sr-only">
							Username
						</Label>
						<Input
							type="text"
							id="username"
							name="username"
							placeholder="Set a unique username."
							minLength={USERNAME_MIN_LENGTH}
							maxLength={USERNAME_MAX_LENGTH}
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							autoComplete="off"
							disabled={isPending}
							className="input-default-class h-10 bg-neutral-900"
						/>
					</FormControl>
				</div>
				<div className="mt-auto rounded-b-md bg-neutral-900 p-6">
					<div className="flex flex-col items-center justify-center gap-3 md:flex-row md:justify-between">
						<div className="flex items-center">
							<p className="text-center text-sm text-neutral-500">
								Please use {USERNAME_MAX_LENGTH} characters at maximum.
							</p>
						</div>
						<div>
							<Button type="submit" disabled={isPending} className="px-4">
								{isPending ? (
									<>
										<Loader2 className="size-5 shrink-0 animate-spin" />
										Saving...
									</>
								) : (
									"Save"
								)}
							</Button>
						</div>
					</div>
				</div>
			</Form>
		</section>
	);
}
