"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NextLink } from "@/components/ui/next-link";
import { loginUser } from "@/actions/login-user.action";
import { Loader } from "lucide-react";

const initialState = {
	success: false,
	message: "",
};

export function LoginUserForm() {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();

	const [state, formAction] = useActionState(loginUser, initialState);

	useEffect(() => {
		if (state.success) {
			toast.success("Login successful.");
			router.push("/dashboard");
		} else if (state.message) {
			toast.error(state.message);
		}
	}, [state, router]);

	return (
		<form
			action={(formData) => {
				startTransition(() => {
					formAction(formData);
				});
			}}
			className="block p-6 w-full sm:w-96 rounded-lg border bg-background shadow-xl"
		>
			<div className="flex flex-col space-y-6">
				<div className="flex flex-col space-y-0.5">
					<h2 className="text-xl text-center font-bold leading-snug">
						Continue with Syntra
					</h2>
					<p className="text-sm text-center text-muted-foreground">
						Proceed with your created Syntra account.
					</p>
				</div>
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col space-y-2">
						<Label htmlFor="username">
							Username <span className="text-red-600">*</span>
						</Label>
						<Input
							id="username"
							name="username"
							type="text"
							placeholder="your-unique-username"
							className="transition-all focus-visible:border-blue-600/20 focus-visible:ring-blue-600/50"
							required
						/>
					</div>
					<div className="flex flex-col space-y-2">
						<div className="flex items-center justify-between w-full">
							<Label htmlFor="password">
								Password <span className="text-red-600">*</span>
							</Label>
							<NextLink
								href="/forgot-password"
								className="text-sm text-right underline font-medium text-blue-600"
							>
								Forgot Password?
							</NextLink>
						</div>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="••••••••"
							className="transition-all focus-visible:border-blue-600/20 focus-visible:ring-blue-600/50"
							required
						/>
					</div>
					<div className="flex flex-col space-y-3">
						<Button type="submit" disabled={isPending} variant="primary">
							{isPending ? (
								<>
									<Loader className="size-4 animate-spin" /> Logging in...
								</>
							) : (
								<>Login</>
							)}
						</Button>
						<p className="text-sm text-center">
							Don&apos;t have an account?{" "}
							<NextLink
								href="/register"
								className="font-medium underline text-blue-600"
							>
								Register Now
							</NextLink>
							.
						</p>
					</div>
				</div>
			</div>
		</form>
	);
}
