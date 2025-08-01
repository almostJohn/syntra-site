"use server";

import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { deleteCookie } from "@/lib/auth";
import { getCurrentUser } from "@/lib/auth";

export async function logout(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "You must be logged in to perform this action.",
			};
		}

		await deleteCookie();

		return {
			successMessage: "Logout successful.",
		};
	});
}
