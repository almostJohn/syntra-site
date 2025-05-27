"use server";

import { prisma } from "@/db/prisma";
import bcrypt from "bcrypt";
import { getFormValue } from "@/lib/get-form-value";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { signAuthToken, setCookie } from "@/lib/auth";

type ActionResponse = {
	successMessage?: string;
	errorMessage?: string;
	errors?: {
		email?: string;
		password?: string;
		fields?: string;
	};
	values?: {
		email?: string;
	};
};

export async function login(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	try {
		const email = getFormValue(formData, "email");

		const password = getFormValue(formData, "password");

		if (!email || !password) {
			return {
				errorMessage: "All fields are required.",
				errors: {
					fields: "All fields are required.",
				},
			};
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			return {
				errorMessage: "Invalid email format.",
				errors: {
					email: "Invalid email format.",
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
					email: email!,
				},
			};
		}

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user || !user.password) {
			return {
				errorMessage: "Invalid email or password.",
				errors: {
					email: "Invalid email or password.",
					password: "Invalid email or password.",
				},
				values: {
					email: email!,
				},
			};
		}

		if (!user.email_verified) {
			return {
				errorMessage: "Please verify your email first before logging in.",
				errors: {
					email: "Please verify your email first before logging in.",
				},
				values: {
					email: email!,
				},
			};
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return {
				errorMessage: "Invalid email or password.",
				errors: {
					email: "Invalid email or password.",
					password: "Invalid email or password.",
				},
				values: {
					email: email!,
				},
			};
		}

		const sessionToken = await signAuthToken({
			userId: user.id,
			email: user.email,
			displayName: user.display_name,
		});

		await setCookie(sessionToken);

		return {
			successMessage: "Login successful.",
		};
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return {
			errorMessage: "Something went wrong. Please try again.",
		};
	}
}
