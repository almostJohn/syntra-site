"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { db } from "@/data/db/client";
import { users, auditLogs, notifications } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import {
	DISPLAY_NAME_MAX_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
} from "@/lib/constants";

export async function updateDisplayName(
	displayName: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		if (displayName.length < DISPLAY_NAME_MIN_LENGTH) {
			return {
				errorMessage: `Display name too short (min ${DISPLAY_NAME_MIN_LENGTH} chars).`,
			};
		}

		if (displayName.length > DISPLAY_NAME_MAX_LENGTH) {
			return {
				errorMessage: `Display name too long (max ${DISPLAY_NAME_MAX_LENGTH} chars).`,
			};
		}

		const [updatedUser] = await db
			.update(users)
			.set({
				displayName,
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
