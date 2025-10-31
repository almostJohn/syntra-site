"use server";

import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/action";
import { db } from "@/db/sql";
import { eq, and } from "drizzle-orm";
import { notifications as notificationsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { ErrorResponses } from "@/lib/constants";

export async function markAsArchived(
	notificationId: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const loggedInUser = await auth.getCurrentUser();

		if (!loggedInUser) {
			return {
				errorMessage: ErrorResponses.unauthorized,
			};
		}

		await db
			.update(notificationsTable)
			.set({
				status: "archived",
				updatedAt: new Date(),
			})
			.where(
				and(
					eq(notificationsTable.id, notificationId),
					eq(notificationsTable.userId, loggedInUser.id),
				),
			);

		revalidatePath("/app");
		revalidatePath("/app/notifications");

		return {
			successMessage: "Notification status marked as archived.",
		};
	});
}
