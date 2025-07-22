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
				errorMessage: "Invalid username.",
				errors: {
					username: "Invalid username.",
				},
				values: {
					username,
				},
			};
		}

		if (
			newPassword.length < PASSWORD_MIN_LENGTH ||
			confirmNewPassword.length < PASSWORD_MIN_LENGTH
		) {
			return {
				errorMessage: `Password is too short (min ${PASSWORD_MIN_LENGTH} chars).`,
				errors: {
					newPassword: `Password is too short (min ${PASSWORD_MIN_LENGTH} chars).`,
					confirmNewPassword: `Password is too short (min ${PASSWORD_MIN_LENGTH} chars).`,
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
					newPassword: "New password and confirm new password do not match.",
					confirmNewPassword:
						"New password and confirm new password do not match.",
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
				errorMessage: `No user account found for "${username}".`,
				errors: {
					username: `No user account found for "${username}".`,
				},
				values: {
					username,
				},
			};
		}

		const hashedNewPassword = await hashString(newPassword, 12);

		await db
			.update(users)
			.set({ password: hashedNewPassword, updatedAt: new Date() })
			.where(eq(users.username, username));

		return {
			successMessage: "Password reset successfully.",
		};
	});
}
