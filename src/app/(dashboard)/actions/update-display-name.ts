"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { users } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
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
				errorMessage: "Unauthorized access.",
			};
		}

		if (displayName.length < DISPLAY_NAME_MIN_LENGTH) {
			return {
				errorMessage: `Display name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters long.`,
			};
		}

		if (displayName.length > DISPLAY_NAME_MAX_LENGTH) {
			return {
				errorMessage: `Display name exceeds the maximum allowed length of ${DISPLAY_NAME_MAX_LENGTH} characters.`,
			};
		}

		await db
			.update(users)
			.set({
				displayName,
				updatedAt: new Date(),
			})
			.where(eq(users.id, user.id));

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/settings");

		return {
			successMessage: "User display name was successfully updated.",
		};
	});
}
