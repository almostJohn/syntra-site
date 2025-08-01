"use server";

import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getFormValue } from "@/lib/get-form-value";
import { db } from "@/data/db/client";
import { users } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
} from "@/lib/constants";
import { hashString } from "@/lib/hash-string";

export async function resetPassword(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const username = getFormValue(formData, "username");
		const newPassword = getFormValue(formData, "newPassword");
		const confirmNewPassword = getFormValue(formData, "confirmNewPassword");

		if (!username || !newPassword || !confirmNewPassword) {
			return {
				errorMessage: "All fields are required.",
				errors: {
					username: "Username is a required field.",
					newPassword: "New password is a required field.",
					confirmNewPassword: "Confirm new password is a required field.",
				},
			};
		}

		if (
			username.length < USERNAME_MIN_LENGTH ||
			username.length > USERNAME_MAX_LENGTH
		) {
			return {
				errorMessage: "Incorrect username.",
				errors: {
					username: "Incorrect username.",
				},
				values: {
					username,
				},
			};
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

		if (
			newPassword.length < PASSWORD_MIN_LENGTH ||
			confirmNewPassword.length < PASSWORD_MIN_LENGTH
		) {
			return {
				errorMessage: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
				errors: {
					newPassword: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
					confirmNewPassword: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
				},
				values: {
					username,
				},
			};
		}

		if (
			newPassword.length > PASSWORD_MAX_LENGTH ||
			confirmNewPassword.length > PASSWORD_MAX_LENGTH
		) {
			return {
				errorMessage: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
				errors: {
					newPassword: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
					confirmNewPassword: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
				},
				values: {
					username,
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
				values: {
					username,
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
				values: {
					username,
				},
			};
		}

		const [user] = await db
			.select({ username: users.username })
			.from(users)
			.where(eq(users.username, username))
			.limit(1);

		if (!user) {
			return {
				errorMessage: `No account found for "${username}".`,
				errors: {
					username: `No account found for "${username}".`,
				},
				values: {
					username,
				},
			};
		}

		const hashedNewPassword = await hashString(newPassword, 12);

		await db
			.update(users)
			.set({
				password: hashedNewPassword,
				updatedAt: new Date(),
			})
			.where(eq(users.username, user.username));

		return {
			successMessage: "Password reset successfully.",
		};
	});
}
