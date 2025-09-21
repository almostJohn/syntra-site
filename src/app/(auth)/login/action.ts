"use server";

import { db } from "@/db/sql";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getFormValue } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { compareString } from "@/lib/crypto";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/lib/constants";
import { serverActionCallback, type ActionResponse } from "@/lib/action";

export async function loginUser(
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

		const [user] = await db
			.select()
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

		const isPasswordMatch = await compareString(password, user.password);

		if (!isPasswordMatch) {
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

		const { success, message } = await auth.signIn({
			userId: user.id,
			username: user.username,
			userTag: user.userTag,
			displayName: user.displayName,
		});

		if (!success) {
			return {
				errorMessage: message,
			};
		}

		return {
			successMessage: message,
		};
	});
}
