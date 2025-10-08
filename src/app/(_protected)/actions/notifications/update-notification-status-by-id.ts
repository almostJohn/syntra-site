"use server";

import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/action";
import { db } from "@/db/sql";
import { eq, and } from "drizzle-orm";
import { notifications } from "@/db/schema";
import { auth } from "@/lib/auth";

type Status = "archived" | "unarchived" | "read" | "unread";

export async function updateNotificationStatusById(
	notificationId: string,
	status: Status,
	statusToUpdate: Status,
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
				status: statusToUpdate,
				updatedAt: new Date(),
			})
			.where(
				and(
					eq(notifications.status, status),
					eq(notifications.id, notificationId),
					eq(notifications.userId, user.id),
				),
			);

		revalidatePath("/app");
		revalidatePath("/app/notifications");

		return {
			successMessage: "Notification status successfully updated.",
		};
	});
}
