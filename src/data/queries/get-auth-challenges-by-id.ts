import { db } from "../db/client";
import { eq } from "drizzle-orm";
import { authChallenges } from "../db/schema";

export async function getAuthChallengesById(userId: string) {
	return await db
		.select({
			id: authChallenges.id,
			userId: authChallenges.userId,
			question: authChallenges.question,
			answer: authChallenges.answer,
		})
		.from(authChallenges)
		.where(eq(authChallenges.userId, userId))
		.limit(1);
}
