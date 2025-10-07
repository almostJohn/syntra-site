"use server";

import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/action";
import { db } from "@/db/sql";
import { notifications, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import { generateUUID } from "@/lib/crypto";
import { auth } from "@/lib/auth";
import { createNotificationMessage } from "@/lib/utils";

export async function updateUsername(
	username: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await auth.getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		if (username.length < USERNAME_MIN_LENGTH) {
			return {
				errorMessage: `Username must be at least ${USERNAME_MIN_LENGTH} characters.`,
			};
		}

		if (username.length > USERNAME_MAX_LENGTH) {
			return {
				errorMessage: `Username must not exceed ${USERNAME_MAX_LENGTH} characters.`,
			};
		}

		const updatedUser = await db
			.update(users)
			.set({
				username,
				updatedAt: new Date(),
			})
			.where(eq(users.id, user.id))
			.returning();

		if (updatedUser) {
			await db.insert(notifications).values({
				id: generateUUID(),
				userId: user.id,
				content: createNotificationMessage("updated", "username"),
			});
		}

		revalidatePath("/app");
		revalidatePath("/app/settings");

		return {
			successMessage: "Username updated successfully.",
		};
	});
}
