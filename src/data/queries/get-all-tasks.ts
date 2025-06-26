import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { tasks } from "../db/schema";

export async function getAllTasks(userId: string) {
	return await db
		.select({
			id: tasks.id,
			title: tasks.title,
			description: tasks.description,
			status: tasks.status,
			createdAt: tasks.createdAt,
			userId: tasks.userId,
		})
		.from(tasks)
		.where(eq(tasks.userId, userId))
		.orderBy(desc(tasks.createdAt));
}
