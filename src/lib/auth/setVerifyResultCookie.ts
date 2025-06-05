import { cookies } from "next/headers";
import { log, LogType } from "../log";

export async function setVerifyResultCookie(sessionToken: string) {
	try {
		(await cookies()).set(
			process.env.NEXT_REQUEST_VERIFIED_NAME!,
			sessionToken,
			{
				maxAge: 10,
				path: "/",
			},
		);
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "SET_VERIFY_RESULT_COOKIE_ERROR",
			details: {
				message: error.message,
			},
			additionalData: "Setting verify result cookie failed",
		});
	}
}
