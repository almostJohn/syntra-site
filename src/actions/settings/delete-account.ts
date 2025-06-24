"use server";

import { deleteCookie } from "@/lib/auth";
import { prisma } from "@/data/db/prisma";
import { getCurrentUser } from "@/lib/auth";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";

export async function deleteAccount(): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		await prisma.user.delete({
			where: {
				id: currentUser.id,
			},
		});

		await deleteCookie();

		return {
			successMessage: "Logout successful.",
		};
	});
}
