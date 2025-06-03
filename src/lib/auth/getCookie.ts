import { cookies } from "next/headers";
import { log, LogType } from "../log";

export async function getCookie() {
	try {
		const cookie = (await cookies()).get(
			process.env.NEXT_REQUEST_COOKIES_NAME!,
		);
		return cookie?.value;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "GET_COOKIE_ERROR",
			details: {
				message: error.message,
			},
			additionalData: {
				message: "Getting cookie failed",
			},
		});
	}
}
