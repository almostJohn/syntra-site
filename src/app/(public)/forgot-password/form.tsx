"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { resetPassword } from "./action";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/lib/constants";
import { Icons } from "@/components/icons";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		username: "",
		newPassword: "",
		confirmNewPassword: "",
	},
	values: {
		username: "",
	},
};

export function Form() {
	const { state, formAction, isPending } = useServerAction(
		resetPassword,
		initialState,
		{ redirectTo: "/login" },
	);
	const [showPassword, setShowPassword] = useState(false);

	return (
		<form action={formAction} className="flex flex-col gap-4">
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
					placeholder="Enter your username"
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
				<Label htmlFor="newPassword">
					New Password <span className="text-red-500">*</span>
				</Label>
				<div className="relative">
					<Input
						type={showPassword ? "text" : "password"}
						id="newPassword"
						name="newPassword"
						minLength={PASSWORD_MIN_LENGTH}
						placeholder="Set a new password"
						className={cn(
							"h-10",
							state.errors?.newPassword && "ring-4 ring-red-500/30",
						)}
						disabled={isPending}
						autoComplete="off"
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
				{state.errors?.newPassword && (
					<span className="text-sm text-red-500">
						{state.errors.newPassword}
					</span>
				)}
			</div>
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="confirmNewPassword">
					Confirm New Password <span className="text-red-500">*</span>
				</Label>
				<div className="relative">
					<Input
						type={showPassword ? "text" : "password"}
						id="confirmNewPassword"
						name="confirmNewPassword"
						minLength={PASSWORD_MIN_LENGTH}
						placeholder="Confirm your new password"
						className={cn(
							"h-10",
							state.errors?.confirmNewPassword && "ring-4 ring-red-500/30",
						)}
						disabled={isPending}
						autoComplete="off"
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
				{state.errors?.confirmNewPassword && (
					<span className="text-sm text-red-500">
						{state.errors.confirmNewPassword}
					</span>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<Button
					type="submit"
					disabled={isPending}
					className="h-10 cursor-pointer"
				>
					{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Reset"}
				</Button>
				<NextLink
					href="/login"
					className={cn(
						buttonVariants({ variant: "outline", className: "h-10 group" }),
					)}
				>
					<Icons.arrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />{" "}
					Back to Login
				</NextLink>
			</div>
		</form>
	);
}
