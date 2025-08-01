"use server";

import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { db } from "@/data/db/client";
import { users, auditLogs, notifications } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { generateId } from "@/lib/generate-id";
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
				errorMessage: `Display name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters.`,
			};
		}

		if (displayName.length > DISPLAY_NAME_MAX_LENGTH) {
			return {
				errorMessage: `Display name must not exceed ${DISPLAY_NAME_MAX_LENGTH} characters.`,
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
				id: generateId(),
				title: "User Updated",
				description: `Updated display name for user account "${updatedUser.displayName}" (${updatedUser.id})`,
				userId: user.id,
			});

			await db.insert(notifications).values({
				id: generateId(),
				description: `Updated display name for user account "${updatedUser.displayName}" (${updatedUser.id})`,
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
