"use server";

import { compare } from "bcrypt";
import { prisma } from "@/data/db/prisma";
import { createSession, setCookie } from "@/lib/auth";
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
				errorMessage: "Username and password are required.",
				errors: {
					email: "Username is a required field.",
					password: "Password is a required field.",
				},
			};
		}

		if (username.length < USERNAME_MIN_LENGTH) {
			return {
				errorMessage: `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`,
				errors: {
					username: `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`,
				},
			};
		}

		if (username.length > USERNAME_MAX_LENGTH) {
			return {
				errorMessage: `Username exceeds the maximum allowed length of ${USERNAME_MAX_LENGTH} characters.`,
				errors: {
					username: `Username exceeds the maximum allowed length of ${USERNAME_MAX_LENGTH} characters.`,
				},
			};
		}

		if (password.length < PASSWORD_MIN_LENGTH) {
			return {
				errorMessage: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
				errors: {
					password: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
				},
				values: {
					username,
				},
			};
		}

		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (!user || !user.password) {
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

		const isPasswordMatch = await compare(password, user.password);

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

		const sessionToken = await createSession({
			userId: user.id,
			username: user.username,
			displayName: user.display_name,
		});

		if (sessionToken) {
			await setCookie(sessionToken);
		}

		return {
			successMessage: "Login successful.",
		};
	});
}
