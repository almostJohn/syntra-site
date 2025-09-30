"use server";

import { auth } from "@/lib/auth";
import { serverActionCallback, type ActionResponse } from "@/lib/action";

export async function logout(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await auth.getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		const { success, message } = await auth.signOut();

		if (!success) {
			return {
				errorMessage: message,
			};
		}

		return {
			successMessage: message,
		};
	});
}
