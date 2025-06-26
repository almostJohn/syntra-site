import { jwtVerify } from "jose";
import { log, LogType, Category } from "../log";

const secret = new TextEncoder().encode(process.env.NEXT_SECRET_KEY);

export async function verifySession<T>(token: string) {
	try {
		const { payload } = await jwtVerify(token, secret);

		return payload as T;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: Category.VerifySessionError,
			details: {
				message: error.message,
			},
			additionalData: {
				error,
			},
		});

		return null;
	}
}
