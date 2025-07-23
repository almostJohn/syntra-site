"use server";

import { revalidatePath } from "next/cache";
import crypto from "node:crypto";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { db } from "@/data/db/client";
import { users, auditLogs, notifications } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { getFormValue } from "@/lib/get-form-value";
import { compareString } from "@/lib/compare-string";
import { hashString } from "@/lib/hash-string";

export async function updatePassword(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		const oldPassword = getFormValue(formData, "oldPassword");
		const newPassword = getFormValue(formData, "newPassword");
		const confirmNewPassword = getFormValue(formData, "confirmNewPassword");

		if (!oldPassword || !newPassword || !confirmNewPassword) {
			return {
				errorMessage: "All fields are required.",
			};
		}

		if (
			oldPassword.length < PASSWORD_MIN_LENGTH ||
			newPassword.length < PASSWORD_MIN_LENGTH ||
			confirmNewPassword.length < PASSWORD_MIN_LENGTH
		) {
			return {
				errorMessage: `Password too short (min ${PASSWORD_MIN_LENGTH} chars).`,
			};
		}

		if (oldPassword === newPassword) {
			return {
				errorMessage: "New password must be different from the old password.",
			};
		}

		if (newPassword !== confirmNewPassword) {
			return {
				errorMessage: "Passwords do not match.",
			};
		}

		const [existingUser] = await db
			.select({
				password: users.password,
			})
			.from(users)
			.where(eq(users.id, user.id))
			.limit(1);

		const isOldPasswordMatch = await compareString(
			oldPassword,
			existingUser.password,
		);

		if (!isOldPasswordMatch) {
			return {
				errorMessage: "Old password does not match.",
			};
		}

		const newHashedPassword = await hashString(newPassword, 12);

		const [updatedUser] = await db
			.update(users)
			.set({ password: newHashedPassword, updatedAt: new Date() })
			.where(eq(users.id, user.id))
			.returning();

		if (updatedUser) {
			await db.insert(auditLogs).values({
				id: crypto.randomUUID(),
				title: "User Updated",
				description: `User account "${updatedUser.username}" (${updatedUser.id}) was updated.`,
				userId: user.id,
			});

			await db.insert(notifications).values({
				id: crypto.randomUUID(),
				description: `User account "${updatedUser.username}" (${updatedUser.id}) was updated.`,
				userId: user.id,
			});
		}

		revalidatePath("/app");
		revalidatePath("/app/settings");

		return {
			successMessage: "User account was successfully updated.",
		};
	});
}
