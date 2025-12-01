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
import { desc, eq } from "drizzle-orm";
import { hashText, compareHash } from "@/lib/utils";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
const PASSWORD_HISTORY_COUNT = 5;
const PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export async function updatePassword(
	_: ActionState,
	form: FormData,
): Promise<ActionState> {
	const { data: currentUser } = await auth.getCurrentUser();

	if (!currentUser) {
		return {
			message: "You must be logged in to update your password.",
			type: MessageType.Error,
		};
	}

	const currentPassword = form.get("currentPassword") as string;
	const newPassword = form.get("newPassword") as string;
	const confirmNewPassword = form.get("confirmNewPassword") as string;

	if (!currentPassword || !newPassword || !confirmNewPassword) {
		return {
			message: "All password fields are required.",
			type: MessageType.Error,
		};
	}

	if (newPassword !== confirmNewPassword) {
		return {
			message: "New password and confirmation do not match.",
			type: MessageType.Error,
		};
	}

	if (
		newPassword.length < PASSWORD_MIN_LENGTH ||
		newPassword.length > PASSWORD_MAX_LENGTH
	) {
		return {
			message: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters long.`,
			type: MessageType.Error,
		};
	}

	if (!PASSWORD_REGEX.test(newPassword)) {
		return {
			message:
				"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
			type: MessageType.Error,
		};
	}

	try {
		const { data: response } = await request.get({
			fn: async () => {
				const [user] = await db
					.select({ password: usersTable.password })
					.from(usersTable)
					.where(eq(usersTable.id, currentUser.id))
					.limit(1);
				return { user };
			},
		});

		if (response!.user.password) {
			const isCurrentPasswordValid = await compareHash(
				currentPassword,
				response!.user.password,
			);

			if (!isCurrentPasswordValid) {
				return {
					message: "Current password is incorrect.",
					type: MessageType.Error,
				};
			}
		}

		const { data: passwordHistory } = await request.get({
			fn: async () => {
				const passwords = await db
					.select({ password: usersTable.password })
					.from(usersTable)
					.where(eq(usersTable.id, currentUser.id))
					.orderBy(desc(usersTable.updatedAt))
					.limit(PASSWORD_HISTORY_COUNT);
				return { passwords };
			},
		});

		for (const record of passwordHistory!.passwords) {
			const isPasswordUsedBefore = await compareHash(
				newPassword,
				record.password,
			);
			if (isPasswordUsedBefore) {
				return {
					message: "You cannot reuse any of your last 5 passwords.",
					type: MessageType.Error,
				};
			}
		}

		const hashedNewPassword = await hashText(newPassword, 12);

		await request.post({
			body: { password: hashedNewPassword },
			fn: async ({ body }) => {
				await db
					.update(usersTable)
					.set({ password: body!.password, updatedAt: new Date() })
					.where(eq(usersTable.id, currentUser.id));

				await db.insert(notificationsTable).values({
					id: randomUUID(),
					userId: currentUser.id,
					description: "Your password has been updated successfully.",
					isRead: false,
				});
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/settings");

		return {
			message: "Password updated successfully.",
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
