import type { Auth } from "@/types/auth.types";
import { getAuthFromCookie } from "./cookies";
import { verifyToken } from "./tokens/verify";

export async function checkAuth() {
	try {
		const token = await getAuthFromCookie();

		if (!token) {
			return false;
		}

		(await verifyToken(token)) as Auth;

		return true;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return false;
	}
}
