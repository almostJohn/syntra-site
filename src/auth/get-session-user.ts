import { getAuthCookie } from "./get-auth-cookie";
import { verifyAuthToken } from "./verify-auth-token";

export async function getSessionUser<T = unknown>(): Promise<T | null> {
	try {
		const sessionToken = await getAuthCookie();

		if (!sessionToken) {
			return null;
		}

		const user = await verifyAuthToken<T>(sessionToken);

		return user;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return null;
	}
}
