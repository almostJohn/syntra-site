"use server";

import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { db } from "@/data/db/client";
import { users } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/sessions";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	DISPLAY_NAME_MAX_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
} from "@/lib/constants";
import { deleteCookie } from "@/lib/auth/cookies";

export async function changeUsername(
	username: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		if (username.length < USERNAME_MIN_LENGTH) {
			return {
				errorMessage: `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`,
			};
		}

		if (username.length > USERNAME_MAX_LENGTH) {
			return {
				errorMessage: `Username exceeds the maximum allowed length of ${USERNAME_MAX_LENGTH} characters.`,
			};
		}

		const [updatedUser] = await db
			.update(users)
			.set({ username })
			.where(eq(users.id, user.id))
			.returning();

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/settings");

		return {
			successMessage: "Username was updated successfully.",
			values: {
				username: updatedUser.username,
			},
		};
	});
}

export async function changeDisplayName(
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

		const [updatedUser] = await db
			.update(users)
			.set({ displayName })
			.where(eq(users.id, user.id))
			.returning();

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/settings");

		return {
			successMessage: "Display name was successfully updated.",
			values: {
				displayName: updatedUser.displayName,
			},
		};
	});
}

export async function deleteAccount(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		await db.delete(users).where(eq(users.id, user.id));

		await deleteCookie();

		return {
			successMessage: "Logout successful.",
		};
	});
}
