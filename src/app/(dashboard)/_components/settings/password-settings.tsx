"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { useState } from "react";
import { updatePassword } from "../../actions/update-password";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function PasswordSettings() {
	const { formAction, isPending } = useServerAction(
		updatePassword,
		initialState,
	);

	const [showPassword, setShowPassword] = useState(false);

	return (
		<form
			action={formAction}
			className="flex flex-col rounded-sm bg-transparent border border-neutral-200 dark:border-neutral-700"
		>
			<div className="flex flex-col gap-4 p-5">
				<div className="font-medium">Change Password</div>
				<div className="flex flex-col gap-1.5 max-w-xl text-sm">
					<Label htmlFor="old_password">
						Old Password <span className="text-red-500"></span>
					</Label>
					<div className="relative">
						<Input
							type={showPassword ? "text" : "password"}
							id="old_password"
							name="old_password"
							placeholder="Old password"
							minLength={PASSWORD_MIN_LENGTH}
							className="h-10"
							disabled={isPending}
							required
						/>
						<button
							type="button"
							className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<Icons.closeEye className="size-4" />
							) : (
								<Icons.openEye className="size-4" />
							)}
						</button>
					</div>
				</div>
				<div className="flex flex-col gap-1.5 max-w-xl text-sm">
					<Label htmlFor="new_password">
						New Password <span className="text-red-500"></span>
					</Label>
					<div className="relative">
						<Input
							type={showPassword ? "text" : "password"}
							id="new_password"
							name="new_password"
							placeholder="New password"
							minLength={PASSWORD_MIN_LENGTH}
							className="h-10"
							disabled={isPending}
							required
						/>
						<button
							type="button"
							className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<Icons.closeEye className="size-4" />
							) : (
								<Icons.openEye className="size-4" />
							)}
						</button>
					</div>
				</div>
			</div>
			<div className="mt-auto border-t border-neutral-200 dark:border-neutral-700 px-5 py-3">
				<div className="flex items-center justify-between w-full">
					<div className="text-sm max-w-sm text-neutral-500">
						A password must be at least {PASSWORD_MIN_LENGTH} characters long
						for security purposes.
					</div>
					<Button type="submit" disabled={isPending} className="cursor-pointer">
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
