"use server";

import { revalidatePath } from "next/cache";
import crypto from "node:crypto";
import { db } from "@/data/db/client";
import { and, eq } from "drizzle-orm";
import { projects, tasks, notifications } from "@/data/db/schema";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth/sessions";
import { truncate } from "@/lib/truncate";

export async function deleteTask(taskId: string): Promise<ActionResponse> {
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

		const [deletedTask] = await db
			.delete(tasks)
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
			type: "DELETE_TASK",
			description: `Task "${truncate(
				deletedTask.content,
				16,
			)}" has been deleted within the project "${project.name}"`,
		});

		revalidatePath("/dashboard");
		revalidatePath(`/dashboard/projects/${project.id}`);

		return {
			successMessage: `Task "${truncate(
				deletedTask.content,
				16,
			)}" was successfully deleted.`,
		};
	});
}
