"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { useShowPassword } from "@/hooks/use-show-password";
import { loginUser } from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOff, Eye, Loader2, AtSign, LockKeyhole } from "lucide-react";
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
		fields: "",
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
		<div className="flex flex-col gap-6">
			<form action={formAction}>
				<div className="grid gap-2">
					<Label>
						Account
						{state.errors?.fields && (
							<span className="text-red-600 italic">
								— {state.errors.fields}
							</span>
						)}
					</Label>
					<div className="grid gap-1">
						<Label htmlFor="username" className="sr-only">
							Username
						</Label>
						<div className="relative">
							<Input
								type="text"
								id="username"
								name="username"
								defaultValue={state.values?.username}
								minLength={USERNAME_MIN_LENGTH}
								maxLength={USERNAME_MAX_LENGTH}
								autoComplete="off"
								disabled={isPending}
								placeholder="Username"
								className={cn(
									"peer h-10 rounded pl-10 focus-visible:border-blue-600/60 focus-visible:ring-blue-600/30",
									state.errors?.fields &&
										"border-red-600/60 ring-[3px] ring-red-600/30",
								)}
								required
							/>
							<AtSign className="text-muted-foreground absolute top-1/2 left-4 size-4 shrink-0 -translate-y-1/2 peer-focus:text-blue-600" />
						</div>
					</div>
					<div className="grid gap-1">
						<Label htmlFor="password" className="sr-only">
							Password
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
								placeholder="Password"
								className={cn(
									"peer h-10 rounded pl-10 focus-visible:border-blue-600/60 focus-visible:ring-blue-600/30",
									state.errors?.fields &&
										"border-red-600/60 ring-[3px] ring-red-600/30",
								)}
								required
							/>
							<LockKeyhole className="text-muted-foreground absolute top-1/2 left-4 size-4 shrink-0 -translate-y-1/2 peer-focus:text-blue-600" />
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
					</div>
					<div className="flex items-center justify-end">
						<NextLink
							href="/forgot-password"
							className="text-sm font-medium text-blue-600 hover:underline"
						>
							Forgot password?
						</NextLink>
					</div>
					<div className="mt-1 grid gap-1">
						<Button
							type="submit"
							disabled={isPending}
							className="h-10 w-full cursor-pointer rounded bg-blue-600 text-white hover:bg-blue-700"
						>
							{isPending ? (
								<Loader2 className="size-5 shrink-0 animate-spin" />
							) : (
								"Continue"
							)}
						</Button>
						<p className="text-muted-foreground mt-3 text-center text-sm">
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
		</div>
	);
}
