import { NextRequest } from "next/server";
import { verifyToken } from "./auth";
import { log, LogType } from "./log";

export async function checkAuthForMiddleware(request: NextRequest) {
	const sessionToken = request.cookies.get(
		process.env.NEXT_REQUEST_COOKIES_NAME!,
	)?.value;

	if (!sessionToken) {
		return false;
	}

	try {
		await verifyToken(sessionToken);

		return true;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "CHECK_AUTH_ERROR",
			details: { message: error.message, error },
			additionalData: {
				message: "Checking authentication for middleware failed",
			},
		});

		return false;
	}
}
