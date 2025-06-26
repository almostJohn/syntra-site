import { SignJWT } from "jose";
import { log, LogType, Category } from "../log";
import type { Auth } from "./types";

const secret = new TextEncoder().encode(process.env.NEXT_SECRET_KEY);

export async function createSession(payload: Auth) {
	try {
		const token = new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("7d")
			.sign(secret);
		return token;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: Category.CreateSessionError,
			details: {
				message: error.message,
			},
			additionalData: {
				error,
			},
		});
	}
}
