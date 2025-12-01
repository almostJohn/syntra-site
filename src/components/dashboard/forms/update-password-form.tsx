"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { updatePassword } from "@/actions/update-password";
import type { ActionState } from "@/types";
import { Form, FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeOff, Eye, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UpdatePasswordForm() {
	const [showPasswords, setShowPasswords] = useState(false);
	const { formAction, isPending } = useServerAction({
		action: updatePassword,
		initialState: {} as ActionState,
	});

	return (
		<Form
			action={formAction}
			className="gap-0 rounded-md border border-neutral-300 shadow-sm"
		>
			<div className="flex flex-col gap-4 rounded-t-md border-b border-neutral-300 bg-white p-6">
				<h2 className="text-lg font-semibold">Password</h2>
				<p className="text-sm">
					Update your account password regularly to enhance security.
				</p>
				<FormField className="max-w-md">
					<div className="grid gap-1">
						<Label htmlFor="currentPassword" className="sr-only">
							Current Password
						</Label>
						<div className="relative">
							<button
								type="button"
								onClick={() => setShowPasswords(!showPasswords)}
								className="absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer text-neutral-500 hover:text-neutral-950"
							>
								{showPasswords ? (
									<EyeOff className="size-4 shrink-0" />
								) : (
									<Eye className="size-4 shrink-0" />
								)}
							</button>
							<Input
								id="currentPassword"
								name="currentPassword"
								type={showPasswords ? "text" : "password"}
								placeholder="Current Password"
								className="w-full border-neutral-300 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30"
								required
								maxLength={128}
								minLength={8}
							/>
						</div>
					</div>
					<div className="grid gap-1">
						<Label htmlFor="newPassword" className="sr-only">
							New Password
						</Label>
						<div className="relative">
							<button
								type="button"
								onClick={() => setShowPasswords(!showPasswords)}
								className="absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer text-neutral-500 hover:text-neutral-950"
							>
								{showPasswords ? (
									<EyeOff className="size-4 shrink-0" />
								) : (
									<Eye className="size-4 shrink-0" />
								)}
							</button>
							<Input
								id="newPassword"
								name="newPassword"
								type={showPasswords ? "text" : "password"}
								placeholder="New Password"
								className="w-full border-neutral-300 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30"
								required
								maxLength={128}
								minLength={8}
							/>
						</div>
					</div>
					<div className="grid gap-1">
						<Label htmlFor="confirmNewPassword" className="sr-only">
							Confirm New Password
						</Label>
						<div className="relative">
							<button
								type="button"
								onClick={() => setShowPasswords(!showPasswords)}
								className="absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer text-neutral-500 hover:text-neutral-950"
							>
								{showPasswords ? (
									<EyeOff className="size-4 shrink-0" />
								) : (
									<Eye className="size-4 shrink-0" />
								)}
							</button>
							<Input
								id="confirmNewPassword"
								name="confirmNewPassword"
								type={showPasswords ? "text" : "password"}
								placeholder="Confirm New Password"
								className="w-full border-neutral-300 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30"
								required
								maxLength={128}
								minLength={8}
							/>
						</div>
					</div>
				</FormField>
			</div>
			<div className="mt-auto flex flex-col items-center justify-center gap-2 rounded-b-md bg-neutral-100/95 p-6 md:flex-row md:justify-between">
				<p className="text-center text-sm text-neutral-500 md:text-left">
					Ensure your new password is strong and secure.
				</p>
				<Button type="submit" disabled={isPending}>
					{isPending ? (
						<>
							<Loader className="size-5 shrink-0 animate-spin" />
							Saving...
						</>
					) : (
						"Save"
					)}
				</Button>
			</div>
		</Form>
	);
}
