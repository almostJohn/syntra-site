"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { createSecurityQuestion } from "../../actions/create-security-question";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	AlertDialog,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogTrigger,
	AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
	SECURITY_ANSWER_MIN_LENGTH,
	SECURITY_QUESTION_MAX_LENGTH,
	SECURITY_QUESTION_MIN_LENGTH,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		question: "",
		answer: "",
	},
	values: {
		question: "",
		answer: "",
	},
};

export function CreateSecurityQuestion() {
	const { state, formAction, isPending } = useServerAction(
		createSecurityQuestion,
		initialState,
	);

	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger asChild>
				<Button className="cursor-pointer">
					<Icons.plus className="size-4 shrink-0" />
					Add a Security Question Now
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full sm:max-w-2xl">
				<VisuallyHidden>
					<AlertDialogTitle>Security Question Title</AlertDialogTitle>
					<AlertDialogDescription>
						Security Question Description
					</AlertDialogDescription>
				</VisuallyHidden>
				<form
					action={(formData) => {
						formAction(formData);
						onClose();
					}}
					className="flex flex-col gap-4"
				>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="question">
							Question <span className="text-red-500">*</span>
						</Label>
						<Input
							type="text"
							id="question"
							name="question"
							placeholder="What is the name of my pet?"
							defaultValue={state.values?.question}
							minLength={SECURITY_QUESTION_MIN_LENGTH}
							maxLength={SECURITY_QUESTION_MAX_LENGTH}
							className={cn(
								"h-10 rounded-sm",
								state.errors?.question && "ring-4 ring-red-500/30",
							)}
							required
						/>
						{state.errors?.question && (
							<span className="text-sm font-medium text-red-500">
								{state.errors.question}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="answer">
							Answer <span className="text-red-500">*</span>
						</Label>
						<Input
							type="text"
							id="answer"
							name="answer"
							defaultValue={state.values?.answer}
							minLength={SECURITY_ANSWER_MIN_LENGTH}
							className={cn(
								"h-10 rounded-sm",
								state.errors?.answer && "ring-4 ring-red-500/30",
							)}
							required
						/>
						{state.errors?.answer && (
							<span className="text-sm font-medium text-red-500">
								{state.errors.answer}
							</span>
						)}
					</div>
					<div className="flex items-center justify-between w-full">
						<Button
							type="button"
							variant="outline"
							className="cursor-pointer h-10"
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isPending}
							className="h-10 cursor-pointer"
						>
							{isPending ? (
								<Icons.loading className="size-4 shrink-0" />
							) : (
								"Save"
							)}
						</Button>
					</div>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
