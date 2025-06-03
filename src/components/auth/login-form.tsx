"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { login } from "@/actions/auth/login.action";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { NextLink } from "../ui/next-link";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		email: "",
		password: "",
	},
	values: {
		email: "",
	},
};

export function LoginForm() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [state, formAction, isPending] = useActionState(login, initialState);

	useEffect(() => {
		if (state.successMessage) {
			toast.success(state.successMessage);
			router.push("/dashboard");
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
				<div className="flex flex-col space-y-1 items-center justify-center">
					<div className="text-2xl font-bold text-center">
						Login to continue
					</div>
					<div className="text-muted-foreground text-center">
						Proceed with your created Syntra account.
					</div>
				</div>
				<div className="flex flex-col gap-3">
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
								placeholder="Enter your password"
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
				</div>
				<div className="flex flex-col gap-3">
					<Button
						type="submit"
						variant="primary"
						disabled={isPending}
						className="w-full h-11 cursor-pointer"
					>
						{isPending ? <Loader className="size-5 animate-spin" /> : "Login"}
					</Button>
					<div className="flex items-center justify-center text-center">
						<p className="text-sm">
							Don&apos;t have an account?{" "}
							<NextLink
								href="/register"
								className="font-medium cursor-pointer text-blue-600 transition-colors hover:text-blue-700"
							>
								Register for free
							</NextLink>
							.
						</p>
					</div>
				</div>
			</div>
		</form>
	);
}
