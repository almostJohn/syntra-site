"use client";

import { useServerAction } from "@/hooks/use-server-action";
import { forgotPasswordStepTwo } from "../action";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { NextLink } from "@/components/ui/next-link";
import {
	PASSWORD_MIN_LENGTH,
	SECURITY_ANSWER_MIN_LENGTH,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { useEffect, useState } from "react";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		answer: "",
		newPassword: "",
	},
	values: {
		answer: "",
	},
};

type SecurityQuestion = {
	question: string;
};

type ForgotPasswordStepTwoFormProps = {
	securityQuestion: SecurityQuestion;
};

export function ForgotPasswordStepTwoForm({
	securityQuestion,
}: ForgotPasswordStepTwoFormProps) {
	const { state, formAction, isPending } = useServerAction(
		forgotPasswordStepTwo,
		initialState,
		{ redirectTo: "/login" },
	);

	const [question, setQuestion] = useState(securityQuestion.question);

	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		setQuestion(securityQuestion.question);
	}, [securityQuestion]);

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
						<Label htmlFor="answer">
							{question}? <span className="text-red-500">*</span>
						</Label>
						<Input
							type="text"
							id="answer"
							name="answer"
							defaultValue={state.values?.answer}
							placeholder="Your answer"
							minLength={SECURITY_ANSWER_MIN_LENGTH}
							className={cn(
								"h-10 rounded-sm",
								state.errors?.answer && "ring-4 ring-red-500/30",
							)}
							disabled={isPending}
							required
						/>
						{state.errors?.answer && (
							<p className="text-sm text-red-500 font-medium">
								{state.errors.answer}
							</p>
						)}
					</div>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="new_password">
							New password <span className="text-red-500">*</span>
						</Label>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								id="new_password"
								name="new_password"
								placeholder="Set a new password"
								minLength={PASSWORD_MIN_LENGTH}
								className={cn(
									"h-10 rounded-sm",
									state.errors?.newPassword && "ring-4 ring-red-500/30",
								)}
								disabled={isPending}
								required
							/>
							<button
								type="button"
								className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<Icons.closeEye className="size-4" />
								) : (
									<Icons.openEye className="size-4" />
								)}
							</button>
						</div>
						{state.errors?.newPassword && (
							<p className="text-sm text-red-500 font-medium">
								{state.errors.newPassword}
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
								"Reset Password"
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
