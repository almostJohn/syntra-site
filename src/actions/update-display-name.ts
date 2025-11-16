"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/sql";
import {
	users as usersTable,
	notifications as notificationsTable,
} from "@/db/schema";
import { request } from "@/lib/request";
import { auth } from "@/lib/auth";
import { type ActionState, MessageType } from "@/types";
import { randomUUID } from "@/lib/utils";
import { eq } from "drizzle-orm";

const DISPLAY_NAME_MIN_LENGTH = 3;
const DISPLAY_NAME_MAX_LENGTH = 48;

export async function updateDisplayName(
	_: ActionState,
	newDisplayName: string,
): Promise<ActionState> {
	const { data: currentUser } = await auth.getCurrentUser();

	if (!currentUser) {
		return {
			message: "You must be logged in to update your display name.",
			type: MessageType.Error,
		};
	}

	newDisplayName = newDisplayName.trim();

	if (
		newDisplayName.length < DISPLAY_NAME_MIN_LENGTH ||
		newDisplayName.length > DISPLAY_NAME_MAX_LENGTH
	) {
		return {
			message: `Display name must be between ${DISPLAY_NAME_MIN_LENGTH} and ${DISPLAY_NAME_MAX_LENGTH} characters long.`,
			type: MessageType.Error,
		};
	}

	try {
		await request.post({
			body: { displayName: newDisplayName },
			fn: async ({ body }) => {
				await db
					.update(usersTable)
					.set({ displayName: body!.displayName, updatedAt: new Date() })
					.where(eq(usersTable.id, currentUser.id));

				await db.insert(notificationsTable).values({
					id: randomUUID(),
					userId: currentUser.id,
					description: "Your display name has been updated successfully.",
					isRead: false,
				});
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/settings");

		return {
			message: "Display name updated successfully.",
			type: MessageType.Success,
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Something went wrong.";
		return {
			message,
			type: MessageType.Error,
		};
	}
}
