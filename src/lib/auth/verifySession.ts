import { jwtVerify } from "jose";
import { generateSessionSecret } from "./generateSessionSecret";
import { log, LogType } from "../log";

export async function verifySession<T>(sessionToken: string) {
	const secret = generateSessionSecret();

	try {
		const { payload } = await jwtVerify(sessionToken, secret);

		return payload as T;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "VERIFY_SESSION_ERROR",
			details: {
				message: error.message,
			},
			additionalData: {
				message: "Verifying session failed",
			},
		});
	}
}
