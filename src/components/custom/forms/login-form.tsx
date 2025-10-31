"use client";

import { useUncontrolledForm } from "@/hooks/use-uncontrolled-form";
import { login } from "@/server-actions/auth/login";
import {
	Form,
	FormField,
	FormLabel,
	FormFieldError,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export function LoginForm() {
	const { state, formAction, isPending } = useUncontrolledForm({
		action: login,
		initialState: {},
		options: {
			redirectTo: "/app",
		},
	});

	return (
		<Form className="gap-0" action={formAction}>
			<FormField>
				{state.errorMessage && (
					<FormFieldError className="text-center">
						{state.errorMessage}
					</FormFieldError>
				)}
				<div className="grid gap-1">
					<FormLabel htmlFor="username" className="sr-only">
						Username
					</FormLabel>
					<Input
						type="text"
						id="username"
						name="username"
						placeholder="Username"
						defaultValue={state.values?.username}
						autoComplete="off"
						minLength={USERNAME_MIN_LENGTH}
						maxLength={USERNAME_MAX_LENGTH}
						required
						className={cn(
							"input-default-class",
							state.errors?.username && "input-default-error-class",
						)}
					/>
				</div>
				<div className="grid gap-1">
					<FormLabel htmlFor="password" className="sr-only">
						Password
					</FormLabel>
					<Input
						type="password"
						id="password"
						name="password"
						placeholder="Password"
						minLength={PASSWORD_MIN_LENGTH}
						maxLength={PASSWORD_MAX_LENGTH}
						required
						autoComplete="off"
						className={cn(
							"input-default-class",
							state.errors?.password && "input-default-error-class",
						)}
					/>
				</div>
				<div className="flex w-full">
					<Button
						type="submit"
						disabled={isPending}
						className="w-full rounded-lg"
					>
						{isPending ? (
							<Icons.loading className="size-6 shrink-0" />
						) : (
							"Login"
						)}
					</Button>
				</div>
			</FormField>
		</Form>
	);
}
