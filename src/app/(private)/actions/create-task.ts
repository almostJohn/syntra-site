"use server";

import { revalidatePath } from "next/cache";
import crypto from "node:crypto";
import { db } from "@/data/db/client";
import { tasks, auditLogs, notifications, projects } from "@/data/db/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getFormValue } from "@/lib/get-form-value";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/lib/constants";

export async function createTask(
	_prevState: ActionResponse,
	formData: FormData,
	projectId: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		const taskName = getFormValue(formData, "taskName");

		if (!taskName) {
			return {
				errorMessage: "Task name is required.",
			};
		}

		if (taskName.length < NAME_MIN_LENGTH) {
			return {
				errorMessage: `Task name too short (min ${NAME_MIN_LENGTH} chars).`,
			};
		}

		if (taskName.length > NAME_MAX_LENGTH) {
			return {
				errorMessage: `Task name too long (max ${NAME_MAX_LENGTH} chars).`,
			};
		}

		const [project] = await db
			.select({ id: projects.id, name: projects.name })
			.from(projects)
			.where(and(eq(projects.id, projectId), eq(projects.userId, user.id)))
			.limit(1);

		if (!project) {
			return {
				errorMessage: "No project found.",
			};
		}

		const [newTask] = await db
			.insert(tasks)
			.values({
				id: crypto.randomUUID(),
				name: taskName,
				status: "INCOMPLETE",
				projectId: project.id,
				userId: user.id,
			})
			.returning();

		if (newTask) {
			await db.insert(auditLogs).values({
				id: crypto.randomUUID(),
				title: "Task Created",
				description: `Task "${newTask.name}" (${newTask.id}) was created within the project "${project.name}" (${project.id}).`,
				userId: user.id,
			});

			await db.insert(notifications).values({
				id: crypto.randomUUID(),
				description: `Task "${newTask.name}" (${newTask.id}) was created within the project "${project.name}" (${project.id})`,
				userId: user.id,
			});
		}

		revalidatePath("/app");
		revalidatePath(`/app/projects/${project.id}`);

		return {
			successMessage: "Task was successfully created.",
		};
	});
}
