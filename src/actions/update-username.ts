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

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 32;

export async function updateUsername(
	_: ActionState,
	newUsername: string,
): Promise<ActionState> {
	const { data: currentUser } = await auth.getCurrentUser();

	if (!currentUser) {
		return {
			message: "You must be logged in to update your username.",
			type: MessageType.Error,
		};
	}

	newUsername = newUsername.trim();

	if (
		newUsername.length < USERNAME_MIN_LENGTH ||
		newUsername.length > USERNAME_MAX_LENGTH
	) {
		return {
			message: `Username must be between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters long.`,
			type: MessageType.Error,
		};
	}

	try {
		const { data: response } = await request.get({
			fn: async () => {
				const [user] = await db
					.select({ username: usersTable.username })
					.from(usersTable)
					.where(eq(usersTable.username, newUsername))
					.limit(1);
				return { exists: !!user };
			},
		});

		if (response!.exists) {
			return {
				message: "Username is already taken. Please choose another one.",
				type: MessageType.Error,
			};
		}

		await request.post({
			body: { username: newUsername },
			fn: async ({ body }) => {
				await db
					.update(usersTable)
					.set({ username: body!.username, updatedAt: new Date() })
					.where(eq(usersTable.id, currentUser.id));

				await db.insert(notificationsTable).values({
					id: randomUUID(),
					userId: currentUser.id,
					description: "Your username has been updated successfully.",
					isRead: false,
				});
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/settings");

		return {
			message: "Username updated successfully.",
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
