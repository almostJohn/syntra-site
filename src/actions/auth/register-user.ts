"use server";

import { hash } from "bcrypt";
import { prisma } from "@/data/db/prisma";
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
				errorMessage: `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`,
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
				errorMessage: `Username exceeds the maximum allowed length of ${USERNAME_MAX_LENGTH} characters.`,
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
				errorMessage: `Display name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters long.`,
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
				errorMessage: `Display name exceeds the maximum allowed length of ${DISPLAY_NAME_MAX_LENGTH} characters.`,
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
				errorMessage: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
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
				errorMessage: "Passwords do not match.",
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

		const existingUser = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (existingUser) {
			return {
				errorMessage: "Invalid username.",
				errors: {
					username: "Invalid username.",
				},
				values: {
					username,
					display_name: displayName,
				},
			};
		}

		const hashedPassword = await hash(password, 12);

		await prisma.user.create({
			data: {
				username,
				display_name: displayName,
				password: hashedPassword,
			},
		});

		return {
			successMessage: "Account created successfully.",
		};
	});
}
