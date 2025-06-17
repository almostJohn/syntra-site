"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/data/db/prisma";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth";

export async function markTaskAsIncomplete(
	taskId: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		await prisma.task.update({
			where: {
				id: taskId,
				user_id: currentUser.id,
			},
			data: {
				status: "INCOMPLETE",
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/tasks");

		return {
			successMessage: "Successfully marked task as incomplete.",
		};
	});
}

export async function markTaskAsInProgress(
	taskId: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		await prisma.task.update({
			where: {
				id: taskId,
				user_id: currentUser.id,
			},
			data: {
				status: "IN_PROGRESS",
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/tasks");

		return {
			successMessage: "Successfully marked task as in progress.",
		};
	});
}

export async function markTaskAsComplete(
	taskId: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		await prisma.task.update({
			where: {
				id: taskId,
				user_id: currentUser.id,
			},
			data: {
				status: "COMPLETE",
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/tasks");

		return {
			successMessage: "Successfully marked task as complete.",
		};
	});
}
