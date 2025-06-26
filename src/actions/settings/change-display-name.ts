"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { eq } from "drizzle-orm";
import { users, notifications } from "@/data/db/schema";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import {
	DISPLAY_NAME_MIN_LENGTH,
	DISPLAY_NAME_MAX_LENGTH,
} from "@/lib/constants";

export async function changeDisplayName(
	displayName: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				error: {
					statusCode: 401,
					message: "Unauthorized access.",
				},
			};
		}

		if (displayName.length < DISPLAY_NAME_MIN_LENGTH) {
			return {
				error: {
					statusCode: 400,
					message: `Display name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters long.`,
				},
			};
		}

		if (displayName.length > DISPLAY_NAME_MAX_LENGTH) {
			return {
				error: {
					statusCode: 400,
					message: `Display name exceeds the maximum allowed length of ${DISPLAY_NAME_MAX_LENGTH} characters.`,
				},
			};
		}

		const [updatedUser] = await db
			.update(users)
			.set({ displayName })
			.where(eq(users.id, user.id))
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			type: "UPDATE_USER",
			description: `User display name changed to "${displayName}"`,
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/settings");

		return {
			success: {
				statusCode: 200,
				message: "User updated successfully.",
			},
			values: {
				displayName: updatedUser.displayName,
			},
		};
	});
}
