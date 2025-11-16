"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { updateDisplayName } from "@/actions/update-display-name";
import type { ActionState, CurrentUser } from "@/types";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

type UpdateDisplayNameFormProps = {
	user: CurrentUser;
};

export function UpdateDisplayNameForm({ user }: UpdateDisplayNameFormProps) {
	const [displayName, setDisplayName] = useState(user.displayName || "");
	const { formAction, isPending } = useServerAction({
		action: updateDisplayName,
		initialState: {} as ActionState,
	});

	return (
		<Form
			action={() => {
				formAction(displayName);
			}}
			className="gap-0 rounded-md border border-neutral-300 shadow-sm"
		>
			<div className="flex flex-col gap-4 rounded-t-md border-b border-neutral-300 bg-white p-6">
				<h2 className="text-lg font-semibold">Display Name</h2>
				<p className="text-sm">
					Please enter your full name, or a display name you are comfortable
					with.
				</p>
				<FormField className="max-w-md">
					<Label htmlFor="displayName" className="sr-only">
						Display Name
					</Label>
					<Input
						id="displayName"
						name="displayName"
						type="text"
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
						placeholder="Enter your display name"
						maxLength={48}
						minLength={3}
						className="w-full border-neutral-300 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30"
					/>
				</FormField>
			</div>
			<div className="mt-auto flex flex-col items-center justify-center gap-2 rounded-b-md bg-neutral-100/95 p-6 md:flex-row md:justify-between">
				<p className="text-center text-sm text-neutral-500 md:text-left">
					Please use 48 characters at maximum.
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
