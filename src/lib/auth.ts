import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { env } from "@/config/env";
import { MAX_TRUST_ACCOUNT_AGE } from "./constants";
import { db } from "@/db/sql";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

const secret = new TextEncoder().encode(env.APP_SECRET_KEY);

type AuthPayload = {
	userId: string;
	username: string;
	userTag: string;
	displayName: string;
};

type AuthResponse = {
	success: boolean;
	message: string;
};

type CurrentUser = {
	id: string;
	username: string;
	userTag: string;
	displayName: string;
	createdAt: Date;
	updatedAt: Date;
};

export const auth = {
	async signIn(payload: AuthPayload): Promise<AuthResponse> {
		try {
			const token = await new SignJWT(payload)
				.setProtectedHeader({ alg: "HS256" })
				.setExpirationTime("7d")
				.setIssuedAt()
				.sign(secret);

			(await cookies()).set(env.APP_COOKIE_NAME, token, {
				httpOnly: true,
				sameSite: "lax",
				secure: env.NODE_ENV === "production" ? true : false,
				path: "/",
				maxAge: MAX_TRUST_ACCOUNT_AGE,
			});

			return {
				success: true,
				message: "Sign in successful.",
			};
		} catch {
			return {
				success: false,
				message: "There was an error signing in. Please try again.",
			};
		}
	},

	async signOut(): Promise<AuthResponse> {
		try {
			(await cookies()).delete(env.APP_COOKIE_NAME);

			return {
				success: true,
				message: "Sign out successful.",
			};
		} catch {
			return {
				success: false,
				message: "There was an error signing out. Please try again.",
			};
		}
	},

	async check(request?: NextRequest): Promise<boolean> {
		try {
			let token: string | undefined;

			if (request) {
				token = request.cookies.get(env.APP_COOKIE_NAME)?.value;
			} else {
				token = (await cookies()).get(env.APP_COOKIE_NAME)?.value;
			}

			if (!token) {
				return false;
			}

			await jwtVerify<AuthPayload>(token, secret);

			return true;
		} catch {
			return false;
		}
	},

	async getCurrentUser(): Promise<CurrentUser | null> {
		try {
			const token = (await cookies()).get(env.APP_COOKIE_NAME)?.value;

			if (!token) {
				return null;
			}

			const { payload } = await jwtVerify<AuthPayload>(token, secret);

			if (!payload) {
				return null;
			}

			const [rawUser] = await db
				.select()
				.from(users)
				.where(eq(users.id, payload.userId))
				.limit(1);

			if (!rawUser) {
				return null;
			}

			return {
				id: rawUser.id,
				username: rawUser.username,
				userTag: rawUser.userTag,
				displayName: rawUser.displayName,
				createdAt: rawUser.createdAt,
				updatedAt: rawUser.updatedAt,
			};
		} catch {
			return null;
		}
	},
};
