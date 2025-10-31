"use server";

import { auth } from "@/lib/auth";
import { ErrorResponses } from "@/lib/constants";
import { serverActionCallback, type ActionResponse } from "@/lib/action";

export async function logout(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const loggedInUser = await auth.getCurrentUser();

		if (!loggedInUser) {
			return {
				errorMessage: ErrorResponses.unauthorized,
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
