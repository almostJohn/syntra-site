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

export async function loginUser(
	_prevState: ResponseResult,
	formData: FormData,
): Promise<ResponseResult> {
	try {
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		if (!username || !password) {
			return {
				success: false,
				message: "Username and password are required.",
			};
		}

		if (password.length < PASSWORD_MAX_LENGTH) {
			return {
				success: false,
				message: "Password must be at least 8 characters long.",
			};
		}

		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (!user || !user.password) {
			return {
				success: false,
				message: "Invalid username or password.",
			};
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return {
				success: false,
				message: "Invalid username or password.",
			};
		}

		const sessionToken = await signAuthToken({
			userId: user.id,
			username: user.username,
			displayName: user.display_name,
		});

		await setAuthCookie(sessionToken);

		return {
			success: true,
			message: "Login successful.",
		};
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return {
			success: false,
			message: "There was an error logging you in. Please try again.",
		};
	}
}
