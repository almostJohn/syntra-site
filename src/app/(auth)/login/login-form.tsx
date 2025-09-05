"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { loginUser } from "../actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib";
import {
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
} from "../constants";
import { Icons } from "@/components/icons";
import { NextLink } from "@/components/ui/next-link";
import { Button } from "@/components/ui/button";

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
	const [showPassword, setShowPassword] = useState(false);

	return (
		<form action={formAction} className="flex flex-col gap-4">
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="username">
					Username <span className="text-red-600">*</span>
				</Label>
				<Input
					id="username"
					name="username"
					type="text"
					autoComplete="off"
					defaultValue={state.values?.username}
					minLength={USERNAME_MIN_LENGTH}
					maxLength={USERNAME_MAX_LENGTH}
					placeholder="Your username"
					className={cn(
						"border-scheme-foreground/20 focus-visible:ring-scheme-primary/60 focus-visible:border-scheme-primary rounded-lg",
						state.errors?.username &&
							"border-red-600/60 ring-4 ring-red-600/30",
					)}
					disabled={isPending}
					required
				/>
				{state.errors?.username && (
					<span className="text-sm text-red-600">{state.errors.username}</span>
				)}
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="password">
					Password <span className="text-red-600">*</span>
				</Label>
				<div className="relative">
					<Input
						id="password"
						name="password"
						type={showPassword ? "text" : "password"}
						autoComplete="off"
						minLength={PASSWORD_MIN_LENGTH}
						maxLength={PASSWORD_MAX_LENGTH}
						disabled={isPending}
						placeholder="Your password"
						className={cn(
							"border-scheme-foreground/20 focus-visible:ring-scheme-primary/60 focus-visible:border-scheme-primary rounded-lg",
							state.errors?.password &&
								"border-red-600/60 ring-4 ring-red-600/30",
						)}
						required
					/>
					<button
						type="button"
						className="text-scheme-foreground/50 hover:text-scheme-primary absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? (
							<Icons.eyeClose className="size-4 shrink-0" />
						) : (
							<Icons.eyeOpen className="size-4 shrink-0" />
						)}
					</button>
				</div>
				{state.errors?.password && (
					<span className="text-sm text-red-600">{state.errors.password}</span>
				)}
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-end">
					<NextLink
						href="/forgot-password"
						className="text-scheme-primary text-sm font-medium hover:underline"
					>
						Forgot password?
					</NextLink>
				</div>
				<Button
					type="submit"
					disabled={isPending}
					className="bg-scheme-primary hover:bg-scheme-primary/90 hover:shadow-scheme-primary/60 cursor-pointer rounded-lg text-white hover:shadow-xl"
				>
					{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Login"}
				</Button>
				<NextLink
					href="/register"
					className="text-scheme-primary text-center text-sm font-medium hover:underline"
				>
					Don&apos;t have an account? Register.
				</NextLink>
			</div>
		</form>
	);
}
