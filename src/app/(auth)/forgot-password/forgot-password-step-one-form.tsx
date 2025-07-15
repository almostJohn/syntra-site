"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { forgotPasswordStepOne } from "../action";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { NextLink } from "@/components/ui/next-link";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		username: "",
	},
};

export function ForgotPasswordStepOneForm() {
	const { state, formAction, isPending } = useServerAction(
		forgotPasswordStepOne,
		initialState,
		{ redirectTo: "/forgot-password/step-two" },
	);

	return (
		<form
			action={formAction}
			className="rounded-lg shadow p-8 bg-transparent border border-neutral-200 dark:border-neutral-700"
		>
			<div className="flex flex-col space-y-6">
				<div className="flex items-center justify-center text-center">
					<h1 className="text-2xl font-bold">Reset Your Password</h1>
				</div>
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="username">
							Username <span className="text-red-500">*</span>
						</Label>
						<Input
							type="text"
							id="username"
							name="username"
							defaultValue={state.values?.username}
							placeholder="Your username"
							minLength={USERNAME_MIN_LENGTH}
							maxLength={USERNAME_MAX_LENGTH}
							className={cn(
								"h-10 rounded-sm",
								state.errors?.username && "ring-4 ring-red-500/30",
							)}
							disabled={isPending}
							required
						/>
						{state.errors?.username && (
							<p className="text-sm text-red-500 font-medium">
								{state.errors.username}
							</p>
						)}
					</div>
					<div className="flex flex-col gap-3 pt-2">
						<Button
							type="submit"
							disabled={isPending}
							className="cursor-pointer h-10 w-full"
						>
							{isPending ? (
								<Icons.loading className="size-5 shrink-0" />
							) : (
								"Continue"
							)}
						</Button>
						<NextLink
							href="/login"
							className={cn(
								buttonVariants({
									variant: "outline",
									className: "h-10 w-full",
								}),
							)}
						>
							Go back to login
						</NextLink>
					</div>
				</div>
			</div>
		</form>
	);
}
