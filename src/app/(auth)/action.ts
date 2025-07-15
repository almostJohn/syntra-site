"use server";

import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/data/db/client";
import { cookies } from "next/headers";
import { users, authChallenges } from "@/data/db/schema";
import { createSession } from "@/lib/auth/create-session";
import { setCookie } from "@/lib/auth/cookies";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getFormValue } from "@/lib/get-form-value";
import {
	PASSWORD_MIN_LENGTH,
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	DISPLAY_NAME_MAX_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
	SECURITY_ANSWER_MIN_LENGTH,
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

		const [user] = await db
			.select({
				id: users.id,
				username: users.username,
				displayName: users.displayName,
				password: users.password,
			})
			.from(users)
			.where(eq(users.username, username))
			.limit(1);

		if (!user || !user.password) {
			return {
				errorMessage: "Invalid username or password.",
				errors: {
					username: "Invalid username.",
					password: "Invalid password.",
				},
				values: {
					username,
					password,
				},
			};
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return {
				errorMessage: "Invalid username or password.",
				errors: {
					username: "Invalid username.",
					password: "Invalid password.",
				},
				values: {
					username,
					password,
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
			successMessage: "Login successful.",
		};
	});
}

export async function register(
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
					password,
					confirm_password: confirmPassword,
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
					password,
					confirm_password: confirmPassword,
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
					password,
					confirm_password: confirmPassword,
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
					password,
					confirm_password: confirmPassword,
				},
			};
		}

		if (
			password.length < PASSWORD_MIN_LENGTH ||
			confirmPassword.length < PASSWORD_MIN_LENGTH
		) {
			return {
				errorMessage: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
				errors: {
					password: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
					confirmPassword: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
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

		const [existingUser] = await db
			.select({
				id: users.id,
				username: users.username,
				displayName: users.displayName,
			})
			.from(users)
			.where(eq(users.username, username))
			.limit(1);

		if (existingUser) {
			return {
				errorMessage: "Invalid username or password.",
				errors: {
					username: "Invalid username.",
					password: "Invalid password.",
				},
				values: {
					username,
					display_name: displayName,
					password,
					confirm_password: confirmPassword,
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
			successMessage: "Registration successful.",
		};
	});
}

export async function forgotPasswordStepOne(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const username = getFormValue(formData, "username");

		if (!username) {
			return {
				errorMessage: "Username is a required field.",
				errors: {
					username: "Username is a required field.",
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

		const [user] = await db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.username, username))
			.limit(1);

		if (!user) {
			return {
				errorMessage: `User "${username}" not found.`,
				errors: {
					username: `User "${username}" not found.`,
				},
			};
		}

		const [challenges] = await db
			.select({ question: authChallenges.question })
			.from(authChallenges)
			.where(eq(authChallenges.userId, user.id))
			.limit(1);

		if (!challenges) {
			return {
				errorMessage: "No security question found for this user.",
			};
		}

		const cookieStore = await cookies();
		cookieStore.set("forgot-username", username, {
			httpOnly: true,
			secure: true,
			path: "/",
			maxAge: 600,
		});

		return {
			successMessage: "Username found.",
		};
	});
}

export async function forgotPasswordStepTwo(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const cookieStore = await cookies();
		const username = cookieStore.get("forgot-username")?.value;
		const answer = getFormValue(formData, "answer");
		const newPassword = getFormValue(formData, "new_password");

		if (!username) {
			return {
				errorMessage: "Your session expired. Please try again.",
			};
		}

		if (!answer || !newPassword) {
			return {
				errorMessage: "Answer and new password are required.",
				errors: {
					answer: "Answer is a required field.",
					newPassword: "New password is a required field.",
				},
			};
		}

		if (answer.length < SECURITY_ANSWER_MIN_LENGTH) {
			return {
				errorMessage: `Answer must be at least ${SECURITY_ANSWER_MIN_LENGTH} characters long.`,
				errors: {
					answer: `Answer must be at least ${SECURITY_ANSWER_MIN_LENGTH} characters long.`,
				},
			};
		}

		if (newPassword.length < PASSWORD_MIN_LENGTH) {
			return {
				errorMessage: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
				errors: {
					newPassword: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
				},
			};
		}

		const [user] = await db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.username, username))
			.limit(1);

		if (!user) {
			return {
				errorMessage: `User "${username}" not found.`,
			};
		}

		const [challenges] = await db
			.select({
				question: authChallenges.question,
				answer: authChallenges.answer,
			})
			.from(authChallenges)
			.where(eq(authChallenges.userId, user.id))
			.limit(1);

		if (!challenges) {
			return {
				errorMessage: "No security question found for this user.",
			};
		}

		const isAnswerMatch = await bcrypt.compare(answer, challenges.answer);

		if (!isAnswerMatch) {
			return {
				errorMessage: "Incorrect answer to security question.",
				errors: {
					answer: "Incorrect answer.",
				},
				values: {
					answer,
				},
			};
		}

		const newHashedPassword = await bcrypt.hash(newPassword, 12);

		await db
			.update(users)
			.set({ password: newHashedPassword, updatedAt: new Date() })
			.where(eq(users.id, user.id));

		return {
			successMessage: "Password reset successfully.",
		};
	});
}
