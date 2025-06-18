"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { createTask } from "@/actions/tasks/create-task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { NextLink } from "@/components/ui/next-link";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		title: "",
		content: "",
	},
	values: {
		title: "",
		content: "",
	},
};

export function CreateTaskForm() {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(
		createTask,
		initialState,
	);
	const [agreed, setAgreed] = useState(false);

	useEffect(() => {
		if (state.successMessage) {
			toast.success(state.successMessage);
			router.push("/dashboard/tasks");
		} else if (state.errorMessage) {
			toast.error(state.errorMessage);
		}
	}, [state, router]);

	return (
		<form action={formAction} className="flex flex-col space-y-6">
			<h3 className="text-3xl font-bold">Create a new task</h3>
			<div className="flex flex-col space-y-1">
				<Label htmlFor="title">
					Title <span className="text-muted-foreground">(optional)</span>
				</Label>
				<Input
					type="text"
					id="title"
					name="title"
					defaultValue={state.values?.title}
					className={cn(
						"focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
						state.errors?.title && "border-red-600",
					)}
				/>
				{state.errors?.title && (
					<span className="text-red-600 text-sm font-medium">
						{state.errors.title}
					</span>
				)}
			</div>
			<div className="flex flex-col space-y-1">
				<Label htmlFor="content">
					Content <span className="text-red-600">*</span>
				</Label>
				<Textarea
					id="content"
					name="content"
					defaultValue={state.values?.content}
					className={cn(
						"h-60 focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
						state.errors?.content && "border-red-600",
					)}
					required
				/>
				{state.errors?.content && (
					<span className="text-red-600 text-sm font-medium">
						{state.errors.content}
					</span>
				)}
			</div>
			<div className="flex flex-col space-y-4">
				<div className="flex items-center justify-start space-x-2">
					<Checkbox
						id="accept-terms"
						checked={agreed}
						onCheckedChange={(checked) => setAgreed(!!checked)}
						className="border border-border bg-muted shadow data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600"
					/>
					<Label htmlFor="accept-terms">
						<p className="text-muted-foreground">
							By creating a new task, you agree to our{" "}
							<NextLink
								href="/terms"
								className="font-medium text-blue-600 transition-colors hover:text-blue-700"
							>
								Terms of Service
							</NextLink>
							, and{" "}
							<NextLink
								href="/privacy"
								className="font-medium text-blue-600 transition-colors hover:text-blue-700"
							>
								Privacy Policy
							</NextLink>
							.
						</p>
					</Label>
				</div>
				<div className="flex items-center justify-start">
					<Button
						type="submit"
						disabled={isPending || !agreed}
						className="cursor-pointer disabled:cursor-not-allowed"
						variant="primary"
					>
						{isPending ? (
							<>
								<Loader className="size-4 animate-spin" /> Creating...
							</>
						) : (
							"Create Task"
						)}
					</Button>
				</div>
			</div>
		</form>
	);
}
