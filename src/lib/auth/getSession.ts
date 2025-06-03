import { getCookie } from "./getCookie";
import { verifySession } from "./verifySession";
import { log, LogType } from "../log";

export async function getSession<T>() {
	try {
		const sessionToken = await getCookie();

		if (!sessionToken) {
			return null;
		}

		const session = await verifySession<T>(sessionToken);

		if (!session) {
			return null;
		}

		return session;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "GET_SESSION_ERROR",
			details: {
				message: error.message,
			},
			additionalData: {
				message: "Getting session failed",
			},
		});
	}
}
