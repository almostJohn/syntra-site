"use server";

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

export async function updateSecurityQuestion(
	question: string,
	answer: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		if (question.length < SECURITY_QUESTION_MIN_LENGTH) {
			return {
				errorMessage: `Question must be at least ${SECURITY_QUESTION_MIN_LENGTH} characters long.`,
			};
		}

		if (question.length > SECURITY_QUESTION_MAX_LENGTH) {
			return {
				errorMessage: `Question exceeds the maximum allowed length of ${SECURITY_QUESTION_MAX_LENGTH} characters.`,
			};
		}

		if (answer.length < SECURITY_ANSWER_MIN_LENGTH) {
			return {
				errorMessage: `Answer must be at least ${SECURITY_ANSWER_MIN_LENGTH} characters long.`,
			};
		}

		const hashedAnswer = await bcrypt.hash(answer, 12);

		await db
			.update(authChallenges)
			.set({
				question,
				answer: hashedAnswer,
				updatedAt: new Date(),
			})
			.where(eq(authChallenges.userId, user.id));

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/settings");

		return {
			successMessage: "Security question was updated successfully.",
		};
	});
}
