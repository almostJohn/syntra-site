"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { and, eq } from "drizzle-orm";
import { notifications } from "@/data/db/schema";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";

export async function archiveNotifications(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
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

		revalidatePath("/dashboard");

		return {
			successMessage: "Notifications was archived successfully.",
		};
	});
}
