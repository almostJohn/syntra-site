"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/sql";
import { notifications as notificationsTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { request } from "@/lib/request";
import { auth } from "@/lib/auth";
import { type ActionState, MessageType } from "@/types";

export async function markNotificationAsRead(
	notificationId: string,
): Promise<ActionState> {
	const { data: currentUser } = await auth.getCurrentUser();

	if (!currentUser) {
		return {
			type: MessageType.Error,
			message: "You must be logged in to perform this action.",
		};
	}

	try {
		await request.post({
			body: { id: notificationId },
			fn: async ({ body }) => {
				await db
					.update(notificationsTable)
					.set({
						isRead: true,
					})
					.where(
						and(
							eq(notificationsTable.id, body!.id),
							eq(notificationsTable.isRead, false),
							eq(notificationsTable.userId, currentUser.id),
						),
					);
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/notifications");

		return {
			type: MessageType.Success,
			message: "Notification marked as done.",
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Something went wrong.";
		return {
			type: MessageType.Error,
			message,
		};
	}
}
