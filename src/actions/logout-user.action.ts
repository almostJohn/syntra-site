"use server";

import { removeAuthCookie } from "@/auth/remove-auth-cookie";

export async function logoutUser(): Promise<{
	success: boolean;
	message: string;
}> {
	try {
		await removeAuthCookie();

		return {
			success: true,
			message: "Logout successful.",
		};
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return {
			success: false,
			message: "There was an error logging you out. Please try again.",
		};
	}
}
