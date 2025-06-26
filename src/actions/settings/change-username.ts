"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { eq } from "drizzle-orm";
import { users, notifications } from "@/data/db/schema";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";

export async function changeUsername(
	username: string,
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

		if (username.length < USERNAME_MIN_LENGTH) {
			return {
				error: {
					statusCode: 400,
					message: `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`,
				},
			};
		}

		if (username.length > USERNAME_MAX_LENGTH) {
			return {
				error: {
					statusCode: 400,
					message: `Username exceeds the maximum allowed length of ${USERNAME_MAX_LENGTH} characters.`,
				},
			};
		}

		const [updatedUser] = await db
			.update(users)
			.set({ username })
			.where(eq(users.id, user.id))
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: updatedUser.id,
			type: "UPDATE_USER",
			description: `User username changed to "${username}"`,
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/settings");

		return {
			success: {
				statusCode: 200,
				message: "User updated successfully.",
			},
			values: {
				username: updatedUser.username,
			},
		};
	});
}
