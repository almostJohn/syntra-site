"use server";

import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/action";
import { db } from "@/db/sql";
import { notifications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function updateNotificationStatus(
	status: "archived" | "unarchived" | "read" | "unread",
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await auth.getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		await db
			.update(notifications)
			.set({
				status,
				updatedAt: new Date(),
			})
			.where(eq(notifications.userId, user.id));

		revalidatePath("/app");
		revalidatePath("/notifications");

		return {
			successMessage: "Notifications status successfully updated.",
		};
	});
}
