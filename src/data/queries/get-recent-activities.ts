import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { notifications, tasks, projects } from "../db/schema";

type ProjectActivity = {
	id: string;
	type: "CREATE_PROJECT" | "UPDATE_PROJECT" | "DELETE_PROJECT";
	description: string;
	createdAt: Date;
	projectName: string | null;
};

type TaskActivity = {
	id: string;
	type: "CREATE_TASK" | "UPDATE_TASK" | "DELETE_TASK";
	description: string;
	createdAt: Date;
	taskContent: string | null;
};

type Activity = ProjectActivity | TaskActivity;

export async function getRecentActivities(
	userId: string,
	limit: number,
): Promise<Activity[]> {
	const rawActivities = await db
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

	return rawActivities.map((activity): Activity => {
		if (
			activity.type.startsWith("CREATE_TASK") ||
			activity.type.startsWith("UPDATE_TASK") ||
			activity.type.startsWith("DELETE_TASK")
		) {
			return {
				id: activity.id,
				type: activity.type as TaskActivity["type"],
				description: activity.description,
				createdAt: activity.createdAt,
				taskContent: activity.taskContent ?? null,
			};
		}

		return {
			id: activity.id,
			type: activity.type as ProjectActivity["type"],
			description: activity.description,
			createdAt: activity.createdAt,
			projectName: activity.projectName ?? null,
		};
	});
}
