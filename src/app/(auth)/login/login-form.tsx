"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { useShowPassword } from "@/hooks/use-show-password";
import { loginUser } from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
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
	const { show, toggle } = useShowPassword();

	return (
		<form action={formAction}>
			<div className="flex flex-col gap-4">
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
						placeholder="Enter your username"
						className={cn(
							"h-10 rounded focus-visible:border-blue-600/60 focus-visible:ring-blue-600/30",
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
							placeholder="Enter your password"
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
				<div className="flex flex-col gap-2">
					<div className="flex items-center justify-end">
						<NextLink
							href="/forgot-password"
							className="text-sm font-medium text-blue-600 hover:underline"
						>
							Forgot password?
						</NextLink>
					</div>
					<Button
						type="submit"
						disabled={isPending}
						className="h-10 w-full cursor-pointer rounded bg-blue-600 text-white hover:bg-blue-700"
					>
						{isPending ? (
							<Loader2 className="size-5 shrink-0 animate-spin" />
						) : (
							"Login"
						)}
					</Button>
					<p className="text-muted-foreground text-left text-sm">
						Need an account?{" "}
						<NextLink
							href="/register"
							className="text-sm font-medium text-blue-600 hover:underline"
						>
							Sign Up
						</NextLink>
					</p>
				</div>
			</div>
		</form>
	);
}
