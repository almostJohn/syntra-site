import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import type { CurrentUser, AuthPayload } from "@/types";
import { db } from "@/db/sql";
import { users as usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const secret = new TextEncoder().encode(process.env.APP_SECRET_KEY);

export const auth = {
	login: async <T extends AuthPayload = AuthPayload>(payload: T) => {
		try {
			const sessionToken = await new SignJWT(payload)
				.setProtectedHeader({ alg: "HS256" })
				.setExpirationTime("7d")
				.setIssuedAt()
				.sign(secret);

			const cookieStore = await cookies();
			cookieStore.set(process.env.APP_COOKIE_NAME!, sessionToken, {
				httpOnly: true,
				sameSite: "lax",
				secure: process.env.NODE_ENV === "production",
				path: "/",
				maxAge: 60 * 60 * 24 * 7,
			});

			return {
				message: "Log in successful.",
			};
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Something went wrong.";
			console.error("[LOGIN Request Error]", error);
			return {
				error: message,
			};
		}
	},

	logout: async () => {
		try {
			const cookieStore = await cookies();
			cookieStore.delete(process.env.APP_COOKIE_NAME!);

			return {
				message: "Log out successful.",
			};
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Something went wrong.";
			console.error("[LOGOUT Request Error]", error);
			return {
				error: message,
			};
		}
	},

	middlewareCheck: async (request?: NextRequest) => {
		try {
			let token: string | undefined;

			const cookieStore = await cookies();

			if (request) {
				token = request.cookies.get(process.env.APP_COOKIE_NAME!)?.value;
			} else {
				token = cookieStore.get(process.env.APP_COOKIE_NAME!)?.value;
			}

			if (!token) return false;

			await jwtVerify<AuthPayload>(token, secret);

			return true;
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Something went wrong.";
			console.error("[MIDDLEWARE CHECK Request Error]", message);
			return false;
		}
	},

	getCurrentUser: async () => {
		try {
			const cookieStore = await cookies();

			const sessionToken = cookieStore.get(process.env.APP_COOKIE_NAME!)?.value;

			if (!sessionToken) {
				return {
					data: null,
					error: "Session token missing.",
				};
			}

			const { payload } = await jwtVerify<AuthPayload>(sessionToken, secret);

			if (!payload) {
				return {
					data: null,
					error: "Failed to parse auth payload.",
				};
			}

			const [user] = await db
				.select({
					id: usersTable.id,
					username: usersTable.username,
					displayName: usersTable.displayName,
					avatar: usersTable.avatar,
					createdAt: usersTable.createdAt,
				})
				.from(usersTable)
				.where(eq(usersTable.id, payload.userId))
				.limit(1);

			if (!user) {
				return {
					data: null,
					error: "User not found.",
				};
			}

			return {
				data: user as CurrentUser,
			};
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Something went wrong.";
			console.error("[GET CURRENT USER Request Error]", error);
			return {
				data: null,
				error: message,
			};
		}
	},
};
