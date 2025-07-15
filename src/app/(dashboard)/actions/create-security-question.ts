"use server";

import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { db } from "@/data/db/client";
import { authChallenges } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/sessions";
import {
	SECURITY_QUESTION_MAX_LENGTH,
	SECURITY_QUESTION_MIN_LENGTH,
	SECURITY_ANSWER_MIN_LENGTH,
} from "@/lib/constants";
import { getFormValue } from "@/lib/get-form-value";

export async function createSecurityQuestion(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const question = getFormValue(formData, "question");
		const answer = getFormValue(formData, "answer");

		if (!question || !answer) {
			return {
				errorMessage: "Question and answer are required.",
				errors: {
					question: "Question is a required field.",
					answer: "Answer is a required field.",
				},
			};
		}

		if (question.length < SECURITY_QUESTION_MIN_LENGTH) {
			return {
				errorMessage: `Question must be at least ${SECURITY_QUESTION_MIN_LENGTH} characters long.`,
				errors: {
					question: `Question must be at least ${SECURITY_QUESTION_MIN_LENGTH} characters long.`,
				},
				values: {
					answer,
				},
			};
		}

		if (question.length > SECURITY_QUESTION_MAX_LENGTH) {
			return {
				errorMessage: `Question exceeds the maximum allowed length of ${SECURITY_QUESTION_MAX_LENGTH} characters.`,
				errors: {
					question: `Question exceeds the maximum allowed length of ${SECURITY_QUESTION_MAX_LENGTH} characters.`,
				},
				values: {
					answer,
				},
			};
		}

		if (answer.length < SECURITY_ANSWER_MIN_LENGTH) {
			return {
				errorMessage: `Answer must be at least ${SECURITY_ANSWER_MIN_LENGTH} characters long.`,
				errors: {
					answer: `Answer must be at least ${SECURITY_ANSWER_MIN_LENGTH} characters long.`,
				},
				values: {
					question,
				},
			};
		}

		const [existingQuestion] = await db
			.select({ id: authChallenges.id, question: authChallenges.question })
			.from(authChallenges)
			.where(eq(authChallenges.userId, user.id))
			.limit(1);

		if (existingQuestion && existingQuestion.question) {
			return {
				errorMessage: "You already created a security question. Your all set.",
			};
		}

		const hashedAnswer = await bcrypt.hash(answer, 12);

		await db.insert(authChallenges).values({
			id: crypto.randomUUID(),
			userId: user.id,
			question,
			answer: hashedAnswer,
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/settings");

		return {
			successMessage: "Security question was created successfully.",
		};
	});
}
