import { SignJWT } from "jose";
import type { Auth } from "@/types/auth.types";

const secret = new TextEncoder().encode(process.env.APP_SECRET_KEY);

export function signToken(payload: Auth) {
	try {
		const token = new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("7d")
			.sign(secret);

		return token;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		throw new Error("There was an error signing jwt");
	}
}
