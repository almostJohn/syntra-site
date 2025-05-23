"use server";

import { prisma } from "@/db/prisma";
import bcrypt from "bcrypt";
import { signAuthToken } from "@/auth/sign-auth-token";
import { setAuthCookie } from "@/auth/set-auth-cookie";

type ResponseResult = {
	success: boolean;
	message: string;
};

const PASSWORD_MAX_LENGTH = 8;
const DISPLAY_NAME_MAX_LENGTH = 2;

export async function registerUser(
	_prevState: ResponseResult,
	formData: FormData,
): Promise<ResponseResult> {
	try {
		const username = formData.get("username") as string;
		const displayName = formData.get("display_name") as string;
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirm_password") as string;

		if (!username || !displayName || !password || !confirmPassword) {
			return {
				success: false,
				message: "All fields are required.",
			};
		}

		if (displayName.length < DISPLAY_NAME_MAX_LENGTH) {
			return {
				success: false,
				message: "Display name must be at least 2 characters long.",
			};
		}

		if (password.length < PASSWORD_MAX_LENGTH) {
			return {
				success: false,
				message: "Password must be at least 8 characters long.",
			};
		}

		if (password !== confirmPassword) {
			return {
				success: false,
				message: "Passwords do not match.",
			};
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (existingUser) {
			return {
				success: false,
				message: "User with this username already exists.",
			};
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				username,
				display_name: displayName,
				password: hashedPassword,
			},
		});

		const sessionToken = await signAuthToken({
			userId: newUser.id,
			username: newUser.username,
			displayName: newUser.display_name,
		});

		await setAuthCookie(sessionToken);

		return {
			success: true,
			message: "Registration successful.",
		};
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return {
			success: false,
			message: "There was an error registering your account. Please try again.",
		};
	}
}
