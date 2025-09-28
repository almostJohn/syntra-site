"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { login } from "./action";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, User2 } from "lucide-react";
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
		<form action={formAction} className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-1">
					{state.errors?.username && (
						<p className="text-left text-xs font-medium text-red-600">
							<em>Login Error</em> — {state.errors.username}
						</p>
					)}
					<Label htmlFor="username" className="sr-only">
						Username
					</Label>
					<div className="relative">
						<Input
							id="username"
							type="text"
							name="username"
							placeholder="username"
							defaultValue={state.values?.username}
							maxLength={USERNAME_MAX_LENGTH}
							minLength={USERNAME_MIN_LENGTH}
							disabled={isPending}
							required
							autoComplete="off"
							className={cn(
								"peer h-9 rounded-none border border-neutral-100 bg-transparent pl-10 focus-visible:ring-[2px] focus-visible:ring-neutral-800",
								state.errors?.username &&
									"border-red-600/60 ring-[2px] ring-red-600/30",
							)}
						/>
						<User2 className="text-muted-foreground absolute inset-y-0 left-0 my-auto size-8 shrink-0 pl-3 peer-focus:text-neutral-100" />
					</div>
				</div>
				<div className="flex flex-col gap-1">
					{state.errors?.password && (
						<p className="text-left text-xs font-medium text-red-600">
							<em>Login Error</em> — {state.errors.password}
						</p>
					)}
					<Label htmlFor="password" className="sr-only">
						Password
					</Label>
					<div className="relative">
						<Input
							id="password"
							type="password"
							name="password"
							placeholder="password"
							maxLength={PASSWORD_MAX_LENGTH}
							minLength={PASSWORD_MIN_LENGTH}
							disabled={isPending}
							required
							autoComplete="off"
							className={cn(
								"peer h-9 rounded-none border border-neutral-100 bg-transparent pl-10 focus-visible:ring-[2px] focus-visible:ring-neutral-800",
								state.errors?.password &&
									"border-red-600/60 ring-[2px] ring-red-600/30",
							)}
						/>
						<Lock className="text-muted-foreground absolute inset-y-0 left-0 my-auto size-8 shrink-0 pl-3 peer-focus:text-neutral-100" />
					</div>
				</div>
				<Button
					type="submit"
					disabled={isPending}
					className="h-9 cursor-pointer rounded-none bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80"
				>
					{isPending ? (
						<Loader2 className="size-4 shrink-0 animate-spin" />
					) : (
						"Login"
					)}
				</Button>
			</div>
		</form>
	);
}
