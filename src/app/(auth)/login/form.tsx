"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { login } from "./action";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/lib/constants";
import { Form as FormWrapper } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		username: "",
		password: "",
	},
	values: {
		username: "",
	},
};

export function Form() {
	const { state, formAction, isPending } = useServerAction(
		login,
		initialState,
		{ redirectTo: "/app" },
	);

	return (
		<FormWrapper className="gap-0" action={formAction}>
			<div className="grid gap-2">
				<div className="grid gap-1">
					<Label htmlFor="username" className="sr-only">
						Username
					</Label>
					<Input
						id="username"
						type="text"
						name="username"
						placeholder="Username"
						defaultValue={state.values?.username}
						maxLength={USERNAME_MAX_LENGTH}
						minLength={USERNAME_MIN_LENGTH}
						disabled={isPending}
						required
						autoComplete="off"
						className={cn(
							"rounded-sm border border-neutral-700 bg-transparent focus-visible:border-neutral-600 focus-visible:ring-[3px] focus-visible:ring-neutral-700",
							state.errors?.username &&
								"border-red-500/80 ring-[3px] ring-red-500/30",
						)}
					/>
				</div>
				<div className="grid gap-1">
					<Label htmlFor="password" className="sr-only">
						Password
					</Label>
					<Input
						id="password"
						type="password"
						name="password"
						placeholder="Password"
						maxLength={PASSWORD_MAX_LENGTH}
						minLength={PASSWORD_MIN_LENGTH}
						disabled={isPending}
						required
						autoComplete="off"
						className={cn(
							"rounded-sm border border-neutral-700 bg-transparent focus-visible:border-neutral-600 focus-visible:ring-[3px] focus-visible:ring-neutral-700",
							state.errors?.password &&
								"border-red-500/80 ring-[3px] ring-red-500/30",
						)}
					/>
				</div>
				<Button type="submit" disabled={isPending}>
					{isPending ? (
						<Loader2 className="size-4 shrink-0 animate-spin" />
					) : (
						"Login"
					)}
				</Button>
			</div>
		</FormWrapper>
	);
}
