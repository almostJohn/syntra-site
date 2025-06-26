"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/data/db/client";
import { users } from "@/data/db/schema";
import { createSession } from "@/lib/auth/create-session";
import { setCookie } from "@/lib/auth/cookies";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getFormValue } from "@/lib/get-form-value";
import {
	PASSWORD_MIN_LENGTH,
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
} from "@/lib/constants";

export async function loginUser(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const username = getFormValue(formData, "username");
		const password = getFormValue(formData, "password");

		if (!username || !password) {
			return {
				error: {
					statusCode: 400,
					message: "Username and password are required.",
				},
				errors: {
					email: "Username is a required field.",
					password: "Password is a required field.",
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
				},
			};
		}

		const result = await db
			.select({
				id: users.id,
				username: users.username,
				displayName: users.displayName,
				password: users.password,
			})
			.from(users)
			.where(eq(users.username, username))
			.limit(1);

		const user = result[0];

		if (!user || !user.password) {
			return {
				error: {
					statusCode: 400,
					message: "Invalid username or password.",
				},
				errors: {
					username: "Invalid username.",
					password: "Invalid password.",
				},
				values: {
					username,
				},
			};
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return {
				error: {
					statusCode: 400,
					message: "Invalid username or password.",
				},
				errors: {
					username: "Invalid username.",
					password: "Invalid password.",
				},
				values: {
					username,
				},
			};
		}

		const sessionToken = await createSession({
			userId: user.id,
			username: user.username,
			displayName: user.displayName,
		});

		if (sessionToken) {
			await setCookie(sessionToken);
		}

		return {
			success: {
				statusCode: 200,
				message: "Login successful.",
			},
		};
	});
}
