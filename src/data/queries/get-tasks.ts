import { db } from "../db/client";
import { desc, eq, and } from "drizzle-orm";
import { tasks } from "../db/schema";

export async function getTasks(userId: string, projectId: string) {
	return await db
		.select({
			id: tasks.id,
			name: tasks.name,
			status: tasks.status,
			userId: tasks.userId,
			projectId: tasks.projectId,
			createdAt: tasks.createdAt,
			updatedAt: tasks.updatedAt,
		})
		.from(tasks)
		.where(and(eq(tasks.userId, userId), eq(tasks.projectId, projectId)))
		.orderBy(desc(tasks.createdAt));
}
