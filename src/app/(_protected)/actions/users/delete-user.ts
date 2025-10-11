"use server";

import { serverActionCallback, type ActionResponse } from "@/lib/action";
import { db } from "@/db/sql";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { users } from "@/db/schema";

export async function deleteUser(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await auth.getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		await db.delete(users).where(eq(users.id, user.id));
		await auth.signOut();

		return {
			successMessage: "User account was successfully deleted. Logging out...",
		};
	});
}
