"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { updatePassword } from "@/app/(private)/actions/update-password";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function UpdatePassword() {
	const { formAction, isPending } = useServerAction(
		updatePassword,
		initialState,
	);
	const [showPassword, setShowPassword] = useState(false);

	return (
		<form
			action={formAction}
			className="flex flex-col rounded-sm border border-neutral-200 dark:border-neutral-700"
		>
			<div className="flex flex-col gap-4 p-5">
				<div className="font-semibold">Password</div>
				<div className="text-sm">
					Update your password to keep your account secure. Make sure your new
					password is strong and not used on other websites.
				</div>
				<div className="max-w-md flex flex-col gap-4">
					<div className="relative">
						<Input
							type={showPassword ? "text" : "password"}
							id="oldPassword"
							name="oldPassword"
							minLength={PASSWORD_MIN_LENGTH}
							placeholder="Old password"
							className="h-9"
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
					<div className="relative">
						<Input
							type={showPassword ? "text" : "password"}
							id="newPassword"
							name="newPassword"
							minLength={PASSWORD_MIN_LENGTH}
							placeholder="New password"
							className="h-9"
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
					<div className="relative">
						<Input
							type={showPassword ? "text" : "password"}
							id="confirmNewPassword"
							name="confirmNewPassword"
							minLength={PASSWORD_MIN_LENGTH}
							placeholder="Confirm new password"
							className="h-9"
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
				</div>
			</div>
			<div className="px-5 py-3 mt-auto border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-between">
					<div className="max-w-sm text-sm text-neutral-500">
						A password must be at least {PASSWORD_MIN_LENGTH} characters long.
					</div>
					<Button
						type="submit"
						disabled={isPending}
						size="sm"
						className="h-8 px-3 cursor-pointer"
					>
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
