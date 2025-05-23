import { cookies } from "next/headers";

export async function removeAuthCookie() {
	try {
		const cookieStore = await cookies();
		cookieStore.delete(process.env.NEXT_REQUEST_COOKIES_NAME!);
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		throw new Error("Failed to remove auth cookie.");
	}
}
