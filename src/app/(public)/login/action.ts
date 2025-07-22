"use server";

import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getFormValue } from "@/lib/get-form-value";
import { db } from "@/data/db/client";
import { eq } from "drizzle-orm";
import { users } from "@/data/db/schema";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/lib/constants";
import { compareString } from "@/lib/compare-string";
import { createSession, setCookie } from "@/lib/auth";

export async function login(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const username = getFormValue(formData, "username");
		const password = getFormValue(formData, "password");

		if (!username || !password) {
			return {
				errorMessage: "Username and password are required.",
				errors: {
					username: "Username is a required field.",
					password: "Password is a required field.",
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

		if (password.length < PASSWORD_MIN_LENGTH) {
			return {
				errorMessage: "Invalid password.",
				errors: {
					password: "Invalid password.",
				},
				values: {
					username,
				},
			};
		}

		const [user] = await db
			.select({
				id: users.id,
				username: users.username,
				tag: users.userTag,
				displayName: users.displayName,
				password: users.password,
			})
			.from(users)
			.where(eq(users.username, username))
			.limit(1);

		if (!user) {
			return {
				errorMessage: "Invalid username or password.",
				errors: {
					username: "Invalid username.",
					password: "Invalid password.",
				},
				values: {
					username,
				},
			};
		}

		const isMatch = await compareString(password, user.password);

		if (!isMatch) {
			return {
				errorMessage: "Invalid username or password.",
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
			userTag: user.tag,
			displayName: user.displayName,
		});

		if (sessionToken) {
			await setCookie(sessionToken);
		}

		return {
			successMessage: "Login successful.",
		};
	});
}
