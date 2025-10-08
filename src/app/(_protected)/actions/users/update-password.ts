"use server";

import { notifications, users } from "@/db/schema";
import { db } from "@/db/sql";
import {
	serverActionCallback,
	type ActionResponse,
	type Values,
} from "@/lib/action";
import { auth } from "@/lib/auth";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { compareString, generateUUID, hashString } from "@/lib/crypto";
import { createNotificationMessage, getFormString } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type PasswordErrors = {
	oldPassword?: string;
	newPassword?: string;
	confirmNewPassword?: string;
};

export async function updatePassword(
	_prevState: ActionResponse<PasswordErrors, Values>,
	formData: FormData,
): Promise<ActionResponse<PasswordErrors, Values>> {
	return serverActionCallback(
		async (): Promise<ActionResponse<PasswordErrors, Values>> => {
			const user = await auth.getCurrentUser();

			if (!user) {
				return {
					errorMessage: "You must be logged in to perform this action.",
				};
			}

			const oldPassword = getFormString(formData, "oldPassword");
			const newPassword = getFormString(formData, "newPassword");
			const confirmNewPassword = getFormString(formData, "confirmNewPassword");

			if (!oldPassword || !newPassword || !confirmNewPassword) {
				return {
					errorMessage: "All fields are required.",
					errors: {
						oldPassword: "Old password is a required field.",
						newPassword: "New password is a required field.",
						confirmNewPassword: "Confirm new password is a required field.",
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
						oldPassword:
							"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
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
						oldPassword:
							"New password must be different from the old password.",
						newPassword:
							"New password must be different from the old password.",
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
				.select()
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
				await db.insert(notifications).values({
					userId: user.id,
					id: generateUUID(),
					content: createNotificationMessage("updated", "password"),
				});
			}

			revalidatePath("/app");
			revalidatePath("/app/settings");

			return {
				successMessage: "Password updated successfully.",
			};
		},
	);
}
