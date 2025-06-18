"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/data/db/prisma";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth";

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
				type: "DELETE_TASK",
				message: `Task "${deletedTask.title || "Untitled"}" deleted.`,
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/tasks");

		return {
			successMessage: "Task deleted successfully.",
		};
	});
}
