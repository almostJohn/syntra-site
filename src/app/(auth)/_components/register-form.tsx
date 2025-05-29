"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { NextLink } from "@/components/ui/next-link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { register } from "../action";
import { icons } from "@/components/icons";
import { cn } from "@/lib/utils";

const initialState = {
	errorMessage: "",
	successMessage: "",
	errors: {
		email: "",
		diplayName: "",
		password: "",
		fields: "",
	},
	values: {
		email: "",
		display_name: "",
	},
};

export function RegisterForm() {
	const router = useRouter();

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
			className="block w-full p-6 rounded-xl shadow-lg border bg-background/95 md:w-96"
		>
			<div className="flex flex-col gap-6">
				<div className="flex items-center justify-center text-center">
					<h1 className="text-xl font-bold">Create an account</h1>
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
								state.errors?.fields && "border-red-600",
								state.errors?.email && "border-red-600",
							)}
							required
						/>
						{state.errors?.fields && (
							<span className="font-medium text-red-600 text-xs">
								{state.errors.fields}
							</span>
						)}
						{state.errors?.email && (
							<span className="font-medium text-red-600 text-xs">
								{state.errors.email}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-y-1.5">
						<Label htmlFor="display_name">
							Display Name <span className="text-red-600">*</span>
						</Label>
						<Input
							type="text"
							id="display_name"
							name="display_name"
							defaultValue={state.values?.display_name}
							className={cn(
								"focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
								state.errors?.fields && "border-red-600",
								state.errors?.displayName && "border-red-600",
							)}
							required
						/>
						{state.errors?.fields && (
							<span className="font-medium text-red-600 text-xs">
								{state.errors.fields}
							</span>
						)}
						{state.errors?.displayName && (
							<span className="font-medium text-red-600 text-xs">
								{state.errors.displayName}
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
								state.errors?.fields && "border-red-600",
								state.errors?.password && "border-red-600",
							)}
							required
						/>
						{state.errors?.fields && (
							<span className="font-medium text-red-600 text-xs">
								{state.errors.fields}
							</span>
						)}
						{state.errors?.password && (
							<span className="font-medium text-red-600 text-xs">
								{state.errors.password}
							</span>
						)}
					</div>
					<div className="flex flex-col space-y-1.5">
						<Label htmlFor="confirm_password">
							Confirm Password <span className="text-red-600">*</span>
						</Label>
						<Input
							type="password"
							id="confirm_password"
							name="confirm_password"
							className={cn(
								"focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
								state.errors?.fields && "border-red-600",
								state.errors?.password && "border-red-600",
							)}
							required
						/>
						{state.errors?.fields && (
							<span className="font-medium text-red-600 text-xs">
								{state.errors.fields}
							</span>
						)}
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
									<icons.Loading className="size-4 animate-spin" /> Creating...
								</>
							) : (
								<>Create account</>
							)}
						</Button>
						<p className="text-sm text-center text-muted-foreground">
							Already have an account?{" "}
							<NextLink
								href="/login"
								className="text-blue-600 font-semibold underline-offset-2 hover:underline"
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
