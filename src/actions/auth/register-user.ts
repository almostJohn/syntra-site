"use server";

import crypto from "node:crypto";
import { hash } from "bcrypt";
import { isBefore, addMinutes } from "date-fns";
import { prisma } from "@/data/db/prisma";
import { sendVerificationEmail } from "@/lib/mailer";
import { serverActionCallback, type ActionResponse } from "@/lib/serverAction";
import { getFormValue } from "@/lib/getFormValue";
import { NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";

export async function registerUser(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const email = getFormValue(formData, "email");
		const firstName = getFormValue(formData, "first_name");
		const lastName = getFormValue(formData, "last_name");
		const password = getFormValue(formData, "password");
		const confirmPassword = getFormValue(formData, "confirm_password");

		if (!email || !firstName || !lastName || !password || !confirmPassword) {
			return {
				errorMessage: "All fields are required.",
				errors: {
					email: "Email is a required field.",
					firstName: "First name is a required field.",
					lastName: "Last name is a required field.",
					password: "Password is a required field.",
					confirmPassword: "Confirm password is a required field.",
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
				values: {
					first_name: firstName,
					last_name: lastName,
				},
			};
		}

		if (
			firstName &&
			lastName &&
			(firstName.length < NAME_MIN_LENGTH || lastName.length < NAME_MIN_LENGTH)
		) {
			return {
				errorMessage: `First and last name must be at least ${NAME_MIN_LENGTH} characters long.`,
				errors: {
					firstName: `First name must be at least ${NAME_MIN_LENGTH} characters long.`,
					lastName: `Last name must be at least ${NAME_MIN_LENGTH} characters long.`,
				},
				values: {
					email,
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
					first_name: firstName,
					last_name: lastName,
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
					email,
					first_name: firstName,
					last_name: lastName,
				},
			};
		}

		const existingVerifiedUser = await prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				is_email_verified: true,
			},
		});

		if (existingVerifiedUser?.is_email_verified) {
			return {
				errorMessage: "Email is already in use.",
				errors: {
					email: "Email is already in use.",
				},
				values: {
					email,
					first_name: firstName,
					last_name: lastName,
				},
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
						errorMessage:
							"A verification email has already been sent. Please check you inbox.",
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

		const hashedPassword = await hash(password, 12);

		const newUser = await prisma.user.create({
			data: {
				email,
				name: `${firstName} ${lastName}`,
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
			verificationUrl,
			name: `${firstName} ${lastName}`,
		});

		return {
			successMessage:
				"Registration successful. Please check your email to verify your account.",
		};
	});
}
