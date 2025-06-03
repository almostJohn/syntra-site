import { SignJWT } from "jose";
import type { Auth } from "./types";
import { log, LogType } from "../log";
import { generateSessionSecret } from "./generateSessionSecret";

export async function createSession(payload: Auth) {
	const secret = generateSessionSecret();

	try {
		const sessionToken = new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("7d")
			.sign(secret);

		return sessionToken;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "CREATE_SESSION_ERROR",
			details: {
				message: error.message,
			},
			additionalData: {
				message: "Creating session failed",
			},
		});
	}
}
