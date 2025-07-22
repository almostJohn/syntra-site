"use server";

import crypto from "node:crypto";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getFormValue } from "@/lib/get-form-value";
import { db } from "@/data/db/client";
import { eq } from "drizzle-orm";
import { users } from "@/data/db/schema";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	DISPLAY_NAME_MAX_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/lib/constants";
import { hashString } from "@/lib/hash-string";
import { generateUserTag } from "@/lib/generate-user-tag";

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
					displayName: "Display name is a required field.",
					username: "Username is a required field.",
					password: "Password is a required field.",
					confirmPassword: "Confirm password is a required field.",
				},
			};
		}

		if (displayName.length < DISPLAY_NAME_MIN_LENGTH) {
			return {
				errorMessage: `Display name too short (min ${DISPLAY_NAME_MIN_LENGTH} chars).`,
				errors: {
					displayName: `Display name too short (min ${DISPLAY_NAME_MIN_LENGTH} chars).`,
				},
				values: {
					displayName,
					username,
				},
			};
		}

		if (displayName.length > DISPLAY_NAME_MAX_LENGTH) {
			return {
				errorMessage: `Display name too long (max ${DISPLAY_NAME_MAX_LENGTH} chars).`,
				errors: {
					displayName: `Display name too long (max ${DISPLAY_NAME_MAX_LENGTH} chars).`,
				},
				values: {
					displayName,
					username,
				},
			};
		}

		if (username.length < USERNAME_MIN_LENGTH) {
			return {
				errorMessage: `Username too short (min ${USERNAME_MIN_LENGTH} chars).`,
				errors: {
					username: `Username too short (min ${USERNAME_MIN_LENGTH} chars).`,
				},
				values: {
					displayName,
					username,
				},
			};
		}

		if (username.length > USERNAME_MAX_LENGTH) {
			return {
				errorMessage: `Username too long (max ${USERNAME_MAX_LENGTH} chars).`,
				errors: {
					username: `Username too long (max ${USERNAME_MAX_LENGTH} chars).`,
				},
				values: {
					displayName,
					username,
				},
			};
		}

		if (
			password.length < PASSWORD_MIN_LENGTH ||
			confirmPassword.length < PASSWORD_MIN_LENGTH
		) {
			return {
				errorMessage: `Password too short (min ${PASSWORD_MIN_LENGTH} chars).`,
				errors: {
					password: `Password too short (min ${PASSWORD_MIN_LENGTH} chars).`,
					confirmPassword: `Password too short (min ${PASSWORD_MIN_LENGTH} chars).`,
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
					password: "Password and confirm password do not match.",
					confirmPassword: "Password and confirm password do not match.",
				},
				values: {
					displayName,
					username,
				},
			};
		}

		const [existingUser] = await db
			.select({ username: users.username, password: users.password })
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
			id: crypto.randomUUID(),
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
