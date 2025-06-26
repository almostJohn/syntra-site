import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { users, notifications, tasks, notes } from "../db/schema";

export async function getUserNotifications(userId: string) {
	return await db
		.select({
			id: notifications.id,
			description: notifications.description,
			type: notifications.type,
			isArchived: notifications.isArchived,
			createdAt: notifications.createdAt,
			task: {
				id: tasks.id,
			},
			note: {
				id: notes.id,
			},
			user: {
				id: users.id,
			},
		})
		.from(notifications)
		.leftJoin(tasks, eq(tasks.id, notifications.taskId))
		.leftJoin(notes, eq(notes.id, notifications.noteId))
		.leftJoin(users, eq(users.id, notifications.userId))
		.where(eq(notifications.userId, userId))
		.orderBy(desc(notifications.createdAt));
}
