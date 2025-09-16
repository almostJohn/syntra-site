"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { useShowPassword } from "@/hooks/use-show-password";
import { useCheckbox } from "@/hooks/use-checkbox";
import { registerUser } from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
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
	const { show, toggle } = useShowPassword();
	const { checked, onChange } = useCheckbox();

	return (
		<form action={formAction}>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="displayName">
						Display Name <span className="text-red-600">*</span>
					</Label>
					<Input
						type="text"
						id="displayName"
						name="displayName"
						defaultValue={state.values?.displayName}
						minLength={DISPLAY_NAME_MIN_LENGTH}
						maxLength={DISPLAY_NAME_MAX_LENGTH}
						autoComplete="off"
						disabled={isPending}
						placeholder="John Doe or johndoe12"
						className={cn(
							"peer h-10 rounded focus-visible:border-blue-600/60 focus-visible:ring-blue-600/30",
							state.errors?.displayName &&
								"border-red-600/60 ring-[3px] ring-red-600/30",
						)}
						required
					/>
					<span className="text-muted-foreground hidden text-sm peer-focus:inline-block">
						You can always change this later.
					</span>
					{state.errors?.displayName && (
						<span className="text-sm text-red-600">
							{state.errors.displayName}
						</span>
					)}
				</div>
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="username">
						Username <span className="text-red-600">*</span>
					</Label>
					<Input
						type="text"
						id="username"
						name="username"
						defaultValue={state.values?.username}
						minLength={USERNAME_MIN_LENGTH}
						maxLength={USERNAME_MAX_LENGTH}
						autoComplete="off"
						disabled={isPending}
						placeholder="Your unique username"
						className={cn(
							"peer h-10 rounded focus-visible:border-blue-600/60 focus-visible:ring-blue-600/30",
							state.errors?.username &&
								"border-red-600/60 ring-[3px] ring-red-600/30",
						)}
						required
					/>
					{state.errors?.username && (
						<span className="text-sm text-red-600">
							{state.errors.username}
						</span>
					)}
				</div>
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="password">
						Password <span className="text-red-600">*</span>
					</Label>
					<div className="relative">
						<Input
							type={show ? "text" : "password"}
							id="password"
							name="password"
							minLength={PASSWORD_MIN_LENGTH}
							maxLength={PASSWORD_MAX_LENGTH}
							autoComplete="off"
							disabled={isPending}
							placeholder="Set a strong password"
							className={cn(
								"h-10 rounded focus-visible:border-blue-600/60 focus-visible:ring-blue-600/30",
								state.errors?.password &&
									"border-red-600/60 ring-[3px] ring-red-600/30",
							)}
							required
						/>
						<button
							type="button"
							className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer"
							onClick={toggle}
						>
							{show ? (
								<EyeOff className="size-4 shrink-0" />
							) : (
								<Eye className="size-4 shrink-0" />
							)}
						</button>
					</div>
					{state.errors?.password && (
						<span className="text-sm text-red-600">
							{state.errors.password}
						</span>
					)}
				</div>
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="confirmPassword">
						Confirm Password <span className="text-red-600">*</span>
					</Label>
					<div className="relative">
						<Input
							type={show ? "text" : "password"}
							id="confirmPassword"
							name="confirmPassword"
							minLength={PASSWORD_MIN_LENGTH}
							maxLength={PASSWORD_MAX_LENGTH}
							autoComplete="off"
							disabled={isPending}
							placeholder="Confirm your password"
							className={cn(
								"h-10 rounded focus-visible:border-blue-600/60 focus-visible:ring-blue-600/30",
								state.errors?.confirmPassword &&
									"border-red-600/60 ring-[3px] ring-red-600/30",
							)}
							required
						/>
						<button
							type="button"
							className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer"
							onClick={toggle}
						>
							{show ? (
								<EyeOff className="size-4 shrink-0" />
							) : (
								<Eye className="size-4 shrink-0" />
							)}
						</button>
					</div>
					{state.errors?.confirmPassword && (
						<span className="text-sm text-red-600">
							{state.errors.confirmPassword}
						</span>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2.5">
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
					<p className="text-muted-foreground text-left text-sm">
						Already have an account?{" "}
						<NextLink
							href="/login"
							className="font-medium text-blue-600 hover:underline"
						>
							Sign In
						</NextLink>
					</p>
				</div>
			</div>
		</form>
	);
}
