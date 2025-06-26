"use server";

import { deleteCookie } from "@/lib/auth/cookies";
import { db } from "@/data/db/client";
import { eq } from "drizzle-orm";
import { users } from "@/data/db/schema";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";

export async function deleteAccount(): Promise<ActionResponse> {
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

		await db.delete(users).where(eq(users.id, user.id));
		await deleteCookie();

		return {
			success: {
				statusCode: 200,
				message: "Logout successful.",
			},
		};
	});
}
