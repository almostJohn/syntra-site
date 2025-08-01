"use server";

import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { db } from "@/data/db/client";
import { users } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { getFormValue } from "@/lib/get-form-value";
import { hashString } from "@/lib/hash-string";
import { generateId } from "@/lib/generate-id";
import { generateUserTag } from "@/lib/generate-user-tag";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	DISPLAY_NAME_MAX_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
	PASSWORD_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
} from "@/lib/constants";

export async function register(
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
					username: "Username is a required field.",
					displayName: "Display name is a required field.",
					password: "Password is a required field.",
					confirmPassword: "Confirm password is a required field.",
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
					username,
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
					username,
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
					displayName,
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
					displayName,
					username,
				},
			};
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

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
				errorMessage: "Passwords do not match.",
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
			.select({ username: users.username })
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
			id: generateId(),
			username,
			userTag: generateUserTag(),
			displayName,
			password: hashedPassword,
		});

		return {
			successMessage: "Registration successful.",
		};
	});
}
