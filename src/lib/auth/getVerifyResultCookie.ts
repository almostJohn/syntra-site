import { cookies } from "next/headers";
import { log, LogType } from "../log";

export async function getVerifyResultCookie() {
	try {
		const cookie = (await cookies()).get(process.env.NEXT_VERIFY_RESULT_KEY!);
		return cookie?.value;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "GET_VERIFY_RESULT_COOKIE_ERROR",
			details: {
				message: error.message,
			},
			additionalData: {
				message: "Getting verify result cookie failed",
			},
		});
	}
}
