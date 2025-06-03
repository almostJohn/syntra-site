import { cookies } from "next/headers";
import { log, LogType } from "../log";

export async function deleteCookie() {
	try {
		(await cookies()).delete(process.env.NEXT_REQUEST_COOKIES_NAME!);
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "DELETE_COOKIE_ERROR",
			details: {
				message: error.message,
			},
			additionalData: {
				message: "Deleting cookie failed",
			},
		});
	}
}
