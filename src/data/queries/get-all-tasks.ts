import { desc, eq, and } from "drizzle-orm";
import { db } from "../db/client";
import { tasks } from "../db/schema";

export async function getAllTasks(userId: string, projectId: string) {
	return await db
		.select({
			id: tasks.id,
			content: tasks.content,
			status: tasks.status,
			createdAt: tasks.createdAt,
			userId: tasks.userId,
			projectId: tasks.projectId,
		})
		.from(tasks)
		.where(and(eq(tasks.userId, userId), eq(tasks.projectId, projectId)))
		.orderBy(desc(tasks.createdAt));
}
