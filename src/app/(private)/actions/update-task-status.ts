"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { eq, and } from "drizzle-orm";
import { projects, auditLogs, tasks, notifications } from "@/data/db/schema";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth";

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
				errorMessage: "No project found.",
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
			await db.insert(auditLogs).values({
				id: crypto.randomUUID(),
				title: "Task Updated",
				description: `Task "${updatedTask.name}" (${updatedTask.id}) was updated within the project "${project.name}" (${project.id})`,
				userId: user.id,
			});

			await db.insert(notifications).values({
				id: crypto.randomUUID(),
				description: `Task "${updatedTask.name}" (${updatedTask.id}) was updated within the project "${project.name}" (${project.id})`,
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
