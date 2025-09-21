"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { loginUser } from "./action";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/lib/constants";
import { InputField } from "@/components/input-field";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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

export function LoginForm() {
	const { state, formAction, isPending } = useServerAction(
		loginUser,
		initialState,
		{ redirectTo: "/app" },
	);

	return (
		<form action={formAction} className="space-y-4">
			<div className="grid gap-2">
				<InputField
					type="text"
					id="username"
					name="username"
					label="Username"
					placeholder="Username"
					defaultValue={state.values?.username}
					minLength={USERNAME_MIN_LENGTH}
					maxLength={USERNAME_MAX_LENGTH}
					disabled={isPending}
					required
					error={!!state.errors?.username}
					errorMessage={state.errors?.username}
				/>
				<InputField
					type="password"
					id="password"
					name="password"
					label="Password"
					placeholder="Password"
					minLength={PASSWORD_MIN_LENGTH}
					maxLength={PASSWORD_MAX_LENGTH}
					disabled={isPending}
					required
					error={!!state.errors?.password}
					errorMessage={state.errors?.password}
				/>
			</div>
			<div className="grid gap-2">
				<div className="mb-1 flex items-center justify-end">
					<Link
						href="/forgot-password"
						className="text-sm font-medium text-blue-600 hover:underline"
					>
						Forgot password?
					</Link>
				</div>
				<Button
					type="submit"
					disabled={isPending}
					className="h-10 cursor-pointer rounded bg-blue-600 text-white hover:bg-blue-700"
				>
					{isPending ? (
						<Loader2 className="size-5 shrink-0 animate-spin" />
					) : (
						"Login"
					)}
				</Button>
				<Link
					href="/register"
					className="mt-1 text-center text-sm font-medium text-blue-600 hover:underline"
				>
					Need an account? Sign Up
				</Link>
			</div>
		</form>
	);
}
