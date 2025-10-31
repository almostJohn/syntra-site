import "server-only";
import { db } from "@/db/sql";
import { eq, desc } from "drizzle-orm";
import { notifications as notificationsTable } from "@/db/schema";

export type NotificationStatus = "archived" | "unarchived" | "read" | "unread";
export type Notification = {
	id: string;
	content: string;
	status: NotificationStatus;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
};

export async function getNotifications(
	userId: string,
): Promise<Notification[]> {
	try {
		const raw_notifications = await db
			.select()
			.from(notificationsTable)
			.where(eq(notificationsTable.userId, userId))
			.orderBy(desc(notificationsTable.createdAt));

		return raw_notifications;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return [];
	}
}
