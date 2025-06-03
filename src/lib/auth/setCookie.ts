import { cookies } from "next/headers";
import { MAX_TRUST_ACCOUNT_AGE } from "../constants";
import { log, LogType } from "../log";

export async function setCookie(sessionToken: string) {
	try {
		(await cookies()).set(
			process.env.NEXT_REQUEST_COOKIES_NAME!,
			sessionToken,
			{
				httpOnly: true,
				sameSite: "lax",
				secure: process.env.NODE_ENV === "production",
				path: "/",
				maxAge: MAX_TRUST_ACCOUNT_AGE,
			},
		);
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "SET_COOKIE_ERROR",
			details: {
				message: error.message,
			},
			additionalData: {
				message: "Setting cookie failed",
			},
		});
	}
}
