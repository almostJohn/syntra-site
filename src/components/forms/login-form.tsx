"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { NextLink } from "@/components/ui/next-link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { login } from "@/actions/auth/action";
import { Loader } from "lucide-react";

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
			className="block p-6 rounded-xl w-full bg-background/95 border shadow-lg md:w-96"
		>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col space-y-1 justify-center text-center">
					<h1 className="text-xl font-bold">Welcome back!</h1>
					<p className="text-muted-foreground">
						We&apos;re so excited to see you again.
					</p>
				</div>
				<div className="flex flex-col space-y-3.5">
					<div className="flex flex-col space-y-1.5">
						<Label htmlFor="email">
							Email <span className="text-red-600">*</span>
						</Label>
						<Input
							type="email"
							id="email"
							name="email"
							defaultValue={state.values?.email}
							className={cn(
								"focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
								state.errors?.email && "border-red-600",
							)}
							required
						/>
						{state.errors?.email && (
							<span className="font-medium text-red-600 text-xs">
								{state.errors.email}
							</span>
						)}
					</div>
					<div className="flex flex-col space-y-1.5">
						<Label htmlFor="password">
							Password <span className="text-red-600">*</span>
						</Label>
						<Input
							type="password"
							id="password"
							name="password"
							className={cn(
								"focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
								state.errors?.password && "border-red-600",
							)}
							required
						/>
						{state.errors?.password && (
							<span className="font-medium text-red-600 text-xs">
								{state.errors.password}
							</span>
						)}
					</div>
					<div className="flex flex-col space-y-4">
						<Button
							type="submit"
							variant="primary"
							className="cursor-pointer"
							disabled={isPending}
						>
							{isPending ? (
								<>
									<Loader className="size-4 animate-spin" /> Logging in...
								</>
							) : (
								<>Login</>
							)}
						</Button>
						<p className="text-sm text-center text-muted-foreground">
							Don&apos;t have an account?{" "}
							<NextLink
								href="/register"
								className="text-blue-600 font-semibold underline-offset-2 hover:underline"
							>
								Register now
							</NextLink>
							.
						</p>
					</div>
				</div>
			</div>
		</form>
	);
}
