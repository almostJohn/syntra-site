"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NextLink } from "@/components/ui/next-link";
import { registerUser } from "@/actions/register-user.action";
import { Loader } from "lucide-react";

const initialState = {
	success: false,
	message: "",
};

export function RegisterUserForm() {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();

	const [state, formAction] = useActionState(registerUser, initialState);

	useEffect(() => {
		if (state.success) {
			toast.success("Registration successful.");
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
						Syntra Account
					</h2>
					<p className="text-sm text-center text-muted-foreground">
						Proceed by filling out the form to create your account.
					</p>
				</div>
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col space-y-2">
						<Label htmlFor="display_name">
							Display Name <span className="text-red-600">*</span>
						</Label>
						<Input
							id="display_name"
							name="display_name"
							type="text"
							placeholder="Name"
							className="transition-all focus-visible:border-blue-600/20 focus-visible:ring-blue-600/50"
							required
						/>
					</div>
					<div className="flex flex-col space-y-2">
						<Label htmlFor="username">
							Username <span className="text-red-600">*</span>
						</Label>
						<Input
							id="username"
							name="username"
							type="text"
							placeholder="unique-username"
							className="transition-all focus-visible:border-blue-600/20 focus-visible:ring-blue-600/50"
							required
						/>
					</div>
					<div className="flex flex-col space-y-2">
						<Label htmlFor="password">
							Password <span className="text-red-600">*</span>
						</Label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="••••••••"
							className="transition-all focus-visible:border-blue-600/20 focus-visible:ring-blue-600/50"
							required
						/>
					</div>
					<div className="flex flex-col space-y-2">
						<Label htmlFor="confirm_password">
							Confirm Password <span className="text-red-600">*</span>
						</Label>
						<Input
							id="confirm_password"
							name="confirm_password"
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
									<Loader className="size-4 animate-spin" /> Registering...
								</>
							) : (
								<>Register</>
							)}
						</Button>
						<p className="text-sm text-center">
							Already have an account?{" "}
							<NextLink
								href="/login"
								className="font-medium text-blue-600 underline"
							>
								Login Now
							</NextLink>
							.
						</p>
					</div>
				</div>
			</div>
		</form>
	);
}
