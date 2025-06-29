"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { register } from "../action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MIN_LENGTH,
	DISPLAY_NAME_MAX_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
} from "@/lib/constants";
import { NextLink } from "@/components/ui/next-link";
import { useToast } from "@/components/toast-provider";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		username: "",
		displayName: "",
		password: "",
		confirmPassword: "",
	},
	values: {
		username: "",
		display_name: "",
		password: "",
		confirm_password: "",
	},
};

export function RegisterForm() {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(register, initialState);
	const [showPassword, setShowPassword] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);
	const { addToast } = useToast();

	useEffect(() => {
		if (state.successMessage) {
			addToast({ description: state.successMessage, type: "success" });
			router.push("/login");
		} else if (state.errorMessage) {
			addToast({ description: state.errorMessage, type: "error" });
		}
	}, [state, router, addToast]);

	return (
		<form
			action={formAction}
			className="rounded-lg shadow p-8 bg-transparent border border-neutral-200 dark:border-neutral-700"
		>
			<div className="flex flex-col space-y-6">
				<div className="flex items-center justify-center text-center">
					<h1 className="text-2xl font-bold">Create an Account</h1>
				</div>
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="display_name">
							Display Name <span className="text-red-500">*</span>
						</Label>
						<Input
							type="text"
							id="display_name"
							name="display_name"
							defaultValue={state.values?.display_name}
							placeholder="John"
							minLength={DISPLAY_NAME_MIN_LENGTH}
							maxLength={DISPLAY_NAME_MAX_LENGTH}
							className={cn(
								"h-10 rounded-sm peer",
								state.errors?.displayName && "ring-4 ring-red-500/30",
							)}
							required
						/>
						<span className="text-sm font-medium text-neutral-500 hidden peer-focus:block">
							You can always change this later.
						</span>
						{state.errors?.displayName && (
							<span className="text-red-500 font-medium text-sm">
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
							placeholder="Your unique username"
							minLength={USERNAME_MIN_LENGTH}
							maxLength={USERNAME_MAX_LENGTH}
							className={cn(
								"h-10 rounded-sm",
								state.errors?.username && "ring-4 ring-red-500/30",
							)}
							required
						/>
						{state.errors?.username && (
							<span className="text-red-500 text-sm font-medium">
								{state.errors.username}
							</span>
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
								defaultValue={state.values?.password}
								placeholder="Set your password"
								minLength={PASSWORD_MIN_LENGTH}
								className={cn(
									"h-10 rounded-sm",
									state.errors?.password && "ring-4 ring-red-500/30",
								)}
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
						{state.errors?.password && (
							<span className="text-red-500 text-sm font-medium">
								{state.errors.password}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="confirm_password">
							Confirm Password <span className="text-red-500">*</span>
						</Label>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								id="confirm_password"
								name="confirm_password"
								defaultValue={state.values?.confirm_password}
								placeholder="Confirm your password"
								minLength={PASSWORD_MIN_LENGTH}
								className={cn(
									"h-10 rounded-sm",
									state.errors?.confirmPassword && "ring-4 ring-red-500/30",
								)}
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
						{state.errors?.confirmPassword && (
							<span className="text-red-500 text-sm font-medium">
								{state.errors.confirmPassword}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-3 pt-2">
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2">
								<Checkbox
									id="accept-terms"
									checked={acceptTerms}
									onCheckedChange={(checked) => setAcceptTerms(!!checked)}
									className="rounded-sm"
								/>
								<Label htmlFor="accept-terms">
									<p className="text-sm">
										By clicking &quot;Register&quot;, you agree to our{" "}
										<NextLink
											href="/terms"
											className="text-[#5865f2] hover:underline"
										>
											Terms of Service
										</NextLink>
										, and have read the{" "}
										<NextLink
											href="/privacy"
											className="text-[#5865f2] hover:underline"
										>
											Privacy Policy
										</NextLink>
										.
									</p>
								</Label>
							</div>
							<Button
								type="submit"
								disabled={isPending || !acceptTerms}
								variant="default"
								className="h-10 cursor-pointer w-full"
							>
								{isPending ? <Icons.loading className="size-5" /> : "Register"}
							</Button>
						</div>
						<p className="text-sm text-neutral-500">
							Already have an account?{" "}
							<NextLink
								href="/login"
								className="font-medium text-[#5865f2] hover:underline"
							>
								Login now
							</NextLink>
						</p>
					</div>
				</div>
			</div>
		</form>
	);
}
