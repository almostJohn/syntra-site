import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { notifications, tasks, projects } from "../db/schema";

export async function getRecentActivities(userId: string, limit: number) {
	return await db
		.select({
			id: notifications.id,
			type: notifications.type,
			description: notifications.description,
			createdAt: notifications.createdAt,
			taskContent: tasks.content,
			projectName: projects.name,
		})
		.from(notifications)
		.leftJoin(tasks, eq(notifications.taskId, tasks.id))
		.leftJoin(projects, eq(notifications.projectId, projects.id))
		.where(eq(notifications.userId, userId))
		.orderBy(desc(notifications.createdAt))
		.limit(limit);
}
