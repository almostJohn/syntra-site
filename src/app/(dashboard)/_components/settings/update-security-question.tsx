"use client";

import { useServerAction, toAction } from "@/hooks/use-server-action";
import { useState, useEffect } from "react";
import { updateSecurityQuestion } from "../../actions/update-security-question";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import {
	SECURITY_QUESTION_MAX_LENGTH,
	SECURITY_QUESTION_MIN_LENGTH,
	SECURITY_ANSWER_MIN_LENGTH,
} from "@/lib/constants";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

type SecurityQuestion = {
	id: string;
	userId: string;
	question: string;
	answer: string;
};

type UpdateSecurityQuestionProps = {
	securityQuestion: SecurityQuestion;
};

export function UpdateSecurityQuestion({
	securityQuestion,
}: UpdateSecurityQuestionProps) {
	const { formAction, isPending } = useServerAction(
		toAction(updateSecurityQuestion),
		initialState,
	);

	const [question, setQuestion] = useState(securityQuestion.question);

	const [answer, setAnswer] = useState(securityQuestion.answer);

	useEffect(() => {
		setQuestion(securityQuestion.question);
		setAnswer(securityQuestion.answer);
	}, [securityQuestion]);

	return (
		<form
			action={() => {
				formAction([question, answer]);
			}}
			className="flex flex-col bg-transparent rounded-sm border border-neutral-200 dark:border-neutral-700"
		>
			<div className="flex flex-col gap-4 p-5">
				<div className="font-medium">Update Security Question</div>
				<div className="flex flex-col gap-1.5 max-w-xl text-sm">
					<Label htmlFor="question">
						Question <span className="text-red-500">*</span>
					</Label>
					<Input
						type="text"
						id="question"
						name="question"
						value={question}
						minLength={SECURITY_QUESTION_MIN_LENGTH}
						maxLength={SECURITY_QUESTION_MAX_LENGTH}
						className="w-full h-10"
						disabled={isPending}
						onChange={(e) => setQuestion(e.target.value)}
					/>
				</div>
				<div className="flex flex-col gap-1.5 max-w-xl text-sm">
					<Label htmlFor="answer">
						Answer <span className="text-red-500">*</span>
					</Label>
					<Input
						type="text"
						id="answer"
						name="answer"
						value={answer}
						minLength={SECURITY_ANSWER_MIN_LENGTH}
						className="w-full h-10 peer"
						disabled={isPending}
						onChange={(e) => setAnswer(e.target.value)}
					/>
					<span className="text-sm font-medium text-neutral-500 hidden peer-focus:block">
						The answer is hashed by default. If you edit and submit it, the new
						answer will be automatically hashed.
					</span>
				</div>
			</div>
			<div className="mt-auto px-5 py-3 border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-between w-full">
					<div className="text-sm text-neutral-500 max-w-sm">
						An additional layer of security to protect your account during
						password recovery.
					</div>
					<Button type="submit" disabled={isPending} className="cursor-pointer">
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
