import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "@/data/db/prisma";
import { log, LogType } from "./log";
import { MAX_TRUST_ACCOUNT_AGE } from "./constants";

const SECRET = new TextEncoder().encode(process.env.NEXT_SECRET_KEY);

export type Auth = {
	userId: string;
	username: string;
	displayName: string;
};

export async function createSession(payload: Auth) {
	try {
		const sessionToken = new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("7d")
			.sign(SECRET);

		return sessionToken;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "CREATE_SESSION_ERROR",
			details: {
				message: error.message,
			},
			additionalData: { error },
		});
	}
}

export async function verifySession<T>(sessionToken: string) {
	try {
		const { payload } = await jwtVerify(sessionToken, SECRET);

		return payload as T;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "VERIFY_SESSION_ERROR",
			details: {
				message: error.message,
			},
			additionalData: { error },
		});

		return null;
	}
}

export async function setCookie(sessionToken: string) {
	try {
		const cookieStore = await cookies();

		cookieStore.set(process.env.NEXT_REQUEST_COOKIES_NAME!, sessionToken, {
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
			category: "SET_COOKIE_ERROR",
			details: {
				message: error.message,
			},
			additionalData: { error },
		});
	}
}

export async function getCookie() {
	try {
		const cookieStore = await cookies();
		const cookie = cookieStore.get(process.env.NEXT_REQUEST_COOKIES_NAME!);
		return cookie?.value;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "GET_COOKIE_ERROR",
			details: {
				message: error.message,
			},
			additionalData: { error },
		});
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
			category: "DELETE_COOKIE_ERROR",
			details: {
				message: error.message,
			},
			additionalData: { error },
		});
	}
}

export async function getSession() {
	try {
		const sessionToken = await getCookie();

		if (!sessionToken) {
			return null;
		}

		const session = (await verifySession(sessionToken)) as Auth;

		if (!session) {
			return null;
		}

		const currentUser = await prisma.user.findUnique({
			where: {
				id: session.userId,
			},
			select: {
				id: true,
				username: true,
				display_name: true,
			},
		});

		if (!currentUser) {
			return null;
		}

		return {
			userId: currentUser.id,
			username: currentUser.username,
			displayName: currentUser.display_name,
		};
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "GET_SESSION_ERROR",
			details: {
				message: error.message,
			},
			additionalData: { error },
		});

		return null;
	}
}

export async function getCurrentUser() {
	try {
		const sessionToken = await getCookie();

		if (!sessionToken) {
			return null;
		}

		const session = (await verifySession(sessionToken)) as Auth;

		if (!session || !session.userId) {
			return null;
		}

		const currentUser = await prisma.user.findUnique({
			where: {
				id: session.userId,
			},
			select: {
				id: true,
				username: true,
				display_name: true,
				created_at: true,
				updated_at: true,
			},
		});

		if (!currentUser) {
			return null;
		}

		return {
			id: currentUser.id,
			username: currentUser.username,
			displayName: currentUser.display_name,
			createdAt: currentUser.created_at,
			updatedAt: currentUser.updated_at,
		};
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "GET_CURRENT_USER_ERROR",
			details: {
				message: error.message,
			},
			additionalData: { error },
		});

		return null;
	}
}

export async function checkAuth() {
	try {
		const sessionToken = await getCookie();

		if (!sessionToken) {
			return false;
		}

		(await verifySession(sessionToken)) as Auth;

		return true;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "CHECK_AUTH_ERROR",
			details: {
				message: error.message,
			},
			additionalData: { error },
		});

		return false;
	}
}
