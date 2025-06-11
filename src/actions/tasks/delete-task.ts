"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/data/db/prisma";
import { serverActionCallback, type ActionResponse } from "@/lib/serverAction";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export async function deleteTask(taskId: string): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const deletedTask = await prisma.task.delete({
			where: {
				id: taskId,
				user_id: currentUser.id,
			},
		});

		await prisma.notification.create({
			data: {
				user_id: currentUser.id,
				message: `Task "${deletedTask.title || "Untitled"}" deleted.`,
				type: "DELETE_TASK",
				is_read: false,
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/tasks");

		return {
			successMessage: "Task deleted successfully.",
		};
	});
}
