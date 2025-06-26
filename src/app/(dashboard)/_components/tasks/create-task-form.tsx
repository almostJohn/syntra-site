"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createTask } from "@/actions/tasks/create-task";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { NextLink } from "@/components/ui/next-link";

const initialState = {
	success: {
		statusCode: 0,
		message: "",
	},
	error: {
		statusCode: 0,
		message: "",
	},
	errors: {
		title: "",
		description: "",
	},
	values: {
		title: "",
		description: "",
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
		if (state.success?.message) {
			toast.success(state.success.message);
			router.push("/dashboard/tasks");
		} else if (state.error?.message) {
			toast.error(state.error.message);
		}
	}, [state, router]);

	return (
		<form action={formAction} className="flex flex-col space-y-6">
			<h3 className="text-2xl font-bold text-center md:text-left">
				Create a new task
			</h3>
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
						"h-10 rounded-sm focus-visible:border-[#5865f2]/60 focus-visible:ring-[#5865f2]/40 transition-all",
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
				<Label htmlFor="description">
					Description <span className="text-red-600">*</span>
				</Label>
				<Textarea
					id="description"
					name="description"
					defaultValue={state.values?.description}
					className={cn(
						"h-50 rounded-sm focus-visible:border-[#5865f2]/60 focus-visible:ring-[#5865f2]/40 transition-all",
						state.errors?.description && "border-red-600",
					)}
					required
				/>
				{state.errors?.description && (
					<span className="text-red-600 text-sm font-medium">
						{state.errors.description}
					</span>
				)}
			</div>
			<div className="flex flex-col space-y-4">
				<div className="flex items-center gap-2">
					<Checkbox
						id="accept-terms"
						checked={agreed}
						onCheckedChange={(checked) => setAgreed(!!checked)}
						className="border border-border bg-muted shadow data-[state=checked]:bg-[#5865f2] data-[state=checked]:text-white data-[state=checked]:border-[#5865f2]"
					/>
					<Label htmlFor="accept-terms">
						<p className="text-sm text-muted-foreground">
							By creating a new task, you agree to our{" "}
							<NextLink
								href="/terms"
								className="text-[#5865f2] font-medium transition-colors hover:underline hover:text-[#5865f2]/80"
							>
								Terms of Service
							</NextLink>
							, and{" "}
							<NextLink
								href="/privacy"
								className="text-[#5865f2] font-medium transition-colors hover:underline hover:text-[#5865f2]/80"
							>
								Privacy Policy
							</NextLink>
							.
						</p>
					</Label>
				</div>
				<div className="flex w-full md:justify-start">
					<Button
						type="submit"
						variant="primary"
						disabled={isPending || !agreed}
						className="cursor-pointer h-10 w-full md:w-auto"
					>
						{isPending ? (
							<Loader className="size-4 animate-spin" />
						) : (
							"Create task"
						)}
					</Button>
				</div>
			</div>
		</form>
	);
}
