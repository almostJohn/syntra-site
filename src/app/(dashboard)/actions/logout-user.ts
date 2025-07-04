"use server";

import { deleteCookie } from "@/lib/auth/cookies";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";

export async function logoutUser(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		await deleteCookie();

		return {
			successMessage: "Logout successful.",
		};
	});
}
