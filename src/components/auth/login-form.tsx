"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { loginUser } from "@/actions/auth/login-user";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Eye, EyeOff, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { NextLink } from "../ui/next-link";

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
		password: "",
	},
	values: {
		username: "",
	},
};

export function LoginForm() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [state, formAction, isPending] = useActionState(
		loginUser,
		initialState,
	);

	useEffect(() => {
		if (state.success?.message) {
			toast.success(state.success.message);
			router.push("/dashboard");
		} else if (state.error?.message) {
			toast.error(state.error.message);
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
						<Label htmlFor="username" className="text-sm font-medium">
							Username <span className="text-red-600">*</span>
						</Label>
						<Input
							type="text"
							id="username"
							name="username"
							placeholder="Enter your username"
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
								placeholder="Enter your password"
								className={cn(
									"h-10 rounded-sm focus-visible:border-[#5865f2]/60 focus-visible:ring-[#5865f2]/40 transition-all",
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
						className="w-full h-10 cursor-pointer"
					>
						{isPending ? <Loader className="size-5 animate-spin" /> : "Login"}
					</Button>
					<div className="flex items-center justify-center text-center">
						<p className="text-sm">
							Don&apos;t have an account?{" "}
							<NextLink
								href="/register"
								className="font-medium cursor-pointer text-[#5865f2] transition-colors hover:text-[#5865f2]/80 hover:underline"
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
