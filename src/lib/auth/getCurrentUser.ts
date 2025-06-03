import { getCookie } from "./getCookie";
import { verifySession } from "./verifySession";
import type { Auth } from "./types";
import { prisma } from "@/data/db/prisma";
import { log, LogType } from "../log";

export async function getCurrentUser() {
	try {
		const sessionToken = await getCookie();

		if (!sessionToken) {
			return null;
		}

		const session = await verifySession<Auth>(sessionToken);

		if (!session?.userId) {
			return null;
		}

		const currentUser = await prisma.user.findUnique({
			where: {
				id: session?.userId,
			},
			select: {
				id: true,
				email: true,
				name: true,
				is_email_verified: true,
				created_at: true,
			},
		});

		return currentUser;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "GET_CURRENT_USER_ERROR",
			details: {
				message: error.message,
			},
			additionalData: {
				message: "Getting current user failed",
			},
		});
	}
}
