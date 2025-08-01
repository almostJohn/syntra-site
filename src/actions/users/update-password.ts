"use server";

import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { db } from "@/data/db/client";
import { users, auditLogs, notifications } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { getFormValue } from "@/lib/get-form-value";
import { generateId } from "@/lib/generate-id";
import { compareString } from "@/lib/compare-string";
import { hashString } from "@/lib/hash-string";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";

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
				errors: {
					oldPassword: "Old password is required.",
					newPassword: "New password is required.",
					confirmNewPassword: "Confirm new password is required.",
				},
			};
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

		if (
			oldPassword.length < PASSWORD_MIN_LENGTH ||
			newPassword.length < PASSWORD_MIN_LENGTH ||
			confirmNewPassword.length < PASSWORD_MIN_LENGTH
		) {
			return {
				errorMessage: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
				errors: {
					oldPassword: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
					newPassword: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
					confirmNewPassword: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
				},
			};
		}

		if (
			oldPassword.length > PASSWORD_MAX_LENGTH ||
			newPassword.length > PASSWORD_MAX_LENGTH ||
			confirmNewPassword.length > PASSWORD_MAX_LENGTH
		) {
			return {
				errorMessage: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
				errors: {
					oldPassword: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
					newPassword: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
					confirmNewPassword: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
				},
			};
		}

		if (!passwordRegex.test(newPassword)) {
			return {
				errorMessage:
					"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
				errors: {
					newPassword:
						"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
					confirmNewPassword:
						"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
				},
			};
		}

		if (oldPassword === newPassword) {
			return {
				errorMessage: "New password must be different from the old password.",
				errors: {
					newPassword: "New password must be different from the old password.",
				},
			};
		}

		if (newPassword !== confirmNewPassword) {
			return {
				errorMessage: "Passwords do not match.",
				errors: {
					newPassword: "Passwords do not match.",
					confirmNewPassword: "Passwords do not match.",
				},
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
				errorMessage: "Old password does not match",
				errors: {
					oldPassword: "Old password does not match.",
				},
			};
		}

		const newHashedPassword = await hashString(newPassword, 12);

		const [updatedUser] = await db
			.update(users)
			.set({
				password: newHashedPassword,
				updatedAt: new Date(),
			})
			.where(eq(users.id, user.id))
			.returning();

		if (updatedUser) {
			await db.insert(auditLogs).values({
				id: generateId(),
				title: "User Updated",
				description: `Updated user password for user account "${updatedUser.username}" (${updatedUser.id})`,
				userId: user.id,
			});

			await db.insert(notifications).values({
				id: generateId(),
				description: `Updated user password for user account "${updatedUser.username}" (${updatedUser.id})`,
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
