import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/db/prisma";
import { MAX_TRUST_ACCOUNT_AGE } from "./constants";

export type AuthPayload = {
	userId: string;
	email: string;
	displayName: string;
};

const SECRET_KEY = new TextEncoder().encode(process.env.NEXT_SECRET_KEY);

export async function signAuthToken(payload: AuthPayload) {
	try {
		const sessionToken = new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("7d")
			.sign(SECRET_KEY);

		return sessionToken;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		throw new Error("Signing auth token failed due to some error: ", {
			cause: error,
		});
	}
}

export async function verifyAuthToken<T>(sessionToken: string): Promise<T> {
	try {
		const { payload } = await jwtVerify(sessionToken, SECRET_KEY);

		return payload as T;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		throw new Error("Verifying auth token failed due to some error: ", {
			cause: error,
		});
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
		console.error(error.message, error);
		throw new Error("Setting cookie failed due to some error: ", {
			cause: error,
		});
	}
}

export async function getCookie() {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get(process.env.NEXT_REQUEST_COOKIES_NAME!);
	return sessionToken?.value;
}

export async function deleteCookie() {
	try {
		const cookieStore = await cookies();

		cookieStore.delete(process.env.NEXT_REQUEST_COOKIES_NAME!);
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		throw new Error("Deleting cookie failed due to some error: ", {
			cause: error,
		});
	}
}

export async function getSession<T = unknown>(): Promise<T | null> {
	try {
		const sessionToken = await getCookie();

		if (!sessionToken) {
			return null;
		}

		const session = await verifyAuthToken<T>(sessionToken);

		return session;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return null;
	}
}

export async function getCurrentUser() {
	try {
		const sessionToken = await getCookie();

		if (!sessionToken) {
			return null;
		}

		const payload = await verifyAuthToken<AuthPayload>(sessionToken);

		if (!payload.userId) {
			return null;
		}

		const currentUser = await prisma.user.findUnique({
			where: { id: payload.userId },
			select: {
				id: true,
				email: true,
				display_name: true,
				created_at: true,
			},
		});

		return currentUser;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return null;
	}
}
