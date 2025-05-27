"use server";

import { deleteCookie } from "@/lib/auth";

type ActionResponse = {
	successMessage?: string;
	errorMessage?: string;
};

export async function logout(): Promise<ActionResponse> {
	try {
		await deleteCookie();

		return {
			successMessage: "Logout successful.",
		};
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return {
			errorMessage: "Something went wrong. Please try again.",
		};
	}
}
