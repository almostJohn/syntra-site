"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { and, eq } from "drizzle-orm";
import { tasks, notifications } from "@/data/db/schema";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";

export async function deleteTask(taskId: string): Promise<ActionResponse> {
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

		const [deletedTask] = await db
			.delete(tasks)
			.where(and(eq(tasks.id, taskId), eq(tasks.userId, user.id)))
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			type: "DELETE_TASK",
			description: `Task "${deletedTask.title || "Untitled"}" deleted.`,
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/tasks");

		return {
			success: {
				statusCode: 200,
				message: "Task deleted successfully.",
			},
		};
	});
}
