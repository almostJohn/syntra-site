import { UserService } from "@/services/user.service";
import { getAuthFromCookie } from "./cookies";
import { verifyToken } from "./tokens/verify";
import type { Auth } from "@/types/auth.types";

export async function getCurrentUser() {
	try {
		const token = await getAuthFromCookie();

		if (!token) {
			return null;
		}

		const session = (await verifyToken(token)) as Auth;

		if (!session) {
			return null;
		}

		const { data: user } = await UserService.getById(session.userId);

		if (!user) {
			return null;
		}

		return user;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return null;
	}
}
