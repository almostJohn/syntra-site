import { prisma } from "@/db/prisma";
import type { AuthPayload } from "./types";
import { verifyAuthToken } from "./verify-auth-token";
import { getAuthCookie } from "./get-auth-cookie";

export async function getCurrentUser() {
	try {
		const sessionToken = await getAuthCookie();

		if (!sessionToken) {
			return null;
		}

		const payload = (await verifyAuthToken(sessionToken)) as AuthPayload;

		if (!payload.userId) {
			return null;
		}

		const user = await prisma.user.findUnique({
			where: { id: payload.userId },
			select: {
				id: true,
				username: true,
				display_name: true,
			},
		});

		return user;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return null;
	}
}
