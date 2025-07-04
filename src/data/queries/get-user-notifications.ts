import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { notifications, tasks, projects } from "../db/schema";

export async function getUserNotifications(userId: string) {
	return await db
		.select({
			id: notifications.id,
			description: notifications.description,
			type: notifications.type,
			isArchived: notifications.isArchived,
			createdAt: notifications.createdAt,
			taskContent: tasks.content,
			projectName: projects.name,
		})
		.from(notifications)
		.leftJoin(tasks, eq(tasks.id, notifications.taskId))
		.leftJoin(projects, eq(projects.id, notifications.projectId))
		.where(eq(notifications.userId, userId))
		.orderBy(desc(notifications.createdAt));
}
