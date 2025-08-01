"use server";

import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { db } from "@/data/db/client";
import { projects, tasks, auditLogs, notifications } from "@/data/db/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { generateId } from "@/lib/generate-id";

export async function updateTaskStatus(
	projectId: string,
	taskId: string,
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE",
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		const [project] = await db
			.select({
				id: projects.id,
				name: projects.name,
			})
			.from(projects)
			.where(and(eq(projects.id, projectId), eq(projects.userId, user.id)))
			.limit(1);

		if (!project) {
			return {
				errorMessage: "Project not found.",
			};
		}

		const [updatedTask] = await db
			.update(tasks)
			.set({
				status,
				updatedAt: new Date(),
			})
			.where(
				and(
					eq(tasks.id, taskId),
					eq(tasks.projectId, project.id),
					eq(tasks.userId, user.id),
				),
			)
			.returning();

		if (updatedTask) {
			const statusLabel = {
				INCOMPLETE: "Incomplete",
				IN_PROGRESS: "In Progress",
				COMPLETE: "Complete",
			};

			await db.insert(auditLogs).values({
				id: generateId(),
				title: "Task Updated",
				description: `Task "${updatedTask.name}" (${
					updatedTask.id
				}) has its status updated to "${
					statusLabel[updatedTask.status as keyof typeof statusLabel]
				}"`,
				userId: user.id,
			});

			await db.insert(notifications).values({
				id: generateId(),
				description: `Task "${updatedTask.name}" (${
					updatedTask.id
				}) has its status updated to "${
					statusLabel[updatedTask.status as keyof typeof statusLabel]
				}"`,
				userId: user.id,
			});
		}

		revalidatePath("/app");
		revalidatePath("/app/projects");
		revalidatePath(`/app/projects/${project.id}`);

		return {
			successMessage: "Task was successfully updated.",
		};
	});
}
