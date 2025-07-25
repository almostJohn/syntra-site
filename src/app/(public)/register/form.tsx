"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { register } from "./action";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/icons";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	DISPLAY_NAME_MAX_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/lib/constants";
import { Agreement } from "./agreement";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		displayName: "",
		username: "",
		password: "",
		confirmPassword: "",
	},
	values: {
		displayName: "",
		username: "",
	},
};

export function Form() {
	const { state, formAction, isPending } = useServerAction(
		register,
		initialState,
		{ redirectTo: "/login" },
	);
	const [showPassword, setShowPassword] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);

	return (
		<form action={formAction} className="flex flex-col gap-4">
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="displayName">
					Display Name <span className="text-red-500">*</span>
				</Label>
				<Input
					type="text"
					id="displayName"
					name="displayName"
					defaultValue={state.values?.displayName}
					minLength={DISPLAY_NAME_MIN_LENGTH}
					maxLength={DISPLAY_NAME_MAX_LENGTH}
					placeholder="What's your name?"
					className={cn(
						"h-10 peer",
						state.errors?.displayName && "ring-4 ring-red-500/30",
					)}
					disabled={isPending}
					autoComplete="off"
					required
				/>
				<span className="hidden text-sm text-neutral-500 peer-focus:block">
					You can always change this later.
				</span>
				{state.errors?.displayName && (
					<span className="text-sm text-red-500">
						{state.errors.displayName}
					</span>
				)}
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="username">
					Username <span className="text-red-500">*</span>
				</Label>
				<Input
					type="text"
					id="username"
					name="username"
					defaultValue={state.values?.username}
					minLength={USERNAME_MIN_LENGTH}
					maxLength={USERNAME_MAX_LENGTH}
					placeholder="Your unique username"
					className={cn(
						"h-10",
						state.errors?.username && "ring-4 ring-red-500/30",
					)}
					disabled={isPending}
					autoComplete="off"
					required
				/>
				{state.errors?.username && (
					<span className="text-sm text-red-500">{state.errors.username}</span>
				)}
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="password">
					Password <span className="text-red-500">*</span>
				</Label>
				<div className="relative">
					<Input
						type={showPassword ? "text" : "password"}
						id="password"
						name="password"
						minLength={PASSWORD_MIN_LENGTH}
						placeholder="Set a password"
						className={cn(
							"h-10",
							state.errors?.password && "ring-4 ring-red-500/30",
						)}
						disabled={isPending}
						required
					/>
					<button
						type="button"
						className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-100"
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
					<span className="text-sm text-red-500">{state.errors.password}</span>
				)}
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="confirmPassword">
					Confirm Password <span className="text-red-500">*</span>
				</Label>
				<div className="relative">
					<Input
						type={showPassword ? "text" : "password"}
						id="confirmPassword"
						name="confirmPassword"
						minLength={PASSWORD_MIN_LENGTH}
						placeholder="Confirm your password"
						className={cn(
							"h-10",
							state.errors?.confirmPassword && "ring-4 ring-red-500/30",
						)}
						disabled={isPending}
						required
					/>
					<button
						type="button"
						className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-100"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? (
							<Icons.eyeClose className="size-4 shrink-0" />
						) : (
							<Icons.eyeOpen className="size-4 shrink-0" />
						)}
					</button>
				</div>
				{state.errors?.confirmPassword && (
					<span className="text-sm text-red-500">
						{state.errors.confirmPassword}
					</span>
				)}
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-2.5">
					<Checkbox
						id="acceptTerms"
						checked={acceptTerms}
						onCheckedChange={(checked) => setAcceptTerms(!!checked)}
						className="rounded-sm"
					/>
					<Label htmlFor="acceptTerms">
						<p className="text-sm text-neutral-500">
							I have read and agree to the{" "}
							<span>
								<Agreement />
							</span>
							.
						</p>
					</Label>
				</div>
				<Button
					type="submit"
					disabled={isPending || !acceptTerms}
					className="h-10 cursor-pointer"
				>
					{isPending ? (
						<Icons.loading className="size-4 shrink-0" />
					) : (
						"Register"
					)}
				</Button>
				<p className="text-sm text-center text-neutral-500">
					Already have an account?{" "}
					<NextLink
						href="/login"
						className="font-medium text-sm text-blue-500 transition-colors duration-200 hover:text-blue-400"
					>
						Login now
					</NextLink>
					.
				</p>
			</div>
		</form>
	);
}
