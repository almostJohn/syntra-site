"use server";

import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { db } from "@/data/db/client";
import { eq, and } from "drizzle-orm";
import { notifications } from "@/data/db/schema";
import { getCurrentUser } from "@/lib/auth";

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
					eq(notifications.isArchived, false),
					eq(notifications.userId, user.id),
				),
			);

		revalidatePath("/app");

		return {
			successMessage: "Notifications was archived successfully.",
		};
	});
}
