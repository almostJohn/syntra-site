import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/data/db/prisma";
import { MAX_TRUST_ACCOUNT_AGE } from "./constants";
import { log, LogType } from "./log";

export type AuthPayload = {
	userId: string;
	email: string;
	displayName: string;
};

const secret = new TextEncoder().encode(process.env.NEXT_SECRET_KEY);

export async function signToken<T = string>(
	payload: AuthPayload,
): Promise<T | undefined> {
	try {
		const sessionToken = new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("7d")
			.sign(secret);

		return sessionToken as T;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "SIGN_TOKEN_ERROR",
			details: { message: error.message, error },
			additionalData: { message: "Signing token failed" },
		});
	}
}

export async function verifyToken<T>(
	sessionToken: string,
): Promise<T | undefined> {
	try {
		const { payload } = await jwtVerify(sessionToken, secret);

		return payload as T;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "VERIFICATION_TOKEN_ERROR",
			details: { message: error.message, error },
			additionalData: { message: "Verifying token failed" },
		});
	}
}

export async function setCookie(sessionToken: string): Promise<void> {
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
			details: { message: error.message, error },
			additionalData: { message: "Setting cookie failed" },
		});
	}
}

export async function getCookie() {
	try {
		const cookieStore = await cookies();
		const sessionToken = cookieStore.get(
			process.env.NEXT_REQUEST_COOKIES_NAME!,
		);
		return sessionToken?.value;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "GET_COOKIE_ERROR",
			details: { message: error.message, error },
			additionalData: { message: "Getting cookie failed" },
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
			details: { message: error.message, error },
			additionalData: { message: "Deleting cookie failed" },
		});
	}
}

export async function getSession<T = unknown>(): Promise<T | null> {
	try {
		const sessionToken = await getCookie();

		if (!sessionToken) {
			return null;
		}

		const session = await verifyToken<T>(sessionToken);

		if (!session) {
			return null;
		}

		return session;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "GET_SESSION_ERROR",
			details: { message: error.message, error },
			additionalData: { message: "Getting the session failed" },
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

		const payload = await verifyToken<AuthPayload>(sessionToken);

		if (!payload?.userId) {
			return null;
		}

		const currentUser = await prisma.user.findUnique({
			where: { id: payload.userId },
			select: {
				id: true,
				email: true,
				email_verified: true,
				display_name: true,
				created_at: true,
			},
		});

		return currentUser;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "GET_CURRENT_USER_ERROR",
			details: { message: error.message, error },
			additionalData: { message: "Getting the current user failed" },
		});

		return null;
	}
}
