"use server";

import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/data/db/client";
import { users } from "@/data/db/schema";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getFormValue } from "@/lib/get-form-value";
import {
	PASSWORD_MIN_LENGTH,
	DISPLAY_NAME_MAX_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
} from "@/lib/constants";

export async function registerUser(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const username = getFormValue(formData, "username");
		const displayName = getFormValue(formData, "display_name");
		const password = getFormValue(formData, "password");
		const confirmPassword = getFormValue(formData, "confirm_password");

		if (!username || !displayName || !password || !confirmPassword) {
			return {
				error: {
					statusCode: 400,
					message: "All fields are required.",
				},
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
				error: {
					statusCode: 400,
					message: `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`,
				},
				errors: {
					username: `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`,
				},
				values: {
					display_name: displayName,
				},
			};
		}

		if (username.length > USERNAME_MAX_LENGTH) {
			return {
				error: {
					statusCode: 400,
					message: `Username exceeds the maximum allowed length of ${USERNAME_MAX_LENGTH} characters.`,
				},
				errors: {
					username: `Username exceeds the maximum allowed length of ${USERNAME_MAX_LENGTH} characters.`,
				},
				values: {
					display_name: displayName,
				},
			};
		}

		if (displayName.length < DISPLAY_NAME_MIN_LENGTH) {
			return {
				error: {
					statusCode: 400,
					message: `Display name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters long.`,
				},
				errors: {
					displayName: `Display name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters long.`,
				},
				values: {
					username,
				},
			};
		}

		if (displayName.length > DISPLAY_NAME_MAX_LENGTH) {
			return {
				error: {
					statusCode: 400,
					message: `Display name exceeds the maximum allowed length of ${DISPLAY_NAME_MAX_LENGTH} characters.`,
				},
				errors: {
					displayName: `Display name exceeds the maximum allowed length of ${DISPLAY_NAME_MAX_LENGTH} characters.`,
				},
				values: {
					username,
				},
			};
		}

		if (password.length < PASSWORD_MIN_LENGTH) {
			return {
				error: {
					statusCode: 400,
					message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
				},
				errors: {
					password: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
				},
				values: {
					username,
					display_name: displayName,
				},
			};
		}

		if (password !== confirmPassword) {
			return {
				error: {
					statusCode: 400,
					message: "Passwords do not match.",
				},
				errors: {
					password: "Passwords do not match.",
					confirmPassword: "Passwords do not match.",
				},
				values: {
					username,
					display_name: displayName,
				},
			};
		}

		const result = await db
			.select({
				id: users.id,
				username: users.username,
				displayName: users.displayName,
			})
			.from(users)
			.where(eq(users.username, username))
			.limit(1);

		const existingUser = result[0];

		if (existingUser) {
			return {
				error: {
					statusCode: 400,
					message: "Invalid username.",
				},
				errors: {
					username: "Invalid username.",
				},
				values: {
					username,
					display_name: displayName,
				},
			};
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		await db.insert(users).values({
			id: crypto.randomUUID(),
			username,
			displayName,
			password: hashedPassword,
		});

		return {
			success: {
				statusCode: 201,
				message: "Account created successfully.",
			},
		};
	});
}
