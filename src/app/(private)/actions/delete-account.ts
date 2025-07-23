"use server";

import { db } from "@/data/db/client";
import { users } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth";
import { deleteCookie } from "@/lib/auth";

export async function deleteAccount(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		await db.delete(users).where(eq(users.id, user.id));
		await deleteCookie();

		return {
			successMessage: "Logout successful.",
		};
	});
}
