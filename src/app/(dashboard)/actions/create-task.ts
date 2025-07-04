"use server";

import { revalidatePath } from "next/cache";
import crypto from "node:crypto";
import { db } from "@/data/db/client";
import { tasks, notifications, projects } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getFormValue } from "@/lib/get-form-value";
import {
	TASK_CONTENT_MAX_LENGTH,
	TASK_CONTENT_MIN_LENGTH,
} from "@/lib/constants";

export async function createTask(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const taskContent = getFormValue(formData, "task_content");

		if (!taskContent) {
			return {
				errorMessage: "Task content is a required field.",
				errors: {
					taskContent: "Task content is a required field.",
				},
			};
		}

		if (taskContent.length < TASK_CONTENT_MIN_LENGTH) {
			return {
				errorMessage: `Task content must be at least ${TASK_CONTENT_MIN_LENGTH} characters long.`,
				errors: {
					taskContent: `Task content must be at least ${TASK_CONTENT_MIN_LENGTH} characters long.`,
				},
			};
		}

		if (taskContent.length > TASK_CONTENT_MAX_LENGTH) {
			return {
				errorMessage: `Task content exceeds the maximum allowed length of ${TASK_CONTENT_MAX_LENGTH} characters.`,
				errors: {
					taskContent: `Task content exceeds the maximum allowed length of ${TASK_CONTENT_MAX_LENGTH} characters.`,
				},
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

		const [newTask] = await db
			.insert(tasks)
			.values({
				id: crypto.randomUUID(),
				content: taskContent,
				status: "INCOMPLETE",
				userId: user.id,
				projectId: project.id,
			})
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			taskId: newTask.id,
			type: "CREATE_TASK",
			description: `New task "${newTask.id}" has been created within "${project.name}"`,
		});

		revalidatePath("/dashboard");
		revalidatePath(`/dashboard/projects/${project.id}`);

		return {
			successMessage: `New task "${newTask.id}" was successfully created.`,
		};
	});
}
