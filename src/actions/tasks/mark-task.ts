"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { and, eq } from "drizzle-orm";
import { tasks, notifications } from "@/data/db/schema";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";

export async function markTaskAsIncomplete(
	taskId: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				error: {
					statusCode: 401,
					message: "Unauthorized access.",
				},
			};
		}

		const [updatedTask] = await db
			.update(tasks)
			.set({ status: "INCOMPLETE" })
			.where(and(eq(tasks.id, taskId), eq(tasks.userId, user.id)))
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			taskId: updatedTask.id,
			type: "UPDATE_TASK",
			description: `Task "${updatedTask.title || "Untitled"}" updated.`,
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/tasks");

		return {
			success: {
				statusCode: 200,
				message: "Successfully marked task as incomplete.",
			},
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
				error: {
					statusCode: 401,
					message: "Unauthorized access.",
				},
			};
		}

		const [updatedTask] = await db
			.update(tasks)
			.set({ status: "IN_PROGRESS" })
			.where(and(eq(tasks.id, taskId), eq(tasks.userId, user.id)))
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			taskId: updatedTask.id,
			type: "UPDATE_TASK",
			description: `Task "${updatedTask.title || "Untitled"}" updated.`,
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/tasks");

		return {
			success: {
				statusCode: 200,
				message: "Successfully marked task as in progress.",
			},
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
				error: {
					statusCode: 401,
					message: "Unauthorized access.",
				},
			};
		}

		const [updatedTask] = await db
			.update(tasks)
			.set({ status: "COMPLETE" })
			.where(and(eq(tasks.id, taskId), eq(tasks.userId, user.id)))
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			taskId: updatedTask.id,
			type: "UPDATE_TASK",
			description: `Task "${updatedTask.title || "Untitled"}" updated.`,
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/tasks");

		return {
			success: {
				statusCode: 200,
				message: "Successfully marked task as complete.",
			},
		};
	});
}
