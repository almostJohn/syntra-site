import "server-only";
import { db } from "@/db/sql";
import { eq } from "drizzle-orm";
import { users as usersTable } from "@/db/schema";

export type User = {
	id: string;
	username: string;
	password: string;
	avatar: string | null;
	avatarSize: number | null;
	createdAt: Date;
	updatedAt: Date;
};

export async function getUserById(userId: string): Promise<User | null> {
	try {
		const [raw_user] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, userId))
			.limit(1);

		return raw_user;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return null;
	}
}

export async function getUserByUsername(
	username: string,
): Promise<User | null> {
	try {
		const [raw_user] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.username, username))
			.limit(1);

		return raw_user;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return null;
	}
}
