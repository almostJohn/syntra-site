"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { NextLink } from "../ui/next-link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { registerUser } from "@/actions/auth/register-user";
import { cn } from "@/lib/utils";
import { Loader, Eye, EyeOff } from "lucide-react";

const initialState = {
	success: {
		statusCode: 0,
		message: "",
	},
	error: {
		statusCode: 0,
		message: "",
	},
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
	const [showPassword, setShowPassword] = useState(false);
	const [state, formAction, isPending] = useActionState(
		registerUser,
		initialState,
	);

	useEffect(() => {
		if (state.success?.message) {
			toast.success(state.success.message);
			router.push("/login");
		} else if (state.error?.message) {
			toast.error(state.error.message);
		}
	}, [state, router]);

	return (
		<form
			action={formAction}
			className="rounded-xl bg-background border border-border shadow-2xl p-7"
		>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-center text-center text-2xl font-bold">
					Create an account
				</div>
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="display_name" className="text-sm font-medium">
							Display Name <span className="text-red-600">*</span>
						</Label>
						<Input
							type="text"
							id="display_name"
							name="display_name"
							placeholder="John"
							defaultValue={state.values?.display_name}
							className={cn(
								"h-10 peer rounded-sm focus-visible:border-[#5865f2]/60 focus-visible:ring-[#5865f2]/40 transition-all",
								state.errors?.displayName && "border-red-600",
							)}
							required
						/>
						<span className="hidden transition-all text-sm text-muted-foreground peer-focus:block">
							You can always change this later.
						</span>
						{state.errors?.displayName && (
							<span className="text-sm font-medium text-red-600">
								{state.errors.displayName}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="username" className="text-sm font-medium">
							Username <span className="text-red-600">*</span>
						</Label>
						<Input
							type="text"
							id="username"
							name="username"
							placeholder="Your unique username"
							defaultValue={state.values?.username}
							className={cn(
								"h-10 rounded-sm focus-visible:border-[#5865f2]/60 focus-visible:ring-[#5865f2]/40 transition-all",
								state.errors?.username && "border-red-600",
							)}
							required
						/>
						{state.errors?.username && (
							<span className="text-sm font-medium text-red-600">
								{state.errors.username}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="password" className="text-sm font-medium">
							Password <span className="text-red-600">*</span>
						</Label>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								placeholder="Enter a password"
								className={cn(
									"h-10 rounded-sm peer focus-visible:border-[#5865f2]/60 focus-visible:ring-[#5865f2]/40 transition-all",
									state.errors?.password && "border-red-600",
								)}
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-accent-foreground"
							>
								{showPassword ? (
									<EyeOff className="size-4" />
								) : (
									<Eye className="size-4" />
								)}
							</button>
						</div>
						{state.errors?.password && (
							<span className="text-sm font-medium text-red-600">
								{state.errors.password}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="confirm_password" className="text-sm font-medium">
							Confirm Password <span className="text-red-600">*</span>
						</Label>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								id="confirm_password"
								name="confirm_password"
								placeholder="Confirm password"
								className={cn(
									"h-10 rounded-sm focus-visible:border-[#5865f2]/60 focus-visible:ring-[#5865f2]/40 transition-all",
									state.errors?.confirmPassword && "border-red-600",
								)}
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-accent-foreground"
							>
								{showPassword ? (
									<EyeOff className="size-4" />
								) : (
									<Eye className="size-4" />
								)}
							</button>
						</div>
						{state.errors?.confirmPassword && (
							<span className="text-sm font-medium text-red-600">
								{state.errors.confirmPassword}
							</span>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<Button
						type="submit"
						variant="primary"
						disabled={isPending}
						className="w-full h-10 cursor-pointer"
					>
						{isPending ? (
							<Loader className="size-5 animate-spin" />
						) : (
							"Register"
						)}
					</Button>
					<div className="flex items-center justify-center text-center">
						<p className="text-sm">
							Already have an account?{" "}
							<NextLink
								href="/login"
								className="font-medium cursor-pointer text-[#5865f2] transition-colors hover:underline hover:text-[#5865f2]/80"
							>
								Login now
							</NextLink>
							.
						</p>
					</div>
				</div>
			</div>
		</form>
	);
}
