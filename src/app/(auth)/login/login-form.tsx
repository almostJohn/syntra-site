"use client";

import { useState } from "react";
import { login } from "../action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/lib/constants";
import { NextLink } from "@/components/ui/next-link";
import { useServerAction } from "@/hooks/use-server-action";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		username: "",
		password: "",
	},
	values: {
		username: "",
		password: "",
	},
};

export function LoginForm() {
	const { state, formAction, isPending } = useServerAction(
		login,
		initialState,
		{ redirectTo: "/dashboard" },
	);
	const [showPassword, setShowPassword] = useState(false);

	return (
		<form
			action={formAction}
			className="rounded-lg shadow p-8 bg-transparent border border-neutral-200 dark:border-neutral-700"
		>
			<div className="flex flex-col space-y-6">
				<div className="flex flex-col space-y-1 items-center justify-center text-center">
					<h1 className="text-2xl font-bold">Login to Continue</h1>
					<p className="text-muted-foreground">
						Proceed with your created Syntra account.
					</p>
				</div>
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="username">
							Username <span className="text-red-500">*</span>
						</Label>
						<Input
							type="text"
							id="username"
							name="username"
							defaultValue={state.values?.username}
							placeholder="Your username"
							minLength={USERNAME_MIN_LENGTH}
							maxLength={USERNAME_MAX_LENGTH}
							className={cn(
								"h-10 rounded-sm",
								state.errors?.username && "ring-4 ring-red-500/30",
							)}
							required
						/>
						{state.errors?.username && (
							<p className="text-sm text-red-500 font-medium">
								{state.errors.username}
							</p>
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
								placeholder="Your password"
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
							<p className="text-red-500 text-sm font-medium">
								{state.errors.password}
							</p>
						)}
					</div>
					<div className="flex flex-col gap-3 pt-2">
						<Button
							type="submit"
							disabled={isPending}
							variant="default"
							className="h-10 cursor-pointer w-full"
						>
							{isPending ? <Icons.loading className="size-5" /> : "Login"}
						</Button>
						<p className="text-sm text-neutral-500">
							Need an account?{" "}
							<NextLink
								href="/register"
								className="font-medium text-[#5865f2] hover:underline"
							>
								Register now
							</NextLink>
						</p>
					</div>
				</div>
			</div>
		</form>
	);
}
