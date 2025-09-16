"use server";

import { db } from "@/db/sql";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateTag, getFormValue } from "@/lib/utils";
import { generateUUID, hashString } from "@/lib/crypto";
import {
	DISPLAY_NAME_MAX_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/lib/constants";
import { serverActionCallback, type ActionResponse } from "@/lib/action";

export async function registerUser(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const displayName = getFormValue(formData, "displayName");
		const username = getFormValue(formData, "username");
		const password = getFormValue(formData, "password");
		const confirmPassword = getFormValue(formData, "confirmPassword");

		if (!displayName || !username || !password || !confirmPassword) {
			return {
				errorMessage: "All fields are required.",
				errors: {
					displayName: "Display name is a required field.",
					username: "Username is a required field.",
					password: "Password is a required field.",
					confirmPassword: "Confirm password is a required field.",
				},
			};
		}

		if (displayName.length < DISPLAY_NAME_MIN_LENGTH) {
			return {
				errorMessage: `Display name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters.`,
				errors: {
					displayName: `Display name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters.`,
				},
				values: {
					username,
				},
			};
		}

		if (displayName.length > DISPLAY_NAME_MAX_LENGTH) {
			return {
				errorMessage: `Display name must not exceed ${DISPLAY_NAME_MAX_LENGTH} characters.`,
				errors: {
					displayName: `Display name must not exceed ${DISPLAY_NAME_MAX_LENGTH} characters.`,
				},
				values: {
					username,
				},
			};
		}

		if (username.length < USERNAME_MIN_LENGTH) {
			return {
				errorMessage: `Username must be at least ${USERNAME_MIN_LENGTH} characters.`,
				errors: {
					username: `Username must be at least ${USERNAME_MIN_LENGTH} characters.`,
				},
				values: {
					displayName,
				},
			};
		}

		if (username.length > USERNAME_MAX_LENGTH) {
			return {
				errorMessage: `Username must not exceed ${USERNAME_MAX_LENGTH} characters.`,
				errors: {
					username: `Username must not exceed ${USERNAME_MAX_LENGTH} characters.`,
				},
				values: {
					displayName,
				},
			};
		}

		if (
			password.length < PASSWORD_MIN_LENGTH ||
			confirmPassword.length < PASSWORD_MIN_LENGTH
		) {
			return {
				errorMessage: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
				errors: {
					password: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
					confirmPassword: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
				},
				values: {
					displayName,
					username,
				},
			};
		}

		if (
			password.length > PASSWORD_MAX_LENGTH ||
			confirmPassword.length > PASSWORD_MAX_LENGTH
		) {
			return {
				errorMessage: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
				errors: {
					password: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
					confirmPassword: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
				},
				values: {
					displayName,
					username,
				},
			};
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
		if (!passwordRegex.test(password)) {
			return {
				errorMessage:
					"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
				errors: {
					password:
						"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
					confirmPassword:
						"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
				},
				values: {
					displayName,
					username,
				},
			};
		}

		if (password !== confirmPassword) {
			return {
				errorMessage: "Passwords do not match",
				errors: {
					password: "Passwords do not match.",
					confirmPassword: "Passwords do not match.",
				},
				values: {
					displayName,
					username,
				},
			};
		}

		const [existingUser] = await db
			.select()
			.from(users)
			.where(eq(users.username, username))
			.limit(1);

		if (existingUser) {
			return {
				errorMessage: "Username is already taken.",
				errors: {
					username: "Username is already taken.",
				},
				values: {
					displayName,
					username,
				},
			};
		}

		const hashedPassword = await hashString(password, 12);

		await db.insert(users).values({
			id: generateUUID(),
			username,
			userTag: generateTag(),
			displayName,
			password: hashedPassword,
		});

		return {
			successMessage: "Sign up successful.",
		};
	});
}
