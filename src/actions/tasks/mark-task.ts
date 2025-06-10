"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/data/db/prisma";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { serverActionCallback, type ActionResponse } from "@/lib/serverAction";

export async function markTask(
	taskId: string,
	complete: boolean,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const updatedTask = await prisma.task.update({
			where: {
				id: taskId,
				user_id: currentUser.id,
			},
			data: {
				is_completed: complete,
			},
		});

		await prisma.notification.create({
			data: {
				user_id: currentUser.id,
				task_id: updatedTask.id,
				message: `Task "${updatedTask.title || "Untitled"}" marked as ${complete ? "complete" : "incomplete"}.`,
				type: "INFO",
				is_read: false,
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/tasks");

		return {
			successMessage: "Your task has been updated.",
		};
	});
}
