import { SignJWT } from "jose";
import type { AuthPayload } from "./types";

const SECRET_KEY = new TextEncoder().encode(process.env.NEXT_SECRET_KEY);

export async function signAuthToken(payload: AuthPayload) {
	try {
		const sessionToken = new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("7d")
			.sign(SECRET_KEY);

		return sessionToken;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		throw new Error("Token signing failed.");
	}
}
