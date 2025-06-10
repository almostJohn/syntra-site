"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/data/db/prisma";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { serverActionCallback, type ActionResponse } from "@/lib/serverAction";

export async function markAsRead(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		await prisma.notification.updateMany({
			where: {
				user_id: currentUser.id,
				is_read: false,
			},
			data: {
				is_read: true,
			},
		});

		revalidatePath("/dashboard");

		return {
			successMessage: "Successfully marked notifications as read.",
		};
	});
}
