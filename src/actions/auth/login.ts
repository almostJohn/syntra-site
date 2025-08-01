"use server";

import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { db } from "@/data/db/client";
import { eq } from "drizzle-orm";
import { users } from "@/data/db/schema";
import { createSession, setCookie } from "@/lib/auth";
import { getFormValue } from "@/lib/get-form-value";
import { compareString } from "@/lib/compare-string";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
} from "@/lib/constants";

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
			username.length > USERNAME_MAX_LENGTH ||
			password.length < PASSWORD_MIN_LENGTH ||
			password.length > PASSWORD_MAX_LENGTH
		) {
			return {
				errorMessage: "Incorrect username or password.",
				errors: {
					username: "Incorrect username.",
					password: "Incorrect password.",
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
				userTag: users.userTag,
				displayName: users.displayName,
				password: users.password,
			})
			.from(users)
			.where(eq(users.username, username))
			.limit(1);

		if (!user) {
			return {
				errorMessage: "Incorrect username or password.",
				errors: {
					username: "Incorrect username.",
					password: "Incorrect password.",
				},
				values: {
					username,
				},
			};
		}

		const isPasswordMatch = await compareString(password, user.password);

		if (!isPasswordMatch) {
			return {
				errorMessage: "Incorrect username or password.",
				errors: {
					username: "Incorrect username.",
					password: "Incorrect password.",
				},
				values: {
					username,
				},
			};
		}

		const sessionToken = await createSession({
			userId: user.id,
			username: user.username,
			userTag: user.userTag,
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
