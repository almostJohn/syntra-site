"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { notifications } from "@/data/db/schema";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { eq, and } from "drizzle-orm";

export async function markAsArchived(): Promise<ActionResponse> {
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

		await db
			.update(notifications)
			.set({ isArchived: true })
			.where(
				and(
					eq(notifications.userId, user.id),
					eq(notifications.isArchived, false),
				),
			);

		revalidatePath("/dashboard");

		return {
			success: {
				statusCode: 200,
				message: "Notifications archived successfully.",
			},
		};
	});
}
