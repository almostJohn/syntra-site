"use server";

import { compare } from "bcrypt";
import { prisma } from "@/data/db/prisma";
import { createSession } from "@/lib/auth/createSession";
import { setCookie } from "@/lib/auth/setCookie";
import { serverActionCallback, type ActionResponse } from "@/lib/serverAction";
import { getFormValue } from "@/lib/getFormValue";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export async function loginUser(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const email = getFormValue(formData, "email");
		const password = getFormValue(formData, "password");

		if (!email || !password) {
			return {
				errorMessage: "Email and password are required.",
				errors: {
					email: "Email is a required field.",
					password: "Password is a required field.",
				},
			};
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!emailRegex.test(email)) {
			return {
				errorMessage: "Invalid email.",
				errors: {
					email: "Invalid email.",
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
					email,
				},
			};
		}

		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user || !user.password) {
			return {
				errorMessage: "Invalid email or password.",
				errors: {
					email: "Invalid email.",
					password: "Invalid password.",
				},
				values: {
					email,
				},
			};
		}

		if (!user.is_email_verified) {
			return {
				errorMessage:
					"Please verify your email address before attempting to log in.",
			};
		}

		const isPasswordMatch = await compare(password, user.password);

		if (!isPasswordMatch) {
			return {
				errorMessage: "Invalid email or password.",
				errors: {
					email: "Invalid email.",
					password: "Invalid password.",
				},
				values: {
					email,
				},
			};
		}

		const sessionToken = await createSession({
			userId: user.id,
			email: user.email,
			name: user.name,
		});

		if (sessionToken) {
			await setCookie(sessionToken);
		}

		return {
			successMessage: "Login successful.",
		};
	});
}
