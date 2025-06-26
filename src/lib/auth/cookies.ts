import { cookies } from "next/headers";
import { MAX_TRUST_ACCOUNT_AGE } from "../constants";
import { log, LogType, Category } from "../log";

export async function setCookie(token: string) {
	try {
		const cookieStore = await cookies();

		cookieStore.set(process.env.NEXT_REQUEST_COOKIES_NAME!, token, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: MAX_TRUST_ACCOUNT_AGE,
		});
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: Category.SetCookieError,
			details: {
				message: error.message,
			},
			additionalData: {
				error,
			},
		});
	}
}

export async function getCookie() {
	try {
		const cookieStore = await cookies();

		const token = cookieStore.get(
			process.env.NEXT_REQUEST_COOKIES_NAME!,
		)?.value;

		if (!token) {
			return null;
		}

		return token;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: Category.GetCookieError,
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

export async function deleteCookie() {
	try {
		const cookieStore = await cookies();
		cookieStore.delete(process.env.NEXT_REQUEST_COOKIES_NAME!);
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: Category.DeleteCookieError,
			details: {
				message: error.message,
			},
			additionalData: {
				error,
			},
		});
	}
}
