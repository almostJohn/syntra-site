"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { updatePassword } from "@/actions/users/update-password";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { cn } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		oldPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	},
};

export function PasswordSettings() {
	const { state, formAction, isPending } = useServerAction(
		updatePassword,
		initialState,
	);
	const [showPassword, setShowPassword] = useState(false);

	return (
		<form
			action={formAction}
			className="flex flex-col rounded-md shadow-sm border border-neutral-300 dark:border-neutral-700"
		>
			<div className="flex flex-col gap-4 p-6">
				<div className="text-xl font-semibold">Password</div>
				<div className="text-sm">
					Update your password to keep your account secure. Make sure your new
					password is strong and not used on other websites.
				</div>
				<div className="max-w-md flex flex-col gap-1.5">
					<div className="relative">
						<Input
							type={showPassword ? "text" : "password"}
							id="oldPassword"
							name="oldPassword"
							placeholder="Your old password"
							minLength={PASSWORD_MIN_LENGTH}
							maxLength={PASSWORD_MAX_LENGTH}
							autoComplete="off"
							disabled={isPending}
							className={cn(
								"h-10",
								state.errors?.oldPassword && "ring-4 ring-red-500/30",
							)}
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
					{state.errors?.oldPassword && (
						<span className="text-sm text-red-500">
							{state.errors.oldPassword}
						</span>
					)}
				</div>
				<div className="max-w-md flex flex-col gap-1.5">
					<div className="relative">
						<Input
							type={showPassword ? "text" : "password"}
							id="newPassword"
							name="newPassword"
							placeholder="Set a new password"
							minLength={PASSWORD_MIN_LENGTH}
							maxLength={PASSWORD_MAX_LENGTH}
							autoComplete="off"
							disabled={isPending}
							className={cn(
								"h-10",
								state.errors?.newPassword && "ring-4 ring-red-500/30",
							)}
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
				<div className="max-w-md flex flex-col gap-1.5">
					<div className="relative">
						<Input
							type={showPassword ? "text" : "password"}
							id="confirmNewPassword"
							name="confirmNewPassword"
							placeholder="Confirm your new password"
							minLength={PASSWORD_MIN_LENGTH}
							maxLength={PASSWORD_MAX_LENGTH}
							autoComplete="off"
							disabled={isPending}
							className={cn(
								"h-10",
								state.errors?.confirmNewPassword && "ring-4 ring-red-500/30",
							)}
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
			</div>
			<div className="mt-auto p-6 md:px-6 md:py-4 border-t border-neutral-300 dark:border-neutral-700">
				<div className="flex flex-col gap-4 items-center justify-center md:flex-row md:justify-between">
					<div className="text-sm text-center md:text-left text-neutral-500">
						A password must be {PASSWORD_MIN_LENGTH}-{PASSWORD_MAX_LENGTH}{" "}
						characters long and include numbers and uppercase letters.
					</div>
					<Button
						type="submit"
						disabled={isPending}
						className="h-10 cursor-pointer"
					>
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
