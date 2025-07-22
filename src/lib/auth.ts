import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { MAX_TRUST_ACCOUNT_AGE } from "./constants";
import { db } from "@/data/db/client";
import { eq } from "drizzle-orm";
import { users } from "@/data/db/schema";

const secret = new TextEncoder().encode(process.env.NEXT_SECRET_KEY);

type AuthPayload = {
	userId: string;
	username: string;
	userTag: string;
	displayName: string;
};

export async function createSession(payload: AuthPayload) {
	try {
		const sessionToken = new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("7d")
			.sign(secret);

		return sessionToken;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return null;
	}
}

export async function verifySession<T>(sessionToken: string) {
	try {
		const { payload } = await jwtVerify(sessionToken, secret);

		return payload as T;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return null;
	}
}

export async function setCookie(sessionToken: string) {
	try {
		(await cookies()).set(
			process.env.NEXT_REQUEST_COOKIES_NAME!,
			sessionToken,
			{
				httpOnly: true,
				sameSite: "lax",
				secure: process.env.NODE_ENV === "production",
				path: "/",
				maxAge: MAX_TRUST_ACCOUNT_AGE,
			},
		);
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
	}
}

export async function getCookie() {
	try {
		const sessionToken = (await cookies()).get(
			process.env.NEXT_REQUEST_COOKIES_NAME!,
		)?.value;

		if (!sessionToken) {
			return null;
		}

		return sessionToken;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return null;
	}
}

export async function deleteCookie() {
	try {
		(await cookies()).delete(process.env.NEXT_REQUEST_COOKIES_NAME!);
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
	}
}

export async function getCurrentUser() {
	try {
		const sessionToken = await getCookie();

		if (!sessionToken) {
			return null;
		}

		const session = (await verifySession(sessionToken)) as AuthPayload;

		if (!session) {
			return null;
		}

		const [currentUser] = await db
			.select({
				id: users.id,
				username: users.username,
				tag: users.userTag,
				displayName: users.displayName,
				createdAt: users.createdAt,
				updatedAt: users.updatedAt,
			})
			.from(users)
			.where(eq(users.id, session.userId))
			.limit(1);

		if (!currentUser) {
			return null;
		}

		return {
			id: currentUser.id,
			username: currentUser.username,
			tag: currentUser.tag,
			displayName: currentUser.displayName,
			createdAt: currentUser.createdAt,
			updatedAt: currentUser.updatedAt,
		};
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return null;
	}
}

export async function checkAuth() {
	try {
		const sessionToken = await getCookie();

		if (!sessionToken) {
			return false;
		}

		(await verifySession(sessionToken)) as AuthPayload;

		return true;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return false;
	}
}
