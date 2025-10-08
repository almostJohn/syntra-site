"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { updatePassword } from "../../actions/users/update-password";
import { Form, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		oldPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	},
};

export function UpdatePasswordForm() {
	const { state, formAction, isPending } = useServerAction(
		updatePassword,
		initialState,
	);

	return (
		<section className="flex flex-col rounded-md border border-neutral-700">
			<Form action={formAction} className="gap-0">
				<div className="flex flex-col gap-4 rounded-t-md border-b border-neutral-700 bg-neutral-800 p-6">
					<h2 className="text-lg font-semibold">Update Your Password</h2>
					<FormControl className="max-w-md">
						<div className="grid gap-1">
							<Label htmlFor="oldPassword" className="sr-only">
								Old Password
							</Label>
							<Input
								type="password"
								id="oldPassword"
								name="oldPassword"
								placeholder="Old Password"
								minLength={PASSWORD_MIN_LENGTH}
								maxLength={PASSWORD_MAX_LENGTH}
								autoComplete="off"
								disabled={isPending}
								className={cn(
									"input-default-class h-10 bg-neutral-900",
									state.errors?.oldPassword && "input-default-error-class",
								)}
								required
							/>
						</div>
						<div className="grid gap-1">
							<Label htmlFor="newPassword" className="sr-only">
								New Password
							</Label>
							<Input
								type="password"
								id="newPassword"
								name="newPassword"
								placeholder="New Password"
								minLength={PASSWORD_MIN_LENGTH}
								maxLength={PASSWORD_MAX_LENGTH}
								autoComplete="off"
								disabled={isPending}
								className={cn(
									"input-default-class h-10 bg-neutral-900",
									state.errors?.newPassword && "input-default-error-class",
								)}
								required
							/>
						</div>
						<div className="grid gap-1">
							<Label htmlFor="confirmNewPassword" className="sr-only">
								Confirm New Password
							</Label>
							<Input
								type="password"
								id="confirmNewPassword"
								name="confirmNewPassword"
								placeholder="Confirm New Password"
								minLength={PASSWORD_MIN_LENGTH}
								maxLength={PASSWORD_MAX_LENGTH}
								autoComplete="off"
								disabled={isPending}
								className={cn(
									"input-default-class h-10 bg-neutral-900",
									state.errors?.confirmNewPassword &&
										"input-default-error-class",
								)}
								required
							/>
						</div>
					</FormControl>
				</div>
				<div className="mt-auto rounded-b-md bg-neutral-900 p-6">
					<div className="flex flex-col items-center justify-center gap-3 md:flex-row md:justify-between">
						<div className="flex items-center">
							<p className="text-center text-sm text-neutral-500">
								Please use at least {PASSWORD_MIN_LENGTH} characters at minimum
								for your password.
							</p>
						</div>
						<div>
							<Button type="submit" disabled={isPending} className="px-4">
								{isPending ? (
									<>
										<Loader2 className="size-5 shrink-0 animate-spin" />
										Saving...
									</>
								) : (
									"Save"
								)}
							</Button>
						</div>
					</div>
				</div>
			</Form>
		</section>
	);
}
