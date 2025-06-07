import type { Auth } from "./types";
import { getCookie } from "./getCookie";
import { verifySession } from "./verifySession";
import { log, LogType } from "../log";

export async function validateAuthentication() {
	const sessionToken = await getCookie();

	if (!sessionToken) {
		return false;
	}

	try {
		(await verifySession(sessionToken)) as Auth;

		return true;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "VALIDATION_AUTH_ERROR",
			details: { message: error.message, error },
			additionalData: {
				message: "Validation on authentication for middleware failed",
			},
		});

		return false;
	}
}
