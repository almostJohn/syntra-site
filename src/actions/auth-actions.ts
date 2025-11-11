"use server";

import { db } from "@/db/sql";
import { users as usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { MessageType, type ActionState } from "@/types";
import { request } from "@/lib/request";
import { compareHash } from "@/lib/utils";
import { auth } from "@/lib/auth";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 32;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 24;

export async function login(
	_: ActionState,
	form: FormData,
): Promise<ActionState> {
	const username = form.get("username") as string;
	const password = form.get("password") as string;

	if (!username || !password) {
		return {
			message: "Username and password is required.",
			type: MessageType.Error,
		};
	}

	if (
		username.length < USERNAME_MIN_LENGTH ||
		username.length > USERNAME_MAX_LENGTH
	) {
		return {
			message: "Invalid username.",
			type: MessageType.Error,
		};
	}

	if (
		password.length < PASSWORD_MIN_LENGTH ||
		password.length > PASSWORD_MAX_LENGTH
	) {
		return {
			message: "Invalid password.",
			type: MessageType.Error,
		};
	}

	try {
		const { data: response } = await request.get({
			action: async () => {
				const [user] = await db
					.select({
						id: usersTable.id,
						username: usersTable.username,
						password: usersTable.password,
					})
					.from(usersTable)
					.where(eq(usersTable.username, username))
					.limit(1);

				return {
					user: {
						id: user.id,
						username: user.username,
						password: user.password,
					},
				};
			},
		});

		if (!response?.user || !response.user.password) {
			return {
				message: "Invalid username or password.",
				type: MessageType.Error,
			};
		}

		const isMatch = await compareHash(password, response.user.password);

		if (!isMatch) {
			return {
				message: "Invalid username or password.",
				type: MessageType.Error,
			};
		}

		const { error, message } = await auth.login({
			userId: response.user.id,
			username: response.user.username,
		});

		if (error) {
			return {
				message: error,
				type: MessageType.Error,
			};
		}

		return {
			message,
			type: MessageType.Success,
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Something went wrong.";
		return {
			message,
			type: MessageType.Error,
		};
	}
}

export async function logout(): Promise<ActionState> {
	try {
		const { data: currentUser } = await auth.getCurrentUser();

		if (!currentUser) {
			return {
				message: "You must be logged in to perform this action.",
				type: MessageType.Error,
			};
		}

		const { error, message } = await auth.logout();

		if (error) {
			return {
				message: error,
				type: MessageType.Error,
			};
		}

		return {
			message,
			type: MessageType.Success,
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Something went wrong.";
		return {
			message,
			type: MessageType.Error,
		};
	}
}
