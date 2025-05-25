"use server";

import { deleteCookie } from "@/lib/auth";

type ActionResponse = {
	success: boolean;
	message: string;
};

export async function logout(): Promise<ActionResponse> {
	try {
		await deleteCookie();

		return {
			success: true,
			message: "Logout successful.",
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
