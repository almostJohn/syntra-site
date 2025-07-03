"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { and, eq } from "drizzle-orm";
import { tasks, projects, notifications } from "@/data/db/schema";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getFormValue } from "@/lib/get-form-value";
import { CONTENT_MAX_LENGTH, CONTENT_MIN_LENGTH } from "@/lib/constants";
import { truncate } from "@/lib/truncate";

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

		if (taskContent.length < CONTENT_MIN_LENGTH) {
			return {
				errorMessage: `Task content must be at least ${CONTENT_MIN_LENGTH} characters long.`,
				errors: {
					taskContent: `Task content must be at least ${CONTENT_MIN_LENGTH} characters long.`,
				},
				values: {
					task_content: taskContent,
				},
			};
		}

		if (taskContent.length > CONTENT_MAX_LENGTH) {
			return {
				errorMessage: `Task content exceeds the maximum allowed length of ${CONTENT_MAX_LENGTH} characters.`,
				errors: {
					taskContent: `Task content exceeds the maximum allowed length of ${CONTENT_MAX_LENGTH} characters.`,
				},
				values: {
					task_content: taskContent,
				},
			};
		}

		const [existingProject] = await db
			.select({
				id: projects.id,
				name: projects.name,
				userId: projects.userId,
			})
			.from(projects)
			.where(eq(projects.userId, user.id))
			.limit(1);

		if (!existingProject) {
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
				projectId: existingProject.id,
			})
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			taskId: newTask.id,
			type: "CREATE_TASK",
			description: `New task "${newTask.id}" has been created within the "${existingProject.name}"`,
		});

		revalidatePath("/dashboard");
		revalidatePath(`/dashboard/projects/${existingProject.id}`);

		return {
			successMessage: `New task "${newTask.id}" was successfully created.`,
		};
	});
}

export async function markTaskAsIncomplete(
	taskId: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const [existingProject] = await db
			.select({ id: projects.id, name: projects.name, userId: projects.userId })
			.from(projects)
			.where(eq(projects.userId, user.id))
			.limit(1);

		if (!existingProject) {
			return {
				errorMessage: "Forbidded access.",
			};
		}

		const [updatedTask] = await db
			.update(tasks)
			.set({ status: "INCOMPLETE", updatedAt: new Date() })
			.where(
				and(
					eq(tasks.id, taskId),
					eq(tasks.userId, user.id),
					eq(tasks.projectId, existingProject.id),
				),
			)
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			taskId: updatedTask.id,
			type: "UPDATE_TASK",
			description: `Task "${updatedTask.id}" has been updated.`,
		});

		revalidatePath("/dashboard");
		revalidatePath(`/dashboard/projects/${existingProject.id}`);
		revalidatePath("/dashboard/profile");

		return {
			successMessage: `Task "${updatedTask.id}" was successfully updated.`,
		};
	});
}

export async function markTaskAsInProgress(
	taskId: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const [existingProject] = await db
			.select({
				id: projects.id,
				name: projects.name,
				userId: projects.userId,
			})
			.from(projects)
			.where(eq(projects.userId, user.id))
			.limit(1);

		if (!existingProject) {
			return {
				errorMessage: "Forbidden access.",
			};
		}

		const [updatedTask] = await db
			.update(tasks)
			.set({ status: "IN_PROGRESS", updatedAt: new Date() })
			.where(
				and(
					eq(tasks.id, taskId),
					eq(tasks.userId, user.id),
					eq(tasks.projectId, existingProject.id),
				),
			)
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			taskId: updatedTask.id,
			type: "UPDATE_TASK",
			description: `Task "${updatedTask.id}" has been updated.`,
		});

		revalidatePath("/dashboard");
		revalidatePath(`/dashboard/projects/${existingProject.id}`);
		revalidatePath("/dashboard/profile");

		return {
			successMessage: `Task "${updatedTask.id}" was successfully updated.`,
		};
	});
}

export async function markTaskAsComplete(
	taskId: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const [existingProject] = await db
			.select({
				id: projects.id,
				name: projects.name,
				userId: projects.userId,
			})
			.from(projects)
			.where(eq(projects.userId, user.id))
			.limit(1);

		if (!existingProject) {
			return {
				errorMessage: "Forbidden access.",
			};
		}

		const [updatedTask] = await db
			.update(tasks)
			.set({ status: "COMPLETE", updatedAt: new Date() })
			.where(
				and(
					eq(tasks.id, taskId),
					eq(tasks.userId, user.id),
					eq(tasks.projectId, existingProject.id),
				),
			)
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			taskId: updatedTask.id,
			type: "UPDATE_TASK",
			description: `Task "${updatedTask.id}" has been updated.`,
		});

		revalidatePath("/dashboard");
		revalidatePath(`/dashboard/projects/${existingProject.id}`);
		revalidatePath("/dashboard/profile");

		return {
			successMessage: `Task "${updatedTask.id}" was successfully updated.`,
		};
	});
}

export async function deleteTask(taskId: string): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const [existingProject] = await db
			.select({
				id: projects.id,
				name: projects.name,
				userId: projects.userId,
			})
			.from(projects)
			.where(eq(projects.userId, user.id))
			.limit(1);

		if (!existingProject) {
			return {
				errorMessage: "Forbidden access.",
			};
		}

		const [deletedTask] = await db
			.delete(tasks)
			.where(
				and(
					eq(tasks.id, taskId),
					eq(tasks.userId, user.id),
					eq(tasks.projectId, existingProject.id),
				),
			)
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			type: "DELETE_TASK",
			description: `Task "${truncate(
				deletedTask.content,
				32,
			)}" has been deleted within the "${existingProject.name}"`,
		});

		revalidatePath("/dashboard");
		revalidatePath(`/dashboard/projects/${existingProject.id}`);

		return {
			successMessage: `Task "${truncate(
				deletedTask.content,
				32,
			)}" was successfully deleted.`,
		};
	});
}
