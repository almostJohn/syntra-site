"use server";

import { deleteCookie } from "@/lib/auth/deleteCookie";
import { serverActionCallback, type ActionResponse } from "@/lib/serverAction";

export async function logout(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		await deleteCookie();

		return {
			successMessage: "Logout successful.",
		};
	});
}
