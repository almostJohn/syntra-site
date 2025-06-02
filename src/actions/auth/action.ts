"use server";

import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { isBefore, addMinutes } from "date-fns";
import { prisma } from "@/data/db/prisma";
import { findUserByEmail, findVerifiedUserByEmail } from "@/data/queries";
import { signToken, setCookie, deleteCookie } from "@/lib/auth";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { PASSWORD_MIN_LENGTH, DISPLAY_NAME_MIN_LENGTH } from "@/lib/constants";
import { getFormValue } from "@/lib/get-form-value";
import { sendVerificationEmail } from "@/lib/mailer";

export async function login(
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
					password: "Password is required field.",
				},
			};
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (!emailRegex.test(email)) {
			return {
				errorMessage: "Incorrect email format.",
				errors: {
					email: "Incorrect email format.",
				},
			};
		}

		if (password.length < PASSWORD_MIN_LENGTH) {
			return {
				errorMessage: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
				errors: {
					password: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
				},
			};
		}

		const user = await findUserByEmail(email);

		if (!user || !user.password) {
			return {
				errorMessage: "Incorrect email or password.",
				errors: {
					email: "Incorrect email.",
					fields: "Incorrect password.",
				},
				values: { email },
			};
		}

		if (!user.email_verified) {
			return {
				errorMessage: "Please verify your email first before logging in.",
				values: { email },
			};
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return {
				errorMessage: "Incorrect email or password.",
				errors: {
					email: "Incorrect email.",
					password: "Incorrect password.",
				},
				values: { email },
			};
		}

		const sessionToken = await signToken({
			userId: user.id,
			email: user.email,
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

export async function register(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const email = getFormValue(formData, "email");

		const displayName = getFormValue(formData, "display_name");

		const password = getFormValue(formData, "password");

		const confirmPassword = getFormValue(formData, "confirm_password");

		if (!email || !displayName || !password || !confirmPassword) {
			return {
				errorMessage: "All fields are required.",
				errors: {
					email: "Email is a required field.",
					displayName: "Display name is a required field.",
					password: "Password is a required field.",
					confirmPassword: "Confirm password is a required field.",
				},
			};
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (!emailRegex.test(email)) {
			return {
				errorMessage: "Incorrect email format.",
				errors: {
					email: "Incorrect email format.",
				},
			};
		}

		if (displayName.length < DISPLAY_NAME_MIN_LENGTH) {
			return {
				errorMessage: `Display name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters long.`,
				errors: {
					displayName: `Display name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters long.`,
				},
				values: { email },
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
					display_name: displayName,
				},
			};
		}

		if (password !== confirmPassword) {
			return {
				errorMessage: "Passwords do not match.",
				errors: {
					password: "Passwords do not match.",
				},
				values: {
					email,
					display_name: displayName,
				},
			};
		}

		const existingVerifiedUser = await findVerifiedUserByEmail(email);

		if (existingVerifiedUser?.email_verified) {
			return {
				errorMessage: "Email is already in use.",
				errors: {
					email: "Email is already in use.",
				},
				values: {
					email,
					display_name: displayName,
				},
			};
		}

		const existingUnverifiedUser = await findUserByEmail(email);

		if (existingUnverifiedUser) {
			const existingSession = await prisma.userSession.findFirst({
				where: { user_id: existingUnverifiedUser.id },
			});

			if (existingSession) {
				if (isBefore(new Date(), existingSession.expires_at)) {
					return {
						errorMessage:
							"A verification email has already been sent. Please check you inbox.",
					};
				}

				await prisma.userSession.deleteMany({
					where: { user_id: existingUnverifiedUser.id },
				});

				await prisma.user.delete({
					where: { id: existingUnverifiedUser.id },
				});
			}
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				display_name: displayName,
			},
		});

		const token = crypto.randomBytes(32).toString("hex");

		const expiresAt = addMinutes(new Date(), 30);

		await prisma.userSession.create({
			data: {
				user_id: newUser.id,
				token,
				expires_at: expiresAt,
			},
		});

		const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

		const verificationUrl = `${baseUrl}/api/verify?token=${token}`;

		await sendVerificationEmail({
			email,
			verificationUrl,
			displayName,
		});

		return {
			successMessage:
				"Account created. Please check your email to verify your account.",
		};
	});
}

export async function logout(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		await deleteCookie();
		return {
			successMessage: "Logout successful.",
		};
	});
}
