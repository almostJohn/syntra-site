"use server";

import { revalidatePath } from "next/cache";
import crypto from "node:crypto";
import { db } from "@/data/db/client";
import { tasks, notifications, projects } from "@/data/db/schema";
import { and, eq } from "drizzle-orm";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth/sessions";

export async function updateTaskStatus(
	taskId: string,
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE",
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const [project] = await db
			.select({
				id: projects.id,
				name: projects.name,
			})
			.from(projects)
			.where(eq(projects.userId, user.id))
			.limit(1);

		if (!project) {
			return {
				errorMessage: "Forbidden access.",
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

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			taskId: updatedTask.id,
			type: "UPDATE_TASK",
			description: `Task "${updatedTask.id}" status has been updated to "${updatedTask.status}".`,
		});

		revalidatePath("/dashboard");
		revalidatePath(`/dashboard/projects/${project.id}`);

		return {
			successMessage: `Task "${updatedTask.id}" was successfully updated.`,
		};
	});
}
