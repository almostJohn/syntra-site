"use server";

import { deleteCookie } from "@/lib/auth";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";

export async function logout(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		await deleteCookie();
		return {
			successMessage: "Logout successful.",
		};
	});
}
