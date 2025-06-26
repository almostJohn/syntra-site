import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { tasks } from "../db/schema";

export async function getUserTasksUpdate(userId: string) {
	const rawTasks = await db
		.select({
			id: tasks.id,
			title: tasks.title,
			createdAt: tasks.createdAt,
			updatedAt: tasks.updatedAt,
		})
		.from(tasks)
		.where(eq(tasks.userId, userId))
		.orderBy(desc(tasks.createdAt))
		.limit(5);

	return rawTasks.map((task) => {
		const isNew = task.createdAt.getTime() === task.updatedAt.getTime();
		return {
			id: task.id,
			title: task.title,
			type: isNew
				? "TASK_CREATE"
				: ("TASK_UPDATE" as "TASK_CREATE" | "TASK_UPDATE"),
			createdAt: isNew ? task.createdAt : task.updatedAt,
		};
	});
}
