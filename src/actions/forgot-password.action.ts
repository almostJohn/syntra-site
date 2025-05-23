"use server";

import { prisma } from "@/db/prisma";
import bcrypt from "bcrypt";

type ResponseResult = {
	success: boolean;
	message: string;
};

const PASSWORD_MAX_LENGTH = 8;

export async function forgotPassword(
	_prevState: ResponseResult,
	formData: FormData,
): Promise<ResponseResult> {
	try {
		const username = formData.get("username") as string;
		const newPassword = formData.get("new_password") as string;
		const confirmNewPassword = formData.get("confirm_new_password") as string;

		if (!username || !newPassword || !confirmNewPassword) {
			return {
				success: false,
				message: "All fields are required.",
			};
		}

		if (newPassword.length < PASSWORD_MAX_LENGTH) {
			return {
				success: false,
				message: "Password must be at least 8 characters long.",
			};
		}

		if (newPassword !== confirmNewPassword) {
			return {
				success: false,
				message: "Passwords do not match.",
			};
		}

		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (!user) {
			return {
				success: false,
				message: "User not found.",
			};
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await prisma.user.update({
			where: { username },
			data: { password: hashedPassword },
		});

		return {
			success: true,
			message: "Password has been reset successfully.",
		};
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return {
			success: false,
			message: "There was an error resetting your password. Please try again.",
		};
	}
}
