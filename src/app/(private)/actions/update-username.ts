"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/data/db/client";
import { users, auditLogs, notifications } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";

export async function updateUsername(
	username: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		if (username.length < USERNAME_MIN_LENGTH) {
			return {
				errorMessage: `Username too short (min ${USERNAME_MIN_LENGTH} chars).`,
			};
		}

		if (username.length > USERNAME_MAX_LENGTH) {
			return {
				errorMessage: `Username too long (max ${USERNAME_MAX_LENGTH} chars).`,
			};
		}

		const [updatedUser] = await db
			.update(users)
			.set({
				username,
				updatedAt: new Date(),
			})
			.where(eq(users.id, user.id))
			.returning();

		if (updatedUser) {
			await db.insert(auditLogs).values({
				id: crypto.randomUUID(),
				title: "User Updated",
				description: `User account "${updatedUser.username}" (${updatedUser.id}) was updated.`,
				userId: user.id,
			});

			await db.insert(notifications).values({
				id: crypto.randomUUID(),
				description: `User account "${updatedUser.username}" (${updatedUser.id}) was updated.`,
				userId: user.id,
			});
		}

		revalidatePath("/app");
		revalidatePath("/app/settings");

		return {
			successMessage: "User account was successfully updated.",
		};
	});
}
