"use server";

import { auth } from "@/lib/auth";
import { request } from "@/lib/request";
import { db } from "@/db/sql";
import { users as usersTable } from "@/db/schema";
import { MessageType, type ActionState } from "@/types";
import { eq } from "drizzle-orm";

export async function deleteAccount(): Promise<ActionState> {
	const { data: currentUser } = await auth.getCurrentUser();

	if (!currentUser) {
		return {
			message: "You must be logged in to delete your account.",
			type: MessageType.Error,
		};
	}

	try {
		await request.post({
			body: { userId: currentUser.id },
			fn: async ({ body }) => {
				await db.delete(usersTable).where(eq(usersTable.id, body!.userId));
			},
		});

		await auth.logout();

		return {
			type: MessageType.Success,
			message: "Your account has been deleted successfully.",
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Something went wrong.";
		return {
			type: MessageType.Error,
			message,
		};
	}
}
