import { eq } from "drizzle-orm";
import { getCookie } from "./cookies";
import { verifySession } from "./verify-session";
import { db } from "@/data/db/client";
import { users } from "@/data/db/schema";
import { log, LogType, Category } from "../log";
import type { Auth } from "./types";

export async function getSession() {
	try {
		const token = await getCookie();

		if (!token) {
			return null;
		}

		const session = (await verifySession(token)) as Auth;

		if (!session) {
			return null;
		}

		const [currentUser] = await db
			.select({
				id: users.id,
				username: users.username,
				displayName: users.displayName,
			})
			.from(users)
			.where(eq(users.id, session.userId))
			.limit(1);

		if (!currentUser) {
			return null;
		}

		return {
			userId: currentUser.id,
			username: currentUser.username,
			displayName: currentUser.displayName,
		};
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: Category.GetSessionError,
			details: {
				message: error.message,
			},
			additionalData: {
				error,
			},
		});

		return null;
	}
}

export async function getCurrentUser() {
	try {
		const token = await getCookie();

		if (!token) {
			return null;
		}

		const session = (await verifySession(token)) as Auth;

		if (!session) {
			return null;
		}

		const [currentUser] = await db
			.select({
				id: users.id,
				username: users.username,
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

		return currentUser;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: Category.GetCurrentUserError,
			details: {
				message: error.message,
			},
			additionalData: {
				error,
			},
		});

		return null;
	}
}

export async function checkAuth() {
	try {
		const token = await getCookie();

		if (!token) {
			return false;
		}

		(await verifySession(token)) as Auth;

		return true;
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: Category.CheckAuthError,
			details: {
				message: error.message,
			},
			additionalData: {
				error,
			},
		});

		return false;
	}
}
