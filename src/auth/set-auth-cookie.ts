import { cookies } from "next/headers";

export async function setAuthCookie(token: string) {
	try {
		const cookieStore = await cookies();
		cookieStore.set(process.env.NEXT_REQUEST_COOKIES_NAME!, token, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		throw new Error("Failed to set cookie.");
	}
}
