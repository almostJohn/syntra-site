import { db } from "../db/client";
import { eq, desc } from "drizzle-orm";
import { notifications } from "../db/schema";

export async function getNotifications(userId: string) {
	return await db
		.select({
			id: notifications.id,
			description: notifications.description,
			isArchived: notifications.isArchived,
			userId: notifications.userId,
			createdAt: notifications.createdAt,
			updatedAt: notifications.updatedAt,
		})
		.from(notifications)
		.where(eq(notifications.userId, userId))
		.orderBy(desc(notifications.createdAt));
}
