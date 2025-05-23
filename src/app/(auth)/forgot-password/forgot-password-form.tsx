"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { forgotPassword } from "@/actions/forgot-password.action";
import { Loader } from "lucide-react";

const initialState = {
	success: false,
	message: "",
};

export function ForgotPasswordForm() {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();

	const [state, formAction] = useActionState(forgotPassword, initialState);

	useEffect(() => {
		if (state.success) {
			toast.success("Password has been reset successfully.");
			router.push("/login");
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
						Reset Password
					</h2>
					<p className="text-sm text-center text-muted-foreground">
						Enter your username and choose a new password to reset your account
						access.
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
						<Label htmlFor="new_password">
							New Password <span className="text-red-600">*</span>
						</Label>
						<Input
							id="new_password"
							name="new_password"
							type="password"
							placeholder="••••••••"
							className="transition-all focus-visible:border-blue-600/20 focus-visible:ring-blue-600/50"
							required
						/>
					</div>
					<div className="flex flex-col space-y-2">
						<Label htmlFor="confirm_new_password">
							Confirm New Password <span className="text-red-600">*</span>
						</Label>
						<Input
							id="confirm_new_password"
							name="confirm_new_password"
							type="password"
							placeholder="••••••••"
							className="transition-all focus-visible:border-blue-600/20 focus-visible:ring-blue-600/50"
							required
						/>
					</div>
					<div className="flex flex-col space-y-2">
						<Button type="submit" disabled={isPending} variant="primary">
							{isPending ? (
								<>
									<Loader className="size-4 animate-spin" /> Resetting...
								</>
							) : (
								<>Reset Password</>
							)}
						</Button>
						<NextLink
							href="/login"
							className={cn(buttonVariants({ variant: "outline" }))}
						>
							Back to Login
						</NextLink>
					</div>
				</div>
			</div>
		</form>
	);
}
