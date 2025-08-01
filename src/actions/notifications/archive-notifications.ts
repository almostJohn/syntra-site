"use server";

import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { db } from "@/data/db/client";
import { eq, and } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { notifications } from "@/data/db/schema";

export async function archiveNotifications(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		await db
			.update(notifications)
			.set({
				isArchived: true,
				updatedAt: new Date(),
			})
			.where(
				and(
					eq(notifications.userId, user.id),
					eq(notifications.isArchived, false),
				),
			);

		revalidatePath("/app");

		return {
			successMessage: "Notifications was archived successfully.",
		};
	});
}
