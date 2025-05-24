"use server";

import { isBefore, addMinutes } from "date-fns";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import { prisma } from "@/db/prisma";
import { getFormValue } from "@/lib/get-form-value";
import { PASSWORD_MIN_LENGTH, DISPLAY_NAME_MIN_LENGTH } from "@/lib/constants";
import { sendVerificationEmail } from "@/lib/mailer";

type ActionResponse = {
	success: boolean;
	message: string;
};

export async function register(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	try {
		const email = getFormValue(formData, "email");

		const displayName = getFormValue(formData, "display_name");

		const password = getFormValue(formData, "password");

		const confirmPassword = getFormValue(formData, "confirm_password");

		if (!email || !displayName || !password || !confirmPassword) {
			return {
				success: false,
				message: "All fields are required.",
			};
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			return {
				success: false,
				message: "Invalid email format.",
			};
		}

		if (displayName.length < DISPLAY_NAME_MIN_LENGTH) {
			return {
				success: false,
				message: `Display name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters long.`,
			};
		}

		if (password.length < PASSWORD_MIN_LENGTH) {
			return {
				success: false,
				message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
			};
		}

		if (password !== confirmPassword) {
			return {
				success: false,
				message: "Passwords do not match.",
			};
		}

		const existingVerifiedUser = await prisma.user.findUnique({
			where: { email },
			select: {
				email_verified: true,
				id: true,
			},
		});

		if (existingVerifiedUser?.email_verified) {
			return {
				success: false,
				message: "Email is already in use.",
			};
		}

		const existingUnverifiedUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUnverifiedUser) {
			const existingSession = await prisma.userSession.findFirst({
				where: {
					user_id: existingUnverifiedUser.id,
				},
			});

			if (existingSession) {
				if (isBefore(new Date(), existingSession.expires_at)) {
					return {
						success: false,
						message:
							"A verification email has already been sent. Please check your inbox.",
					};
				}

				await prisma.userSession.deleteMany({
					where: {
						user_id: existingUnverifiedUser.id,
					},
				});

				await prisma.user.delete({
					where: {
						id: existingUnverifiedUser.id,
					},
				});
			}
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = await prisma.user.create({
			data: {
				email,
				display_name: displayName,
				password: hashedPassword,
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
			displayName,
			verificationUrl,
		});

		return {
			success: true,
			message:
				"Account created. Please check your email to verify your account.",
		};
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return {
			success: false,
			message: "Something went wrong. Please try again.",
		};
	}
}
