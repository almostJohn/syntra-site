"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { NextLink } from "../ui/next-link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { register } from "@/actions/auth/register.action";
import { cn } from "@/lib/utils";
import { Loader, Mail, Lock, Eye, EyeOff } from "lucide-react";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		confirmPassword: "",
	},
	values: {
		email: "",
		first_name: "",
		last_name: "",
		password: "",
		confirm_password: "",
	},
};

export function RegisterForm() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [state, formAction, isPending] = useActionState(register, initialState);

	useEffect(() => {
		if (state.successMessage) {
			toast.success(state.successMessage);
			router.push("/login");
		} else if (state.errorMessage) {
			toast.error(state.errorMessage);
		}
	}, [state, router]);

	return (
		<form
			action={formAction}
			className="rounded-xl bg-background border border-border shadow-xl backdrop-blur-sm p-7"
		>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-center text-center text-2xl font-bold">
					Create an account
				</div>
				<div className="flex flex-col gap-3">
					<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
						<div className="flex flex-col gap-1.5">
							<Label htmlFor="first_name" className="text-sm font-medium">
								First Name <span className="text-red-600">*</span>
							</Label>
							<Input
								type="text"
								id="first_name"
								name="first_name"
								placeholder="John"
								defaultValue={state.values?.first_name}
								className={cn(
									"h-11 focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
									state.errors?.firstName && "border-red-600",
								)}
								required
							/>
							{state.errors?.firstName && (
								<span className="text-sm font-medium text-red-600">
									{state.errors.firstName}
								</span>
							)}
						</div>
						<div className="flex flex-col gap-1.5">
							<Label htmlFor="last_name" className="text-sm font-medium">
								Last Name <span className="text-red-600">*</span>
							</Label>
							<Input
								type="text"
								id="last_name"
								name="last_name"
								placeholder="Doe"
								defaultValue={state.values?.last_name}
								className={cn(
									"h-11 focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
									state.errors?.lastName && "border-red-600",
								)}
								required
							/>
							{state.errors?.lastName && (
								<span className="text-sm font-medium text-red-600">
									{state.errors.lastName}
								</span>
							)}
						</div>
					</div>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="email" className="text-sm font-medium">
							Email <span className="text-red-600">*</span>
						</Label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
							<Input
								type="email"
								id="email"
								name="email"
								placeholder="Enter your email"
								defaultValue={state.values?.email}
								className={cn(
									"pl-10 h-11 focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
									state.errors?.email && "border-red-600",
								)}
								required
							/>
						</div>
						{state.errors?.email && (
							<span className="text-sm font-medium text-red-600">
								{state.errors.email}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="password" className="text-sm font-medium">
							Password <span className="text-red-600">*</span>
						</Label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
							<Input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								placeholder="Enter password"
								className={cn(
									"pl-10 h-11 focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
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
							<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
							<Input
								type={showPassword ? "text" : "password"}
								id="confirm_password"
								name="confirm_password"
								placeholder="Confirm password"
								className={cn(
									"pl-10 h-11 focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
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
						className="w-full h-11 cursor-pointer"
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
								className="font-medium cursor-pointer text-blue-600 transition-colors hover:text-blue-700"
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
