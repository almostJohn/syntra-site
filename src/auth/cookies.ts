import { cookies } from "next/headers";

export async function setAuthCookie(token: string) {
	try {
		(await cookies()).set(process.env.APP_COOKIE_KEY!, token, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		throw new Error("There was an error setting auth to cookie");
	}
}

export async function getAuthFromCookie() {
	try {
		const token = (await cookies()).get(process.env.APP_COOKIE_KEY!)?.value;

		if (!token) {
			return null;
		}

		return token;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		throw new Error("There was an error getting auth from cookie");
	}
}

export async function clearAuthCookie() {
	try {
		(await cookies()).delete(process.env.APP_COOKIE_KEY!);
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		throw new Error("There was an error deleting auth from cookie");
	}
}
