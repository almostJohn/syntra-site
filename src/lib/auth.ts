import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { env } from "@/config/env";
import { MAX_TRUST_ACCOUNT_AGE } from "./constants";
import type { NextRequest } from "next/server";
import { DataQuery } from "./data";

const secret = new TextEncoder().encode(env.APP_SECRET_KEY);

type Auth = {
	userId: string;
	username: string;
};

type AuthResponse = {
	success: boolean;
	message: string;
};

type CurrentUser = {
	id: string;
	username: string;
	avatar: string;
	createdAt: Date;
	updatedAt: Date;
};

export const auth = {
	async signIn(payload: Auth): Promise<AuthResponse> {
		try {
			const token = await new SignJWT(payload)
				.setProtectedHeader({ alg: "HS256" })
				.setExpirationTime("7d")
				.setIssuedAt()
				.sign(secret);

			const cookieStore = await cookies();
			cookieStore.set(env.APP_COOKIE_NAME, token, {
				httpOnly: true,
				sameSite: "lax",
				secure: env.NODE_ENV === "production",
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
			const cookieStore = await cookies();
			cookieStore.delete(env.APP_COOKIE_NAME);

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

			const cookieStore = await cookies();

			if (request) {
				token = request.cookies.get(env.APP_COOKIE_NAME)?.value;
			} else {
				token = cookieStore.get(env.APP_COOKIE_NAME)?.value;
			}

			if (!token) {
				return false;
			}

			await jwtVerify<Auth>(token, secret);

			return true;
		} catch {
			return false;
		}
	},

	async getCurrentUser(): Promise<CurrentUser | null> {
		try {
			const cookieStore = await cookies();

			const token = cookieStore.get(env.APP_COOKIE_NAME)?.value;

			if (!token) {
				return null;
			}

			const { payload } = await jwtVerify<Auth>(token, secret);

			if (!payload) {
				return null;
			}

			const user = await DataQuery.getUserById(payload.userId);

			if (!user) {
				return null;
			}

			return {
				id: user.id,
				username: user.username,
				avatar: user.avatar ?? "",
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			};
		} catch {
			return null;
		}
	},
};
