"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { login } from "@/actions/auth-actions";
import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Form, FormField, FormFieldError } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MessageType, type ActionState } from "@/types";
import { cn } from "@/lib/utils";

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const { state, formAction, isPending } = useServerAction({
		action: login,
		initialState: {} as ActionState,
		options: {
			redirectTo: "/dashboard",
		},
	});

	return (
		<Form action={formAction}>
			<FormField>
				{state.type === MessageType.Error && (
					<FormFieldError className="text-center">
						{state.message}
					</FormFieldError>
				)}
				<Label htmlFor="username" className="sr-only">
					Username
				</Label>
				<Input
					type="text"
					id="username"
					name="username"
					placeholder="Username"
					maxLength={32}
					minLength={3}
					autoComplete="off"
					required
					className={cn(
						"border-neutral-300 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30",
					)}
				/>
				<Label htmlFor="password" className="sr-only">
					Password
				</Label>
				<div className="relative">
					<Input
						type={showPassword ? "text" : "password"}
						id="password"
						name="password"
						placeholder="Password"
						maxLength={24}
						minLength={8}
						autoComplete="off"
						required
						className={cn(
							"border-neutral-300 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30",
						)}
					/>
					<button
						type="button"
						className="absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer text-neutral-500 hover:text-neutral-950"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? (
							<EyeOff className="size-4 shrink-0" />
						) : (
							<Eye className="size-4 shrink-0" />
						)}
					</button>
				</div>
				<Button type="submit" disabled={isPending}>
					{isPending ? (
						<>
							<Loader className="size-4 shrink-0 animate-spin" />
							Logging in...
						</>
					) : (
						"Login"
					)}
				</Button>
			</FormField>
		</Form>
	);
}
