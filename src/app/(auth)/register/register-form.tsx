"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { useCheckbox } from "@/hooks/use-checkbox";
import { registerUser } from "./action";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TextField } from "@/components/text-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import {
	DISPLAY_NAME_MAX_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/lib/constants";
import { NextLink } from "@/components/ui/next-link";

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

export function RegisterForm() {
	const { state, formAction, isPending } = useServerAction(
		registerUser,
		initialState,
		{
			redirectTo: "/login",
		},
	);
	const { checked, onChange } = useCheckbox();

	return (
		<form action={formAction} className="flex flex-col gap-4">
			<div className="flex flex-col gap-3">
				{/* Display Name Section */}
				<TextField
					type="text"
					id="displayName"
					name="displayName"
					label="Display Name"
					defaultValue={state.values?.displayName}
					minLength={DISPLAY_NAME_MIN_LENGTH}
					maxLength={DISPLAY_NAME_MAX_LENGTH}
					disabled={isPending}
					placeholder="John Doe or johndoe12"
					required
					error={!!state.errors?.displayName}
					errorMessage={state.errors?.displayName}
				/>

				{/* Username Section */}
				<TextField
					type="text"
					id="username"
					name="username"
					label="Username"
					defaultValue={state.values?.username}
					minLength={USERNAME_MIN_LENGTH}
					maxLength={USERNAME_MAX_LENGTH}
					disabled={isPending}
					placeholder="Set a unique username"
					required
					error={!!state.errors?.username}
					errorMessage={state.errors?.username}
				/>

				{/* Password Section */}
				<TextField
					type="password"
					id="password"
					name="password"
					label="Password"
					minLength={PASSWORD_MIN_LENGTH}
					maxLength={PASSWORD_MAX_LENGTH}
					disabled={isPending}
					placeholder="Set a strong password"
					required
					error={!!state.errors?.password}
					errorMessage={state.errors?.password}
				/>

				{/* Confirm Password Section */}
				<TextField
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					label="Confirm Password"
					minLength={PASSWORD_MIN_LENGTH}
					maxLength={PASSWORD_MAX_LENGTH}
					disabled={isPending}
					placeholder="Confirm your password"
					required
					error={!!state.errors?.confirmPassword}
					errorMessage={state.errors?.confirmPassword}
				/>
			</div>

			<div className="flex flex-col gap-2">
				{/* Accept Terms and Privacy */}
				<div className="flex items-center gap-2">
					<Checkbox
						id="acceptTermsAndPrivacy"
						checked={checked}
						onCheckedChange={onChange}
						className="rounded data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
					/>
					<Label htmlFor="acceptTermsAndPrivacy">
						<p className="text-muted-foreground text-sm">
							I have read and agree the{" "}
							<NextLink
								href="#"
								className="font-medium text-blue-600 hover:underline"
							>
								Terms of Service
							</NextLink>
							, and{" "}
							<NextLink
								href="#"
								className="font-medium text-blue-600 hover:underline"
							>
								Privacy Policy
							</NextLink>
							.
						</p>
					</Label>
				</div>

				{/* Submit button */}
				<Button
					type="submit"
					disabled={isPending || !checked}
					className="h-10 w-full cursor-pointer rounded bg-blue-600 text-white hover:bg-blue-700"
				>
					{isPending ? (
						<Loader2 className="size-5 shrink-0 animate-spin" />
					) : (
						"Sign Up"
					)}
				</Button>

				{/* Redirect back to login */}
				<p className="text-muted-foreground mt-2 text-center text-sm">
					Already have an account?{" "}
					<NextLink
						href="/login"
						className="font-medium text-blue-600 hover:underline"
					>
						Sign In
					</NextLink>
				</p>
			</div>
		</form>
	);
}
