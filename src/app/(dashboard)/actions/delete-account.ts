"use server";

import { db } from "@/data/db/client";
import { users } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { deleteCookie } from "@/lib/auth/cookies";

export async function deleteAccount(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		await db.delete(users).where(eq(users.id, user.id));

		await deleteCookie();

		return {
			successMessage: "Logout successful.",
		};
	});
}
